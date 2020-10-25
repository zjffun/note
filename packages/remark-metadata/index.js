const fs = require('fs');
const { execSync } = require('child_process');
const jsYaml = require('js-yaml');

const PLUGIN_NAME = 'remark-metadata';
const MATTER_NODES = ['yaml', 'toml'];

/**
 * Get's a matter node from the given AST.
 *
 * @param  {Object} ast
 * @return {Object|undefined}
 */
function getMatterNode(ast) {
  // Note we don't have to traverse the AST because matter will be in root
  return ast.children.find(node => MATTER_NODES.includes(node.type));
}

/**
 * Get the frontmatter from the MDAST. If it doesn't exist, an empty
 * one will be created.
 *
 * @see https://github.com/wooorm/remark-frontmatter
 * @param  {Object} ast
 * @return {Object} a MDAST-like node for Frontmatter.
 */
function getMatter(ast) {
  let fm = getMatterNode(ast);

  // No front matter, create an empty matter node.
  if (!fm) {
    fm = {
      type: 'yaml',
      value: '',
    };
  }

  return fm;
}

/**
 * Given a frontmatter node, write the meta data into it.
 *
 * @param  {Object} frontmatterNode a MDAST-like node for Frontmatter.
 * @param  {Object} meta
 * @param  {Object} metadataConfig
 */
function writeMatter(frontmatterNode, meta, metadataConfig) {
  const fm = {};

  // parse any existing frontmatter
  if (frontmatterNode.value) {
    Object.assign(fm, jsYaml.safeLoad(frontmatterNode.value));
  }

  // merge in meta
  Object.entries(meta).forEach(([name, value]) => {
    const { shouldUpdate } = metadataConfig[name];

    if (typeof shouldUpdate !== 'function' || shouldUpdate(value, fm[name])) {
      fm[name] = value;
    }
  });

  // stringify
  frontmatterNode.value = jsYaml.safeDump(fm).trim(); // eslint-disable-line no-param-reassign
}

/**
 * Get the modified time of a vFile.
 *
 * If git option is true return the last commit time of this vFile,
 * otherwise return the mtime.
 *
 * @param  {vFile}   vFile
 * @param  {Object}  options {git, gitLogGrep}
 * @return {string}
 */
function getModifiedTime(vFile, { git, gitLogGrep }) {
  if (git) {
    const cmd = `git log -1 --format="%ad" ${gitLogGrep} -- "${vFile.path}"`;
    const modified = execSync(cmd, { encoding: 'utf-8' }).trim();

    // New files that aren't committed yet will return nothing
    if (modified) {
      return new Date(modified).toUTCString();
    }

    return '';
  }

  try {
    const stats = fs.statSync(vFile.path);
    return new Date(stats.mtime).toUTCString();
  } catch (error) /* istanbul ignore next */ {
    vFile.message(error, null, PLUGIN_NAME);
  }

  return '';
}

/**
 * Get the created time of a vFile.
 *
 * If git option is true return the first commit time of this vFile,
 * otherwise using the ctime.
 *
 * @param  {vFile}   vFile
 * @param  {Object}  options {git}
 * @return {string}
 */
function getCreatedTime(vFile, { git }) {
  if (git) {
    const cmd = `git log --reverse --format="%ad" -- "${vFile.path}"`;
    const created = execSync(cmd, { encoding: 'utf-8' }).trim().split('\n')[0];

    // New files that aren't committed yet will return nothing
    if (created) {
      return new Date(created).toUTCString();
    }

    return '';
  }

  try {
    const stats = fs.statSync(vFile.path);
    return new Date(stats.ctime).toUTCString();
  } catch (error) /* istanbul ignore next */ {
    vFile.message(error, null, PLUGIN_NAME);
  }

  return '';
}

/**
 * Get the parameter of value function of metadata.
 *
 * @param  {Object}   data {vFile, oldFrontMatter, gitLogGrep}
 * @return {Object}
 */
function createValueFunctionParam({ vFile, oldFrontMatter, gitLogGrep }) {
  const param = {
    vFile,
    oldFrontMatter,
  };

  Object.defineProperties(param, {
    gitModifiedTime: {
      get() {
        return getModifiedTime(vFile, { git: true, gitLogGrep });
      },
    },
    modifiedTime: {
      get() {
        return getModifiedTime(vFile, { git: false, gitLogGrep });
      },
    },
    gitCreatedTime: {
      get() {
        return getCreatedTime(vFile, { git: true });
      },
    },
    createdTime: {
      get() {
        return getCreatedTime(vFile, { git: false });
      },
    },
  });

  return param;
}

/**
 * Given the vFile, metadata returns an object containing possible meta data
 *
 * @param  {vFile}   vFile
 * @param  {Object}  options {gitLogGrep, oldFrontMatter}
 * @param  {Object}  metadata
 * @return {Object}
 */
function getMetadata(vFile, { gitLogGrep, oldFrontMatter }, metadataConfig) {
  /* eslint-disable no-use-before-define */
  const meta = {};

  Object.entries(metadataConfig).forEach(([name, config]) => {
    const value =
      typeof config === 'string' || typeof config === 'function'
        ? config
        : config.value;

    if (value === metadata.GIT_LAST_MODIFIED_TIME) {
      meta[name] = getModifiedTime(vFile, { git: true, gitLogGrep });
      return;
    }

    if (value === metadata.LAST_MODIFIED_TIME) {
      meta[name] = getModifiedTime(vFile, { git: false, gitLogGrep });
      return;
    }

    if (value === metadata.GIT_CREATED_TIME) {
      meta[name] = getCreatedTime(vFile, { git: true });
      return;
    }

    if (value === metadata.CREATED_TIME) {
      meta[name] = getCreatedTime(vFile, { git: false });
      return;
    }

    if (typeof value === 'string') {
      meta[name] = value;
      return;
    }

    if (typeof value === 'function') {
      meta[name] = value(createValueFunctionParam({ vFile, oldFrontMatter, gitLogGrep }));
    }
  });

  return meta;
  /* eslint-enable no-use-before-define */
}

/**
 * Returns the transformer which acts on the MDAST tree and given VFile.
 *
 * @link https://github.com/unifiedjs/unified#function-transformernode-file-next
 * @link https://github.com/syntax-tree/mdast
 * @link https://github.com/vfile/vfile
 * @return {function}
 */
function metadata(options = {}) {
  const gitLogGrep =
    typeof options.gitExcludeCommit === 'string'
      ? ` --grep="${options.gitExcludeCommit}" --invert-grep `
      : '';
  const metadataConfig = options.metadata || {};

  /**
   * @param {object}    ast   MDAST
   * @param {vFile}     vFile
   * @param {function}  next
   * @return {object}
   */
  return function transformer(ast, vFile, next) {
    // Get frontmatter node from AST
    const frontmatterNode = getMatter(ast);

    // Get metadata
    const meta = getMetadata(
      vFile,
      {
        gitLogGrep,
        oldFrontMatter: jsYaml.safeLoad(frontmatterNode.value),
      },
      metadataConfig,
    );

    // Write metadata (by reference)
    writeMatter(frontmatterNode, meta, metadataConfig);

    // If we don't have a Matter node in the AST, put it in.
    if (!getMatterNode(ast)) {
      ast.children.unshift(frontmatterNode);
    }

    if (typeof next === 'function') {
      return next(null, ast, vFile);
    }

    return ast;
  };
}

metadata.GIT_LAST_MODIFIED_TIME = 'REMARK_METADATA_GIT_LAST_MODIFIED_TIME';
metadata.GIT_CREATED_TIME = 'REMARK_METADATA_GIT_CREATED_TIME';
metadata.LAST_MODIFIED_TIME = 'REMARK_METADATA_LAST_MODIFIED_TIME';
metadata.CREATED_TIME = 'REMARK_METADATA_CREATED_TIME';

module.exports = metadata;

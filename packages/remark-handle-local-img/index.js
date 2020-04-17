const path = require("path");
const fs = require("fs");

const visit = require("unist-util-visit");
const is = require("unist-util-is");

const isImgExt = (str) => /\.(svg|png|jpg|jpeg|gif)$/.test(str);

module.exports = function attacher() {
  return function transformer(tree, file) {
    if (!file.path) {
      console.warn("dirname of vfile not find.");
      return;
    }
    visit(tree, visitor(file));
  };
};

function visitor(file) {
  return function (node) {
    if (is(node, "image") && isImgExt(node.url) && path.isAbsolute(node.url)) {
      const extname = path.extname(node.url);
      const dirPath = path.join(file.cwd, file.dirname);
      const imgDirPath = path.join(dirPath, "images");
      const imgPath = path.join(imgDirPath, `${node.alt}${extname}`);
      !fs.existsSync(imgDirPath) && fs.mkdirSync(imgDirPath);
      var newImgPath = copyFileSyncWithKeepBoth(node.url, imgPath);
      node.url = `./${path.relative(dirPath, newImgPath).replace(/\\/g, "/")}`;
    }
  };
}

function copyFileSyncWithKeepBoth(source, target) {
  let newTarget = target;
  let pathObj = null;
  while (fs.existsSync(newTarget)) {
    pathObj = path.parse(newTarget);
    pathObj.base = `${pathObj.name}(z)${pathObj.ext}`;
    newTarget = path.format(pathObj);
  }
  fs.copyFileSync(source, newTarget);
  return newTarget;
}

---
updated: 'Wed, 12 Feb 2020 07:04:06 GMT'
date: 'Wed, 12 Feb 2020 07:04:06 GMT'
---

npm 和 yarn 安装依赖（包）时不会自动安装 peer dependence（虽然很旧的 npm 是会自动安装的，但几乎没人用那么旧的了），而是给出如下警告：

```bash
$ npm install --save-dev rollup-plugin-typescript
npm WARN rollup-plugin-typescript@1.0.0 requires a peer of tslib@* but none is installed. You must install peer dependencies yourself.
npm WARN rollup-plugin-typescript@1.0.0 requires a peer of typescript@>=2.1.0 but none is installed. You must install peer dependencies yourself.

$ yarn add -D rollup-plugin-typescript
yarn add v1.13.0
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
warning " > rollup-plugin-typescript@1.0.0" has unmet peer dependency "tslib@*".
warning " > rollup-plugin-typescript@1.0.0" has unmet peer dependency "typescrip
t@>=2.1.0".
```

并且也没有自动安装 peer dependence 选项，这也就是为什么我们安装某些依赖时需要同时安装多个依赖（包），例如：`npm install --save-dev rollup-plugin-typescript typescript tslib`。

参考：

-   [Peer Dependencies | Node.js](https://nodejs.org/en/blog/npm/peer-dependencies/)
-   [peerDependencies | Introduction](http://npm.github.io/using-pkgs-docs/package-json/types/peerdependencies.html)
-   [Types of dependencies | Yarn](https://yarnpkg.com/lang/en/docs/dependency-types/)

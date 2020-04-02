因为样式文件没有定义为 TS 模块。

解决：

一： 添加样式文件的 TS 定义

将下面代码添加到 `index.d.js` 文件中。

```js
declare module "*.scss";
declare module "*.css";
```

二：使用工具生成样式的 TS 定义

-   [Quramy/typed-css-modules: Creates .d.ts files from CSS Modules .css files](https://github.com/Quramy/typed-css-modules)
-   [seek-oss/css-modules-typescript-loader: Webpack loader to create TypeScript declarations for CSS Modules](https://github.com/seek-oss/css-modules-typescript-loader)

相关 issue：

-   [Cannot see typing newly generated file (build error) · Issue #33 · Jimdo/typings-for-css-modules-loader](https://github.com/Jimdo/typings-for-css-modules-loader/issues/33)
-   [\[webpack\]Cannot find module './style.scss'. error · Issue #66 · GoogleChromeLabs/squoosh](https://github.com/GoogleChromeLabs/squoosh/issues/66)

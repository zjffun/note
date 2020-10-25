---
updated: 'Wed, 12 Feb 2020 07:04:06 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

# 处理 ES6 语法

使用 Babel

> Babel 是一个用于将 ECMAScript 2015+ 代码转换为新旧浏览器或其他环境支持的 JavaScript 向下兼容版本代码的工具链。
>
> Babel 主要可以做：
>
> -   语法翻译
> -   拓展（Polyfill）您的目标环境不支持的特性
> -   源码转换

# 处理 ES6 的 module

1.  使用 Babel 的插件[babel-plugin-transform-es2015-modules-commonjs · Babel](https://babeljs.io/docs/en/babel-plugin-transform-es2015-modules-commonjs/)将 module 转化为 commonjs
2.  使用 Rollup 或者 webpack 打包

# 支持 ES6 新的 API（Promise 等）

使用[babel-polyfill](http://babeljs.io/docs/en/babel-polyfill)

这个插件是要写入到最后生成的 JS 文件中的，在浏览器执行 JS 时先运行 polyfill 将特性加到全局环境（生成器函数倒是需要翻译源代码）。

使用[babel-plugin-transform-runtime](http://babeljs.io/docs/en/babel-plugin-transform-runtime/)可以复用 Babel 注入的帮助代码，减小代码体积。

相关资料：

> This means you can use new built-ins like Promise or WeakMap, static methods like Array.from or Object.assign, instance methods like Array.prototype.includes, and generator functions (provided you use the regenerator plugin). The polyfill adds to the global scope as well as native prototypes like String in order to do this.
>
> <http://www.ruanyifeng.com/blog/2016/01/babel.html>\
> Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API ，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。Babel 默认不转码的 API 非常多，详细清单可以查看 [definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js) 文件
>
> <http://babeljs.io/docs/en#polyfill>\
> Since Babel only transforms syntax (like arrow functions), you can use babel-polyfill in order to support new globals such as Promise or new native methods like String.padStart (left-pad). It uses core-js and regenerator. Check out our babel-polyfill docs for more info.

# 支持 ES6 的 fetch

babel-polyfill 不支持 fetch，得用[github/fetch: A window.fetch JavaScript polyfill.](https://github.com/github/fetch)

相关资料：

作者说 fetch 不是跨平台特性，在一些环境中它没有意义就没加进来

> window\.fetch is not a cross-platform feature, in some environments it makes no sense. For this reason, I don't think it should be in core-js. Looking at a large number of requests it may be added in the future. Now you can use, for example, this polyfill.

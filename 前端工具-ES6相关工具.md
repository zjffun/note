# 处理ES6语法
使用Babel

> Babel是一个用于将ECMAScript 2015+ 代码转换为新旧浏览器或其他环境支持的JavaScript向下兼容版本代码的工具链。
> 
> Babel主要可以做：
> 
> - 语法翻译
> - 拓展（Polyfill）您的目标环境不支持的特性
> - 源码转换

# 处理ES6的module
1. 使用Babel的插件[babel-plugin-transform-es2015-modules-commonjs · Babel](https://babeljs.io/docs/en/babel-plugin-transform-es2015-modules-commonjs/)将module转化为commonjs
2. 使用用Rollup或者webpack打包

# 支持ES6新的API（Promise等）
使用[babel-polyfill](http://babeljs.io/docs/en/babel-polyfill)

这个插件是要写入到最后生成的JS文件中的，在浏览器执行JS时先运行polyfill将特性加到全局环境（生成器函数倒是需要翻译源代码）。

使用[babel-plugin-transform-runtime](http://babeljs.io/docs/en/babel-plugin-transform-runtime/)可以复用Babel注入的帮助代码，减小代码体积。

相关资料：

> This means you can use new built-ins like Promise or WeakMap, static methods like Array.from or Object.assign, instance methods like Array.prototype.includes, and generator functions (provided you use the regenerator plugin). The polyfill adds to the global scope as well as native prototypes like String in order to do this.

> http://www.ruanyifeng.com/blog/2016/01/babel.html  
Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API ，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。Babel 默认不转码的 API 非常多，详细清单可以查看 [definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js) 文件

> http://babeljs.io/docs/en#polyfill  
Since Babel only transforms syntax (like arrow functions), you can use babel-polyfill in order to support new globals such as Promise or new native methods like String.padStart (left-pad). It uses core-js and regenerator. Check out our babel-polyfill docs for more info.


# 支持ES6的fetch
babel-polyfill不支持fetch，得用[github/fetch: A window.fetch JavaScript polyfill.](https://github.com/github/fetch)

相关资料：

作者说fetch不是跨平台特性，在一些环境中它没有意义就没加进来
> window.fetch is not a cross-platform feature, in some environments it makes no sense. For this reason, I don't think it should be in core-js. Looking at a large number of requests it may be added in the future. Now you can use, for example, this polyfill.



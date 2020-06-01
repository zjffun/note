# CommonJS

-   [CommonJS - Wikipedia](https://en.wikipedia.org/wiki/CommonJS)

## 介绍

主要在浏览器之外地方（例如服务器和桌面应用上）使用的模块化技术。

## 规范

一个文件就是一个模块，拥有单独的作用域。

## 定义模块

使用 exports 或 module.exports

    var myModule = (a, b)=>{
        return a+b;
    }
    module.exports = myModule;

## 使用模块

使用 require

    var mm = require('./myModul.js');

# AMD

-   [Asynchronous module definition - Wikipedia](https://en.wikipedia.org/wiki/Asynchronous_module_definition)
-   [AMD · amdjs/amdjs-api Wiki](https://github.com/amdjs/amdjs-api/wiki/AMD)

## 介绍

主要在浏览器使用，因为和 CommonJS 在某些方面意见不合而独立出来（主要是模块定义方面）。

## 规范

一个文件就是一个模块，拥有单独的作用域。

## 定义模块

使用 define

[amdjs-api/AMD.md at master · amdjs/amdjs-api](https://github.com/amdjs/amdjs-api/blob/master/AMD.md#using-require-and-exports)

## 使用模块

使用 require

[require · amdjs/amdjs-api Wiki](https://github.com/amdjs/amdjs-api/wiki/require)

# UMD

```js
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.YourModuleName = factory());
}(this, (function () { 
    'use strict';

    var yourModule = {};
    // ...
    return yourModule;

})));
```

# ES6 Modules

> 现在浏览器们才刚刚开始去实现这个功能。但它在许多转换器中已经实现，例如 Traceur Compiler ， Babel ， Rollup 或 Webpack。

-   [export - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)
-   [import - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

---
date: 'Wed, 10 Feb 2021 06:29:30 GMT'
updated: 'Wed, 10 Feb 2021 06:30:04 GMT'
---

> [ECMAScript modules in browsers - JakeArchibald.com](https://jakearchibald.com/2017/es-modules-in-browsers/)

-   目前不支持 "Bare" import。解决：[How to handle ES6 bare module imports for local Development](http://dplatz.de/blog/2019/es6-bare-imports.html)
-   可以使用 `nomodule` 向下兼容
-   默认是 defer （包括行内脚本）
-   模块只执行一次（遵循 ES modules）
-   总是检测跨域
-   默认在同源时携带 Credentials（需要是遵循新规范的浏览器）
-   必须有正确的 Mime-types

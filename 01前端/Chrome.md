# 调试异步加载的 js（web worker 加载的 js）

以前在使用 requirejs 时遇到过加载的 js 无法在控制台调试的情况，今天做了下总结

-   创建了 script 标签引入的 js 在 FF，Chrome 都能在调试器里找到。  
-   web worker 引入的 js 无法直接在 FF，Chrome 的调试器里找到，需要在：  
    Chrome 中：在引入的 js 文件顶部加上`//@ sourceURL=async_test.js`，然后就能在 (no domain) 中找到该 js  
    FF 中：怎么处理还不会。。。

eg：  
test.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
<!-- 1.在调试器可以找到 -->
<!-- <script type="text/javascript" src="async_test.js" async="async"></script> -->
<!-- 2.在调试器可以找到 -->
<!-- <script>
  node = document.createElement('script');
  node.type = 'text/javascript';
  node.charset = 'utf-8';
  node.async = true;
  node.src = './async_test.js';
  document.getElementsByTagName("HEAD")[0].appendChild(node);  
</script> -->
<!-- 3.js中加上//@ sourceURL=async_test.js才可以找的到 -->
<script>
  //web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。
  var w = new Worker("./async_test.js");
</script>
</body>
</html>
```

async_test.js

```js
//@ sourceURL=async_test.js
console.log('async_test')
importScripts("./async_test2.js")
```

async_test2.js

```js
//@ sourceURL=async_test2.js
console.log('async_test2')
```

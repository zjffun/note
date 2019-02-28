iframe：<https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe>

# iframe 内容加载后不改变

使用：`onload="this.height=this.contentWindow.document.documentElement.scrollHeight"`

例如：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <h1>自适应高度</h1>
  <iframe srcdoc='<div style="height: 400px;width: 400px;background: #ddd;"></div>' frameborder="1" scrolling="no" width="100%" onload="this.height=this.contentWindow.document.documentElement.scrollHeight"></iframe>

  <h1>非自适应高度</h1>
  <iframe srcdoc='<div style="height: 400px;width: 400px;background: #ddd;"></div>' frameborder="1" scrolling="no" width="100%"></iframe>
</body>
</html>
```

# iframe 内容加载后改变

定时改变 iframe 高度：

```js
setInterval(()=>{
  document.querySelector('iframe').height = window.frames[0].document.documentElement.scrollHeight;
}, 200);
```

例如：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <h1>自适应高度</h1>
  <iframe srcdoc='<button onclick="this.parentNode.appendChild(this.cloneNode())" style="width: 100px; height: 100px;display: block;"></button>' frameborder="1" scrolling="no" width="100%" onload="this.height=this.contentWindow.document.documentElement.scrollHeight"></iframe>

  <h1>非自适应高度</h1>
  <iframe srcdoc='<button onclick="this.parentNode.appendChild(this.cloneNode())" style="width: 100px; height: 100px;display: block;"></button>' frameborder="1" scrolling="no" width="100%"></iframe>
  <script>
    setInterval(()=>{
      document.querySelector('iframe').height = window.frames[0].document.documentElement.scrollHeight;
    }, 200);
  </script>
</body>
</html>
```

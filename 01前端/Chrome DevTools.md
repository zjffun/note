---
updated: 'Fri, 10 Jul 2020 12:09:06 GMT'
date: 'Mon, 01 Jun 2020 12:35:58 GMT'
---

# Console

```js
// dir
dir(document.body);

// inspect
document.body;
inspect($0);

// getEventListeners
getEventListeners(document.body);

// monitor
function sum(x, y) {
  return x + y;
}
monitor(sum);
sum(1, 2);

// monitorEvents
monitorEvents($0, "key");

// log dom as object
console.dir(elem)

// log dom
console.log(elem)
```

# Network

-   Initiator: 可以获取发送该请求的 JS 调用栈

# More tools

## Layers

查看对查看元素尺寸，位置变化（动画效果）非常有用。

## Remote devices / `chrome://inspect/#devices`

-   通过 USB 调试移动设备打开的页面
-   通过 `IP:port` 调试 `node --inspect-brk==host:port xxx`

## Coverage

标记已使用和未使用的 JS、CSS，并统计他们的占比。可以用于找出关键代码，优化首屏加载速度。例如：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .class1 {
        color: aqua;
      }
      /* .class2 在点击 test 按钮前标记为未使用 */
      .class2 {
        color: lightgreen;
      }
    </style>
  </head>

  <body>
    <button id="dom1">
      test
    </button>
    <script>
      function foo() {
        dom1.classList.add("class1");
      }
      foo();
      /* bar 在点击 test 按钮前标记为未使用 */
      function bar() {
        dom1.classList.add("class2");
      }
      dom1.onclick = bar;
    </script>
  </body>
</html>
```

# 资料

-   Chrome DevTools 的几百条技巧: [Dev Tips - Developer Tips by Umar Hansa](https://umaar.com/dev-tips/)
-   [精读前端调试技巧](https://github.com/dt-fe/weekly/blob/v2/011.%E7%B2%BE%E8%AF%BB%E5%89%8D%E7%AB%AF%E8%B0%83%E8%AF%95%E6%8A%80%E5%B7%A7.md)

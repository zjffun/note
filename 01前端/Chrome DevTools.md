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
```

# Network

-   Initiator: 可以获取发送该请求的 JS 调用栈

# More tools

## Layers

查看对查看元素尺寸，位置变化（动画效果）非常有用。

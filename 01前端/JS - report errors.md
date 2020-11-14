---
date: 'Sat, 14 Nov 2020 01:56:08 GMT'
updated: 'Sat, 14 Nov 2020 02:03:27 GMT'
---

# 三种错误

1.  通过 `addEventListener('error', callback, true)` 在捕获阶段捕捉资源加载失败错误。
2.  通过 `window.onerror` 捕捉 js 运行错误。
3.  通过 `addEventListener('unhandledrejection', callback)` 捕捉 promise 错误，但是没有发生错误的行数，列数等信息，只能手动抛出相关错误信息。

# 发送时机

空闲时发送：[window.requestIdleCallback() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)

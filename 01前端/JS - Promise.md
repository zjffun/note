---
date: 'Sat, 14 May 2022 15:20:51 GMT'
updated: 'Sat, 14 May 2022 15:21:15 GMT'
---

[simple promise implement](https://github.com/zjffun/test/tree/master/js-t/promise-t)

# `promise.then` 的回调为什么要放到微任务队列？

个人理解：放到微任务应该是为了不阻塞交互，如果回调都同步执行遇到长回调链执行很长时间会导致页面一直无法交互。（手写过 Promise 应该可以发现，其实 `promise.then` 的回调可以在 `fulfilled` 或 `rejected` 后同步执行。）

# 栈、堆和队列

-   栈：函数调用形成栈
-   堆：对象的内容分配在堆中
-   队列：一个 JavaScript 运行时包含了一个待处理的消息队列。在事件循环期间依次处理队列中的消息

# 事件循环

> 之所以称之为事件循环，是因为它经常按照类似如下的方式来被实现：

```js
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

> 如果当前没有任何消息，`queue.waitForMessage()` 会同步地等待消息到达。

# 任务队列

任务队列是指 macrotask queue，当 macrotask queue 空了（都处理完了）就开始处理 microtask queue，并且依次就将所有 microtask queue 都处理完（类似将 microtask queue 的所有任务合成为一个当 macrotask）。

-   macrotasks: setTimeout, setInterval, setImmediate(Non-standard), I/O, UI rendering
-   microtasks: process.nextTick, Promises, Object.observe(Obsolete), MutationObserver

# 参考

-   [Concurrency model and Event Loop - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#Several_runtimes_communicating_together)
-   [javascript - Difference between microtask and macrotask within an event loop context - Stack Overflow](https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context)
-   [HTML Standard](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue)

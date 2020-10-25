---
updated: 'Wed, 09 Sep 2020 10:35:05 GMT'
date: 'Fri, 29 Mar 2019 00:57:41 GMT'
---

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

任务分为 microtask 和 macrotask。

每次先将 microtask queue 中的任务都处理完，再处理一个 macrotask queue 中的的任务。依次这样循环下去。

例如：

```html
<!DOCTYPE html>
<script>
  console.log("main1");
  Promise.resolve().then(() => console.log("micro1"));
  console.log("main2");
  setTimeout(console.log, 0, "macro1");
  console.log("main3");
  Promise.resolve().then(() => {
    console.log("micro2");
    Promise.resolve().then(() => console.log("micro3"));
    setTimeout(console.log, 0, "macro2");
  });
  Promise.resolve().then(() => console.log("micro4"));
  console.log("main4");
  setTimeout(console.log, 0, "macro3");
  console.log("main5");
  /**
    main1
    main2
    main3
    main4
    main5
    micro1
    micro2
    micro4
    micro3
    macro1
    macro3
    macro2
  */
</script>
```

-   macrotasks: setTimeout, setInterval, setImmediate(Non-standard), I/O, UI rendering
-   microtasks: process.nextTick, Promises, Object.observe(Obsolete), MutationObserver

# 参考

-   [Concurrency model and Event Loop - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#Several_runtimes_communicating_together)
-   [javascript - Difference between microtask and macrotask within an event loop context - Stack Overflow](https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context)
-   [HTML Standard](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue)

---
updated: 'Thu, 17 Sep 2020 12:34:50 GMT'
date: 'Thu, 17 Sep 2020 12:34:50 GMT'
---

感觉 Vue 的文章写的很好了（虽然主要是夸 Vue 的 ==!），<https://vuejs.org/v2/guide/comparison.html> 。之前就看过但面试还是没答好，还是应该总结一下。

# 整体

Vue 对比 React：

-   学习曲线：Vue < React
-   灵活性：React > Vue
-   性能优化：Vue 不用像 React 手动维护 shouldComponentUpdate。
-   HTML：Templates 对比 JSX。JSX 学习额外的 DSL（领域特定语言）。
-   CSS：CSS 作用域在 React 中是通过 CSS-in-JS 的方案实现的。Vue 中是通过添加 scoped 属性实现的。
-   扩展：Vue 的路由库和状态管理库都是由官方维护支持且与核心库同步更新的。React 是社区维护的。

Angular：

个人感觉 Angular 与 Vue 和 React 很难放在一起比。因为 Angular 才真正算是 JS 框架，一个 Angular 基本就解决了包括路由、状态、依赖、TS 等全部问题（配合它的 cli 用更是真的香），Angular 用的 Zone.js 和 RxJS 也完美解决了异步的痛点。但 Angular 源码感觉太复杂，一般人 hold 不住，并且感觉用 Angular 写的东西很难单独拿出来用。

# diff 算法

目前我还没有仔细读过他们的源码，光看文档感觉他们的 diff 算法都很类似。

Vue:

-   通过 patch 函数进行比较（传入新 VNode 和旧 VNode）。
-   比较会只比较树的同一级，所以时间复杂度为`O(n)`。
-   `key` 不同时直接将节点换掉，相同时进行深度比较。

参见：<https://programmer.ink/think/virtual-dom-and-diff-algorithm-in-vue.html>

React:

-   调用 `componentWillReceiveProps()` 和 `componentWillUpdate()`，然后调用 `render()` ，最后 diff 之前之后的结果。
-   使用`key`属性判断是否更改。
-   只比较树的同一级，所以时间复杂度为`O(n)`。
-   元素相同，将比较每个属性的差异，只更新属性。

<https://reactjs.org/docs/reconciliation.html>
<https://www.cronj.com/blog/diff-algorithm-implemented-reactjs/>

Angular:

暂未找到资料。

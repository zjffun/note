---
updated: 'Sat, 09 May 2020 11:53:16 GMT'
date: 'Fri, 29 Mar 2019 00:57:41 GMT'
---

-   文档根元素`<html>`、拥有某些特殊样式（透明小于 1，`transform`不为`none`等）的元素会创建层叠上下文。
-   未创建层叠上下文的元素会纳入上层的层叠上下文。

注意：

> `position: static`: The element is positioned according to the normal flow of the document. The top, right, bottom, left, and z-index properties have no effect. This is the default value.

未设置 position（使用默认值 static）不会创建层叠上下文。如下面例子，DIV #3 还是会在 DIV #1 上面。

```text
Root
- DIV #1(position: relative, z-index: 5)
- DIV #2(z-index: 4)
  - DIV #3(position: relative, z-index: 6)
```

参考：

[The stacking context - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)

-   文档根元素`<html>`、拥有某些特殊样式（透明小于 1，`transform`不为`none`等）的元素会创建层叠上下文。
-   未创建层叠上下文的元素会纳入上层的层叠上下文。

[对 MDN 的上的例子的拓展](https://codepen.io/1010543618/pen/oVaOxP?&editable=true)

```text
Root
- DIV #1(z-index: 5)
- DIV #2(z-index: 2)
- DIV #3(z-index: 4)
  - DIV #4(z-index: 6)
  - DIV #5(z-index: 1)
  - DIV #6(z-index: 3)
- DIV #7(未设置 z-index， 且 opacity: 1)
  - DIV #8(z-index: 6)
```

上面结构中 DIV #4 的 z-index 比 DIV #1 的大，但因为 DIV #3 创建了层叠上下文，这个上下文的 z-index 比 DIV #1 小，所以渲染出的效果是 DIV #4 在 DIV #1 后面。

DIV #8 的 z-index 比 DIV #1 的大，并且 DIV #7 没有创建堆叠上下文，所以她渲染出的效果是 DIV #8 在 DIV #1 前面。

参考：

[The stacking context - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)

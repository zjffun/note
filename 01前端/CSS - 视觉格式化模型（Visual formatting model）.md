---
updated: 'Fri, 29 Mar 2019 00:57:41 GMT'
date: 'Fri, 29 Mar 2019 00:57:41 GMT'
---

# 几个概念

-   块：block，一个抽象的概念，块与块之间在垂直方向上按照顺序依次堆叠。

-   行内：inline，一个抽象的概念，行内与行内之间在水平方向上按照顺序依次堆叠（会有换行）。

-   元素：element，指 HTML 元素。

-   盒子：box，一个抽象的概念，由 CSS 引擎根据文档中的内容所创建，主要用于文档元素的定位、布局和格式化等用途。盒子与元素并不是一一对应的，有时多个元素会合并生成一个盒子，有时一个元素会生成多个盒子（如匿名盒子）。

# 块级元素、块级盒子、块容器盒子、块盒字

一个块级元素至少生成一个块级盒子，每个块级盒子都会参与块格式化上下文的创建。

如果一个块级盒子同时是块容器盒子（子元素按块格式化上下文渲染），那么这个盒子是块盒字。

块级盒子描述了元素与其父元素和兄弟元素之间的行为，而块容器盒子描述了元素跟其后代之间的行为。

有些块级盒子并不是块容器盒子，比如表格；而有些块容器盒子也不是块级盒子，比如行内块和表格单元格。

# 行内级元素、行内级盒子、行内盒子

行内级元素会生成行内级盒子，该盒子同时会参与行内格式化上下文的创建。

如果一个行内级盒子的内容参与创建其容器的行内格式化上下文，那么这个盒子是行内盒字。

如：`display`值为`inline` 的容器是行内盒子（可以拆分为多个盒子，eg：可以在中间换行）， `display` 值为 `inline-block`的容器是行内级盒子（无法像行内盒子拆分为多个盒子，eg：无法在中间换行）。

# 匿名块盒子和匿名行内盒子

CSS 选择器不能作用于匿名盒子 (*anonymous boxes*)，所以它不能被样式表赋予样式。也就是说，此时所有可继承的 CSS 属性值都为 `inherit` ，而所有不可继承的 CSS 属性值都为 `initial`。

例如：

```html
<div style="background-color: lightpink">
    内容本身是匿名行内盒子，外面包裹匿名块盒字
    <p style="background-color: lightyellow"> 本身是块级盒子，内容是匿名行内盒子 </p>
    <p style="background-color: lightgreen"> 本身是块级盒子，内容是匿名行内盒子 </p>
    内容本身是匿名行内盒子，外面包裹匿名块盒字
</div>

<br />

<span style="background-color: lightpink">
    内容本身是行内盒子，外面包裹着匿名块盒字
    <p style="background-color: lightyellow"> 本身是块级盒子，内容是匿名行内盒子 </p>
    内容本身是行内盒子，外面包裹着匿名块盒字
</span>
<span style="background-color: lightblue">
    下一个行内盒子
</span>
```

# 普通流、浮动、绝对定位

## 普通流

> 在普通流中，盒子会依次放置。在块格式化上下文中，盒子在垂直方向依次排列；而在行内格式化上下文中，盒子则水平排列。当 CSS 的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 属性为 `static` 或 `relative`，并且 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 为 `none` 时，其布局方式为普通流。

## 浮动

> 在浮动定位中，浮动盒子会浮动到当前行的开始或尾部位置。这会导致普通流中的文本及其他内容会 “流” 到浮动盒子的边缘处，除非元素通过 [`clear`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear) 清除了前面的浮动。

## 绝对定位

> 在绝对定位中，盒子会完全从当前流中移除，并不再影响当前流中的其他盒子，其位置会使用 [`top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/top)、[`bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/bottom)、[`left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/left) 和 [`right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/right) 相对其[包含块](https://developer.mozilla.org/zh-CN/docs/Web/CSS/All_About_The_Containing_Block)进行计算。

# 参考

-   [Visual formatting model - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Visual_formatting_model)
-   [视觉格式化模型 - Web 开发者指南 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model)

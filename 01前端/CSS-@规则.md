# @规则

[`@charset`](https://developer.mozilla.org/en-US/docs/Web/CSS/@charset) — Defines the character set used by the style sheet.

[`@import`](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) — Tells the CSS engine to include an external style sheet.

[`@namespace`](https://developer.mozilla.org/en-US/docs/Web/CSS/@namespace) — Tells the CSS engine that all its content must be considered prefixed with an XML namespace.

## 嵌套 @规则

`@media`— 满足媒体查询条件则里面的 CSS 生效。例如：Bootstrap 使用下面的范围作为条件

```css
/* https://getbootstrap.com/docs/4.2/layout/overview/#responsive-breakpoints */

// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
@media (min-width: 992px) { ... }

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }
```

`@font-face`— 可以给文本指定的自定义字体。例如：antd 用她指定中文的单双引号的字体

```css
/* 
https://github.com/ant-design/ant-design/blob/3.12.1/components/style/core/base.less 
指定中文的单双引号的字体
*/

@font-face {
  font-family: "Chinese Quote";
  src: local("PingFang SC"), local("SimSun");
  unicode-range: U+2018, U+2019, U+201c, U+201d;
}
```

等。。

# 参考

[@规则 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule)

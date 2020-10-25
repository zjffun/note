---
updated: 'Sat, 13 Jun 2020 04:26:09 GMT'
date: 'Sat, 13 Jun 2020 04:26:09 GMT'
---

# `initial`

设置属性值为[默认值](https://developer.mozilla.org/en-US/docs/Web/CSS/initial_value)。

# `inherite`

设置属性值为父元素的[计算值](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value)。

# `unset`

相当于继承属性设置为`inherit`，非继承属性设置为`initial`

```css
.some-class {
  color: unset; /* will be equal to 'inherit' value */
  display: unset; /* will be equal to 'initial' value*/
}
```

```css
/* Good */
.common-content * {
  all: unset;
}
```

> [Understanding the “Initial”, “Inherit” and “Unset” CSS Keywords](https://medium.com/@elad/understanding-the-initial-inherit-and-unset-css-keywords-2d70b7121695)

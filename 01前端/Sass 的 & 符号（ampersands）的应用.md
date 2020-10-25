---
updated: 'Tue, 11 Feb 2020 12:03:08 GMT'
date: 'Tue, 11 Feb 2020 12:03:08 GMT'
---

# 重复声明

有时您需要击败第三方 CSS 库的声明来获取样式的所有权：

```css
.parent.parent {}
```

这种方式比使用和 ID，内联样式或`！important`的压倒性弱，并且它可能比使用任意父元素限定选择器有好处。 声明的权重不是基于选择器的上下文引发的，而是仅由其自身引发。 使用`＆`你可以做同样的事情。

```scss
.parent {
  &#{&} { }
}
```

这里需要用 [插值括号](http://webdesign.tutsplus.com/tutorials/all-you-ever-need-to-know-about-sass-interpolation--cms-21375)`#{}`，因为两个相邻的＆符号在 Sass 中是无效的。

注：`#{&}`会表示整个路径，上面的方法无法用在嵌套的结构里

```scss
.parent1 {
  .parent2 { 
    &#{&} {
      font-size: 12px;
    }
  }
}

// 结果
.parent1 .parent2.parent1 .parent2 {
	font-size: 12px;
}
```

# 参见

[The Sass Ampersand | CSS-Tricks](https://css-tricks.com/the-sass-ampersand/)

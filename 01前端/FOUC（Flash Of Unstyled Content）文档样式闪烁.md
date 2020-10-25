---
updated: 'Mon, 17 Jun 2019 13:07:02 GMT'
date: 'Mon, 17 Jun 2019 13:07:02 GMT'
---

今天看面试题看到了这个新名词。。我以前是没有发现过这种状况，应该是我一直都是将加载 CSS 的 link 标签写到 head 里的缘故吧。

# 什么是文档样式闪烁（Flash Of Unstyled Content）？

我的理解是先渲染了 DOM 然后加载 CSS，因为 CSS 样式的使用遵循层叠的原理，因此 DOM 元素就会多次赋予不同的样式，非常鬼畜。

产生的途径可能因为 1. 加载 CSS 的位置不对，2. 使用了`@import`

# 解决

1.  将加载 CSS 的 link 标签写到 head 里
2.  使用 scss 将 CSS 合并

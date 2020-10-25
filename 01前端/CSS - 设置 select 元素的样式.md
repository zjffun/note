---
updated: 'Sat, 03 Aug 2019 07:02:30 GMT'
date: 'Sat, 03 Aug 2019 07:02:30 GMT'
---

注意：option 外面有个框，这个框不同浏览器生成的还不一样，给这个框设置样式的方法也没有找到（有说法是这是浏览器创建的 shadow dom 没法设置）。所以要想完全控制还是用列表进行模拟比较好。

设置 select 元素样式主要是要将那个默认的图标给改掉，方法一般来首有三种：

1.  `appearance: none`隐藏默认图标。
2.  `overflow: hidden`截去默认图标。
3.  `::after`覆盖默认图标，为了不让 `::after`伪元素作为事件的目标要设置`pointer-events: none`。

参见：[html - How to style a select dropdown with only CSS? - Stack Overflow](https://stackoverflow.com/questions/1895476/how-to-style-a-select-dropdown-with-only-css)

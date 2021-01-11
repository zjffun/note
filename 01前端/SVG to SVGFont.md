---
date: 'Mon, 11 Jan 2021 13:22:34 GMT'
updated: 'Mon, 11 Jan 2021 13:23:26 GMT'
---

基本都是 SVG 先转 TTF 然后由 TTF 转成其他各种格式。

[svg2ttf](https://www.npmjs.com/package/svg2ttf) 不能转换复杂的 SVG。其中部分问题可以通过[svgo](https://github.com/svg/svgo)解决（如：嵌套的 `transfrom` 属性），但`fill-rule`，`outline`属性还不支持（感觉很难支持相当去实现 SVG 的渲染了）。

虽然 TTF 也能存栅格表示的字体，应该可以将 SVG 渲染存进去，但栅格表示图标字体效果不好。

现在也有先渲染 SVG（[sharp](https://www.npmjs.com/package/sharp)），然后再把渲染出来的栅格图转 SVG（[potrace](https://www.npmjs.com/package/potrace)）的方式，但误差大整个图标都变了 T_T。

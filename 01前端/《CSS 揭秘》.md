---
updated: 'Wed, 02 Sep 2020 12:37:20 GMT'
date: 'Wed, 02 Sep 2020 12:37:20 GMT'
---

# 前言

-   DRY: Don’t Repeat Yourself
-   WET，We Enjoy Typing / Write Everything Twice

## 样式回退

1.  层叠机制。
2.  使用 [Modernizr](http://modernizr.com/) 这样的工具来给根元素（`<html>`）添加一些辅助类。这样你就可以针对支持或不支持某些特性的浏览器来分别编写样式了。
3.  `@supports` 规则。（慎用）

# 引言

-   标准就像香肠：最好别去看它们是怎么做出来的。
-   每项规范从最初启动到最终成熟，都会经过以下阶段：编辑草案（ED） -> 首个公开工作草案（FPWD） -> 工作草案（WD） -> 候选推荐规范（CR） -> 提名推荐规范（PR） -> 正式推荐规范（REC）。
-   浏览器前缀是一场史诗般的失败。

## 减少代码重复

尽最大努力实现弹性可伸缩的布局，并在媒体查询的各个断点区间内指定相应的尺寸。

1.  使用相对单位。
2.  `currentColor` 关键字。（当前颜色值）
3.  `inherit` 关键字。（继承父元素属性值）
4.  需要在较大分辨率下得到固定宽度时，使用 `max-width` 而不是 `width`
5.  为替换元素（比如 img、object、video、iframe 等）设置一个 `max-width`，值为 `100%`

# 背景与边框

## 半透明边框

注意：背景色默认是 `border-box`，会影响边框的显示，可以改成 `padding-box`

## 多重边框

-   `box-shadow` 有第四个参数扩张半径。通过设置正的扩张半径，两个为零的偏移量以及为零的模糊值，可以模拟出边框。
-   `outline` 轮廓也可以模拟边框。注意：轮廓和边框是有区别的。

## 背景定位

-   `background-position` 已经允许我们指定背景图片距离任意角的偏移量，只要我们在偏移量前面指定关键字。eg: `background-position: right 20px bottom 10px;`

## 条纹背景

-   使用 `linear-gradient` 和 `repeating-linear-gradient`属性。
-   使用背景叠加可以更 DRY，也更好平稳退化。

## 复杂背景

-   汇总: lea.verou.me/css3patterns
-   网格：`linear-gradient`
-   波点：`radial-gradient`
-   棋盘：`linear-gradient` 或 `conic-gradient`
-   对于现代浏览器来说，我们可以把 SVG 文件以 data URI 的方式内嵌到样式表中，甚至不需要用 base64 或 URLencode 来对其编码。
-   背景和混合模式 `blend-mode` 搭配使用，创造有意思的效果。

## 伪随机背景

-   通过质数来增加随机真实性。

## 连续的图像边框

-   使用 `border-image-slice` 会拉伸切出来的边框，所以要通过将 `background-origin` 为 `padding-box` 和 `border-box` 的两个背景叠加实现。

# 形状

## 自适应的椭圆

-   `border-radius` 可以分别指定四个角的水平和垂直半径生成圆、椭圆、1/2 椭圆、1/4 椭圆。
-   有意思的按钮: <http://simurai.com/archive/buttons>

## 平行四边形

-   通过设置 `transform` 属性的 `skew()` 来实现。

## 菱形图片

-   通过设置 `transform` 属性的 `rotate()` 和 `scale()` 来实现。
-   通过 `clip-path` 属性实现。

## 切角效果

-   扁平化设计的风头完全盖过拟物化之后，这种效果就愈发流行了。
-   `background: linear-gradient` 直角切角。
-   `background: radial-gradient` 弧形切角。
-   内联 SVG + border-image。
-   clip-path。

## 梯形

-   3D 旋转 rotateX

## 简单的饼图

TODO

# 视觉效果

## 单侧投影

-   发生阴影色和纯透明色之间的颜色过渡长度近似于模糊半径的两倍
-   扩张半径这个参数会根据你指定的值去扩大或（当指定负值时）缩小投影的尺寸。

## 不规则投影

-   CSS 滤镜

```css
filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
```

## 染色效果

-   滤镜
-   混合模式

## 毛玻璃效果

-   适合用在在图片上放置内容的场景。
-   主要通过 `background-attachment: fixed;` 可以让元素的背景根据视口定位的特性，和模糊滤镜实现。

---
updated: 'Fri, 30 Oct 2020 00:30:13 GMT'
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

-   发生阴影色和纯透明色之间的颜色过渡长度近似于模糊半径的两倍。
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

## 折角效果

-   切角 + 折角背景

# 字体排列

## 连字符断行

-   `hyphens: auto;`
-   可以通过软连字符 `&shy;` 来辅助浏览器进行断词。

## 插入换行

-   空白符合并通常是一件非常好的事情，否则我们就得把整个 HTML 文档的源代码整理进一行里面。
-   使用换行符 `0x000A` 换行。

```css
dd + dt::before {
  content: "\A";
  white-space: pre;
}
```

## 文本行的斑马条纹

-   使用条纹背景实现。

## 调整 tab 的宽度

-   `tab-size` 设置 tab 的宽度（默认是 8 个字符）

## 连字

-   `font-variant-ligatures` 设置连字的开启和关闭。

## 华丽的 & 符号

```css
@font-face {
  font-family: Ampersand;
  src: local("Baskerville"), local("Goudy Old Style"), local("Palatino"), local("Book Antiqua");
  unicode-range: U+26;
}
```

## 自定义下划线

-   使用 `linear-gradient` 背景。

## 现实中的文字效果

-   出现在底部的浅色投影（或者出现在顶部的暗色投影）会让人产生物体是凹进平面内的错觉，出现在底部的暗色投影（或者出现在顶部的浅色投影）会让人产生物体从平面上凸起的错觉，因为我们在现实世界中早已习惯了光源总是悬在头顶。
-   空心字：SVG 或者 `text-shadow`
-   外发光：使用几层重叠的 `text-shadow`
-   凸起：添加一系列逐渐加深的 `text-shadow`
-   复古标志牌：添加一系列 `text-shadow`

## 环形文字

-   使用 SVG 的 `<textPath>` 元素

# 用户体验

## 选用合适的鼠标光标

-   CSS `cursor`

## 扩大可点击区域

-   Fitts 法则：人类移动到某个目标区域所需的最短时间是由目标距离与目标宽度之比所构成的对数函数。
-   自释性：以视觉的方式来提示我们如何与之进行交互。
-   使用 CSS `border` 或伪元素扩大热区。

## 自定义复选框

-   `:checked` 伪类获取选择框的选中状态，然后组合选择符来给其他元素设置样式。
-   在绝大多数场景下，开关式按钮对可用性有负面作用，因为它们很容易与普通按钮混淆。

## 通过阴影来弱化背景

-   使用 CSS `box-shadow` 属性：页面能一屏显示全、遮罩层不需要交互时才能用。
-   使用 `::backdrop` 伪元素：浏览器支持有限。

## 通过模糊来弱化背景

-   景深效果：当我们的视线聚焦在距离较近的物体上时，远处的背景就是虚化的。
-   使用 CSS 滤镜进行模糊，CSS 变形进行缩小实现。

## 滚动提示

-   一种优雅的设计：屏幕顶 / 底端显示阴影表示可以向上 / 下滚动。
-   通过一层 local 定位的背景和一层 scroll 定位的背景实现。

## 交互式的图片对比控件

-   一种优雅的设计：把两张图片叠加起来，允许用户拖动分割条来控制这两张图片的显露区域。
-   通过两层图片叠加，隐藏超出部分实现。

# 结构与布局

## 自适应内部元素

-   `min-content` 将解析为这个容器内部最大的不可断行元素的宽度（即最宽的单词、图片或具有固定宽度的盒元素）。
-   `max-content` 它的行为类似于 `display: inline-block`。
-   `fit-content` 行为与浮动元素是相同的。

## 精确控制表格列宽

-   `table-layout` 设置为 `fixed`（固定表格布局算法）。

## 根据兄弟元素的数量来设置样式

```css
li:first-child:nth-last-child(n + 2):nth-last-child(-n + 6),
li:first-child:nth-last-child(n + 2):nth-last-child(-n + 6) ~ li {
  /* 当列表包含2～6项时，命中所有列表项 */
}
```

## 满幅的背景，定宽的内容

-   在过去的几年间，有一种网页设计手法逐渐流行起来，我将它称作背景宽度满幅，内容宽度固定。
-   通过 `margin: auto` 实现，。
-   通过 `calc()` 实现。

## 垂直居中

44 年前我们就把人类送上月球了，但现在我们仍然无法在 CSS 中实现垂直居中。

-   Flexbox
-   绝对定位
-   表格布局法
-   行内块法

## 紧贴底部的页脚

```css
body {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
```

# 过渡与动画

## 缓动效果

-   缓动曲线：动画过程在整段时间中是如何推进。
-   自定义的调速函数的两个控制锚点的 x 值都被限制在 `[0, 1]` 区间内，因为生成的贝塞尔曲线不能 “穿越时间”。（以在垂直方向上突破 0\~1 区间，从而让过渡达到低 于 0 或高于 100% 的程度）
-   CSS 调速函数可视化：cubic-bezier.com
-   可以通过 `transition-delay` 属性把各个属性的过渡过程排成列队。

## 逐帧动画

-   使用`steps(n)`调速函数（这个函数会将整个动画分成 `m*n` 个阶段，m 是关键帧个数、n 是步数）

## 闪烁效果

-   使用闪烁，可以有效地把用户的注意力引导到某个特定区域。只要我们把闪烁的次数限制在一定范围之内，就可以完全避免`<blink>` 标签的那种负面作用。
-   `animation-direction`控制每个循环周期的动画方向（反转调速函数）。

## 打字动画

-   打字动画的持续时间越长，越容易让用户感到厌烦。
-   使用逐帧动画控制容器宽度实现。

## 状态平滑的动画

-   使用 `animation-play-state: paused;` 在鼠标未悬浮时暂停动画，避免生硬的跳回。

## 沿环形路径平移的动画

-   `transform-origin` 只是一个语法糖而已。实际上你总是可以用 `translate()` 来代替它。
-   变形函数并不是只对这个元素进行变形，而且会把整个元素的坐标系统进行变形。

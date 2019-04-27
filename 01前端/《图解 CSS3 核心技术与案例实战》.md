# 第一章 解开 CSS3 的面纱

## 使用 CSS3 的好处

1.  减少开发和维护成本：如传统实现圆角边框需要绘图、切图才能完成，而使用 css 可以直接完成
2.  提高页面性能

## 渐进增强（Progressive  Enhancement）

首先保证核心功能实现，让任何地段的浏览器可以看到站点的内容，然后考虑用高级但非必要的 CSS 和 JS 技术为现代浏览器提供更好的用户体验。

# 第二章 CSS3 选择器

1.  基本选择器：所有浏览器都可用

    包括通配、元素、ID、类、群组（,）

2.  层次选择器：基本所有浏览器都可用（部分 IE7+），

    包括后代、子（>）、相邻（+）、通用（~）

3.  伪类选择器：大部分 IE8+9+ 可用 

    1.  动态伪类选择器：锚点的 LoVe/HAte(`:link`-`:visited`-`:hover`-`:active`)，和表单元素的`:focus`
    2.  目标伪类选择器`:target`：匹配 id 为 hash 的元素 
    3.  语言伪类选择器`:lang(language)`：匹配 lang 属性的值为 language 的元素
    4.  UI 元素状态伪类选择器：单选复选按钮的 checked，和表单元素的 enabled、disabled
    5.  结构伪类选择器：根据 DOM 结构匹配元素，对已经匹配的到的元素加上 DOM 关系的限制，例如：父元素中的第几个`:nth-child(n)`、没有子元素`:empty`
    6.  否定伪类选择器

4.  伪元素：IE6~8 仅支持单冒号

    包括首字母`::first-letter`、首行`::first-line`、开始标签之后`::before`、结束标签之前`::after`、选中`::selection`

    伪元素为 DOM 树没有定义的虚拟元素。不同于其他选择器，它不以元素为最小选择单元，它选择的是元素指定内容。使用伪元素可以 为 DOM 的部分内容（并非整个 DOM）添加样式

5.  属性选择器：基本所有浏览器都可用（IE7+）

    包括拥有这个属性`[attr]`、属性值为 val 或 val-`[attr|=val]`、属性值包括 val`[attr~=val]`、属性值为 val`[attr=val]`、属性值字符串开始为 val`[attr^=val]`、属性值字符串结束 val`[attr$=val]`、属性值字符串包含 val`[attr*=val]`

# 第三章 CSS3 边框

层级：边框 > 内阴影 > 背景图 > 背景色 > 外阴影

## 边框基本属性

```text
border: border-width border-style border-color
```

## CSS3 边框颜色属性（已经废弃）

## CSS3 图片边框属性

    border-image: 
    <'border-image-source'> || 
    <'border-image-slice'> 
    [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>

例如

```css
border-image:
      url("https://mdn.mozillademos.org/files/4127/border.png")  /* source */
      27 /                    /* slice TRBL四个方向切的大小 */
      36px 28px 18px 8px /    /* width TRBL四个方向边框大小 */
      18px 14px 9px 4px       /* outset TRBL四个方向图像边框的距离边框边缘（border-box）的距离 */
      round;                  /* repeat 水平和垂直方向的填充方式 */
```

## CSS3 圆角边框属性

    border-radius: <length-percentage>{1,4} [ / <length-percentage>{1,4} ]?

四角顺序：TL TR BR BL

例如

```css
border-radius: 10px 100px 60px /    /* 水平四角半径 10px 100px 60px 100px*/
	120px;                          /* 垂直四角半径 120px*/
```

平稳退化：对于不支持 CSS3 的浏览器采用另一套样式：使用 CSS2 中的图片模拟圆角（滑动门技术，原理是元素堆叠和背景图对其方向）

## CSS3 盒子阴影属性

```text
box-shadow: none | <shadow>#
<shadow> = inset? && <length>{2,4} && <color>?
```

对于`<length>`

-   如果只给出两个值, 这两个值将被浏览器解释为 x 轴上的偏移量 `<offset-x>` 和 y 轴上的偏移量 `<offset-y>`。
-   如果给出了第三个值, 这第三个值将被解释为模糊半径的大小 `<blur-radius>`。
-   如果给出了第四个值, 这第四个值将被解释为扩展半径的大小 `<spread-radius>`。

例如

    box-shadow: 3px 3px red,   /* 第一个阴影 x，y 偏移 3px 的阴影 */
    	-1em 0 .4em olive;     /* 第二个阴影 x 偏移 -1em，y 偏移 0，模糊半径 0.4em 的阴影*/

box-shadow 和 border 不同，box-shadow 不是盒模型的中的属性，不会计算到宽度。

border-radius 会对阴影产生影响。

# 第四章 CSS3 背景

[background - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/background)

## 基本属性

```text
background: background-color background-image background-repeat background-attachment background-position
```

-   颜色：决定背景的颜色，会被背景图覆盖
-   图片：背景图片在背景颜色上方
-   铺放：决定背景图像的重复方式。
-   固定：决定背景图像的位置是在[视口](https://developer.mozilla.org/zh-CN/docs/Glossary/视口)内固定，还是随着包含它的区块滚动。
-   位置：和参考原点一起决定背景图片的位置

## CSS3 背景属性

-   参考原点：边框边缘 border-box | 內距边缘 padding-box | 容器边缘 content-box
-   裁切：边框边缘 border-box | 內距边缘 padding-box | 容器边缘 content-box
-   尺寸：决定背景的尺寸，`cover` （缩放背景直到铺满容器，裁剪超出部分）和 `contain`（缩放背景直到铺满容器，可能会留有空白）都不会使背景变形

## CSS3 多背景

多个设置之间用逗号隔开，便于管理和维护。旧的方式是分别给元素设置背景进行拼凑。

# 第五章 CSS3 文本

CSS 文本功能主要分为三大类：字体（font），颜色（color）和文本（text）。

## 字体

`font` 属性可以用来作为 [`font-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-style), [`font-variant`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-variant), [`font-weight`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-weight), [`font-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-size), [`line-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height) 和 [`font-family`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family) 属性的简写，或将元素的字体设置为系统字体。

语法：

```text
[ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ] | caption | icon | menu | message-box | small-caption | status-bar

where 
<font-variant-css21> = [ normal | small-caps ]
```

-   [`font-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-style)：控制斜体
-   [`font-variant`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-variant)：控制大小写等（在 CSS 2.1 中 `font-variant` 只可以是 `normal` 和 `small-caps`）
-   [`font-weight`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-weight)：控制字体宽度
-   [`font-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-size)：控制字体大小
-   [`line-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height) ：控制行高
-   [`font-family`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family) ：设置使用的字体，多个由逗号分隔
-   系统字体：设置字体为系统的标题、对话框、菜单等字体

## 文本

CSS 文本定义了如何执行文本操作，如换行，调整间距和对齐，空白符处理和文本转换。

-   `overflow-wrap`（别名是`word-wrap` ）：控制超出包裹盒的文字换行
-   `word-break`：控制换行符是否出现在超出包裹盒的地方
-   `white-space`：控制空白符的显示

注意：对于长的英文单词的处理最好用`overflow-wrap: break-word`，而不是`word-break: break-all`，因为后者会将普通英文语句中的单词也断开影响阅读。

## 文本装饰

CSS 文本装饰用于定义与文本修饰相关的功能，例如下划线，文本阴影和强调标记。

## 其他

-   `color`：控制文本颜色
-   `text-overflow`：控制超出包裹盒文本的处理（剪切、显示省略符号或显示自定义字符串）

# 第六章 CSS3 颜色特性

> 网页给人留下的第一印象不是设计和内容而是颜色。

## Web 页面的安全色

用 16 进制的 00、33、66、99、CC、FF 表达三原色（RGB）中的每一种。Web 设计师不需要一味局限于安全色，而是应搭配好安全色和非安全色的使用，这样才不会让用户看到的效果和设计制作的效果相差太远。

## 色彩模式

-   RBG 色彩模式：红绿蓝三色混合
-   CMYK 色彩模式：颜料的青（Cyan）、洋红（Magenta）、黄（Yellow）、黑（Black）混合，用于出版印刷
-   索引色彩模式：已经被限制在 256 种颜色的模式，主要用于 Web 页面安全色和透明 GIF 图片
-   灰度模式：制作黑白图片时使用
-   双色调模式：在黑白图像中加入颜色、使色调更加丰富，主要的用途是使用尽量少的颜色表现尽量多的颜色层次以减少印刷成本
-   位图模式：只用黑白两种颜色

## CSS3 透明属性

使用`opacity`属性。注意

-   alpha 通道是用来对文本、边框、背景色等设置透明度，而 opacity 是对整个元素设置透明度。
-   opacity 小于 1 会创建新的堆叠上下文，同时其内部元素都会在在这个透明度的基础上渲染。

## CSS3 颜色模式

-   RGBA：在 RBG 基础上增加了透明度 alpha 通道
-   HSL：基于人对颜色的心理感受的一种颜色模式，使用色泽（Hue）、饱和度（Saturation）和亮度（Brightness）表示颜色。
-   HSLA：再 HSL 基础上

使用 HSL 的优势：可以将颜色设置为一个值，当需要调整颜色亮度和浓度时直接调整 L 和 S 即可，而使用 RGB 进行这种调整很困难。

# 第七章 CSS3 盒模型

-   盒类型：`block`、`inline`、`inline-block`、`flex`等
-   盒属性：宽高、内边距、边框、外边距

## W3C 标准盒模型和`box-sizing`

W3C 标准盒模型是这样的：

-   元素空间尺寸：内容 + 内边距 + 边框 + 外边距
-   元素大小：内容（height 和 width 属性指定的大小）+ 內边距 + 边框

这种方式不将內距和边框算入元素的大小很不方便，而 IE 很早的版本（IE6 以下）有一种好的方案是将内边距和边框纳入元素的大小中，这样当修改内边距和边框大小时元素的代销就不会发生变化了。

那么现代浏览器有办法使用这种计算方法么？

当然可以，那就是将`box-sizing`属性设置为`border-box`。（默认是`content-box`使用 W3c 标准的计算方法）

如果大家” 见 NB 之物必细察其纹理 “就能发现很多前端 UI 库直接就全局都用`border-box`了

```css
* {
    box-sizing: border-box;
}
```

## CSS3 内容溢出属性

使用`overflow:`属性控制 x 轴和 y 轴的内容溢出

## CSS3 自由缩放属性

使用`resize: none | both | horizontal | vertical | block | inline`控制元素是否可在 x 轴和 y 轴自由缩放。

注意 `resize` 无法设置在：

-   Inline 元素
-   [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) 为 `visible`的 Block 元素

## CSS3 轮廓属性

轮廓（outline）的呈现效果和边框（border）很像不过，轮廓和边框完全不同：

1.  轮廓不属于盒模型（不会计算入元素空间尺寸占用网页布局空间）
2.  轮廓无法单独设置各个方向
3.  对于行内元素的行为不同，例如：[border & outline](https://codepen.io/1010543618/pen/qwKdzW)

# 第八章 CSS3 伸缩布局盒模型

Flexbox 的语法有旧版本、混合版本、新版本三种版本。2012 年 9 月推出了新版本。

```text
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
```

PS: 现在的标准是`flex-shrink`负值无效，书中的 “`flex-shrink`的负值同样生效” 不符合现在的标准。

# 第九章 CSS3 多列布局

用来实现类似报纸杂志这样的多列布局。

    column: <'column-width'> || <'column-count'>

-   `column-rule`：设置列分隔符的属性，用法类似`border`
-   `break-after`、`break-before`和`break-inside`：设置如何在盒子之前、之后、中间设置 page、column 或 region 断开。

PS: 当设置的列宽足够大，以至于无法分列显示时，就算设置了列数也按一列显示，并且自动调整列宽等于元素宽度。

# 第十章 CSS3 渐变

## 色标

在创建渐变的过程中可以指定多个中间颜色值，这个值称为色标。

## 兼容方案

对于旧的 IE 可以使用 IE 的滤镜兼容。

## 线性渐变

[`linear-gradient`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient)

## 径向渐变

[`radial-gradient`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/radial-gradient) 

## 重复渐变

[`repeating-linear-gradient`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeating-linear-gradient) 和 [`repeating-radial-gradient`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeating-radial-gradient) 

## 圆锥渐变

 [`conic-gradient`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/conic-gradient) ：在只有 Chrome 支持，扇形的渐变。

# 第十一章 CSS3 变形

## [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

`transfrom`属性指一组转换函数。如果这个属性的值不为`none`，则会创建一个层叠上下文。

```text
transfrom: none | <transform-list>
```

## [`transform-origin`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)

指定元素的变形的中心点位置，默认为 x 轴和 y 轴的 50% 处。

## [`transform-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style)

设置元素的子元素是位于 3D 空间中还是平面中。

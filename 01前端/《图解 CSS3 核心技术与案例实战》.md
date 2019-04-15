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
      18px 14px 9px 4px       /* outset TRBL四个方向图像边框的距离默认边框的距离 */
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

-   多背景：IE8 + 支持 

    多个背景用逗号隔开

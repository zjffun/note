-   伪类：`link` - `visited` - `focus` - `hover` - `active`

-   继承的声明没有特殊性（比 `0,0,0,0` 都小）

```html
<style>
        * {/*0,0,0,0*/
            color: violet;
        }

        .box {/*0,0,1,0*/
            color: aqua;
        }
    </style>
</head>

<div class="box">
    <span>
        test (color: violet)
    </span>
</div>
```

-   继承向下传播，有一个例外：body 背景会传递给 html

```html
<!DOCTYPE html>
<html lang="en">
  <!-- background: tomato -->

  <head>
    <style>
      body {
        height: 200px;
        margin: 50px;
        background: tomato;
      }
    </style>
  </head>

  <body></body>
</html>
```

-   用户代理（浏览器）样式声明、插件样式声明和网站作者样式声明的优先级：

1.  Declarations in user agent style sheets (e.g. the browser's default styles, used when no other styling is set).
2.  Normal declarations in user style sheets (custom styles set by a user).
3.  Normal declarations in author style sheets (these are the styles set by us, the web developers).
4.  Important declarations in author style sheets
5.  Important declarations in user style sheets

[css - What is "User stylesheet" in Google Chrome's developer tools? - Stack Overflow](https://stackoverflow.com/questions/24465939/what-is-user-stylesheet-in-google-chromes-developer-tools)

# 值和单位

-   Web 安全颜色：在 256 色计算机上总能避免抖动的颜色，包括：0、3、6、9、C、F 组成的三元组。
-   `ex` 小写 x 的高度。
-   `1in = 2.54cm = 96px = 72pt`，经测试不同 DPR（设备像素比）他们的展示都是一样的。

# 字体

-   CSS 通用字体：包括 serif, sans-serif 等，会由用户代理选择对应类型的字体。
-   `font-weight` 的 bolder, lighter 可以相对改变粗细。
-   `font-size` 的 larger, smaller 和百分比可以相对改变大小。
-   **通常** `font-style` 设置 `italic` 和 `oblique` 在 Web 浏览器看上去一样。
-   `font-variant` 设置 `small-caps` 可以实现小型大写字母（<span style="font-variant: small-caps">Font Variant</span> 这种效果）。
-   使用系统字体：将 `font` 设置为 `caption`、`icon` 和 `menu` 等。在创建和原生应用类似的 Web 应用时可以用到。

# 文本

-   `line-height` 定义文本基线间的最小距离，文本基线拉开的距离可能比 `line-height` 的值大。`line-height` 通常为 1.2。
-   `vertical-align` 只应用于行内元素和替换元素。替换元素的基线在其底端。使用`middle`会将行内元素框的中间点和父元素基线上方 `0.5ex` 处的一个点对其。
-   `white-space` 控制空白符和换行符的展示，其中 `nowrap` 和 `pre` 都会禁止自动换行。
-   `direction` 和 `unicode-bidi` 控制文本书写方向。

# 视觉格式化

-   CSS 假定每个元素都会生成一个或多个矩形框。这些矩形框相对于包含块（布局上下文）摆放。
-   根元素： `html` 元素。
-   元素的宽度和左右 margin 三个值都不为 auto 时（overconstraint），会将右 margin 设置为 auto（ltr 书写方向时）。元素的 7 个水平 / 垂直属性总和不能大于包含块。
-   margin 可以为负数。
-   border 不可以是百分数。
-   元素上下 margin 为 auto 时会计算为 0。
-   没有显式设置包含块的高度，元素百分比高度会重置为 auto。
-   `list-style-position` 设置 list 标志在内或在外。
-   行内元素术语：em 框、内容区、行内框、行框（包裹一行最高和最低行内框的框）等。
-   基线在 em 框中的位置对于不同的字体是不同的，这个信息内置在字体文件中。
-   替换元素、内外边距和边框不会影响行高。
-   替换元素可以增加行框高度。

# 内边距、边框和外边距

-   行内元素不可以设置宽高。
-   margin, padding 使用百分数是相对于父元素的宽度。
-   垂直相邻 margin 会合并。
-   `border-style` 的 inset, outset 可以模拟按钮（不用设置颜色）。

# 颜色和背景

-   `color` 前景色，影响边框，表单元素的颜色。
-   `background-color` 背景色。
-   `background-position` 的百分比表示图像的百分比位置与元素的百分比位置对其，支持负百分比。（比如：-20% 表示图像上 - 20% 的位置与元素的 - 20% 的位置对其）
-   在元素有滚动时使用 `background-attachment` 可以将背景固定。

# 浮动和定位

-   浮动元素会生成一个块级框。
-   浮动非替换元素要设置宽度，否则元素宽度会趋于 0。
-   浮动元素的包含块是其最近的祖先元素。
-   浮动元素会防止重叠。
-   浮动元素的顶端不能比包含该元素所生成框的任何行框顶端更高。
-   `clear` 清除左右的浮动。
-   `position` 为 `relative` 或 `static` 包含块由最近的块级框、表单元格或行内块祖先框的内容边界构成。
-   定位中的包含块应该叫 “定位上下文”，不过规范中叫包含块。
-   `visibility` 会影响文档布局。
-   绝对定位的位置设置为`auto`会设置其位置和静态位置一致。
-   定位也存在过度受限。
-   定位可以将 `margin` 设置为`auto` 居中。

# 表布局

-   CSS 可以将遗漏的组件作为匿名对象插入。
-   表层：表 - 列组 - 列 - 行组 - 行 - 单元格。
-   单元格内容垂直对齐可以用`vertical-align`。

```html
<!DOCTYPE html>
<style>
    .wrapper {
        display: table-cell;
        height: 300px;
        width: 300px;
        vertical-align: middle;
        background: aquamarine;
    }

    .box {
        width: 50px;
        height: 50px;
        background: aqua;
    }
</style>

<body>
    <table>
        <div class="wrapper">
            <div class="box"></div>
        </div>
    </table>
</body>
```

-   `border-collapse` 边框合并，`border-spacing` 设置边框分隔距离，`empty-cells` 处理空单元格。
-   `table-layout` 初始 auto，使用 fixed 会更快地计算出表的布局（因为布局不依赖于表单元格内容，而是根据表和单元格的 width 属性决定，所有列宽都是由表的第一行定义）。

# 列表与生成内容

-   `list-style-type`, `list-style-image` 设置列表标志样式。
-   `list-style-position` 设置列表标志在内容内或外。
-   设置列表项的缩进时最好同时设置内外边距（用来覆盖默认缩进），以保证兼容性。
-   `::before` 和 `::after` 的 `display` 属性的接受值和主体元素的类型有关。（主体元素是行内元素这两个伪元素不能设置为块级元素）
-   `content` 属性的值可以是字符串、URL 和属性值。
-   `quotes` 属性用来生成引号。
-   使用计数器包括：`counter-reset: counter 0` 属性创建起点，`counter-increment: counter 1` 计数器递增，使用 `coutent: counter(counter)`展示。
-   每层嵌套会为计数器创建一个新的作用域，可以用 `coutent: counters(counter, ".")` 展示出来。

# 用户界面样式

-   `cursor` 设置为 `crosshair` 会将光标变成十字符号，通常用于屏幕捕捉，让用户知道现在光标在哪个像素。
-   通过 `url()` 可以设置图形光标。
-   轮廓 `outline` 不参与文档流。
-   行内非替换元素轮廓可能不是矩形。

```html
<!DOCTYPE html>
<style>
    .wrapper {
        width: 70px;
    }

    .wrapper span {
        outline: 3px solid violet;
    }
</style>

<body>
    <div class="wrapper">
        测试<span>行内非替换元素轮廓可能不是矩形</span>。
    </div>
</body>
```

# 非屏幕媒体

-   分页媒体（paged medium）是把文档处理为一系列离散 “页面” 的媒体。
-   屏幕媒体是一种连续型媒体（continuous medium），文档表示为一个可滚动的 “页面”。
-   分页媒体（paged medium）可以用来做 PPT。

# 声音

CSS 可以操作屏幕阅读器的声音播放。

媒体查询 `aural` 已经废弃建议用 `speech`。

-   [Aural style sheets](https://www.w3.org/TR/CSS22/aural.html)

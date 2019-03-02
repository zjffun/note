# 第 1 章　网页的构造块

## 文件名和文件夹名

文件名全部使用小写字母，用短横线分隔单词，用 .html 作为扩展名。混合使用大小写字
母会增加访问者输入正确地址以及找到页面的难度 

文件夹的名称也应全部用小写字母。关键是保持一致。如果使用小写字母，访问者和创建者就
不必在大写字母和小写字母之间转换浪费时间了

## 语意

1.  == 提升可访问性和互操作性 ==（内容对于借
    助辅助技术的残障访问者是可访问的，
    同时对于台式机、手机、平板电脑及
    其他设备上的浏览器都是可访问的）。
2.  提升搜索引擎优化（SEO）的效果。
3.  使维护代码和添加样式变得容易。
4.  （通常）使代码更少，页面加载更快。

> 万维网的发明者 Tim BernersLee 曾说过一句著名的话：“万维网的力量在于其普适性。让包括残障人士在内的每个人都能访问万维网，是极为重要的一点。”

## small

small 元素表示的含义是法律声明等条文细则。默认情况下，它比其他的文字显示得小一些，但是 == 显示小字号并不是使用这个元素的理由 ==

（以前一直当 small 是小号字体 =\_=）

# 第 3 章　基本 HTML 结构

## \\<html lang="language-code">

曾经使用 Bootstrap4 的时候没找到中文翻译，准备自己翻译一下翻译了两页有点感觉有点多，就往下翻了翻看看到底有多少工作量，然后看见有 Translations，点进去一看发现大家基本都知道但很容易忘的一项翻译的人给强调出来了：

> HTML5 标准的 doctype 头部定义是首要的，否则会导致样式失真（中国码农往往直接抄国外站点将 lang 写成 en 的小细节也要注意以免贻笑大方)。

注：以前搜过 lang 相关的里面的规则很复杂的（[网页头部的声明应该是用 lang="zh" 还是 lang="zh-cn"？ - 知乎](https://www.zhihu.com/question/20797118)），但一般国内的页面现在一般还都是 zh-CN。

Emmet 设置默认生成的 lang 为 zh-CN：

下面代码添加到 Emmet 的 Settings-User

    {
      "snippets": {
        "variables": {
          "lang": "zh-CN"
        }
      }
    }

## h1 ～ h6

1.  不要使用 h1 ～ h6 标记副标题、标语以及无法成为独立标题的子标题。
2.  创建分级标题时，要避免跳过某些级别，如从 h3 直接跳到 h5。不过，允许从低级别跳到高级别的标题。
3.  要依据内容所处的层次关系选择标题级数，而不是根据你希望文字应该显示的大小。

## main

main 元素是 HTML5 新添加的元素。记住，在一个页面里仅使用一次。

## SEO

在 HTML 中，应该将附注栏 (aside) 内容放在 main 的内容之后。出于 SEO 和可访问性的目的，最好将重要的内容放在前面。可以通过 CSS 改变它们在浏览器中的显示顺序。

## 使用 ARIA 改善可访问性

WAI-ARIA（Web Accessibility Initiative’s Accessible Rich Internet Applications，无障碍
网页倡议 – 无障碍的富互联网应用，也简称 ARIA）是一种技术规范，自称 “有桥梁作用的技术” 。

1.  使用地标角色`role="xxx"`
2.  给元素添加 title`title="xxx"`

# 第 8 章　操作样式表

## @import

@import 指令会影响页面的下载速度和呈现速度，在 Internet Explorer 中影响更为明显。 

## @media

@media 规则只有 screen 和 print（或许还应加上 all）浏览器支持的很好。

# 第 9 章　定义选择器

## 伪元素

-   :first-letter：选择元素的第一个字母
-   :first-line：选择元素的第一行

:first-line 的语法为::first-line。:first-letter 的语法为::firstletter。注意，它们用两个冒号代替了单个冒号。这样修改的目的是将伪元素（有四个，包括::first-line、::first-letter、::before 和::after）与伪类（如: first-child、:link、:hover 等）区分开。

未来，::first-line 和::first-letter 这样的双冒号语法是推荐的方式，现代浏览器也支持它们。原始的单冒号语法则被废弃了，但浏览器出于向后兼容的目的，仍然支持它们。不过，IE9 之前的 InternetExplorer 版本均不支持双冒号。因此，你可以选择继续使用单冒号语法，除非你为 IE8 及以下版本设置了单独的 CSS。

# 第 12 章　构建响应式网站

1.  创建内容和 HTML
2.  移动优先方法
3.  逐步完善布局

## 视觉区域（viewport）

`<meta name="viewport" content="width=device-width, initial-scale=1" />`

1.  视觉区域的宽度会被设成与设备宽度
2.  页面的默认缩放级别设成了 100%（换成纵向模式也一样）

## 兼容旧版 IE

使用 Respond.js

# 第 13 章　使用 Web 字体

## @font-face

# 第 17 章　视频、音频和其他多媒体

HTML5 并没有提供任何保护媒体内容的方法。因此，如果你很在意对媒体文件的保护，那么暂时不要使用 HTML5 原生多媒体。

# 附录

[HTML Reference](https://www.htmlcssvqs.com/8ed/appendixes/html-reference.php)

[CSS Reference](https://www.htmlcssvqs.com/8ed/appendixes/css-reference.php)

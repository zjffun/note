# 结构化标签

| 标签             | 作用                                             |
| -------------- | ---------------------------------------------- |
| \\<header>     | 定义文档的页眉                                        |
| \\<nav>        | 定义导航链接的部分                                      |
| \\<article>    | 定义外部的内容，可以是一篇新的文章                              |
| \\<section>    | 定义文档的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分         |
| \\<aside>      | 定义 article 以外的内容，aside 的内容可用作文章的侧边栏            |
| \\<figure>     | 用于对元素进行组合，使用 figcaption 元素为元素组添加标题             |
| \\<figcaption> | 定义 figure 元素的标题                                |
| \\<hgroup>     | 用于对 section 或网页的标题进行组合，使用 figcaption 元素为元素添加标题 |
| \\<time>       | 定义日期或时间，或者两者                                   |
| \\<footer>     | 定义 section 或文档的页脚                              |

# 文本格式化标签

| 标签             | 作用                                                                   |
| -------------- | -------------------------------------------------------------------- |
| \\<b>          | 定义粗体文本                                                               |
| \\<big>        | 定义大号字                                                                |
| \\<em>         | 定义着重文字                                                               |
| \\<i>          | 定义斜体字                                                                |
| \\<small>      | 定义小号字                                                                |
| \\<strong>     | 定义加重语气                                                               |
| \\<sub>        | 定义下标字                                                                |
| \\<sup>        | 定义上标字                                                                |
| \\<ins>        | 定义插入字                                                                |
| \\<del>        | 定义删除字                                                                |
| \\<blockquote> | blockquote 标签之间的所有文本都会从常规文本中分离出来，经常会在左、右两边进行缩进，而且有时会使用斜体             |
| \\<code>       | em,strong,dfn,code,samp,kbd,var,cite 标签常用来格式话文本，使用 css 样式表可以显示更丰富的效果 |

# 表格

| 标签           | 作用         |
| ------------ | ---------- |
| \\<table>    | 定义表格       |
| \\<caption>  | 定义表格标题     |
| \\<th>       | 定义表格的表头    |
| \\<tr>       | 定义表格的行     |
| \\<td>       | 定义表格单元     |
| \\<thead>    | 定义表格的页眉    |
| \\<tbody>    | 定义表格的主体    |
| \\<tfoot>    | 定义表格的页脚    |
| \\<col>      | 定义用于表格列的属性 |
| \\<colgroup> | 定义表格列的组    |

# 列表

| 标签     | 作用              |
| ------ | --------------- |
| \\<ol> | 定义有序列表          |
| \\<ul> | 定义无序列表          |
| \\<li> | 定义列表项           |
| ----   | ----（图文混排用下面这个） |
| \\<dl> | 定义列表            |
| \\<dt> | 定义项目            |
| \\<dd> | 定义的描述           |

# 表单

| 标签  | 作用  |
| --- | --- |

# 热区

| 标签       | 作用                                                           |
| -------- | ------------------------------------------------------------ |
| \\<area> | area 元素始终嵌套在 map 标签内部。area 标签定义图像映射内部的区域（图像映射指的是带有可点击区域的图像）。 |

# 媒体

| 标签 | 作用 |
\|\\<audio>|audio 标签是 HTML 5 的新标签, audio 标签想网页中插入声音，比如音乐或其他音频流。|

# head

| 标签             | 作用                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| \\<base>       | base 标签为页面上的所有链接规定默认地址或默认目标。base 标签必须位于 head 元素内部                                                                       |
| \\<body>       | body 标签定义文档的主体。 body 标签包含文档的所有内容，比如文本、超链接、图像、表格、列表等。在 HTML 5 中，删除了所有 的特殊属性。                                             |
| \\<br>         | br 标签插入简单的换行符。br 标签是一个空标签，意味着它没有结束标签。br 标签常用来输出空行                                                                       |
| \\<button>     | button 标签定义按钮。您可以在 button 标签内放置内容，比如文本或图像。但是在 form 中通常使用 input 标签创建按钮。                                                  |
| \\<canvas>     | canvas 定义图形，比如图表和其他图像。canvas 标签只是图形容器，您必须使用脚本来绘制图形。                                                                     |
| \\<caption>    | caption 标签定义表格的标题。caption 标签必须直接放置到 table 标签之后。通常标题会居中显示在表格上方。                                                          |
| \\<cite>       | cite 标签定义作品（比如书籍、歌曲、电影、电视节目、绘画、雕塑等等）的标题，通常斜体显示。                                                                         |
| \\<datalist>   | datalist 标签定义选项列表。请与 input 元素配合使用该元素，来定义 input 可能的值。                                                                    |
| \\<del>        | del 标签定义文档中已删除的文本。与 ins 标签一起使用，描述文档中的更新和修正。                                                                             |
| \\<div>        | div 标签常用于组合块级元素，以便通过样式表来对这些元素进行格式化。通常使用 div + css 对网页进行布局。                                                              |
| \\<footer>     | footer 标签是 HTML 5 中的新标签。footer 标签定义 section 或 document 的页脚。                                                             |
| \\<form>       | form 标签标签用于创建供用户输入的 HTML 表单。form 标签包含多个表单元素，如：button,input,keygen,object,output,select,textarea                         |
| \\<frame>      | 定义和用法 在 HTML 5 中不支持 frame 标签。 frame 标签定义框架集中的子窗口（框架）。 由于该标签对网页可用性的负面影响，在 HTML 5 中 frame 和 frameset 标签没有得到支持。            |
| \\<frameset>   | 定义和用法 在 HTML 5 中不支持 frameset 标签。 frameset 标签定义框架集。它用于组织多个窗口（框架）。 由于该标签对网页可用性的负面影响，在 HTML 5 中 frame 和 frameset 标签没有得到支持。 |
| \\&lt;h1 - h6> | h1,h2,h3,h4,h5,h6 标签用来定义文档中的标题。h1 定义最大的标题。h6 定义最小的标题。                                                                   |
| \\<head>       | head 标签是所有头部元素的容器。位于 head 内部的元素可以包含 title,base,link,meta,script,style 等。                                                |
| \\<header>     | header 标签是 HTML 5 中的新标签。header 标签定义文档的页眉（介绍信息）。                                                                         |
| \\<hgroup>     | hgroup 标签是 HTML 5 中的新标签。hgroup 标签用于对网页或区段（section）的标题进行组合。                                                              |
| \\<hr>         | 在 HTML 5 中，hr 标签定义内容中的主题变化，并显示为一条水平线。在 HTML 4.01 中，hr 标签仅仅显示为一条水平线。                                                     |
| \\<html>       | html 标签告知浏览器这是一个 HTML 文档。html 元素是 HTML 文档中最外层的根元素。                                                                      |
| \\<i>          | i 标签定义的文本在 html 文档中呈现为斜体，以便与文档中其余部分区别开来。                                                                                |
| \\<iframe>     | iframe 标签创建包含另一个文档的行内框架。在 HTML 5 中，仅仅支持 src 属性。                                                                         |
| \\<img>        | img 标签定义 HTML 页面中的图像。img 标签定义 HTML 页面中的图像。img 标签定义 HTML 页面中的图像。                                                         |
| \\<input>      | input 标签规定 form 表单中用户可输入数据的输入字段。根据不同的 type 属性，输入字段可以是文本字段、复选框、密码字段、单选按钮、按钮等。                                            |
| \\<ins>        | ins 标签定义文档的其余部分之外的插入文本。通常能够与 del 标签一起使用，来描述对文档的更新和修正。                                                                   |
| \\<label>      | label 标签为 input 元素定义文字标识，label 标签的 for 属性应该等于相关元素的 id 元素，以便将它们捆绑起来。                                                     |
| \\<li>         | li 标签定义列表项，有序列表 ol 和无序列表 ul 中都使用 li 标签。 HTML 5 中，li 标签不再支持 type 属性。                                                     |
| \\<link>       | link 标签定义文档与外部资源之间的关系。link 标签大多数时候都用来连接 css 样式表。link 标签只能位于 head 标签中。                                                   |
| \\<map>        | map 标签用于定义图像中可点击的热点区域。map 标签的 name 属性与 img 标签的 usemap 属性相关联，以创建图像与映射之间的关系                                               |
| \\<map>        | map 标签用于定义图像中可点击的热点区域。map 标签的 name 属性与 img 标签的 usemap 属性相关联，以创建图像与映射之间的关系                                               |
| \\<mark>       | mark 标签是 HTML 5 中的新标签。mark 标签定义带有记号的文本。请在需要突出显示文本时使用 mark 标签。                                                           |
| \\<menu>       | menu 标签定义菜单列表。当希望列出表单控件时使用该标签。在 HTML 5 中，重新定义了 menu 元素，且使用用于排列表单控件。                                                     |
| \\<meta>       | meta 标签位于文档的头部 head 标签中，meta 标签的属性用来定义有关页面的元信息，比如 字符集，关键词，描述，重定向等。                                                      |
| \\<meter>      | meter 标签是 HTML 5 中的新标签。meter 标签定义度量的范围，既可以在元素的文本中，也可以在 min/max 属性中定义。                                                   |
| \\<nav>        | nav 标签是 HTML 5 中的新标签。nav 标签定义导航链接的部分。                                                                                   |
| \\<noframes>   | 定义和用法 在 HTML 5 中不支持 noframes 标签。 noframes 标签向浏览器显示无法处理框架的提示文本。                                                          |
| \\<noscript>   | noscript 元素用来定义在脚本未被执行时的替代内容（文本）。此标签用于可识别 script 标签但无法支持其中脚本的浏览器。                                                       |
| \\<ol>         | ol 标签定义有序列表。在 HTML 5 中，不再支持 compact 和 type 这两个属性                                                                        |
| \\<optgroup>   | optgroup 标签定义选项组。此元素允许您组合选项。当您使用一个长的选项列表时，对相关的选项进行组合会使处理更加容易。                                                           |
| \\<option>     | option 标签定义下拉列表中的一个选项。在 HTML 5 中，option 标签也用于新元素 datalist 中。                                                            |
| \\<p>          | p 标签定义段落。在 HTML 5 中不再支持 p 标签的 align 属性。                                                                                 |
| \\<pre>        | pre 标签可定义预格式化的文本。pre 标签的一个常见应用就是用来表示计算机的源代码。                                                                            |
| \\<progress>   | progress 标签是 HTML 5 中的新标签。progress 标签定义运行中的进度（进程）。                                                                      |
| \\<q>          | q 标签定义一个短的引用。浏览器经常会在这种引用的周围插入引号。                                                                                        |

# meta

> \\<meta> 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。
>
> \\<meta> 标签位于文档的头部，不包含任何内容。<meta> 标签的属性定义了与文档相关联的名称 / 值对。

## \\<meta charset="utf-8">

设置字符集

## \\<meta http-equiv="X-UA-Compatible" content="IE=edge">

X-UA-Compatible 是 IE8 的一个专有 \\<meta>属性，它告诉 IE8 采用何种 IE 版本去渲染网页  
IE=edge 告诉 IE 使用最新的引擎渲染网页

## \\<meta name="viewport" content="width=device-width, initial-scale=1">

-   width=device-width：设置页面宽度以跟随设备的屏幕宽度 (这取决于设备的不同)。  
    这里的屏幕宽度在移动设别上大约就是屏幕的实际尺寸，而不是屏幕的分辨率。（因为使用了高 DPI 显示屏）
-   initial-scale=1：当页面第一次被浏览器加载时，部分设置了初始的缩放级别为 1。  

> The viewport is the user's visible area of a web page.  
> The viewport varies with the device, and will be smaller on a mobile phone than on a computer screen.  
> Before tablets and mobile phones, web pages were designed only for computer screens, and it was common for web pages to have a static design and a fixed size.  
> Then, when we started surfing the internet using tablets and mobile phones, fixed size web pages were too large to fit the viewport. To fix this, browsers on those devices scaled down the entire web page to fit the screen.  
> This was not perfect!! But a quick fix.
>
> 翻译：
> viewport 是一个 web 页面的用户可见区域。  
> 视屏与设备不同，在移动电话上的屏幕比在电脑屏幕上要小。  
> 在平板电脑和移动电话之前，网页设计仅仅是为了电脑屏幕，而网页的设计和固定尺寸是很常见的。  
> 然后，当我们开始使用平板电脑和手机上网时，固定尺寸的网页太大了，无法适应这个视窗。为了解决这个问题，这些设备上的浏览器缩小了整个网页，以适应屏幕。  
> 这不是完美的! ! 但是一个快速修复。  

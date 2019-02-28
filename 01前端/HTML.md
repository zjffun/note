# link 标签

css 的 link 必须加上 rel="stylesheet"  
link 的 rel 属性的不同用法
| 值 | 描述 |
\| --- \| --- \|
| alternate | 文档的替代版本（比如打印页、翻译或镜像）。 |
| stylesheet | 文档的外部样式表。 |
| start | 集合中的第一个文档。 |
| next | 集合中的下一个文档。 |
| prev | 集合中的上一个文档。 |
| contents | 文档的目录。 |
| index | 文档的索引。 |
| glossary | 在文档中使用的词汇的术语表（解释）。 |
| copyright | 包含版权信息的文档。 |
| chapter | 文档的章。 |
| section | 文档的节。 |
| subsection | 文档的小节。 |
| appendix | 文档的附录。 |
| help | 帮助文档。 |
| bookmark | 相关文档。 |

# form 表单提交

## 数据发送

-   disabled：不发送  
-   display_none：发送  
-   type_hidden：发送  
-   readonly：发送  

测试 html：

    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<meta charset="UTF-8">
    	<title>test</title>
    </head>
    <body>
    <form action="http://127.0.0.1" method="get">
    	<p>disabled: <input name="disabled" disabled="disabled" value="disabled" type="text"></p>
    	<p>display_none: <input name="display_none" style="display:none" value="display_none" type="text"></p>
    	<p>type_hidden: <input name="type_hidden" type="hidden" value="type_hidden" type="text"></p>
    	<p>readonly: <input name="readonly" readonly="readonly" value="readonly" type="text"></p>
    	<p><button>submit</button></p>
    </form>
    </body>
    </html>

结果：  
<http://127.0.0.1/>  
?display_none=display_none  
&type_hidden=type_hidden  
&readonly=readonly  

## 文件发送

1.  设置 form 发送文件：`<form action=""method="post"enctype="multipart/form-data">`
2.  form 不是 post 发送文件不会发送（php 的 $\_FILES 为 empty）：`<form action=""method="post"enctype="multipart/form-data">`
3.  file 没有 name 属性文件不会发送（php 的 $\_FILES 为 empty）：`<input type="file" name="file[]">`

# iframe

iframe 要设置 width 和 height 属性，不设置在 iframe 加载的子页面中获取和操作父页面的 width，和 height 会出错

# 其他

## Empty string passed to getElementById().

看看 label 的 for 标签

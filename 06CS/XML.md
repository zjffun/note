# XML

eXtensible Markup Language：可扩展的标记语言

## XML 介绍

1.  基于文本格式的
2.  标签没有被预定义，需要自定义
3.  用于保存或传输数据，不是用来显示数据的。
4.  是元语言（可以通过这门语言开发其他的语言）

## 文档结构

1.  最上面一行是文档的声明，注意：声明必须放在第一行`<?xml version="1.0" encoding="utf-8"?>`
2.  是一种树形的结构
3.  必须包含根元素，在根元素中扩展到树叶
4.  文档有元素、属性、值、注释、实体组成

## 标签的规则

1.  至少需要一个元素
2.  XML 标签是区分大小写（HTML 不区分大小写）
3.  不允许空标记存在，所有的标记必须成对
4.  标签的嵌套要正确
5.  标签的命名规则：以字母、下划线、冒号开头，后面跟的是字母，数字，下划线、冒号、句号 (点)、连字符。中间不能有空格，不能以 XML 开头。

## 数据的分类

1.  PCDATA（parse character data）：可以解析的字符数据，
2.  CDATA（character data）：字符数据，不会由解析器解析。

## XML 实体

-   预定义

| 实体       | 描述   |
| -------- | ---- |
| `&quot;` | 双引号  |
| `&apos;` | 单引号  |
| `&lt;`   | &lt; |
| `&gt;`   | >    |
| `&amp;`  | &    |

-   自定义
    a)	一般实体
    b)	参数实体

## DTD

Document Type Definition：文档类型定义  
格式良好：满足 XML 最低规范的  
有效：通过 DTD 验证的文档称为有效  

| 符号  | 含义       |
| --- | -------- |
| +   | >=1      |
| \*  | >=0      |
| ？   | =0 或 = 1 |

### DTD 使用

外部 DTD：`<!DOCTYPE 根 SYSTEM "验证文档. dtd">`  
books.xml

    <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE books SYSTEM "book.dtd">
    <books>
    	<book>
    		<title>哈利波特</title>
    		<author>美国人</author>
    		<author>美国人</author>
    		<isGood>还行<idGood>
    	</book>
    	<book>
    		<title>十字路口</title>
    		<author>日本人</author>
    	</book>
    	<book>
    		<title>狂人日记</title>
    		<author>鲁迅</author>
    	</book>
    </books>	

book.dtd：

    <?xml version="1.0" encoding="utf-8"?>
    <!ELEMENT books (book+)>
    <!ELEMENT book (title, author+, isGood*)>
    <!ELEMENT title (#PCDATA)>
    <!ELEMENT author (#PCDATA)>
    <!ELEMENT isGood (#PCDATA)>

内部 DTD：`<!DOCTYPE 根 [规则]>`  
books.xml

    <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE books [
    	<!ELEMENT books (book+)>
    	<!ELEMENT book (title, author+, isGood*)>
    	<!ELEMENT title (#PCDATA)>
    	<!ELEMENT author (#PCDATA)>
    	<!ELEMENT isGood (#PCDATA)>
    ]>
    <books>
    	<book>
    		<title>哈利波特</title>
    		<author>美国人</author>
    		<author>美国人</author>
    		<isGood>还行<idGood>
    	</book>
    	<book>
    		<title>十字路口</title>
    		<author>日本人</author>
    	</book>
    	<book>
    		<title>狂人日记</title>
    		<author>鲁迅</author>
    	</book>
    </books>	

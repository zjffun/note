# 字符实体（Entity）

> 转义字符（Escape Sequence）也称字符实体 (Character Entity)。
>
> 定义转义字符串的主要原因是：
>
> 1.  `<`和`>`等符号已经用来表示 HTML TAG，因此不能直接当作文本中的符号来使用。但有时需求是在 HTML 页面上使用这些符号，所以需要定义它的转义字符串。
> 2.  有些字符在 ASCII 字符集中没有定义（如版权符号 “©”）。因此需要使用转义字符（“©” 对应的转义字符是 “`&copy;`”）来表示。

字符实体表：
[Character Entity Reference Chart](https://dev.w3.org/html5/html-author/charref)

# 预留字符（Reserved characters）

预留字符表：

| Character | Entity   |
| --------- | -------- |
| `&`       | `&amp;`  |
| `<`       | `&lt;`   |
| `>`       | `&gt;`   |
| `"`       | `&quot;` |

# 转换方法

方法一：映射表 + 正则替换

    var keys = Object.keys || function(obj) {
        obj = Object(obj)
        var arr = []   
        for (var a in obj) arr.push(a)
        return arr
    }
    var invert = function(obj) {
        obj = Object(obj)
        var result = {}
        for (var a in obj) result[obj[a]] = a
        return result
    }
    var entityMap = {
        escape: {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&apos;'
        }
    }
    entityMap.unescape = invert(entityMap.escape)
    var entityReg = {
        escape: RegExp('[' + keys(entityMap.escape).join('') + ']', 'g'),
        unescape: RegExp('(' + keys(entityMap.unescape).join('|') + ')', 'g')
    }
     
    // 将HTML转义为实体
    function escape(html) {
        if (typeof html !== 'string') return ''
        return html.replace(entityReg.escape, function(match) {
            return entityMap.escape[match]
        })
    }
    // 将实体转回为HTML
    function unescape(str) {
        if (typeof str !== 'string') return ''
        return str.replace(entityReg.unescape, function(match) {
            return entityMap.unescape[match]
        })   
    }

方法二：利用浏览器 DOM API（只能在浏览器跑，只能转换部分字符）

    // 将HTML转义为实体
    function escape(html){
        var elem = document.createElement('div')
        var txt = document.createTextNode(html)
        elem.appendChild(txt)
        return elem.innerHTML;
    }
    // 将实体转回为HTML
    function unescape(str) {
        var elem = document.createElement('div')
        elem.innerHTML = str
        return elem.innerText || elem.textContent
    }

# 参考

> -   [Entity - MDN Web Docs Glossary: Definitions of Web-related terms | MDN](https://developer.mozilla.org/en-US/docs/Glossary/Entity#Reserved_characters)
> -   [将 HTML 特殊转义为实体字符的两种实现方式 - snandy - 博客园](http://www.cnblogs.com/snandy/archive/2013/07/19/3200433.html)

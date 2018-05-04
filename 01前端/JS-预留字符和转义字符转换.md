转义字符（Escape Sequence）也称字符实体(Character Entity)。  
定义转义字符串的主要原因是：
1. “<”和“>”等符号已经用来表示HTML TAG，因此不能直接当作文本中的符号来使用。但有时需求是在HTML页面上使用这些符号，所以需要定义它的转义字符串。
1. 有些字符在ASCII字符集中没有定义（如版权符号“©”）。因此需要使用转义字符（“©”对应的转义字符是“&copy;”）来表示。

方法一：映射表+正则替换
```
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
      '&': '&',
      '<': '<',
      '>': '>',
      '"': '"',
      "'": '''
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
```

方法二：利用浏览器DOM API（只能在浏览器跑，只能转换部分字符）
```
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
```


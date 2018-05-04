
# [在线预览](https://jsfiddle.net/1010543618/6yf8p0sz/)

## 方法
- 使用nodeType判断类型，在allChildNodes方法内建立递归函数将allCN封装在方法内。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    p{
      color: red;
    }
    span{
      color: blue;
    }
    em{
      color: green;
    }
    i{
      color: gray;
    }
  </style>
</head>
<body>
  <p>
    p中的纯文本节点
    <span style="color: red;">p中的span</span>
    <em>
      p中的em中的纯文本节点
      <i>
        p中的em的i中的纯文本节点1
        <span>p中的em的i中的span</span>
        p中的em的i中的纯文本节点2
      </i>
    </em>
  </p>
  <button onclick="console.log(allChildNodes(document.querySelector('body'), 3));">获取body中全部纯文本节点</button>
  <button onclick="console.log(allChildNodes(document.querySelector('em'), 3));">获取em中全部纯文本节点</button>
  <button onclick="console.log(allChildNodes(document.querySelector('body'), 1));">获取body中全部节点</button>
  <button onclick="console.log(allChildNodes(document.querySelector('em'), 1));">获取em中全部节点</button>
  <script>
    /** 递归获取子节点
      1   Element                 代表元素
      2   Attr                    代表属性
      3   Text                    代表元素或属性中的文本内容
      4   CDATASection            代表文档中的 CDATA 部分（不会由解析器解析的文本）
      5   EntityReference         代表实体引用
      6   Entity                  代表实体
      7   ProcessingInstruction   代表处理指令
      8   Comment                 代表注释
      9   Document                代表整个文档（DOM 树的根节点）
      10  DocumentType            向为文档定义的实体提供接口
      11  DocumentFragment        代表轻量级的 Document 对象，能够容纳文档的某个部分
      12  Notation                代表 DTD 中声明的符号
    */
    var allChildNodes = function(node, type){
      // 1.创建全部节点的数组
      var allCN = [];

      // 2.递归获取全部节点
      var getAllChildNodes = function(node, type, allCN){
        // 获取当前元素所有的子节点nodes
        var nodes = node.childNodes;
        // 获取nodes的子节点
        for (var i = 0; i < nodes.length; i++) {
            var child = nodes[i];
            // 判断是否为指定类型节点
            if(child.nodeType == type){
                allCN.push(child);
            }
            getAllChildNodes(child, type, allCN);
        } 
      }
      getAllChildNodes(node, type, allCN);
      // 3.返回全部节点的数组
      return allCN;
    }
  </script>
</body>
</html>
```
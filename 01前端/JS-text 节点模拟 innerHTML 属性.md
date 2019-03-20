# [在线预览](https://jsfiddle.net/1010543618/mz7ybu8g/2/)

text 节点无 innerHTML 这个属性！！！  
如果直接修改 text 节点的属性（data,nodeValue,textContent），或者使用 js 原生的修改 text 节点的内容的方法都会将 HTML 的预留字符变成转义字符直接显示成文本了，解决方法有： 

1.  使用正则表达式找出 pre 的 innerHTML 字符串中的全部 text 节点的字符串进行修改
2.  给 text 外面包裹一个标签，改包裹标签的 innerHTML，把包裹标签的内容移动到外面，删除包裹标签
3.  使用 jquery 的 replaceWith 方法，这个就非常严谨了

```js
replaceWith: function(value) {
  var isFunc = jQuery.isFunction( value );

  // Make sure that the elements are removed from the DOM before they are inserted
  // this can help fix replacing a parent with child elements
  if (!isFunc && typeof value !== "string") {
    value = jQuery( value ).not( this ).detach();
  }

  return this.domManip( [ value ], true, function(elem) {
    var next = this.nextSibling,
      parent = this.parentNode;

    if ( parent ) {
      jQuery( this ).remove();
      parent.insertBefore( elem, next );
    }

  });
},
```

例：将 pre 标签中的回车替换为 `<br>`，空格替换为 `&ebsp`;，制表符替换成双 `&ebsp`;

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    pre,
    code {
      font-family: "Menlo", monospace;
      -webkit-text-size-adjust: 100%;
    }

    code {
      line-height: 1em;
    }

    pre {
      border-left: solid 2px #ccc;
      padding-left: 18px;
      margin: 2em 0 2em -20px;
    }

    .html .string,
    .javascript .string,
    .javascript .regexp {
      color: #756bb1;
    }

    .html .tag,
    .css .tag,
    .javascript .keyword {
      color: #3182bd;
    }

    .comment {
      color: #636363;
    }

    .html .doctype,
    .javascript .number {
      color: #31a354;
    }

    .html .attr,
    .css .attr,
    .javascript .class,
    .javascript .special {
      color: #e6550d;
    }
  </style>
</head>
<body>
<pre><code class="javascript hljs">d3.selectAll(<span class="string">"circle"</span>).transition()
    .duration(<span class="number">750</span>)
    .delay(<span class="function"><span class="keyword">function</span>(<span class="params">d, i</span>) </span>{ <span class="keyword">return</span> i * <span class="number">10</span>; })
    .attr(<span class="string">"r"</span>, <span class="function"><span class="keyword">function</span>(<span class="params">d</span>) </span>{ <span class="keyword">return</span> <span class="built_in">Math</span>.sqrt(d * scale); });</code></pre>
  <button onclick="pre_replace()">Replace all line breaks,blanks and tabs.</button>
  <p>innerHTML of pre: </p>
  <p id="html-of-pre"></p>
  <script src="https://cdn.bootcss.com/jquery/1.9.1/jquery.js"></script>
  <script>
    //引入jquery仅仅为了使用jquery的replaceWith方法
    'use strcat'
    var pre = document.querySelector('pre')
    var p = document.querySelector('#html-of-pre')
    p.innerText = pre.innerHTML
    
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

    var pre_replace = function(){
      var keys = Object.keys || function(obj) {
          obj = Object(obj)
          var arr = []   
          for (var a in obj) arr.push(a)
          return arr
      }
      var replace_map = {
        '\n': "<br/>",
        ' ': "&ensp;",
        '\t': "&ensp;&ensp;"
      }
      var allTextNodes = allChildNodes(pre, 3);
      /*
        text节点无innerHTML这个属性！！！
        如果直接修改text节点的属性（data,nodeValue,textContent），或者使用js原生的修改text节点的内容的方法都会将HTML的预留字符变成转义字符直接显示成文本了，解决方法有：
        1. 使用正则表达式找出pre的innerHTML字符串中的全部text节点的字符串进行修改
        2. 给text外面包裹一个标签，改包裹标签的innerHTML，把包裹标签的内容移动到外面，删除包裹标签
        3. 使用jquery的replaceWith方法，这个就非常严谨了
        replaceWith: function( value ) {
          var isFunc = jQuery.isFunction( value );

          // Make sure that the elements are removed from the DOM before they are inserted
          // this can help fix replacing a parent with child elements
          if ( !isFunc && typeof value !== "string" ) {
            value = jQuery( value ).not( this ).detach();
          }

          return this.domManip( [ value ], true, function( elem ) {
            var next = this.nextSibling,
              parent = this.parentNode;

            if ( parent ) {
              jQuery( this ).remove();
              parent.insertBefore( elem, next );
            }
          });
        },
      */
      allTextNodes.forEach(function(textNode){
        $(textNode).replaceWith(()=>{
          return textNode.data.replace(RegExp('[' + keys(replace_map).join('') + ']', 'g'), function(match){
            // console.log(match, replace_map[match])
            return replace_map[match]
          })
        })
      });
      p.innerText = pre.innerHTML
    }
  </script>
</body>
</html>
```

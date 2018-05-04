
# [在线预览](https://jsfiddle.net/1010543618/fyf913t0/)

## 方法
- 使用《Web API 接口》的《MutationObserver》
[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

网上查到的很多都是使用Mutation events的，但在MDN上一查这个事件已经废弃了，并且推荐用MutationObserver替换掉

> Deprecated
This feature has been removed from the Web standards. Though some browsers may still support it, it is in the process of being dropped. Avoid using it and update existing code if possible; see the compatibility table at the bottom of this page to guide your decision. Be aware that this feature may cease to work at any time. 

> Mutation events provide a mechanism for a web page or an extension to get notified about changes made to the DOM. Use Mutation Observers instead if possible.


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <h1>下述方法也可以监听使用《谷歌页面翻译》时的DOM变化</h1>
  <h1>The following way also can catch changes of DOM when using <em>Google page translation</em></h1>
  <h3>使用MutationObserver(Using MutationObserver)</h3>
  <div id="hello"><span>Hello</span> <em>Mr.</em> Word!</div>
  <button onclick="addNode()">添加(add DOM)</button>
  <script>
    // Select the node that will be observed for mutations
    var targetNode = document.querySelector('body');

    // Options for the observer (which mutations to observe)
    // subtree：是否监听子节点的变化
    var config = { attributes: true, childList: true, subtree:true};

    // Callback function to execute when mutations are observed
    var callback = function(mutationsList) {
        for(var mutation of mutationsList) {
            console.log(mutation);
            if (mutation.type == 'childList') {
                console.log('A child node has been added or removed.');
            }
            else if (mutation.type == 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
        }
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // // Later, you can stop observing
    // observer.disconnect();

    var addNode = function(){
      var divnode = document.createElement("div");
      var textNode = document.createTextNode("Hello world!");
      divnode.appendChild(textNode);
      document.getElementById('hello').appendChild(divnode)
    }
  </script>
</body>
</html>
```
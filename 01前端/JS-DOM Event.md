# DOM Level 0 
Events：绑定到DOM的属性上，找不到官方文档

DOM0是在W3C进行标准备化之前出现的，实际上是未形成标准的试验性质的初级阶段的DOM。

```js
var tdiv = document.createElement('div');

// 绑定事件
tdiv.onclick = function(d){console.log('click tdiv!')}

// 手动触发事件
tdiv.click()
```

# DOM Level 1
Events：无规定

有DOM Core和DOM HTML，没有定义事件相关的

# DOM Level 2
Events：规定了鼠标相关的事件（包括目标、捕获、冒泡和取消）的控制机制，但不包括键盘的

https://www.w3.org/TR/DOM-Level-2-Events/

```js
var tdiv = document.createElement('div');

// 绑定事件
function listener(d){console.log('click tdiv!')};
tdiv.addEventListener('click', listener);

// 手动触发事件
tdiv.dispatchEvent(new Event('click'));

// 解除绑定
tdiv.removeEventListener('click', listener);
```

# DOM Level 3
Events：主要规定了键盘相关事件

https://www.w3.org/TR/DOM-Level-3-Events/

参考：
- DOM Levels：https://developer.mozilla.org/zh-TW/docs/DOM_Levels
- DOM官方技术文档：https://www.w3.org/DOM/DOMTR
- 《JavaScript DOM高级程序设计》
- [Event - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event)
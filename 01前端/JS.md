# bind
bind绑定方法  
1. $(window).bind('click', function());//function会执行一次  
1. $(window).bind('click', function);//function不会执行  
eg：
下面这种情况function执行了不是因为没有阻止冒泡，而是在绑定时调用了这个方法
```
$btn.click(function(event){
  event.stopPropagation();
  $(window).bind('click', function());
});
```


# json
## 字符串 -> 对象
```
jq:
jQuery.parseJSON(data);
js:
JSON.parse(jsonstr); //可以将json字符串转换成json对象
```

## 对象 -> 字符串
```
JSON.stringify(jsonobj); //可以将json对象转换成json字符串
```
注意：数组对象添加的属性变字符串时不会解析
```
var arr = [1,2,3];
arr['key'] = 'value';
console.log(JSON.stringify(arr));//[1,2,3]
```

# 同步异步
ajax异步获取数据时下面的代码会执行。  
eg：  
在函数中使用ajax获取是否正确作为函数的返回值时，ajax异步的话会先返回后改变，在success函数中返回会作为success 方法的返回值。这时不能使用get或post，要用ajax设置为同步解决。

# 线程、事件循环、任务队列
JS 是单线程的，但是却能执行异步任务，这主要是因为 JS 中存在事件循环（Event Loop）和任务队列（Task Queue）。
- 事件循环：JS 会创建一个类似于 while (true) 的循环，每执行一次循环体的过程称之为 Tick。每次 Tick 的过程就是查看是否有待处理事件，如果有则取出相关事件及回调函数放入执行栈中由主线程执行。待处理的事件会存储在一个任务队列中，也就是每次 Tick 会查看任务队列中是否有需要执行的任务。
- 任务队列：异步操作会将相关回调添加到任务队列中。而不同的异步操作添加到任务队列的时机也不同，如 onclick, setTimeout, ajax 处理的方式都不同，这些异步操作是由浏览器内核的 webcore 来执行的，webcore 包含上图中的3种 webAPI，分别是 DOM Binding、network、timer模块。
1. onclick 由浏览器内核的 DOM Binding 模块来处理，当事件触发的时候，回调函数会立即添加到任务队列中。
1. setTimeout 会由浏览器内核的 timer 模块来进行延时处理，当时间到达的时候，才会将回调函数添加到任务队列中。
1. ajax 则会由浏览器内核的 network 模块来处理，在网络请求完成返回之后，才将回调添加到任务队列中。
- 主线程：JS 只有一个线程，称之为主线程。而事件循环是主线程中执行栈里的代码执行完毕之后，才开始执行的。所以，主线程中要执行的代码时间过长，会阻塞事件循环的执行，也就会阻塞异步操作的执行。只有当主线程中执行栈为空的时候（即同步代码执行完后），才会进行事件循环来观察要执行的事件回调，当事件循环检测到任务队列中有事件就取出相关回调放入执行栈中由主线程执行。
- （所有代码都主线程里跑，主线程没代码了就在任务队列中读回调函数（异步操作）回到主线程里跑）


1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
1. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
1. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
1. 主线程不断重复上面的第三步。（"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。）


```
例1：
var req = new XMLHttpRequest();
  req.open('GET', url);    
  req.onload = function (){};    // 这两个异步方法就会在 ajax 完成后推入任务队列，再由主线程执行
  req.onerror = function (){};    
  req.send();

例2：
setTimeout(function(){
  // 如果有大量的操作，可能会阻塞 UI 等，则可以使用 setTimeout 让这些操作在主线程把更重要的代码执行完毕之后，再来执行这里的操作。从而提高浏览器的性能。
},0);// 设置为 0，也会有个最小间隔值，也会在主线程中的代码运行完成后，由事件循环从任务队列将回调添加到执行栈中才执行


例3：
// 事件循环测试。执行结果是 2-3-4-1，1在最后输出，说明事件循环是所有同步代码执行完后才开始执行的。

'use strict';

setTimeout(function() {
  console.log(1);
}, 0);

console.log(2);

let end = Date.now() + 1000*5;

while (Date.now() < end) {
}

console.log(3);

end = Date.now() + 1000*5;

while (Date.now() < end) {
}

console.log(4);
```

# 删除变量delete
delete(变量名);（类似php的unset）

# 删除数组元素
==用delete下标不会删除==
```
Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
}
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
}
var emp = ['abs','dsf','sdf','fd'];
emp.remove('fd');
```

# 类型判断
参考了：。。。
## typeof 操作符
对于Function、String、Number、Undefined 等几种类型的对象来说，typeof完全可以胜任，但是为Array时会得到object
## instanceof 操作符
这个可以判断数组类型，但对于其他frame中的array，instanceof返回结果是False
## Object.prototype.toString
这种方法可以判断其他frame中的array
```
var arr = [1,2,3];
var obj = {};
var int_type = 123;
var string_type = 'string';
var function_type = function(){};
var undefined_type;
console.group('typeof');
  console.log('arr：' + typeof arr);//object
  console.log('obj：' + typeof obj);
  console.log('int_type：' + typeof int_type);
  console.log('string_type：' + typeof string_type);
  console.log('function_type：' + typeof function_type);
  console.log('undefined_type：' + typeof undefined_type);
console.groupEnd();
console.group('instanceof');
  console.log('arr instanceof Array：' + (arr instanceof Array));
console.groupEnd();
console.group('prototype.toString');
  console.log('Object.prototype.toString.call(arr)：' + (Object.prototype.toString.call(arr) === '[object Array]'));
console.groupEnd();

//其他frame中的array
var iframe = document.createElement('iframe');   
document.body.appendChild(iframe);   
xArray = window.frames[window.frames.length-1].Array;      
var arr = new xArray("1","2","3","4","5");//这个写法IE大哥下是不支持的，FF下才有
console.group('其他frame中的array');
	console.log('arr instanceof Array：' + (arr instanceof Array)); // false
	console.log('Object.prototype.toString.call(arr)：' + (Object.prototype.toString.call(arr) === '[object Array]')); // true
console.groupEnd();
```
ECMA-262 写道  
> Object.prototype.toString( ) When the toString method is called, the following steps are taken:
> Get the [[Class]] property of this object.
> Compute a string value by concatenating the three strings “[object “, Result (1), and “]”.
> Return Result (2)  

上面的规范定义了Object.prototype.toString的行为：  
首先，取得对象的一个内部属性[[Class]]，然后依据这个属性，返回一个类似于"[object Array]"的字符串作为结果（看过ECMA标准的应该都知道，[[]]用来表示语言内部用到的、外部不可直接访问的属性，称为“内部属性”）。利用这个方法，再配合call，我们可以取得任何对象的内部属性[[Class]]，然后把类型检测转化为字符串比较，以达到我们的目的。还是先来看看在ECMA标准中Array的描述吧。  
ECMA-262 写道  
> new Array([ item0[, item1 [,…]]])  
> The [[Class]] property of the newly constructed object is set to “Array”.

```
function isArray(obj) {  
  return Object.prototype.toString.call(obj) === '[object Array]';   
}
```

call改变toString的this引用为待检测的对象，返回此对象的字符串表示，然后对比此字符串是否是'[object Array]'，以判断其是否是Array的实例。（虽然Array继承自Object，也会有toString方法，但直接用obj.toString()这个方法有可能会被改写而达不到我们的要求，而Object.prototype很少有人敢去碰它的，所以能一定程度保证其“纯洁性”：）  
与typeof，instanceof不同，这个方法很好的解决了跨frame对象构建的问题，经过测试，各大浏览器兼容性也很好，可以放心使用。一个好消息是，很多框架，比如jQuery、Base2等等，都计划借鉴此方法以实现某些特殊的，比如数组、正则表达式等对象的类型判定，不用我们自己写了。
另外Ext3 也已经换成这样的写法了
```
isArray : function(v){
    return toString.apply(v) === '[object Array]';
}
```


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

## 空数组
使用`!!arr`转为布尔型判断，空数组为对象直接判断空数组为真
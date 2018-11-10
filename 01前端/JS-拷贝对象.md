As it is well known to us all, 拷贝对象分为浅拷贝和深拷贝，深拷贝只会复制地址，深拷贝才会复制内容，那么JS如何进行这两种拷贝呢？

# 浅拷贝
## Object.assign()方法
[Object.assign() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

```js
var object1 = {
  a: [1],
  b: 2,
  c: 3
};

var object2 = Object.assign({}, object1);
console.log(object2.a);// [1]

object1.a[0] = 111
console.log(object2.a);// [111]
```

# 深拷贝

## $.extend()方法
[jQuery.extend() | jQuery API Documentation](https://api.jquery.com/jQuery.extend/)

```js
var jsdom = require("jsdom").JSDOM;
var window = new jsdom(`<!DOCTYPE html>`).window;
var $ = require('jquery')(window);

var object1 = {
  a: [1],
  b: 2,
  c: 3
};

var object2 = $.extend(true, {}, object1);
console.log(object2.a);// [1]

object1.a[0] = 111
console.log(object2.a);// [1]
```

## _.cloneDeep()方法
[cloneDeep | Lodash Documentation](https://lodash.com/docs/4.17.11#cloneDeep)

```js
var _ = require("lodash");

var object1 = {
  a: [1],
  b: 2,
  c: 3
};

var object2 = _.cloneDeep(object1);
console.log(object2.a);// [1]

object1.a[0] = 111
console.log(object2.a);// [1]
```

## 注意
### lodash拷贝数组，数组上的属性会丢失

作者已经指出这不是bug，而是这样设计的：[clone does not copy array properties · Issue #3521 · lodash/lodash](https://github.com/lodash/lodash/issues/3521)

PS：使用jquery拷贝不会这样。

```js
var jsdom = require("jsdom").JSDOM;
var window = new jsdom(`<!DOCTYPE html>`).window;
var $ = require('jquery')(window);
var _ = require("lodash");

var object1 = {
  a: [1],
  b: 2,
  c: 3
};

object1.a.p1 = 123;

var jq_obj = $.extend(true, {}, object1);
var lo_obj = _.cloneDeep(object1);

console.log(jq_obj.a);// [1, p1: 123]
console.log(lo_obj.a);// [1]

```

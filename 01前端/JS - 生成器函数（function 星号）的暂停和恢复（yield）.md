---
updated: 'Wed, 10 Apr 2019 10:50:42 GMT'
date: 'Mon, 10 Dec 2018 15:26:45 GMT'
---

> <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*>
>
> <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield>
>
> 生成器函数在执行时能暂停，后面又能从暂停处继续执行。
>
> 调用一个生成器函数并不会马上执行它里面的语句，而是返回一个这个生成器的 迭代器 （iterator）对象。当这个迭代器的 `next()` 方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现 yield 的位置为止，yield 后紧跟迭代器要返回的值。或者如果用的是 yield\*（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。
>
> `next()` 方法返回一个对象，这个对象包含两个属性：value 和 done，value 属性表示本次 yield 表达式的返回值，done 属性为布尔类型，表示生成器后续是否还有 yield 语句，即生成器函数是否已经执行完毕并返回。
>
> 调用 `next()` 方法时，如果传入了参数，那么这个参数会作为上一条执行的  yield 语句的返回值
>
> 当在生成器函数中显式 return 时，会导致生成器立即变为完成状态，即调用 `next()` 方法返回的对象的 done 为 true。如果 return 后面跟了一个值，那么这个值会作为当前调用 `next()` 方法返回的 value 值。

```javascript
// 生成器函数定义
function* countAppleSales () {
  var saleList = [3, 7, 5];
  for (var i = 0; i < saleList.length; i++) {
    yield saleList[i];
  }
}

// 通过构造一个迭代器来使用它。
var appleStore = countAppleSales(); // Generator { }
console.log(appleStore.next()); // { value: 3, done: false }
console.log(appleStore.next()); // { value: 7, done: false }
console.log(appleStore.next()); // { value: 5, done: false }
console.log(appleStore.next()); // { value: undefined, done: true }

// next方法传入参数

function *gen(){
    y = yield 'foo';
    yield y;
}

var gen_obj=gen();
console.log(gen_obj.next());// 执行 yield 'foo'，返回 'foo'
console.log(gen_obj.next(10));// 将 10 赋给上一条 yield 'foo' 的左值，即执行 y=10，返回 10
console.log(gen_obj.next());// 执行完毕，value 为 undefined，done 为 true
```

# 结合性和优先级

右结合，且优先级极低， 参见：[运算符优先级 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)，例：

```javascript
function *a(){
  yield yield 1, yield 3;
}
var foo = a();
console.log(foo.next(), foo.next(2), foo.next(), foo.next())// 1  2  3 undefined
```

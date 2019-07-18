# NVM

# Babel

`babel-core`：提供 Babel 的 API，可以获得转码后的代码和抽象语法树。

`babel-polyfill`：Babel 只能转换语法，如果想用类似 Promise、Generator 等 API 要 polyfill 她。

# Traceur

Google 的 JS 代码转换器。

# ECMAScript7

ES6 的草案封闭，不再接受新功能，新功能将加入 ES7。

TC39 提案的流程：

-   Stage0: Strawman 展示
-   Stage1: Proposal 征求意见
-   Stage2: Draft 草案（到这里基本就定了要加入标准里了）
-   Stage3: Candidate 候选
-   Stage4: FInished 定案

# `let` 和`const`

`let`: 块级作用域、无变量提升（`var`有变量提升）、有暂存性死区（TDZ, temporal dead zone）、不允许重复声明。

有了块级作用域立即执行函数就不怎么需要了

```js
// IIFE
(function(){
  var foo = ...;
  ...
})()

// 块级作用域
{
  let foo = ...;
  ...
}
```

`const`: `let`的基础上添加了不能修改其值的特性。对于`const`声明的对象会保证其地址不能修改，要想不让修改对象的属性要用`Object.freeze()`。

`let`、`const`和`class`声明的全局变量不属于全局对象`window`。`var`和`function`声明的全局变量还属于全局对象`window`。

# 解构（Destructuring）

解构赋值允许指定默认值。

在解构赋值中，等号右边的值如果不是对象就先将其转为对象。`null`和`undefined`无法转换为对象会报错。

只有解构赋值语句的非模式部分（待赋值的变量名部分）可以使用圆括号。

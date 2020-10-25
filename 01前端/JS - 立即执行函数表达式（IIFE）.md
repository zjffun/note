---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

# javascript 函数调用

在 javascript 中，每一个函数在被调用的时候都会创建一个执行上下文，在该函数内部定义的变量和函数只能在该函数内部被使用，而正是因为这个上下文，使得我们在调用函数的时候能创建一些私有变量。

-   先声明后调用

```js
// 声明：
var foo = function () {
  /* code */
};
// 调用：
foo();
```

-   如果想不声明直接调用

```js
    function(){ /* code */ }();
    // 报错：SyntaxError: Unexpected token (
    // 执行到第一个左括号'('时报错，因为函数函数应该有函数名而这里没有
```

-   加上函数名再调用

```js
    function foo(){ /* code */ }();
    // 报错：SyntaxError: Unexpected token )
    // 执行到倒数第一个右括号')'时报错
    // 因为()是提高优先级的分组操作符，分组操作符内的表达式不能为空
```

# 使用立即执行函数（IIFE）

```
// 最常用的两种写法
(function(){ /* code */ }()); // 老道推荐写法
(function(){ /* code */ })(); // 当然这种也可以

// 括号和JS的一些操作符（如 = && || ,等）可以在函数表达式和函数声明上消除歧义
// 如下代码中，解析器已经知道一个是表达式了，于是也会把另一个默认为表达式
// 但是两者交换则会报错
var i = function(){ return 10; }();
true && function(){ /* code */ }();
0, function(){ /* code */ }();

// 如果你不怕代码晦涩难读，也可以选择一元运算符
!function(){ /* code */ }();
~function(){ /* code */ }();
-function(){ /* code */ }();
+function(){ /* code */ }();

// 你也可以这样
new function(){ /* code */ }
new function(){ /* code */ }() // 带参数
```

# 《立即执行函数》还是《自执行函数》

IIFE 的称谓在现在似乎已经得到了广泛推广（不知道是不是原文作者的功劳？），而原文写于 10 年，似乎当时流行的称呼是自执行函数（Self-executing anonymous function），接下去作者开始为了说明立即执行函数的称呼好于自执行函数的称呼开始据理力争，有点咬文嚼字，不过也蛮有意思的，我们来看看作者说了些什么。

```js
// 这是一个自执行函数，函数内部执行的是自己，递归调用
function foo() {
  foo();
}

// 这是一个自执行匿名函数，因为它没有函数名
// 所以如果要递归调用自己的话必须用arguments.callee
var foo = function () {
  arguments.callee();
};

// 这可能也算是个自执行匿名函数，但仅仅是foo标志引用它自身
// 如果你将foo改变成其它的，你将得到一个used-to-self-execute匿名函数
var foo = function () {
  foo();
};

// 有些人叫它自执行匿名函数，尽管它没有执行自己，只是立即执行而已
(function () {
  /* code */
})();

// 给函数表达式添加了标志名称，可以方便debug
// 但是一旦添加了标志名称，这个函数就不再是匿名的了
(function foo() {
  /* code */
})();

// 立即执行函数也可以自执行，不过不常用罢了
(function () {
  arguments.callee();
})();
(function foo() {
  foo();
})();
```

我的理解是作者认为自执行函数是函数内部调用自己（递归调用），而立即执行函数就如字面意思，该函数立即执行即可。其实现在也不用去管它了，就叫 IIFE 好了。

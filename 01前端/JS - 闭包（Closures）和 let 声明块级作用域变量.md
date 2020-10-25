闭包：

> <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures>\
> 闭包是函数和声明该函数的词法环境的组合。

let：

> <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let>\
> let 语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。

例：闭包和 let 修正匿名函数访问的变量

```js
function foo(){
    var bar = [];
    for (var index = 0; index < 9; index++) {
        bar[index] = function(){
            return index;
        }
    }
    return bar;
}

function foo_closures(){
    var bar = [];
    for (let index = 0; index < 9; index++) {
        (bar[index] = function(){
            return index;
        })()
    }
    return bar;
}

function foo_let(){
    var bar = [];
    for (let index = 0; index < 9; index++) {
        bar[index] = function(){
            return index;
        }
    }
    return bar;
}

for(var d of foo()){
    console.log(d());// 9个9
}

for(var d of foo_closures()){
    console.log(d());// 1,2,...8
}

for(var d of foo_let()){
    console.log(d());// 1,2,...8
}
```

# 使用 VS Code

# 使用`debugger`

> [debugger - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/debugger)

直接在希望下断点的地方使用就行，eg：

```js
function f() {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            for (let k = 0; k < 100; k++) {
                if (i == 50 && j == 50 && k > 90) {
                    debugger;
                }
            }
        }
    }
}
setTimeout(f, 0);
```

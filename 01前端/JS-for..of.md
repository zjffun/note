> <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of>

刚刚上网上看到[《V8 JavaScript 引擎 6.6 发布，异步性能大幅提升》](https://www.oschina.net/news/94658/v8-66-released)，里面有个测试用的算法，觉得似曾相识就复习了一遍 for..of 果然找到了。

测试用的算法：

```js
async function* fibonacciSequence(){
  for(let a=0, b=1;;){
    yield a;
    const c = a + b;
    a = b;
    b = c;
  }
}

async function fibonacci(id, n){
  for await(const value of fibonacciSequence()){
    if(n-- === 0) return value;
  }
}

fibonacci(0,30).then((d)=>console.log(d))
// 这个算法node跑不了，但浏览器控制台就OK，难道是我的node的V8引擎版本太低。

// 查了一下Node v8.9.0用的V8 5.8（2016年的版本），而async，await是ES2017的语法。。

// 然后换成Node v10.8.0就可以用了
```

MDN 演示 for...of 的算法：

```JS
function* fibonacci() { // 一个生成器函数
    let [prev, curr] = [0, 1];
    for (;;) { // while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}
 
for (let n of fibonacci()) {
    console.log(n); 
    // 当n大于1000时跳出循环
    if (n >= 1000)
        break;
}
```

-   `pop()`，`push()`等在数组尾部操作的方法的时间复杂度为`O(1)`
-   `forEach()`、`map()`、`shift()`、`unshift()`、等需要遍历或者在数组头部操作的方法的时间复杂度为`O(n)`
-   `splice()`、`concat()`、`find()`等方法的时间时间复杂度为`O(n)`，但最优情况可能为`O(1)`，如`splice()`在数组尾部操作、`find()`第一个元素就符合条件。

不是十分确定的解释：因为 JS 数组是用 HashTable 实现的（上网查资料至少 V8 引擎中是），在数组中间进行操作需要将操作的元素后面的元素的 hash 值（key\\index 经过 hash function 计算出来的值）改变，要是在数组头部进行增加和删除就需要将数组全部元素对应的 hash 值（key\\index 经过 hash function 计算出来的值）改变。

测试：

```javascript
var array = [];
for(var i = 0;i< 1000000;i++){
    array.push(i)
}
var start = new Date().getTime()
for(var i = 0; i< 100000; i++){
    array.splice(1000000,0,1);
}
var end = new Date().getTime();
console.log(`Add 10^5 numbers to the head of array: ${end - start} ms`);

var array = [];
for(var i = 0;i< 1000000;i++){
    array.push(i)
}
var start = new Date().getTime()
for(var i = 0; i< 100000; i++){
    array.push(1000000,0,1);
}
var end = new Date().getTime();
console.log(`Add 10^5 numbers to the rear of array: ${end - start} ms`);

// Add 10^5 numbers to the head of array: 4555 ms
// Add 10^5 numbers to the rear of array: 56 ms
```

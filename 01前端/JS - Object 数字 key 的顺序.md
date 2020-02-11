Object 的 key 是排过序的，但这个 Object 的 key 的排序和数组下标不同是有限制的，我在 Node.js（Chrome V8 引擎）测试 Object 的 key 只有在小于`2^32 - 1`时才会排序。

要保证 Object 的 key 的顺序的话可以先获取可枚举属性然后排序，参见：[Object.entries() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)。

其实数组下标也是 Key（连续的整数名的的可枚举属性，未设置的 Value 为`undefined`），所以使用 for...in 遍历数组一是不能保证顺序，二是会遍历非整数名的可枚举属性。参见：[for...in - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)。

例，使用 Node.js（Chrome V8 引擎）测试 Object 的 key 只有在小于`2^32 - 1`时才会排序：

```javascript
let obj = {
  // unnormal order (not sorted) (>= 2^32 - 1)
  "4294967296": true,
  "4294967295": true,
  "4294967299": true,
  "4294967298": true,
  // normal order (sorted) (< 2^32 - 1)
  "4294967294": true,
  "4294967293": true,
  "1": true,
  "2": true,
  "3": true
};

console.log(Object.keys(obj).join(", ")); // 和 for...in 顺序一样
/*
   	排序不正常：
	1, 2, 3, 4294967293, 4294967294, 4294967296, 4294967295, 4294967299, 4294967298
   */

console.log(
  Object.keys(obj)
    .sort((a, b) => {
      return a - b;
    })
    .join(", ")
);
/*
    排序正常：
	1, 2, 3, 4294967293, 4294967294, 4294967295, 4294967296, 4294967298, 4294967299
   */
```

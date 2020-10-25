---
updated: 'Tue, 11 Feb 2020 12:03:08 GMT'
date: 'Tue, 11 Feb 2020 12:03:08 GMT'
---

# 回车和换行

JSON 无法处理回车和换行，例如下面的语句会报错

```js
JSON.parse({ a: "\r" });
```

-   `\r`: `\x0D`回车 CR (Carriage Return)
-   `\n`: `\x0A`换行 LF (Line Feed)

# JSON.stringify 出现：Converting circular structure to JSON

```js
// Note: cache should not be re-used by repeated calls to JSON.stringify.
var cache = [];
JSON.stringify(obj, function(key, value) {
  if (typeof value === "object" && value !== null) {
    if (cache.indexOf(value) !== -1) {
      // Circular reference found, discard key
      return;
    }
    // Store value in our collection
    cache.push(value);
  }
  return value;
});
cache = null; // Enable garbage collection
```

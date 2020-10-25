---
updated: 'Tue, 11 Feb 2020 12:03:08 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

# 转换为字符串

```js
"" + 10 === "10"; // true
```

# 转换为数字

```js
+"010.2"; //10.2
Number("010.2"); //10.2
parseInt("010.2", 10); //10
```

# 转换为布尔值

```js
!!"foo"; // true
!!""; // false
!!"0"; // true
!!"1"; // true
!!"-1"; // true
!!{}; // true
!!true; // true
```

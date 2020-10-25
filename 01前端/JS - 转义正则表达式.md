---
updated: 'Mon, 25 May 2020 11:33:14 GMT'
date: 'Mon, 25 May 2020 11:33:14 GMT'
---

```js
RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
```

> [regex - Is there a RegExp.escape function in Javascript? - Stack Overflow](https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript)
> [regex - How to escape regular expression special characters using javascript? - Stack Overflow](https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript)

---
updated: 'Tue, 11 Feb 2020 12:03:08 GMT'
date: 'Tue, 11 Feb 2020 12:03:08 GMT'
---

# fill()

今天刷 HackerRank 的题遇到需要创建链表数组（一维数组的每一项是个链表）的题。

众所周知 JS 中的数组可以当链表用，我就用如下代码进行创建

`let seqs = (new Array(5)).fill([])`

运行时结果很是诡异，经调试发现这数组这五项指向的是同一个数组，看来 fill 方法并不是每次都创建新的数组。

然后尝试使用`let seqs = (new Array(5)).map(() => [])`得到的结果和`new Array(5)`一样是一个长度为 5 的一维空数组（因为 map 会跳过空位）。

最后使用`let seqs = (new Array(5)).fill(0).map(() => [])`就 OK 了。

注：JS 数组中的空位和 undefined 不一样，使用`Array.from`可以将空位转为 undefined。

```node
> new Array(5)
[ <5 empty items> ]
> Array.from(new Array(5))
[ undefined, undefined, undefined, undefined, undefined ]
```

# sort()

默认排序是根据字符串的 Unicode 码，例如：

```js
[3,2,10].sort(); // [10, 2, 3]
[3,2,10].sort((a, b) => a - b); // [2, 3, 10]
```

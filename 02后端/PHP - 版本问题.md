---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

# PHP 5.3 以下版本 无法用下标直接取得函数返回的数组

eg：

```
$val_0 = explode(',', $val)[0]//报错

#要改成：
$exploded_val = explode(',', $val);
$val_0 = $exploded_val[0];
```

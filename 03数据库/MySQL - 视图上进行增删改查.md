---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

<https://dev.mysql.com/doc/refman/5.7/en/view-updatability.html>

<https://dev.mysql.com/doc/refman/8.0/en/view-updatability.html>

> 如果视图是使用了连接的视图，则视图的所有组件都必须是可更新的（没有物化的）。对于存在多个可更新表的视图，INSERT 只能插入其中一个表中。

目前想使用 MySQL 的视图像 Access 那样关联着一次插入多表是不可能的

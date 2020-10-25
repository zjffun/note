---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

> <https://dev.mysql.com/doc/refman/8.0/en/timestamp-initialization.html>

例，添加自动更新的保存最后一次修改该条记录的时间戳的字段：

```
alter table 表名 add last_modification_timestamp timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
```

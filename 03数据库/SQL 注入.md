# 减缓

## 参数化语句

先创建参数化 SQL 语句，然后绑定参数。详细信息，请参见：[Prepared statement - Wikipedia](https://en.wikipedia.org/wiki/Prepared_statement#C#_ADO.NET)

注：可以使用 ORM（[object-relational mapping](https://en.wikipedia.org/wiki/Object-relational_mapping)）库生成参数化 SQL 语句。

## 转义

将在 SQL 中具有特殊意义的字符转义。

## 模式检查

检查类型是否合法，整数、浮点数和布尔值很好检测，但字符串需要特殊的模式（如：日期、UUID、字母和数字）进行检测。

## 数据库权限

在数据库上对不同的组和用户设置权限，限制从 Web 服务端登录的用户的操作。

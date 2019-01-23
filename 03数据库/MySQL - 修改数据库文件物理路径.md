一共两步：

1.  修改`my.ini`文件的`datadir`；
2.  将修改前`datadir`路径下的文件复制到修改后的`datadir`路径。

注意：

1.  `my.ini`可能有多个，windows 系统可以在 MySQL 服务的属性中找到使用的哪个`my.ini`（如未指定可以从[4.2.6 Using Option Files](https://dev.mysql.com/doc/refman/5.6/en/option-files.html)中找到默认加载位置）；
2.  修改`datadir`后无法启动 MySQL 服务（没有报错），请检查修改后路径的权限；
3.  命令`show variables like "datadir"`可以查看数据库文件物理路径。

参考：

> -   [mysql - Change existing datadir path - Database Administrators Stack Exchange](https://dba.stackexchange.com/questions/24403/change-existing-datadir-path)
> -   [MySQL :: MySQL 5.6 Reference Manual :: 4.2.6 Using Option Files](https://dev.mysql.com/doc/refman/5.6/en/option-files.html)

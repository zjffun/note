# 登录

`sqlplus username/pwd [as sysdba]`

-   使用 dba 账号登录必须加 as sysdba
-   默认用户名密码：\
    sys：change_on_install\
    system：Oracle

## 无密码登录

### 进入数据库

`su – oracle`或\
`sqlplus /nolog`或\
`sqlplus system/manager`或\
`./sqlplus`

### 用户连接

`connect / as sysdba`或\
`connect / as sysoper`或\
`connect internal/oracle AS sysdba`或\
`conn sys/change_on_install as sysdba`

# 查看全部数据库和表

## 数据库

查看全部数据库（oracle 没有`show databases;`）：\
`select * from v$database;`\
`select name from v$database;`\
查看所有的数据库实例：`select * from v$instance;`\
`desc v$databases;`\
进入 test 数据库：`database test;`

## 表

`select * from user_tables;`：当前用户所拥有的表\
`select * from dba_tables;`：拥有 DBA 权限用户能查询所有的表\
`select * from all_tables;`：当前用户能访问的表\
`desc all_tables;`：查看表结构

# 用户

## 增加数据库用户

`create user username identified by pwd;`

## 用户授权

```
grant connect,resource,dba to username;
grant sysdba to username;
commit;
```

## 更改数据库用户的密码

`alter user username indentified by pwd;`

## 查看哪些用户拥有 SYSDBA、SYSOPER 权限

`select * from V_$PWFILE_USERS;`

## 查看当前数据库连接用户

`show user;`

# Oracle 数据库备份与还原命令

## 数据导出

1.  将数据库 TEST 完全导出到 c:\backups.dmp 中\
    `exp system/oracle@TEST file=c:\backups.dmp full=y`
2.  将数据库中 system 用户与 sys 用户的表导出\
    `exp system/oracle@TEST file=c:\backups.dmp owner=(system,sys)`
3.  将数据库中的表 table1 、table2 导出\
    `exp system/oracle@TEST file=c:\backups.dmp tables=(table1,table2)`
4.  将数据库中的表 table1 中的字段 filed1 以 "00" 打头的数据导出\
    `exp system/oracle@TEST file=c:\backups.dmp tables=(table1)query=\"where filed1 like'00%'\"`

## 数据的导入

1 将 c:\backups.dmp 中的数据导入 TEST 数据库中。
`imp system/oracle@TEST file=d:\backups.dmp`
2 将 c:\backups.dmp 中的表 table1 导入
`imp system/oracle@TEST file=d:\backups.dmp tables=(table1)`

# ORA-12560:TNS: 协议适配器错误。

造成 ORA-12560: TNS: 协议适配器错误的问题的原因有三个：

1.  监听服务没有起起来。windows 平台个一如下操作：开始 --- 程序 --- 管理工具 --- 服务，打开服务面板，启动 oraclehome92TNSlistener 服务。
2.  database instance 没有起起来。windows 平台如下操作：开始 --- 程序 --- 管理工具 --- 服务，打开服务面板，启动 oracleserviceXXXX,XXXX 就是你的 database SID.
3.  注册表问题。regedit，然后进入 HKEY_LOCAL_MACHINE\SOFTWARE\ORACLE\HOME0 将该环境变量 ORACLE_SID 设置为 XXXX,XXXX 就是你的 database SID. 或者右几我的电脑，属性 -- 高级 -- 环境变量 --- 系统变量 -- 新建，变量名 = oracle_sid, 变量值 = XXXX,XXXX 就是你的 database SID. 或者进入 sqlplus 前，在 command line 下输 set oracle_sid=XXXX,XXXX 就是你的 database SID.

# ORA-12154: TNS: 无法解析指定的连接标识符

配置文件错了！\
解决方案：
Net Manager 中修改配置，或使用`tnsping orcl`获取配置文件位置，修改配置文件\
注：先安装 Oracle 客户端再安装 Oracle 服务，Oracle 服务的配置文件会优先使用（Oracle 服务的环境变量会再前面）。

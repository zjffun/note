# 登录
`sqlplus username/pwd [as sysdba]`
- 使用dba账号登录必须加as sysdba
- 默认用户名密码：  
sys：change\_on\_install  
system：Oracle

## 无密码登录
### 进入数据库
`su – oracle`或  
`sqlplus /nolog`或  
`sqlplus system/manager`或  
`./sqlplus`
### 用户连接
`connect / as sysdba`或  
`connect / as sysoper`或  
`connect internal/oracle AS sysdba`或  
`conn sys/change\_on_install as sysdba`

# 查看全部数据库和表
## 数据库
查看全部数据库（oracle没有`show databases;`）：  
`select * from v$database;`  
`select name from v$database;`  
查看所有的数据库实例：`select * from v$instance;`  
`desc v$databases;`  
进入test数据库：`database test;`

## 表
`select * from user_tables;`：当前用户所拥有的表  
`select * from dba_tables;`：拥有DBA权限用户能查询所有的表  
`select * from all_tables;`：当前用户能访问的表   
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
`alter user username indentified by pwd; `

## 查看哪些用户拥有SYSDBA、SYSOPER权限
`select * from V\_$PWFILE_USERS;`

## 查看当前数据库连接用户
`show user;`

# Oracle数据库备份与还原命令
## 数据导出
1. 将数据库TEST完全导出到c:\backups.dmp中  
`exp system/oracle@TEST file=c:\backups.dmp full=y`
2. 将数据库中system用户与sys用户的表导出  
`exp system/oracle@TEST file=c:\backups.dmp owner=(system,sys)`
3. 将数据库中的表table1 、table2导出  
`exp system/oracle@TEST file=c:\backups.dmp tables=(table1,table2)`
4. 将数据库中的表table1中的字段filed1以"00"打头的数据导出  
`exp system/oracle@TEST file=c:\backups.dmp tables=(table1)query=\" where filed1 like '00%'\"`

## 数据的导入
1 将c:\backups.dmp 中的数据导入 TEST数据库中。
`imp system/oracle@TEST file=d:\backups.dmp`
2 将c:\backups.dmp中的表table1 导入
`imp system/oracle@TEST file=d:\backups.dmp tables=(table1)`

# ORA-12560:TNS:协议适配器错误。
造成ORA-12560: TNS: 协议适配器错误的问题的原因有三个：
1. 监听服务没有起起来。windows平台个一如下操作：开始---程序---管理工具---服务，打开服务面板，启动oraclehome92TNSlistener服务。
2. database instance没有起起来。windows平台如下操作：开始---程序---管理工具---服务，打开服务面板，启动oracleserviceXXXX,XXXX就是你的database SID.
3. 注册表问题。regedit，然后进入HKEY\_LOCAL\_MACHINE\SOFTWARE\ORACLE\HOME0将该环境变量ORACLE\_SID设置为XXXX,XXXX就是你的database SID.或者右几我的电脑，属性--高级--环境变量---系统变量--新建，变量名=oracle\_sid,变量值=XXXX,XXXX就是你的database SID.或者进入sqlplus前，在command line下输set oracle_sid=XXXX,XXXX就是你的database SID.


# ORA-12154: TNS: 无法解析指定的连接标识符
配置文件错了！  
解决方案：
Net Manager 中修改配置，或使用`tnsping orcl`获取配置文件位置，修改配置文件  
注：先安装Oracle客户端再安装Oracle服务，Oracle服务的配置文件会优先使用（Oracle服务的环境变量会再前面）。


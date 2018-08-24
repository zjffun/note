# Client does not support authentication protocol 或 Authentication plugin 'caching_sha2_password' cannot be loaded

## 解决方法

使用8.0的MySQL Command Line Client执行：
```
# 修改密码验证类型
ALTER USER '用户名'@'主机（全部主机为%）' IDENTIFIED WITH mysql_native_password BY '密码';

# 刷新设置
FLUSH PRIVILEGES;
```

PS：这样肯定安全性降低了，使用MySQL Workbench创建用户时可以看见验证类型下拉表单有3种类型，但创建时改了还是会变成sha2的，创建后还变成只读的（我的电脑这样，服务器上就好使，可能哪里能配置）

## 原因
应该是MySQL8.0使用了crypt加密，旧版的客户端不支持。

# mysqld: Can't change dir to 'C:\Program Files\MySQL\MySQL Server 8.0\data\' (OS errno 2 - No such file or directory)

## 解决方法
将`C:\ProgramData\MySQL\MySQL Server 8.0`文件夹下的`my.ini`文件复制到`C:\Program Files\MySQL\MySQL Server 8.0`文件夹

## 原因
8.0的my.ini配置文件在`C:\ProgramData\MySQL\MySQL Server 8.0`文件夹下，mysqld启动时可能是从上层目录（`C:\Program Files\MySQL\MySQL Server 8.0`文件夹）找配置文件，找不到配置数据存放的文件夹的信息就默认存数据的文件夹是是上层文件夹下的data文件夹，这时候上层data文件又不存在，就只有报错了。

# 密码忘了。。
## 解决方法
1. 关闭mysql服务
2. 在一个txt中写修改密码的语句`ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';`
3. 在`C:\Program Files\MySQL\MySQL Server 8.0\bin`文件夹打开cmd
4. 输入`mysqld --init-file=c:change_pwd.txt --console`就修改完成了

# 配置文件（my.ini）在哪里？
`C:\ProgramData\MySQL\MySQL Server 8.0`文件夹下。


# 基本操作

-   `find [目录] [-name 文件名]`：  默认是当前目录。不加 - name，直接写字符串是搜索含有字符串的文件
-   `mkdir 文件夹名`：创建文件夹  
-   `rmdir 文件夹名`：删除文件夹（必须为空）  
-   `ls [-l -a -R]`：l: 详细信息，a: 全部文件，R:(reverse) 显示字文件夹文件  （ll 等于 ls -l，ll -a 等于 ls -la）  

防火墙、端口：

    netstat -an
    lsof -i:80

    sudo ufw allow 80
    sudo ufw reload

进程：

    kill -9 PID号

测试：

    telnet 192.168.1.103 80

# vim

## 复制，粘贴，剪切，删除

-   单行复制：在命令模式下，将光标移动到将要复制的行处，按 “yy” 进行复制；
-   多行复制：在命令模式下，将光标移动到将要复制的首行处，按 “nyy” 复制 n 行；其中 n 为 1、2、3……
-   粘贴：在命令模式下，将光标移动到将要粘贴的行处，按 “p” 进行粘贴
-   直接复制粘贴：命令行模式下输入`开始复制行号, 结束复制行号 co 复制到 N 行后`
-   光标定位复制：\
    光标移到起始行，输入 ma\
    光标移到结束行，输入 mb\
    光标移到粘贴行，输入 mc\
    然后:'a,'b co 'c
-   co 改成 m 就是剪切
-   删除多行：`开始行, 结束行 de`
-   显示行号：:set number（set nu）

## 查找

1.  输入 / 查找内容
2.  回车
3.  n 下一个，N 上一个 

## 去指定行

: 行号：指定行
按 “G”, 即 “shift+g”：最后一行
按两次 “g”：第一行第一个字符
按 “$”，即 “shift+4”：最后一个字符
按 “0”：第一个字符

# 目录

1.  `/`：所有目录挂在其下
2.  `/boot`：存放 Ubuntu 内核和系统启动文件。系统启动时这些文件先被装载。
3.  `/etc`：系统的配置文件目录。密码文件、设置网卡信息、环境变量的设置等都在此目录中，许多网络配置文件也在其中。
4.  `/lib`：根文件系统目录下程序和核心模块的共享库。这个目录里存放着系统最基本的动态链接共享库，类似于 Windows 下的 system32 目录，几乎所有的应用程序都需要用到这些共享库。
5.  `/media`：主要用于挂载多媒体设备。ubuntu 系统自动挂载的光驱、usb 设备，存放临时读入的文件。
6.  `/proc`：这个目录是系统内存的映射，我们可以直接访问这个目录来获取系统信息。也就是说，这个目录的内容不在硬盘上而是在内存里。
7.  `/sbin`：s 就是 Super User 的意思，这里存放的是系统管理员使用的系统管理程序，如系统管理、目录查询等关键命令文件。
8.  `/tmp`：这个目录是用来存放一些临时文件的，所有用户对此目录都有读写权限。
9.  `/home`：用户的主目录。下面是自己定义的用户名的文件夹。每个用户的设置文件，用户的桌面文件夹，还有用户的数据都放在这里。
10. `/mnt`：此目录主要是作为挂载点使用。通常包括系统引导后被挂载的文件系统的挂载点。如挂载 Windows 下的某个分区。

# vsftp

增加用户 test，并制定 test 用户的主目录为 / home/test：
==useradd -d /home/test test==\
为 test 设置密码：
==passwd test==\
更改用户相应的权限设置, 限定用户 test 不能 telnet，只能 ftp：
==usermod -s /sbin/nologin test==\
恢复登录权限：
==usermod -s /bin/bash==\
更改用户 test 的主目录为 / test：
==usermod -d /test test==  

# shell 和 bash

> [shell](https://baike.baidu.com/item/shell)：在计算机科学中，Shell 俗称壳（用来区别于核），是指 “为使用者提供操作界面” 的软件（命令解析器）。\
> [bash](https://baike.baidu.com/item/bash)：bash 是一个为 GNU 计划编写的 Unix shell。

## 执行 sql 语句（MySQL）

1.  单行：`mysql -u 用户名 -p 密码 -e"sql 语句"`
2.  多行：
    ​\
         mysql -u 用户名 -p 密码 \<\<EOF\
           sql 语句
         EOF\
     
3.  文件：`mysql -u 用户名 -p 密码 < 存有 sql 语句的文件`  

## 问题

### '\\r': command not found - .bashrc / .bash_profile

['\\r': command not found - .bashrc / .bash_profile](https://stackoverflow.com/questions/11616835/r-command-not-found-bashrc-bash-profile)

使用 dos2unix 处理脚本文件然后运行（处理掉换行的`\r`）

# 文本（文件）操作

[Linux grep 命令 | 菜鸟教程](http://www.runoob.com/linux/linux-comm-grep.html)

[Linux awk 命令 | 菜鸟教程](http://www.runoob.com/linux/linux-comm-awk.html)

[Linux sed 命令 | 菜鸟教程](http://www.runoob.com/linux/linux-comm-sed.html)

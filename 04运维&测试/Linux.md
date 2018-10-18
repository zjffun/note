# 基本操作
- `find [目录] [-name 文件名]`：  默认是当前目录。不加-name，直接写字符串是搜索含有字符串的文件
- `mkdir 文件夹名`：创建文件夹  
- `rmdir 文件夹名`：删除文件夹（必须为空）  
- `ls [-l -a -R]`：l:详细信息，a:全部文件，R:(reverse)显示字文件夹文件  （ll 等于 ls -l，ll -a 等于 ls -la）  


防火墙、端口：
```
netstat -an
lsof -i:80

sudo ufw allow 80
sudo ufw reload
```

进程：
```
kill -9 PID号
```

测试：
```
telnet 192.168.1.103 80
```


# vim
## 复制，粘贴，剪切，删除
- 单行复制：在命令模式下，将光标移动到将要复制的行处，按“yy”进行复制；
- 多行复制：在命令模式下，将光标移动到将要复制的首行处，按“nyy”复制n行；其中n为1、2、3……
- 粘贴：在命令模式下，将光标移动到将要粘贴的行处，按“p”进行粘贴
- 直接复制粘贴：命令行模式下输入`开始复制行号, 结束复制行号 co 复制到N行后`
- 光标定位复制：  
光标移到起始行，输入ma  
光标移到结束行，输入mb  
光标移到粘贴行，输入mc  
然后:'a,'b co 'c
- co改成m就是剪切
- 删除多行：`开始行, 结束行 de`
- 显示行号：:set number（set nu）

## 查找
1. 输入/查找内容
1. 回车
1. n下一个，N上一个 

## 去指定行
:行号：指定行
按“G”,即“shift+g”：最后一行
按两次“g”：第一行第一个字符
按“$”，即“shift+4”：最后一个字符
按“0”：第一个字符


# rpm
rpm {-q|--query} [select-options] [query-options]  
## 安装：  
rpm -ivh your-package.rpm
## 卸载：
rpm -e your-package
## 查看安装的包：
rpm -qa [| grep your-package]
## 全部选项：  
-a：查询所有套件；  
-b<完成阶段><套件档>+或-t <完成阶段><套件档>+：设置包装套件的完成阶段，并指定套件档的文件名称；  -c：只列出组态配置文件，本参数需配合"-l"参数使用；  
-d：只列出文本文件，本参数需配合"-l"参数使用；  
-e<套件档>或--erase<套件档>：删除指定的套件；  
-f<文件>+：查询拥有指定文件的套件；  
-h或--hash：套件安装时列出标记；  
-i：显示套件的相关信息；  
-i<套件档>或--install<套件档>：安装指定的套件档；  
-l：显示套件的文件列表；  
-p<套件档>+：查询指定的RPM套件档；  
-q：使用询问模式，当遇到任何问题时，rpm指令会先询问用户；  
-R：显示套件的关联性信息；  
-s：显示文件状态，本参数需配合"-l"参数使用； 
-U<套件档>或--upgrade<套件档>：升级指定的套件档；  
-v：显示指令执行过程；  
-vv：详细显示指令执行过程，便于排错。  

# 目录
1. `/`：所有目录挂在其下
2. `/boot`：存放Ubuntu内核和系统启动文件。系统启动时这些文件先被装载。
3. `/etc`：系统的配置文件目录。密码文件、设置网卡信息、环境变量的设置等都在此目录中，许多网络配置文件也在其中。
4. `/lib`：根文件系统目录下程序和核心模块的共享库。这个目录里存放着系统最基本的动态链接共享库，类似于Windows下的system32目录，几乎所有的应用程序都需要用到这些共享库。
5. `/media`：主要用于挂载多媒体设备。ubuntu系统自动挂载的光驱、usb设备，存放临时读入的文件。
6. `/proc`：这个目录是系统内存的映射，我们可以直接访问这个目录来获取系统信息。也就是说，这个目录的内容不在硬盘上而是在内存里。
7. `/sbin`：s就是Super User的意思，这里存放的是系统管理员使用的系统管理程序，如系统管理、目录查询等关键命令文件。
8. `/tmp`：这个目录是用来存放一些临时文件的，所有用户对此目录都有读写权限。
9. `/home`：用户的主目录。下面是自己定义的用户名的文件夹。每个用户的设置文件，用户的桌面文件夹，还有用户的数据都放在这里。
10. `/mnt`：此目录主要是作为挂载点使用。通常包括系统引导后被挂载的文件系统的挂载点。如挂载Windows下的某个分区。

# vsftp
增加用户test，并制定test用户的主目录为/home/test：
==useradd -d /home/test test==  
为test设置密码：
==passwd test==  
更改用户相应的权限设置,限定用户test不能telnet，只能ftp：
==usermod -s /sbin/nologin test==  
恢复登录权限：
==usermod -s /bin/bash==  
更改用户test的主目录为/test：
==usermod -d /test test==  
```
# 忘记用途
cp /etc/skel/.bash_profile /var/www/kcy
cp /etc/skel/.bashrc /var/www/kcy
cp /etc/skel/.bash_logout /var/www/kcy
```
# shell和bash

> [shell](https://baike.baidu.com/item/shell)：在计算机科学中，Shell俗称壳（用来区别于核），是指“为使用者提供操作界面”的软件（命令解析器）。   
> [bash](https://baike.baidu.com/item/bash)：bash 是一个为GNU计划编写的Unix shell。


## 执行mysql
1. 单行：`mysql -u用户名 -p密码 -e"sql语句"`
1. 多行：
        
        mysql -u用户名 -p密码 <<EOF  
          sql语句
        EOF  
        
1. 文件：`mysql -u用户名 -p密码 < 存有sql语句的文件`  

## sed
==sed [sed选项] 'sed定址和命令' file(s)==  
sed是stream editor的缩写，一种流编辑器，它一次处理一行内容。处理时，把当前处理的行存储在临时缓冲区中，称为“模式空间”（pattern space），接着用sed命令处理缓冲区中的内容，处理完成后，把缓冲区的内容送往屏幕。接着处理下一行，这样不断重复，直到文件末尾。文件内容并没有改变，除非你使用重定向存储输出。sed主要用来自动编辑一个或多个文件，简化对文件的反复操作，编写转换程序等。

### sed选项
-n　　使用安静（silent）模式。在一般sed的用法中，所有来自stdin的资料一般都会被列出到屏幕，但如果加上-n参数后，则只有经过sed特殊处理的那一行（或者command）才会被列出来。  
-e　　允许多点编辑。  
-f　　直接将sed的动作写在一个档案内，-f filename 则可以执行filename内的sed动作。  
-r　　sed 的动作支援的是延伸型正规表示法的语法。(预设是基础正规表示法语法)  
-i　　直接修改读取的档案内容，而不是由屏幕输出。  

### sed定址
可以通过定址来定位你所希望编辑的行，该地址用数字构成，用逗号分隔的两个行数表示以这两行为起止的行的范围（包括行数表示的那两行）。如1，3表示1，2，3行，美元符号($)表示最后一行。范围可以通过数据，正则表达式或者二者结合的方式确定 。
|元字符   |功能                              |示例|
|---|---|---|
|^         |行首定位符                        |/^my/ 匹配所有以my开头的行|
|$         |行尾定位符                        |/my$/匹配所有以my结尾的行|
|.         |匹配除换行符以外的单个字符        |/m..y/匹配包含字母m，后跟|两个任意字符，再跟字母y的行
|\*        |匹配零个或多个前导字符            |/my*/匹配包含字母m,后跟零个或多个y字母的行|
|[]        |匹配指定字符组内的任一字符        |/[Mm]y/匹配包含My或my的行|
|[^]       |匹配不在指定字符组内的任一字符    |/[^Mm]y/匹配包含y，但y之|前的那个字符不是M或m的行
|&         |保存查找串以便在替换串中引用      |s/my/\*\*&\*\*/符号&代表查找串。my将被替换为\*\*my\*\*|
|\\<       |词首定位符                        |/\\<my/匹配包含以my开头的单词的行|
|\\>       |词尾定位符                        |/my\\>/匹配包含以my结尾的单词的行|
|x\\{m\\}  |连续m个x                          |/9\\{5\\}/匹配包含连续5个9的行|
|x\\{m,\\} |至少m个x                          |/9\\{5,\\}/匹配包含至少连续5|个9的行
|x\\{m,n\\}|至少m个，但不超过n个x             |/9\\{5,7\\}/匹配包含连续5到7个9的行|
|..        |保存已匹配的字符                  |1,20s/youself/\\1r/标记元字符之间的模式，并将其保存为标签1，之后可以使用\\1来引用它。最多可以定义9个标签，从左边开始编号，最左边的是第一个。此例中，对第1到第20行进行处理，you被保存为标签1，如果发现youself，则替换为your。|

引号转义  
1. sed 's/'"'"/'"''/g' test  用单引号包双引号，双引号包单引号
1. sed s#\'#\"#g test        最外层使用#分隔，里面使用转义单引号，转义双引号
1. sed "s/'/\"/g" test       最外层使用双引号，里面使用单引号，转义双引号

### sed常用命令
1. a\  在当前行后添加一行或多行。多行时除最后一行外，每行末尾需用“\”续行
1. c\  用此符号后的新文本替换当前行中的文本。多行时除最后一行外，每行末尾需用"\"续行
1. i\  在当前行之前插入文本。多行时除最后一行外，每行末尾需用"\"续行
1. d   删除行
1. p   打印行
1. s   用一个字符串替换另一个
1. g   在行内进行全局替换

```
cd /var/www
#clone kcy
git clone git@github.com:1010543618/empty_dimension.git
rm -rf kcy
mv empty_dimension kcy

#install kcy
cd kcy
rm -rf install
#sed -i 修改完直接保存
#删除 index.php 的39-43行
sed -i '39,43d' index.php
#config的26行替换
sed -i '26s/localhost\/empty_dimension/www.kongciyuan.com/' ./application/config/config.php
#database80行替换
sed -i '80s/123456/123456/' ./application/config/database.php
#email的配置修改
mv ./application/config/email_conf.php ./application/config/email.php
sed -i '16s/smtp的授权码/aaaaaaa/' ./application/config/email.php

chmod -R 777 ./

#sql
mysql -uroot -p123456 <<EOF
source /var/www/kcy/kong.sql;
source /var/www/kcy/test.sql;
EOF
```

## 问题
### '\r': command not found - .bashrc / .bash_profile
['\r': command not found - .bashrc / .bash_profile](https://stackoverflow.com/questions/11616835/r-command-not-found-bashrc-bash-profile)

使用dos2unix处理脚本文件然后运行（处理掉换行的`\r`）


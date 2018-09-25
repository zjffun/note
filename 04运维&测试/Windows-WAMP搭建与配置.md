# 使用WampServer整合软件包进行WAMP环境搭建
> WampServer是一款由法国人开发的Apache Web服务器、PHP解释器以及MySQL数据库的整合软件包。免去了开发人员将时间花费在繁琐的配置环境过程，从而腾出更多精力去做开发。  
WampServer就是Windows Apache Mysql PHP集成安装环境，即在window下的apache、php和mysql的服务器软件。

基本上一路下一步就行，以前遇到过少dll的问题，加上dll就好了。以后遇到问题再好好总结一下

# 单独安装进行WAMP环境搭建
## 1.安装apache
直接安装就行  
（apache安装后的默认主页（站点）的位置为：apache的安装位置/htdocs/）
## 2.安装mysql
直接安装就行
## 3.安装php
直接解压就行
## 4.配置apacha运行php
（apache的功能是以“模块化”的方式来运行的，php也是作为apache的其中一个功能模块。）  
apache配置文件所在位置：apche安装目录/conf/ （主配置文件为：httpd.conf）  
在配置文件中添加如下配置：  
```
#"c:/wamp/bin/php/php5.5.12/php5apache2_4.dll"是php解压后的位置
LoadModule php5_module "c:/wamp/bin/php/php5.5.12/php5apache2_4.dll"
<IfModule mime_module>
    AddType application/x-compress .Z
    AddType application/x-gzip .gz .tgz
    AddType application/x-httpd-php .php
    AddType application/x-httpd-php .php3
</IfModule>
```

# 常用配置
## Windows
### 域名解析
hosts文件位置：window操作系统目录/system32/drivers/etc/hosts
```
192.168.1.1		www.abc.com
```
### 设置环境变量
apache的bin目录，和mysql的bin目录配置到环境变量


## Apache

### 检测apache配置文件语法
使用apache/bin/目录中的httpd.exe命令，可以检测apache的配置文件中的语法问题。
```
cd C:\wamp\bin\apache\apache2.4.9\bin
httpd.exe -t
```

### 有关php.ini
指定php.ini的位置：在apache的配置文件httpd.conf中配置PHPIniDir
```
#c:/wamp/bin/php/php5.5.12为php.ini位置
PHPIniDir c:/wamp/bin/php/php5.5.12
```
查看php.ini的位置：使用PHP的phpinfo()函数查看
```
<?php
phpinfo()
```

### 端口监听
httpd.conf
```
Listen 0.0.0.0:80
Listen [::0]:80
```

### 主机（站点)
一个主机（站点），最核心的就两件事（站点的本质就是一个文件夹）：  
主机（站点）的名字：ServerName  “主机名”  
主机（站点）的实际文件夹位置：DocumentRoot  “站点的实际完整路径”  
httpd.conf
```
ServerName discuzx.kong.com1
DocumentRoot "C:/wamp/www"
```

### 配置文件夹访问权限
httpd.conf
```
<Directory />
    #无网页显示文件列表 
    #Options Indexes
    
    #是否允许重写
    AllowOverride none
    
    #所有的请求都被拒绝：
    #2.2上的配置
    #Order deny,allow
    #Deny from all
    #2.4上的配置
    #Require all denied
    #所有请求都是允许的：
    #2.2上的配置
    #Order allow,deny
    #Allow from all
    #2.4上的配置
    #Require all granted
    
    Require all denied
</Directory>
```

### 配置默认网页
```
<IfModule dir_module>
    DirectoryIndex index.php index.php3 index.html index.htm
</IfModule>
```

### 主机别名设置
```
ServerAlias   test.com www.test.cn test.av
```

### 目录别名设置
```
#访问www.test.com/test：将test文件夹映射到C:/wamp/www  
Alias   /test "C:/wamp/www"
```
### 多站点配置
httpd.conf配置文件中打开虚拟主机
```
# Virtual hosts
Include conf/extra/httpd-vhosts.conf
```
apache安装目录\conf\extra\httpd-vhosts.conf中配置虚拟主机
```
<VirtualHost *:80>
    DocumentRoot "C:/wamp/www"
    ServerName 127.0.0.1
	<Directory "C:/wamp/www">
		Options Indexes FollowSymLinks
		AllowOverride all
		Require all granted
		DirectoryIndex index.php
	</Directory>
</VirtualHost>
```

## PHP
### 时区
在php.ini中配置date.timezone
```
date.timezone = PRC
```
### 数据库连接
在php.ini文件中打开mysql模块
```
extension=php_mysql.dll
extension=php_mysqli.dll
```
在php.ini文件中指定模块位置
```
extension_dir = "c:/wamp/bin/php/php5.5.12/ext/"
```

## 问题
### Your Projects下项目无法直接打开
解决：找到www文件夹下的index.php文件，将$projectContents修改为`'http://localhost/'`


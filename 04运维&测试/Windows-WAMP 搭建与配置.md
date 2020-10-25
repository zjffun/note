---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

# 使用 WampServer 整合软件包进行 WAMP 环境搭建

> WampServer 是一款由法国人开发的 Apache Web 服务器、PHP 解释器以及 MySQL 数据库的整合软件包。免去了开发人员将时间花费在繁琐的配置环境过程，从而腾出更多精力去做开发。\
> WampServer 就是 Windows Apache Mysql PHP 集成安装环境，即在 window 下的 apache、php 和 mysql 的服务器软件。

基本上一路下一步就行，以前遇到过少 dll 的问题，加上 dll 就好了。以后遇到问题再好好总结一下

# 单独安装进行 WAMP 环境搭建

## 1. 安装 apache

直接安装就行\
（apache 安装后的默认主页（站点）的位置为：apache 的安装位置 /htdocs/）

## 2. 安装 mysql

直接安装就行

## 3. 安装 php

直接解压就行

## 4. 配置 apacha 运行 php

（apache 的功能是以 “模块化” 的方式来运行的，php 也是作为 apache 的其中一个功能模块。）\
apache 配置文件所在位置：apche 安装目录 /conf/ （主配置文件为：httpd.conf）\
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

hosts 文件位置：window 操作系统目录 /system32/drivers/etc/hosts

```
192.168.1.1		www.abc.com
```

### 设置环境变量

apache 的 bin 目录，和 mysql 的 bin 目录配置到环境变量

## Apache

### 检测 apache 配置文件语法

使用 apache/bin/ 目录中的 httpd.exe 命令，可以检测 apache 的配置文件中的语法问题。

```
cd C:\wamp\bin\apache\apache2.4.9\bin
httpd.exe -t
```

### 有关 php.ini

指定 php.ini 的位置：在 apache 的配置文件 httpd.conf 中配置 PHPIniDir

```
#c:/wamp/bin/php/php5.5.12为php.ini位置
PHPIniDir c:/wamp/bin/php/php5.5.12
```

查看 php.ini 的位置：使用 PHP 的 `phpinfo()` 函数查看

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

一个主机（站点），最核心的就两件事（站点的本质就是一个文件夹）：\
主机（站点）的名字：ServerName “主机名”\
主机（站点）的实际文件夹位置：DocumentRoot “站点的实际完整路径”\
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

httpd.conf 配置文件中打开虚拟主机

```
# Virtual hosts
Include conf/extra/httpd-vhosts.conf
```

apache 安装目录 `\conf\extra\httpd-vhosts.conf` 中配置虚拟主机

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

在 php.ini 中配置 date.timezone

```
date.timezone = PRC
```

### 数据库连接

在 php.ini 文件中打开 mysql 模块

```
extension=php_mysql.dll
extension=php_mysqli.dll
```

在 php.ini 文件中指定模块位置

```
extension_dir = "c:/wamp/bin/php/php5.5.12/ext/"
```

## 问题

### Your Projects 下项目无法直接打开

解决：找到 www 文件夹下的 index.php 文件，将 $projectContents 修改为`'http://localhost/'`

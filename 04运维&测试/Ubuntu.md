---
updated: 'Sat, 04 Jul 2020 04:16:31 GMT'
date: 'Tue, 25 Sep 2018 12:52:45 GMT'
---

# 设置 Swap Space（虚拟内存）

[How To Add Swap Space on Ubuntu 16.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04)

# 查看 Ubuntu 版本

```bash
lsb_release -a
```

或

```bash
cat /etc/issue
```

# 查找软件安装位置

```bash
dpkg -L <packagename>
```

[See Where a Package is Installed on Ubuntu](https://www.howtogeek.com/howto/ubuntu/see-where-a-package-is-installed-on-ubuntu/)

PS: 查看一个命令会执行哪个文件 `which <packagename>`

# Nginx

[Nginx - Community Help Wiki](https://help.ubuntu.com/community/Nginx)

# vsftp

[vsftpd - Community Help Wiki](https://help.ubuntu.com/community/vsftpd)

# Node

```bash
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt install -y nodejs
```

# Yarn

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn
```

# nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

[Install the Latest Node.js and NPM Packages on Ubuntu 16.04 / 18.04 LTS](https://websiteforstudents.com/install-the-latest-node-js-and-nmp-packages-on-ubuntu-16-04-18-04-lts/)

# Apache

```bash
sudo apt-get install apache2
sudo vim /etc/apache2/apache2.conf
sudo vim /etc/apache2/port.conf
sudo vim /etc/apache2/sites-available/000-defaul
sudo /etc/init.d/apache2 restart
```

## https

```bash
    # 开启SSL模块
    a2enmod ssl
    # 这条命令相当于
    # sudo ln -s /etc/apache2/mods-available/ssl.load /etc/apache2/mods-enabled
    # sudo ln -s /etc/apache2/mods-available/ssl.conf /etc/apache2/mods-enabled
    # 如果没有a2enmod指令，也可直接在apache2.conf中设置SSL模块加载：
    # LoadModule ssl_module /usr/lib/apache2/modules/mod_ssl.so
    
    # 创建第三方CA机构签署证书
    # 向第三方提交一个“生成证书请求文件(CSR)”
    openssl genrsa -des3 -out server.key 1024
    # 生成请求文件CSR（Certificate Signing Request）
    openssl req -new -key server.key -out server.csr
    # 自己签发证书
    openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt
    
    # 修改apache配置文件
    ln -s /etc/apache2/sites-available/default-ssl.conf /etc/apache2/sites-enabled/default-ssl.conf
    vim /etc/apache2/sites-enabled/default-ssl.conf
    
    # 在DocumentRoot中加入内容：
    SSLEngine On  
    SSLOptions +StrictRequire  
    SSLCertificateFile crt文件  
    SSLCertificateKeyFile key文件  
```

# php

```
//安装最新版php命令
sudo apt install php

//配置apache2与php命令
sudo apt-get install libapache2-mod-php

//重启apache2命令
sudo /etc/init.d/apache2 restart
```

# MySQL

默认用户名密码位置：`/etc/mysql/debian.cnf`

# VMware 静态 IP

[Configure Static IP Address on Linux VM in VMware Player | DoubleCloud => Private Cloud + Public Cloud](http://www.doublecloud.org/2013/03/configure-static-ip-address-on-linux-vm-in-vmware-player/)

```text
$ sudo vim /etc/network/interfaces
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5)
# The loopback network interface
auto lo
iface lo inet loopback
# The primary network interface
auto eth0
iface eth0 inet static
  address 192.168.47.200
  netmask 255.255.255.0
  broadcast 192.168.47.255
  gateway 192.168.47.2
dns-nameservers 192.168.47.2

## Configure DNS Server
$ vi /etc/resolv.conf
nameserver 192.168.1.1
nameserver 8.8.8.8    # Google's DNS server
```

# Error: ENOSPC: System limit for number of file watchers reached

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

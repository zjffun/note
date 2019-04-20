设置 Swap Space（虚拟内存）：[How To Add Swap Space on Ubuntu 16.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04)

查看 Ubuntu 版本：`cat /etc/issue`

Node：

[Install the Latest Node.js and NPM Packages on Ubuntu 16.04 / 18.04 LTS](https://websiteforstudents.com/install-the-latest-node-js-and-nmp-packages-on-ubuntu-16-04-18-04-lts/)

Apache:

    sudo apt-get install apache2
    sudo vim /etc/apache2/apache2.conf
    sudo vim /etc/apache2/port.conf
    sudo vim /etc/apache2/sites-available/000-defaul
    sudo /etc/init.d/apache2 restart

php：

    //安装最新版php命令
    sudo apt install php

    //配置apache2与php命令
    sudo apt-get install libapache2-mod-php

    //重启apache2命令
    sudo /etc/init.d/apache2 restart

https：

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

MySQL：

    默认用户名密码位置：/etc/mysql/debian.cnf

    apt-cache search # ------(package 搜索包)
    apt-cache show #------(package 获取包的相关信息，如说明、大小、版本等)
    apt-get install # ------(package 安装包)
    apt-get install # -----(package --reinstall 重新安装包)
    apt-get -f install # -----(强制安装, "-f = --fix-missing"当是修复安装吧...)
    apt-get remove #-----(package 删除包)
    apt-get remove --purge # ------(package 删除包，包括删除配置文件等)
    apt-get autoremove --purge # ----(package 删除包及其依赖的软件包+配置文件等（只对6.10有效，强烈推荐）)
    apt-get update #------更新源
    apt-get upgrade #------更新已安装的包
    apt-get dist-upgrade # ---------升级系统
    apt-get dselect-upgrade #------使用 dselect 升级
    apt-cache depends #-------(package 了解使用依赖)
    apt-cache rdepends # ------(package 了解某个具体的依赖,当是查看该包被哪些包依赖吧...)
    apt-get build-dep # ------(package 安装相关的编译环境)
    apt-get source #------(package 下载该包的源代码)
    apt-get clean && apt-get autoclean # --------清理下载文件的存档 && 只清理过时的包
    apt-get check #-------检查是否有损坏的依赖
    dpkg -S filename -----查找filename属于哪个软件包
    apt-file search filename -----查找filename属于哪个软件包
    apt-file list packagename -----列出软件包的内容
    apt-file update --更新apt-file的数据库

    dpkg --info "软件包名" --列出软件包解包后的包名称.
    dpkg -l --列出当前系统中所有的包.可以和参数less一起使用在分屏查看. (类似于rpm -qa)
    dpkg -l |grep -i "软件包名" --查看系统中与"软件包名"相关联的包.
    dpkg -s 查询已安装的包的详细信息.
    dpkg -L 查询系统中已安装的软件包所安装的位置. (类似于rpm -ql)
    dpkg -S 查询系统中某个文件属于哪个软件包. (类似于rpm -qf)
    dpkg -I 查询deb包的详细信息,在一个软件包下载到本地之后看看用不用安装(看一下呗).
    dpkg -i 手动安装软件包(这个命令并不能解决软件包之前的依赖性问题),如果在安装某一个软件包的时候遇到了软件依赖的问题,可以用apt-get -f install在解决信赖性这个问题.
    dpkg -r 卸载软件包.不是完全的卸载,它的配置文件还存在.
    dpkg -P 全部卸载(但是还是不能解决软件包的依赖性的问题)
    dpkg -reconfigure 重新配置


    apt-get install
    下载软件包，以及所有依赖的包，同时进行包的安装或升级。如果某个包被设置了 hold (停止标志，就会被搁在一边(即不会被升级)。更多 hold 细节请看下面。
    apt-get remove [--purge]
    移除 以及任何依赖这个包的其它包。
    --purge 指明这个包应该被完全清除 (purged) ，更多信息请看 dpkg -P。

    apt-get update
    升级来自 Debian 镜像的包列表，如果你想安装当天的任何软件，至少每天运行一次，而且每次修改了
    /etc/apt/sources.list 後，必须执行。

    apt-get upgrade [-u]
    升 级所有已经安装的包为最新可用版本。不会安装新的或移除老的包。如果一个包改变了依赖关系而需要安装一个新的包，那么它将不会被升级，而是标志为 hold。apt-get update 不会升级被标志为 hold 的包 (这个也就是 hold 的意思)。请看下文如何手动设置包为 hold。我建议同时使用 '-u' 选项，因为这样你就能看到哪些包将会被升级。

    apt-get dist-upgrade [-u]
    和 apt-get upgrade 类似，除了 dist-upgrade 会安装和移除包来满足依赖关系。因此具有一定的危险性。

    apt-cache search
    在软件包名称和描述中，搜索包含xxx的软件包。

    apt-cache show
    显示某个软件包的完整的描述。

    apt-cache showpkg
    显示软件包更多细节，以及和其它包的关系。

    dselect
    console-apt
    aptitude
    gnome-apt
    APT 的几个图形前端(其中一些在使用前得先安装)。这里 dselect 无疑是最强大的，也是最古老，最难驾驭。

    普通 Dpkg 用法
    dpkg -i
    安装一个 Debian 包文件，如你手动下载的文件。

    dpkg -c
    列出 的内容。

    dpkg -I
    从 中提取包信息。

    dpkg -r
    移除一个已安装的包。

    dpkg -P
    完全清除一个已安装的包。和 remove 不同的是，remove 只是删掉数据和可执行文件，purge 另外还删除所有的配制文件。

    dpkg -L
    列出 安装的所有文件清单。同时请看 dpkg -c 来检查一个 .deb 文件的内容。

    dpkg -s
    显示已安装包的信息。同时请看 apt-cache 显示 Debian 存档中的包信息，以及 dpkg -I 来显示从一个 .deb 文件中提取的包信息。

    dpkg-reconfigure
    重 新配制一个已经安装的包，如果它使用的是 debconf (debconf 为包安装提供了一个统一的配制界面)。你能够重新配制 debconf 它本身，如你想改变它的前端或提问的优先权。例如，重新配制 debconf，使用一个 dialog 前端，简单运行：

    dpkg-reconfigure --frontend=dialog debconf (如果你安装时选错了，这里可以改回来哟：)

    echo " hold" | dpkg --set-selections
    设置 的状态为 hlod (命令行方式)

    dpkg --get-selections ""
    取的 的当前状态 (命令行方式)

    支持通配符，如：
    Debian:~# dpkg --get-selections *wine*
    libwine hold
    libwine-alsa hold
    libwine-arts hold
    libwine-dev hold
    libwine-nas hold
    libwine-print hold
    libwine-twain hold
    wine hold
    wine+ hold
    wine-doc hold
    wine-utils hold

    dpkg -S
    在包数据库中查找 ，并告诉你哪个包包含了这个文件。(注：查找的是事先已经安装的包)

# 写在前面的话

虚拟私人网络（virtual private network (VPN) ）利用隧道协议（Tunneling Protocol）来达到保密、发送端认证、消息准确性等私人消息安全效果，这种技术可以用不安全的网络（例如：互联网）来发送可靠、安全的消息。

写这个文章主要是整理一下搭建 VPN 的流程，基本只要三步就可以：

1.  租一台服务器（需要特殊服务可以租国外的）
2.  服务器上运行一条命令
3.  客户端配置一下

# 租 VULTR 服务器

## 1. 注册

据说总是有活动，大家可以先搜下活动再注册。（下面是一个推广的连接，在这里注册并付费会给**我**$10，给您增加大量人品）
<https://www.vultr.com/?ref=7791789>

## 2. 充值

最低冲 $10（60 多人民币）。

## 3. 租用服务器

一开始我是选择的日本的服务器 ping 不通，换成美国的就好了。

最好选择以下版本的服务器（下面搭建 VPN 的脚本在以下服务器上测试过）：

-   Ubuntu 18.04/16.04/14.04
-   Debian 9/8
-   CentOS 7/6

## 4. 测试

测试是否可以 ping 通服务器的 IP`ping IP`，ping 不通可以删除然后换一台（VULTR 是按时长计费，删除再换是没有额外费用的）

其他：
`tracert IP`可以查看经过的路由

# 搭建 VPN

我是按照[setup-ipsec-vpn/README-zh.md at master · hwdsl2/setup-ipsec-vpn](https://github.com/hwdsl2/setup-ipsec-vpn/blob/master/README-zh.md)进行搭建的，下面是一个及其简单的过程，因为只有一行命令（复杂的使用请参看上面的连接）。

在服务器上运行：

-   Ubuntu LTS, Debian：

<!---->

    wget https://git.io/vpnsetup -O vpnsetup.sh && sudo sh vpnsetup.sh

-   CentOS：

<!---->

    wget https://git.io/vpnsetup-centos -O vpnsetup.sh && sudo sh vpnsetup.sh

运行完毕最后会输出如下信息

    Psec VPN server is now ready for use!

    Connect to your new VPN with these details:

    Server IP: xxx
    IPsec PSK: xxx
    Username: xxx
    Password: xxx

    Write these down. You'll need them to connect!

    Important notes:   https://git.io/vpnnotes
    Setup VPN clients: https://git.io/vpnclients

记录下 VPN 的凭据（Server IP、IPsec PSK、Username、Password）

# 使用 VPN

[setup-ipsec-vpn/clients-zh.md at master · hwdsl2/setup-ipsec-vpn](https://github.com/hwdsl2/setup-ipsec-vpn/blob/master/docs/clients-zh.md)
这篇文章已经写得很好了，我这里就不再复读了，window 下注意修改注册表就好了。

# 其他问题

## 使用 VPN 会消耗更多流量么？

会的，因为有加密开销，数据使用量增加约 10%。越强的加密加密开销越大。

# 参考

> -   [Does VPN Use More Data than Conventional Usage? - The VPN Guru](https://thevpn.guru/does-vpn-use-more-data-than-normal/)

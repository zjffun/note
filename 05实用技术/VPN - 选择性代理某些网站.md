---
updated: 'Wed, 20 May 2020 12:00:17 GMT'
date: 'Wed, 15 May 2019 15:23:59 GMT'
---

这个分到 VPN 类里并不对，不过很多人搜索的时候可能都带着这个关键字。其实下面描述的主要是一种选择性代理代理网站的方法，主要还是用在网站开发时进行本地测试。

代理有两种方式一种是 PAC（[Proxy auto-config - Wikipedia](https://en.wikipedia.org/wiki/Proxy_auto-config)），一种是全局，明白这个两个概念就可以开始使用下面的软件了

# 使用 [shadowsocks](https://github.com/shadowsocks/shadowsocks/wiki/Ports-and-Clients#linux--server-side)

## 安装服务端

[shadowsocks/shadowsocks-libev: libev port of shadowsocks](https://github.com/shadowsocks/shadowsocks-libev#docker)

我是直接用 Docker 装的，注意：加密方式没有配置默认是`ase-256-gcm`，记得改客户端的加密方式配置

```
docker pull shadowsocks/shadowsocks-libev
docker run -e PASSWORD=<password> -p<server-port>:8388 -p<server-port>:8388/udp -d shadowsocks/shadowsocks-libev
```

## 安装客户端

[Ports and Clients · shadowsocks/shadowsocks Wiki](https://github.com/shadowsocks/shadowsocks/wiki/Ports-and-Clients#linux--server-side)

选择环境装上配置就行，注意配置加密方式

## 填坑

[failed to handshakefailed to handshake with xxx: authentication error · Issue #2373 · shadowsocks/shadowsocks-libev](https://github.com/shadowsocks/shadowsocks-libev/issues/2373)

# 使用 [Project V 的 V2Ray](https://www.v2ray.com/)

[V2Ray 配置指南 | 新 V2Ray 白话文指南](https://guide.v2fly.org/)

## 服务端

安装：

```bash
bash <(curl -L -s https://install.direct/go.sh)
```

配置：

```bash
vim /etc/v2ray/config.json
```

默认会配置好 vmess 直接用就行，如果要用 shadowsocks 需要加几行配置。

```json
{
  "inbounds": [
  ...
  {
    "port": xxx, 
    "protocol": "shadowsocks",
    "settings": {
      "method": "aes-256-gcm",
      "password": "xxx"
    }
  }]
}
```

使用：

```bash
service v2ray start|stop|status|reload|restart|force-reload
```

## 客户端

可以使用[v2ray](https://github.com/v2ray/v2ray-core/releases)，或者 Shadowsocks 等客户端。

下载安装：

```bash
bash <(curl -L -s https://install.direct/go.sh)
```

配置（vmess 协议）：

```bash
{
  "inbounds": [{
    "port": 1080,
    "listen": "127.0.0.1",
    "protocol": "socks",
    "settings": {
      "udp": true
    }
  }],
  "outbounds": [{
    "protocol": "vmess",
    "settings": {
      "vnext": [{
        "address": "SERVER",
        "port": PORT,
        "users": [{ "id": "xxx" }]
      }]
    }
  },{
    "protocol": "freedom",
    "tag": "direct",
    "settings": {}
  }],
  "routing": {
    "domainStrategy": "IPOnDemand",
    "rules": [{
      "type": "field",
      "ip": ["geoip:private"],
      "outboundTag": "direct"
    }]
  }
}
```

---
updated: 'Sun, 14 Nov 2021 06:30:52 GMT'
date: 'Wed, 15 May 2019 15:23:59 GMT'
---

这个分到 VPN 类里并不对，不过很多人搜索的时候可能都带着这个关键字。其实下面描述的主要是一种选择性代理代理网站的方法，主要还是用在网站开发时进行本地测试。

代理有两种方式一种是 PAC（[Proxy auto-config - Wikipedia](https://en.wikipedia.org/wiki/Proxy_auto-config)）（只代理部分网站），一种是全局（代理全部网站），明白这个两个概念就可以开始使用下面的软件了。

# 使用 [V2Ray](https://www.v2ray.com/)

[V2Ray 配置指南 | 新 V2Ray 白话文指南](https://guide.v2fly.org/)

## 服务端

下面这个是在 Ubuntu 上安装的例子，其他系统也类似，思路是：

1.  安装 V2Ray
2.  配置 V2Ray
3.  配置 nginx（数据先进入 nginx，由 ngxin 代理进入 V2Ray）
4.  配置防火墙
5.  配置开机自启
6.  启动 V2Ray

安装：

```bash
bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
```

配置：

```bash
cd ~
ln -s /usr/local/etc/v2ray/config.json v2rayconfig

cat > v2rayconfig <<EOF
{
  "log": {
    "loglevel": "info",
    "access": "/var/log/v2ray/access.log",
    "error": "/var/log/v2ray/error.log"
  },
  "inbounds": [
    {
      "port": 1024,
      "protocol": "shadowsocks",
      "settings": {
        "method": "aes-256-gcm",
        "password": "your-pwd"
      }
    },
    {
      "port": 1025,
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "5b60bbac-4440-11ec-81d3-0242ac130003",
            "alterId": 64
          }
        ]
      }
      "streamSettings": {
        "network": "ws",
        "wsSettings": {
          "path": "/vws"
        }
      },
      "listen": "127.0.0.1"
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
    }
  ]
}
EOF

# 证书
cd /etc/nginx
openssl genrsa -out key.pem 2048
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -in csr.pem -signkey key.pem -out cert.pem

# 配置 nginx
cat > /etc/nginx/sites-available/ss <<EOF
server
{
  listen 443 ssl default_server;
  listen [::]:443 ssl default_server;

  ssl_certificate /etc/nginx/cert.pem;
  ssl_certificate_key /etc/nginx/key.pem;
  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

  root /var/www/html;

  # Add index.php to the list if you are using PHP
  index index.html index.htm index.nginx-debian.html;

  server_name _;

  location /vws
  {
    # 与 V2Ray 配置中的 path 保持一致
    proxy_redirect off;
    proxy_pass http://127.0.0.1:1025;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    # Show real IP in v2ray access.log
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  location /
  {
    try_files $uri $uri/ =404;
  }
}
EOF

# 防火墙

ufw allow 1024
ufw allow 443

# 开机自启

systemctl enable v2ray

# 启动服务

service v2ray start

```

使用：

```bash
service v2ray start|stop|status|reload|restart|force-reload
```

## 客户端

### ClashX

Config -> Open config folder -> 新建配置文件

```yaml
---
#---------------------------------------------------#
## 配置文件需要放置在 $HOME/.config/clash/*.yaml

## 这份文件是clashX的基础配置文件，请尽量新建配置文件进行修改。
## ！！！只有这份文件的端口设置会随ClashX启动生效

## 如果您不知道如何操作，请参阅 官方Github文档 https://github.com/Dreamacro/clash/blob/dev/README.md
#---------------------------------------------------#

# (HTTP and SOCKS5 in one port)
mixed-port: 7890
# RESTful API for clash
external-controller: 127.0.0.1:9090
allow-lan: false
mode: rule
log-level: warning

proxies:
  # Shadowsocks
  - name: "ss - yourhost"
    type: ss
    server: yourhost
    port: 1024
    cipher: aes-256-gcm
    password: your-pwd
    # udp: true

  # VMess
  - name: "v2ray - yourhost"
    type: vmess
    server: yourhost
    port: 443
    uuid: 5b60bbac-4440-11ec-81d3-0242ac130003
    alterId: 64
    cipher: auto
    # udp: true
    tls: true
    skip-cert-verify: true
    # tls-hostname: 填写伪装域名
    network: ws
    ws-path: /vws
    ws-headers:
      Host: yourhost

proxy-groups:

rules:
  - DOMAIN-SUFFIX,google.com,DIRECT
  - DOMAIN-KEYWORD,google,DIRECT
  - DOMAIN,google.com,DIRECT
  - DOMAIN-SUFFIX,ad.com,REJECT
  - GEOIP,CN,DIRECT
  - MATCH,DIRECT
```

### Shadowsocks

按服务端的 inbounds 配置即可。

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

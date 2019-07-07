# 1. 创建证书

进入要建立 HTTPS 服务的目录

```bash
openssl genrsa -out key.pem 1024
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -in csr.pem -signkey key.pem -out cert.pem
```

# 2. 启动服务

```bash
http-server -S ./
```

PS：这种没有经过机构验证证书浏览器会有提示信任了就好

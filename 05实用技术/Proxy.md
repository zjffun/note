---
date: 'Sun, 01 May 2022 10:09:39 GMT'
updated: 'Sun, 01 May 2022 10:10:08 GMT'
---

# cURL

```sh
curl --proxy 127.0.0.1:1080 https:///www.example.net/
```

```sh
curl --socks5 127.0.0.1:7890 https:///www.example.net/
```

# Git

```sh
git config --global http.proxy 'socks5://127.0.0.1:7890'
git config --global https.proxy 'socks5://127.0.0.1:7890'
```

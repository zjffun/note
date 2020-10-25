---
updated: 'Mon, 21 Jan 2019 14:24:27 GMT'
date: 'Mon, 21 Jan 2019 14:24:27 GMT'
---

# 安装 Express 和 http-proxy

```bash
npm install --save express http-proxy
```

# 反向代理代码

proxy.js

```javascript
var express = require('express');
var app = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var serverOne = 'http://localhost:3001',
    ServerTwo = 'http://localhost:3002';

// 访问 http://localhost:3000/server1 时，代理 http://localhost:3001/server1
app.all("/server1", function(req, res) {
    apiProxy.web(req, res, {
        target: serverOne
    });
});

// 访问 http://localhost:3000/server2 时，代理 http://localhost:3002/server2
app.all("/server2", function(req, res) {
    apiProxy.web(req, res, {
        target: ServerTwo
    });
});

// 访问 http://localhost:3000/xxx 时，代理 http://localhost:3001/xxx
app.all("/*", function(req, res) {
    apiProxy.web(req, res, {
        target: serverOne
    });
});

app.listen(3000);
```

# 服务代码

server.js

```javascript
const express = require('express');
const server = express();
const server2 = express();
server.get('/*', function(req, res) {
    res.send(`Hello world From Server 1 <br> req.path : ${req.path}`);
});
server2.get('/*', function(req, res) {
    res.send(`Hello world From Server 2 <br> req.path : ${req.path}`);
});

// serverOne
server.listen(3001);
// ServerTwo
server2.listen(3002);
```

# 测试

1.  分别启动 server.js 和 proxy.js：`node proxy`，`node server`
2.  浏览器访问`http://localhost:3000/server1`等地址进行测试

# 参考

[Reverse proxy using ExpressJS – Codeforgeek](https://codeforgeek.com/2015/12/reverse-proxy-using-expressjs/)

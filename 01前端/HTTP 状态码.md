# 1xx Informational（信息）

## 100 Continue（继续）

## 101 Switching Protocols（交换协议）

切换 WebSocket 时，响应状态码，eg：

```
"request": {
  "bodySize": 0,
  "method": "GET",
  "url": "WebSocket URL",
  "httpVersion": "HTTP/1.1",
  "headers": [
    ...,
    {
      "name": "Upgrade",
      "value": "websocket"
    },
    {
      "name": "Sec-WebSocket-Version",
      "value": "13"
    },
    {
      "name": "Sec-WebSocket-Extensions",
      "value": "permessage-deflate"
    },
    {
      "name": "Sec-WebSocket-Key",
      "value": "wpvl/9Lq/I1OVCq29ng0aw=="
    },
    {
      "name": "Connection",
      "value": "keep-alive, Upgrade"
    }
  ],
  "cookies": [],
  "queryString": [],
  "headersSize": 567
},
"response": {
  "status": 101,
  "statusText": "Switching Protocols",
  "httpVersion": "HTTP/1.1",
  "headers": [
    {
      "name": "Upgrade",
      "value": "websocket"
    },
    {
      "name": "Connection",
      "value": "Upgrade"
    },
    {
      "name": "Sec-WebSocket-Accept",
      "value": "yJPzwR/pNqLYZDkRObIeX4opAY4="
    }
  ],
  ...
},
```

# 2xx Successful（成功）

## 200 OK（成功）

## 201 Created（创建）

## 202 Accepted（接受）

## 203 Non-Authoritative Information（非权威信息）

## 204 No Content（无内容）

## 205 Reset Content（重置内容）

## 206 Partial Content（部分内容）

# 3xx Redirection（重定向）

## 300 Multiple Choices（多种选择）

## 301 Moved Permanently（永久移动）

## 302 Found（找到）

## 303 See Other（见其他）

## 304 Not Modified（未修改）

当向服务器请求 “浏览器已经缓存但过期的文件” 时，如果返回 304 则继续使用该文件。

## 305 Use Proxy（使用代理）

## 306 (Unused)（不再使用）

## 307 Temporary Redirect（临时重定向）

# 4xx Client Error（客户端错误）

## 400 Bad Request（错误请求）

## 401 Unauthorized（未经授权）

用于身份验证，请求头中要包含`Authorization`进行验证，验证失败返回 401 和诊断信息

## 402 Payment Required（付款要求）

## 403 Forbidden（禁止）

## 404 Not Found（未找到）

## 405 Method Not Allowed（不允许的方法）

## 406 Not Acceptable（不可接受）

## 407 Proxy Authentication Required（需要代理身份验证）

## 408 Request Timeout（请求超时）

## 409 Conflict（冲突）

## 410 Gone（过时）

## 411 Length Required（需要长度）

## 412 Precondition Failed（前提条件失败）

## 413 Request Entity Too Large（请求实体太大）

## 414 Request-URI Too Long（Request-URI 太长）

## 415 Unsupported Media Type（不支持的媒体类型）

## 416 Requested Range Not Satisfiable（请求的范围不满足）

## 417 Expectation Failed（无法满足期望）

# 5xx Server Error（服务器错误）

## 500 Internal Server Error（内部服务器错误）

## 501 Not Implemented（未实施）

## 502 Bad Gateway（无效网关）

## 503 Service Unavailable（服务不可用）

## 504 Gateway Timeout（网关超时）

## 505 HTTP Version Not Supported（不支持 HTTP 版本）

# 参考

[HTTP/1.1: Status Code Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

# 请求协议

## 请求行：request_line

请求数据的第一行，用来说明当前请求的最基本信息。

    GET /index.php?p=back HTTP/1.1CRLF

由三块组成：

1.  方式资源地址（没有域名）
2.  协议版本
3.  `\r\n`（回车换行 CRLF）

## 请求头：request_header

浏览器需要传输给服务器的属性数据  

-   主机，请求的主机。用于标识一台 web 服务器上的其中一个虚拟主机的。
    `Host: shop.kang.com`
-   用户代理 UA，什么发出的请求。
    `User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:35.0) Gecko/20100101 Firefox/35.0`
-   可以接受的内容类型
    `Accept: text/html,application/xhtml+xml,application/xml;q=0.9,_/_;q=0.8`
-   可以接受的语言（php 中用 \``$_SERVICE['HTTP_ACCEPT_LANGUAGE']`接收，做多语言处理）
    `Accept-Language: zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3`
-   可以接受的数据编码类型（压缩编码）
    `Accept-Encoding: gzip, deflate`
-   携带的 Cookie 数据
    `Cookie: PHPSESSID=i76sa2297sp1adlfk3e4eja612`
-   tcp 连接类型 keep-alive 保持激活
    `Connection: keep-alive`
-   保持连接的时间段秒
    `Keep-Alive: 30`
-   缓存控制选项
    `Pragma: no-cache` 或 `Cache-Control: no-cache`

注意语法格式：

1.  头由标识与内容组成，使用冒号分隔（标识与冒号间不能存在空格）
2.  每个头占用一行，行结尾，使用 CRLF（回车换行`\r\n`）
3.  可以存在多个头
4.  头信息结束使用空行标志

## 请求主体：request_content

POST 数据。如果方式为 POST，则需要请求主体部分（GET 没有请求主体）

## 操作请求

通过浏览器所携带属性，完成特定功能

# 响应协议

## 响应行

响应数据的第一行，响应结果的概述 

    http/1.1 302 FoundCRLF

由三块组成：

1.  版本响应状态码响应消息
2.  响应状态码
    -   302 Found：重定向，配合响应头 - Location 使用  
    -   404 Not Found：请求资源不存在 -  
    -   403 Forbidden：没有权限访问该 - 地址  
    -   200 ok：请求成功  
    -   500 Server Internal Error：服务器内部错误  
3.  和响应消息

## 响应头

服务器告知浏览器属性信息。

## 响应主体

主体数据（通过浏览器的查看源代码所看到的内容）

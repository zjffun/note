---
date: 'Thu, 14 Nov 2019 15:38:37 GMT'
updated: 'Wed, 10 Feb 2021 06:30:04 GMT'
---

|                   | 使用 | 层次                    |
| ----------------- | -- | --------------------- |
| Fiddler / Charles | 简单 | 第七层应用层的 HTTP (S) 协议的包 |
| Wireshark         | 复杂 | 第三层网络层的包              |

注意：Fiddler / Charles 只能抓到走**系统代理**的流量。不走系统代理的流量（比如浏览器选择 “不使用代理”）它抓不到。

# Fiddler

-   [fiddler 配置及使用教程 - purplelavender - 博客园](https://www.cnblogs.com/woaixuexi9999/p/9247705.html)
-   [使用 Fiddler 抓取 Android 模拟器中的 Android_APP 请求 - ALonely - 博客园](https://www.cnblogs.com/alonely/p/9504912.html)
-   [fidder4 对安卓模拟器抓包 - yf0523 的博客 - CSDN 博客](https://blog.csdn.net/yf0523/article/details/81122765)

# Charles

-   [Charles 注册码 - 简书](https://www.jianshu.com/p/893d8605e04f)

# Wireshark

-   过滤两个 IP 之间的数据传输 `(ip.src == 10.252.60.xxx && ip.dst == 172.29.57.xxx) || (ip.src == 172.29.57.xxx && ip.dst == 10.252.60.xxx)`

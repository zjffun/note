---
updated: 'Sat, 15 Feb 2020 03:21:20 GMT'
date: 'Tue, 11 Feb 2020 12:03:08 GMT'
---

-   Fetch 请求默认是不带 Cookie 的，需要设置`fetch(url, {credentials: 'include'})`
-   服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。

[传统 Ajax 已死，Fetch 永生 - 会影 - SegmentFault 思否](https://segmentfault.com/a/1190000003810652)

> 同源策略（Same-origin policy）：<https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy>
>
> 跨域资源共享（Cross-Origin Resource Sharing）：<https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS>

对于前端工具搭建了服务器产生的同源问题可是尝试使用代理，例如：[前端工具 - 浏览器同步测试（自动刷新、热刷新、热加载）](https://note.youdao.com/)

同源问题真是时不时就得坑一把啊，刚刚 iframe 的 src 填了一个相对路径的 pdf 文件结果发现无法访问其 document 对象，报错`SecurityError: Permission denied to access property "document" on cross-origin object`（用的相对路径居然报跨域的错。。），进一步测试发现 Chrome 没有问题，应该是 FF 的 bug 或者 feature 吧。。

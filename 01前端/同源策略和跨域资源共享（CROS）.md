# 同源策略

[Same-origin policy - Web security | MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

# 跨站资源共享

[Cross-Origin Resource Sharing (CORS) - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

这四种资源受 CORS 机制影响：

1.  Invocations of the XMLHttpRequest or Fetch APIs in a cross-site manner, as discussed above.
2.  Web Fonts (for cross-domain font usage in @font-face within CSS), so that servers can deploy TrueType fonts that can only be cross-site loaded and used by web sites that are permitted to do so.
3.  WebGL textures.
4.  Images/video frames drawn to a canvas using drawImage().

# 进行跨域请求

一般有这三种方法：

1.  使用代理
2.  响应头设置`Access-Control-Allow-Origin`
3.  JSONP：只支持 GET，用 script 标签的特性请求一个地址执行返回的代码

# Firefox 使用 pdf 时遇到的有关同源策略的坑

同源问题真是时不时就得坑一把啊，刚刚 iframe 的 src 填了一个相对路径的 pdf 文件结果发现无法访问其 document 对象，报错`SecurityError: Permission denied to access property "document" on cross-origin object`（用的相对路径居然报跨域的错。。），进一步测试发现 Chrome 没有问题，应该是 FF 的 bug 或者 feature 吧。。

刚刚查了下这个是 14 年就有人提出的问题，问题在于 pdf.js 修改了 domain，但一直没有修复[Unable to Print PDF when loaded in iFrame · Issue #5397 · mozilla/pdf.js](https://github.com/mozilla/pdf.js/issues/5397)

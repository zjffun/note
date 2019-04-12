# 第一章 HTML5 概述

## 开发 HTML5 的组织

-   [Web Hypertext Application Technology Working Group (WHATWG)](https://whatwg.org/)：开发 HTML 和 Web 应用 API。
-   [World Wide Web Consortium (W3C)](https://www.w3.org/)：W3C 下的 HTML 工作组负责 HTML5 规范。
-   [IETF | Internet Engineering Task Force](https://www.ietf.org/)：负责 Internext 协议、WebSocket 协议。

## 检查浏览器支持情况

[Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/)

## 页面四角缎带效果

示例：[Corner Ribbons](https://codepen.io/1010543618/pen/yrJvyr)

-   最左上角：绝对定位的元素超出页面的左边和上边不会撑开页面直接隐藏掉了，所以最左上角可以直接使用绝对定位作出缎带效果。
-   其他三个角：绝对定位的元素超出页面的右边和下边会撑开页面，所以对于其他三个角要使用`overflow: hidden;`或 `position: fixed;`作出缎带效果。

# 第二章 Canvas API

## 热力图

示例：[Canvas heat mapping](https://codepen.io/1010543618/pen/oOLJvR)

## 全页玻璃窗

“玻璃窗”（glass pane）可以用作新手指导，一步步地教他们如何操作。

（感觉用 SVG 做玻璃窗更好，SVG 可以知道用户点击了哪个元素，而 Canvas 只能知道点击的坐标。）

# 第三章 音频和视频

## 容器（container）文件和编解码器（codec）

视频文件和音频文件都是容器文件，里面包含着数据（视频、音频、字幕等）和元数据（封面、标题、字幕语言等）。参见：[Digital container format - Wikipedia](https://en.wikipedia.org/wiki/Digital_container_format)

编码 / 解码器是一组算法，用于对一段特性的音频或视频流进行编码和解码。原始媒体文件非常大，如果不对其编码需要大量的空间进行存储，和大量的事件进行传输。参见：[Codec - Wikipedia](https://en.wikipedia.org/wiki/Codec)

## 备选内容

可以在 audio 和 video 中放入备选内容，备选内容可以是其他源、其他显示视屏的方式和提示等。例如：

```html
<!-- 其他源 -->
<!-- Using multiple sources as fallbacks for a video tag -->
<!-- 'Elephants Dream' by Orange Open Movie Project Studio, licensed under CC-3.0, hosted by archive.org -->
<!-- Poster hosted by Wikimedia -->
<video width="620" controls
  poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg" >
  <source
    src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
    type="video/mp4">
  <source
    src="https://archive.org/download/ElephantsDream/ed_hd.ogv"
    type="video/ogg">
  <source
    src="https://archive.org/download/ElephantsDream/ed_hd.avi"
    type="video/avi">
  Your browser doesn't support HTML5 video tag.
</video>
```

```html
<!-- 其他播放视屏的方式 -->
<!-- Simple video example -->
<!-- 'Big Buck Bunny' licensed under CC 3.0 by the Blender foundation. Hosted by archive.org -->
<!-- Poster from peach.blender.org -->
<video controls
  src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
  width="620">

  <object data="movie.swf" type="application/x-shockwave-flash">
    <param name="foo" value="bar">
  </object>

</video>
```

```html
<!-- 提示 -->
<!-- Simple video example -->
<!-- 'Big Buck Bunny' licensed under CC 3.0 by the Blender foundation. Hosted by archive.org -->
<!-- Poster from peach.blender.org -->
<video controls
  src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
  width="620">

Sorry, your browser doesn't support embedded videos, 
but don't worry, you can <a href="https://archive.org/details/BigBuckBunny_124">download it</a> 
and watch it with your favorite video player!

</video>
```

## video 元素 + canvas

# 第四章 Geolocation API

目前有两种类型的定位请求 API：单次定位请求`navigator.geolocation.getCurrentPosition(cb, ?errCb, ?option)`和重复性的位置更新请求`navigator.geolocation.watchPosition(cb, ?errCb, ?option)`。

## 位置信息

| 地理定位数据       | 优点            | 缺点                      |
| ------------ | ------------- | ----------------------- |
| IP 地址地理定位数据  | 任何地方都可以用      | 不精确（一般用户的 IP 都是 ISP 提供） |
| GPS 地理定位数据   | 精确            | 需要额外的设备，室内定位效果不好        |
| Wi-FI 地理定位数据 | 精确，可以在室内使用    | 无线接入点少的区域效果不好           |
| 基站地理定位数据     | 精确，可以在室内使用    | 基站少的地方效果不好              |
| 用户自定义的地理定位数据 | 允许用户输入详细的位置信息 | 可能很不准确，特别当用户位置变更后       |

## 根据经纬度计算地球两点距离

例如：

```javascript
navigator.geolocation.getCurrentPosition((pos) => {
	let dis = haversineDistance([0, 0], [pos.coords.longitude, pos.coords.latitude])
	console.log(`It's ${dis} km from [0, 0]`)
})

function haversineDistance(coords1, coords2, isMiles/* 英里 */) {
  function toRad(x) {
    return x * Math.PI / 180;
  }

  var lon1 = coords1[0];
  var lat1 = coords1[1];

  var lon2 = coords2[0];
  var lat2 = coords2[1];

  var R = 6371; // km

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  if(isMiles) d /= 1.60934;

  return d;
}
```

参见：[Haversine formula - Wikipedia](https://en.wikipedia.org/wiki/Haversine_formula)、[Using the Haversine Formula in Javascript - Stack Overflow](https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript)

# 第五章 Communication API

## 跨文档消息通信

早期的 postMessage 仅支持字符串，后来支持 JS 对象、canvas imageData 和文件等其他类型的数据。

## 保证内容不被加载到 iframe 中（Framebusting）

```javascript
if(window !== window.top){
  window.top.location = location;
}
```

# 第六章 WebSockets API

使用长轮询或 HTTP 流的方式实现 Comet，或者使用[EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)可以让服务端主动向客户端推数据，但这些方式都是使用 HTTP 通信消耗很大。HTTP 技术不是为了实现全双工通信设计的。

## WebSocket 握手

为了建立 WebSocket 通信，客户端和服务端在初始握手时将 HTTP 协议升级到 WebSocket 协议。

一旦连接建立成功客户端和服务端就可以在全双工模式下传递 WebSocket 消息。消息以`0x00`开头、`0xff`结尾，中间采用 UTF-8 编码格式。

# 第七章 Forms API

移动端的键盘布局会根据`input`的类型而改变

`autocomplete`属性可以用来保护敏感的用户数据（控制浏览器是否存储这个数据）

参见：

-   [`<form>` - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
-   [HTMLFormElement - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)

# 第八章 Web Workers API

使用 Web Workers API 执行耗时的任务可以防止页面弹出脚本运行时间过长的提示框，和防止 UI 阻塞（用户界面无法对操作做出响应）。

# 第九章 Web Storage API

## sessionStorage

sessionStorage 同会话中共享，并且浏览器关闭失效，那么他到底有什么用呢？

sessionStorage 中的数据不会存很久，所以开发人员不会把真正有价值的东西放在里面。但 sessionStorage 有一个非常适用的地方就是存储作用域为一个会话的数据。例如：

当用户正在填写一个分步表单时，打开一个新窗口想要填写一个新的分步表单，如果用户填写过的信息存储在 cookie 或者 localStorage 中就需要比较复杂的操作才能实现这个需求，但如果数据存在 sessionStorage 中就可以简单的实现这个需求。

## [IndexedDB API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

## storage 事件

通过监听 window 的 storage 事件就能在 Storage 变化时收到通知了（包括其他窗口对 Storage 的修改）。

# 第十章 构建离线 Web 应用

离线 Web 应用适用场景：阅读撰写电子邮件、编辑文档、创建待办事宜等。

书中的`html`元素的`manifest`属性已经废弃了，参见：[Using the application cache - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache)。

## [渐进式 Web 应用（PWA）](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)

[通过 Service workers 让 PWA 离线工作 - 渐进式 Web 应用（PWA） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Offline_Service_workers)

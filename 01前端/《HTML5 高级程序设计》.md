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

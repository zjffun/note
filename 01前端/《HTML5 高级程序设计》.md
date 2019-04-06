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

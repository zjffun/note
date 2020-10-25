---
updated: 'Tue, 22 Sep 2020 00:34:58 GMT'
date: 'Sat, 02 Mar 2019 17:53:39 GMT'
---

# 第 5 章 最佳实践

1.  平稳退化： ~~现在基本所有带交互的网站都使用 Ajax，SPA 也火起来了，平稳退化真是很难实现了~~ （看到第七章发现我之前的观点是错了）
2.  分离 JS
3.  向下兼容
4.  性能考虑

# 第 6 章 案例研究：图片库改进版

1.  键盘访问（提高可访问性）

    onclick 已经帮我们处理了，eg：下面这个绑定了 onclick 的按钮鼠标左键点击和 tab 然后回车一样弹出 "clicked

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <button onclick="alert('clecked')">"click" me</button>
</body>
</html>
```

2.  DOM core 和 HTML-DOM

    由于 HTML 与 XML 的相似性及差异，JavaScript 不仅实现了标准的 DOM 方法和属性（即由 W3C 制定的），而且还实现了 HTML 特有的 DOM 方法和属性。

    DOM Core：标准的 DOM 方法和属性

    HTML-DOM：HTML 特有的 DOM 方法和属性

# 第 7 章 动态创建标记

## 若元素存在只是为了让 DOM 方法处理他们，那么用 DOM 方法来创建他们才是最合适的选择

## 渐进增强与 Ajax

一开始以 Ajax 为起点设计网站很难做到平稳退化，但一开始用老式的页面刷新机制设计网站，在此基础上用拦截请求用 Ajax 技术处理就可以实现平稳退化。（渐进增强：HTML 全部完成 ->CSS 全部完成 ->JS 全部完成 -> 网站完成）

**这样得后端也得做一套页面展示（点开链接和平稳退化用），前端不应在页面加载时使 Ajax（应该由后端生成）**

2020-9-22：以前太年轻了，这不就是 SSR 嘛。。

# 第 8 章 充实文档的内容

## 不应使用 DOM 技术将重要内容添加到网页上

现在主流的 MVVM 框架全是使用 JS 生成 DOM。。

## accesskey：快捷键

很多大网站都没见用，FF 里要 Alt+Shift+c 才能使用下面设置的快捷键

```html
<a href="http://www.w3school.com.cn/css/" accesskey="c">CSS</a>
```

# 第 11 章 HTML5

## Modernizr：HTML5/CSS3 特性检测库

---
updated: 'Wed, 02 Sep 2020 12:37:20 GMT'
date: 'Wed, 02 Sep 2020 12:37:20 GMT'
---

# 前言

-   DRY: Don’t Repeat Yourself
-   WET，We Enjoy Typing / Write Everything Twice

## 样式回退

1.  层叠机制。
2.  使用 [Modernizr](http://modernizr.com/) 这样的工具来给根元素（`<html>`）添加一些辅助类。这样你就可以针对支持或不支持某些特性的浏览器来分别编写样式了。
3.  `@supports` 规则。（慎用）

# 引言

-   标准就像香肠：最好别去看它们是怎么做出来的。
-   每项规范从最初启动到最终成熟，都会经过以下阶段：编辑草案（ED） -> 首个公开工作草案（FPWD） -> 工作草案（WD） -> 候选推荐规范（CR） -> 提名推荐规范（PR） -> 正式推荐规范（REC）。
-   浏览器前缀是一场史诗般的失败。

## 减少代码重复

尽最大努力实现弹性可伸缩的布局，并在媒体查询的各个断点区间内指定相应的尺寸。

1.  使用相对单位。
2.  `currentColor` 关键字。（当前颜色值）
3.  `inherit` 关键字。（继承父元素属性值）
4.  需要在较大分辨率下得到固定宽度时，使用 `max-width` 而不是 `width`
5.  为替换元素（比如 img、object、video、iframe 等）设置一个 `max-width`，值为 `100%`

# 背景与边框

## 半透明边框

注意：背景色默认是 `border-box`，会影响边框的显示，可以改成 `padding-box`

## 多重边框

-   `box-shadow` 有第四个参数扩张半径。通过设置正的扩张半径，两个为零的偏移量以及为零的模糊值，可以模拟出边框。
-   `outline` 轮廓也可以模拟边框。注意：轮廓和边框是有区别的。

## 背景定位

-   `background-position` 已经允许我们指定背景图片距离任意角的偏移量，只要我们在偏移量前面指定关键字。eg: `background-position: right 20px bottom 10px;`

## 条纹背景

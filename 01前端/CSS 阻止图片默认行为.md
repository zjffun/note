---
updated: 'Tue, 22 Sep 2020 11:30:35 GMT'
date: 'Tue, 22 Sep 2020 11:30:35 GMT'
---

默认浏览器会给图片加上拖拽和保存的行为，如果不想要可以用背景图，或者像下面这样在图片上叠一层。

```css
.img-event-proxy {
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    content: "";
  }
}
```

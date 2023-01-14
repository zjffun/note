---
updated: 'Fri, 13 Jan 2023 17:33:07 GMT'
date: 'Thu, 04 Jun 2020 12:53:37 GMT'
---

# Neomorphism 设计

[Neumorphism and CSS | CSS-Tricks](https://css-tricks.com/neumorphism-and-css/)

```css
body{
  background-color: #e0e0e0;
}

.neumorphic {
  box-shadow: 12px 12px 24px 0 rgba(0, 0, 0, 0.2),
    -12px -12px 24px 0 rgba(255, 255, 255, 0.5);
}

.neumorphic--pressed {
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5);
}
```

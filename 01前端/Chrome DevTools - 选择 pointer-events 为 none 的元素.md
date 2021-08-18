---
date: 'Wed, 18 Aug 2021 12:46:47 GMT'
updated: 'Wed, 18 Aug 2021 12:46:47 GMT'
---

Chrome DevTools 默认不会选择 `pointer-events: none` 的元素，可以通过按住 `Shift` 选择。或者通过
`Shift+Ctrl+C` 选择。

另外可以通过设置 `pointer-events: none` 让一个元素不被审查，就像[这个问题](https://stackoverflow.com/questions/59246631/cant-select-child-elements-in-chrome-dev-tools-anymore-when-using-an-image-over)

英文原文：

You can enter `Inspect Element mode` and hold `Shift` to ignore pointer events to select elements with `pointer-events: none`.

Or use `shift+ctrl+c` to select elements with `pointer-events: none`.

See:
[371120 - Right Click -> Inspect Element will take you to invisible elements if they overlay the screen - chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=371120)
[544896 - Elements with pointer-events: none can't be targeted for inspect with context menu "Inspect" or DevTools UI - chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=544896)

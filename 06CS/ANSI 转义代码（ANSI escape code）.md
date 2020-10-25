---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

> [ANSI escape code - Wikipedia](https://en.wikipedia.org/wiki/ANSI_escape_code#Windows)

linux 输出绿色的✓TRUE，红色的✗FALSE ：

```
echo -e "\x1B[1;32m✓TRUE \x1B[0mXXX"
echo -e "\x1B[1;31m✗FALSE \x1B[0mOOO"
```

PS：

-   `\x1B`为十进制`27`在 ASCLL 里代表`ESC`
-   CMD 中得用 ANSI.SYS

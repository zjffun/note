> [ANSI escape code - Wikipedia](https://en.wikipedia.org/wiki/ANSI_escape_code#Windows)

linux输出绿色的✓TRUE，红色的✗FALSE ：
```
echo -e "\x1B[1;32m✓TRUE \x1B[0mXXX"
echo -e "\x1B[1;31m✗FALSE \x1B[0mOOO"
```

PS：
- `\x1B`为十进制`27`在ASCLL里代表`ESC`
- CMD中得用ANSI.SYS


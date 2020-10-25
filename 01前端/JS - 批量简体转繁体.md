---
updated: 'Sat, 29 Feb 2020 03:50:30 GMT'
date: 'Sat, 29 Feb 2020 03:50:30 GMT'
---

# 安装依赖

```bash
npm i simplebig
```

# Node.js 代码

```js
const fs = require("fs");
const path = require("path");
const S = require("simplebig");

// 要转换的文件夹
const dirPath = "./test";
// 要转换的文件的后缀
const extWhiteList = [".js", ".json", ".wxml", ".wxss"];

traverseDir(dirPath);

function traverseDir(dirPath) {
  fs.readdirSync(dirPath).forEach(function(file) {
    let filepath = path.join(dirPath, file);
    let stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      traverseDir(filepath);
    } else {
      if (~extWhiteList.indexOf(path.extname(file))) {
        let content = fs.readFileSync(filepath);
        fs.writeFileSync(filepath, S.s2t(content.toString()));
        console.log(filepath);
      }
    }
  });
}
```

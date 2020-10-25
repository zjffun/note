---
updated: 'Tue, 14 May 2019 14:25:50 GMT'
date: 'Tue, 14 May 2019 14:25:50 GMT'
---

# Intellisense（代码提示、智能感应）

## Path Intellisense：路径别名（alias）代码提示

例如：在模块打包配置中配置`@`代替了`src`，可以使用下面的配置让`@`智能感应

```json
    "path-intellisense.mappings": {
        "@": "${workspaceRoot}/src"
    }
```

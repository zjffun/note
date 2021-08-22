---
date: 'Sun, 22 Aug 2021 14:11:34 GMT'
updated: 'Sun, 22 Aug 2021 14:13:01 GMT'
---

`unsafe-perm` 默认是 true，只有在 root 权限下执行 npm 时才是 false。

root 权限下执行 npm 并且 `unsafe-perm` 是 false 的情况下，会切换 uid 为当前用户或配置的用户来执行模块的安装脚本。这可能会导致一些安装脚本运行时报没有权限的错，这种情况在运行 npm 时加上 `--unsafe-perm true` 就可以不切换用户执行安装脚本了。

> -   [What does unsafe-perm in npm actually do? - Geedew - Blogging about the web.](https://geedew.com/What-does-unsafe-perm-in-npm-actually-do/)

---
updated: 'Mon, 01 Jul 2019 11:44:49 GMT'
date: 'Mon, 01 Jul 2019 11:44:49 GMT'
---

使用 [paazmaya/shuji: Reverse engineering JavaScript and CSS sources from sourcemaps](https://github.com/paazmaya/shuji) 可以从 sourcemap 中获取源码。

一个故事：

今天同事在完全没将代码加到过 stage 的情况下按了 VSCode 的`Discard All Changes`，然后这个版本的所有代码都丢失了（他也真是心大，整个这个版本的代码从头到尾都没有进入过 stage，我感觉用 git 是完全无法找回了），能找到的只有发布的代码。

原本当没有招只能重写了，打开发布后的代码一看居然还有 sourcemap，然后通过[paazmaya/shuji: Reverse engineering JavaScript and CSS sources from sourcemaps](https://github.com/paazmaya/shuji)还原了出来，虽然并没有将整个项目完美还原，不过还是将损失降低了很多，可喜可贺。

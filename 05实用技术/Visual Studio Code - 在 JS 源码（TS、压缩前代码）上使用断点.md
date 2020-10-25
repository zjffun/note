---
updated: 'Fri, 15 Feb 2019 10:01:35 GMT'
date: 'Fri, 15 Feb 2019 10:01:35 GMT'
---

步骤：

1.  在构建工具（webpack、gulp 等）的配置中开启生成 source map
2.  将 VSCode 配置中的`debug.allowBreakpointsEverywhere`设置为`true`（重要！这个选项默认是`false`）

现在就可以愉快得在源码上下断点了。

参见：[Can set break points in the Visual Studio Code debugger for Typescript, but not for other languages that compile to JavaScript · Issue #41937 · Microsoft/vscode](https://github.com/Microsoft/vscode/issues/41937)

一开始我是只将 VSCode 集成的终端改成 WSL 的 Bash，结果发现内置的 GIt 用的还是 Windows 的 Git，Git Hooks 用的 Windows 的环境，上网搜了一下发现有很复杂的方式，继续翻了翻发现官方居然有超好用的方式 [Developing in the Windows Subsystem for Linux with Visual Studio Code](https://code.visualstudio.com/docs/remote/wsl) （虽然有大神指出这种方式还有有难用的地方。。）

总之安装 [Remote Development - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) 就 OK 了。

PS：得到答案的地方是这里，[Git: Support WSL · Issue #9502 · microsoft/vscode](https://github.com/microsoft/vscode/issues/9502#issuecomment-488792093)，居然是 5 月 2 日发表的才过了两个月怪不得网上没有直接找到信息。这个问题从 16 年提出到 19 年解决持续了 3 年也真是没谁了，我能在刚遇到这个问题就正好找到解决也是挺幸运的。。

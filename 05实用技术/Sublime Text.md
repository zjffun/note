> Sublime Text 是一个代码编辑器（Sublime Text 2 是收费软件，但可以无限期试用），也是 HTML 和散文先进的文本编辑器。Sublime Text 是由程序员 Jon Skinner 于 2008 年 1 月份所开发出来，它最初被设计为一个具有丰富扩展功能的 Vim。  
> Sublime Text 具有漂亮的用户界面和强大的功能，例如代码缩略图，Python 的插件，代码段等。还可自定义键绑定，菜单和工具栏。Sublime Text 的主要功能包括：拼写检查，书签，完整的 Python API ， Goto 功能，即时项目切换，多选择，多窗口等等。Sublime Text 是一个跨平台的编辑器，同时支持 Windows、Linux、Mac OS X 等操作系统。

# 安装包管理

1.  打开 Sublime 按下 ctrl+\`
2.  输入复制下面代码到输入框，然后按回车


    import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

# 插件

1.  安装完包管理器之后，按下 ctrl+shift+p 选择 Install Package
2.  在搜索框中输入插件的名字双击就装上了（有的要重启下 Sublime 才生效）

-   emmet：html 代码编辑
-   ctags：代码跳转
-   DocBlockr：注释
-   xxx-beautify：代码格式化
-   BracketHighlighter ：对应括号高亮
-   sublimeLinter：代码检查
-   SideBarEnhancement：侧栏增强
-   Open Folder：在侧栏打开文件夹
-   SublimeLinter：代码检查  
-   SublimeLinter-contrib-eslint：ECMAScrip 检查（要先用 npm 装 eslint）
-   xxx-snippets：xxx 的代码片段
-   Sublimerge Pro：代码对比（只能试用 90 天）  
    默认按键设置：`{ "keys": ["ctrl+alt+d"], "command": "sublimerge"}`
-   diffy：代码对比（免费）
-   CSScomb： CSS 属性排序
-   MultiFill：多处填充（生成顺序数字，人名等）
-   Terminal：打开终端
-   pretty json：格式化 json  
    默认按键：control+alt+j
-   SqlBeautifier：格式化 sql（测试对使用 access 的 sql 语法写的 sql 语句进行格式化时破坏了原 sql）  
    选择 sql，command+K，command+F

# 代码片段（Snippet）

## 添加

Tools->Developer->New Snippet...

_xxx-snippets_插件包含 xxx 语言的基本代码片段。

## 使用

输入已有代码片段的几个首字母，然后选择代码片段即可自动补全。

# 快捷键

> <http://docs.sublimetext.info/en/latest/reference/keyboard_shortcuts_win.html>

1.  `Ctrl+P`：去任何地方（输入文件名打开文件，: 行号定位到当前文件指定行，@名字定位到当前文件指定标志）
2.  `Ctrl+G`：去指定行（`Ctrl+P`+:）
3.  `Ctrl+R`：去指定标志（`Ctrl+P`+@）
4.  `Ctrl+Z`: 撤销
5.  `Ctrl+X`: 剪切（整行）
6.  `Ctrl+C`: 复制（整行）
7.  `Ctrl+Y`: 恢复撤销
8.  `Ctrl+D`: 选择当前光标的词，连续按继续选择与选中词相同的词
9.  `Ctrl+F`: 查找
10. `Ctrl+Shift+F`: 在当前文件夹查找
11. `Ctrl+H`: 替换
12. `ctrl+L`: 选择整行
13. `Ctrl+Shift+Up 或 Down`: 上下移动代码
14. `Ctrl+[或者]`: 左右移动代码
15. `Ctrl+Shift+[或者]`: 折叠展开代码
16. `Ctrl+/`: 单行注释，
17. `Ctrl+Shift+/`: 块注释
18. `Ctrl+Enter`: 光标后插入行
19. `Ctrl+Shift+Enter`: 光标前插入行
20. `Ctrl+F2`: 进行增刪标记
21. `F2`: 跳到下一个标记
22. `Shift+F2`: 跳到上一个标记
23. `Ctrl+KU`: 改为大写
24. `Ctrl+KL`: 改为小写
25. `Ctrl+J`: 合并行
26. `Ctrl+Shift+P`: 输入命令
    eg：  
    package xx 功能：安装，卸载包等  
    file xx 功能：关闭，保存全部文件等  
    set xx 格式：设置该文件的语法格式  

# 配置

-   显示当前编码
    `"show_encoding": true,`

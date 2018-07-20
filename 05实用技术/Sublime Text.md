> Sublime Text 是一个代码编辑器（Sublime Text 2是收费软件，但可以无限期试用），也是HTML和散文先进的文本编辑器。Sublime Text是由程序员Jon Skinner于2008年1月份所开发出来，它最初被设计为一个具有丰富扩展功能的Vim。  
Sublime Text具有漂亮的用户界面和强大的功能，例如代码缩略图，Python的插件，代码段等。还可自定义键绑定，菜单和工具栏。Sublime Text 的主要功能包括：拼写检查，书签，完整的 Python API ， Goto 功能，即时项目切换，多选择，多窗口等等。Sublime Text 是一个跨平台的编辑器，同时支持Windows、Linux、Mac OS X等操作系统。

# 安装包管理
1. 打开Sublime按下ctrl+`
2. 输入复制下面代码到输入框，然后按回车

```
import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

# 插件
1. 安装完包管理器之后，按下ctrl+shift+p选择Install Package
2. 在搜索框中输入插件的名字双击就装上了（有的要重启下Sublime才生效）

- emmet：html代码编辑
- ctags：代码跳转
- BracketHighlighter ：对应括号高亮
- sublimeLinter：代码检查
- SideBarEnhancement：侧栏增强
- Open Folder：在侧栏打开文件夹
- SublimeLinter：代码检查  
- SublimeLinter-contrib-eslint：ECMAScrip检查（要先用npm装eslint）
- xxx-snippets：xxx的代码片段
- Sublimerge Pro：代码对比（只能试用90天）  
默认按键设置：{ "keys": ["ctrl+alt+d"], "command": "sublimerge"}
- diffy：代码对比（免费）
- CSScomb： CSS属性排序
- MultiFill：多处填充（生成顺序数字，人名等）
- Terminal：打开终端
- pretty json：格式化json  
默认按键：control+alt+j
- SqlBeautifier：格式化sql（测试对使用access的sql语法写的sql语句进行格式化时破坏了原sql）  
选择sql，command+K，command+F




# 代码片段

# 快捷键
1. `Ctrl+P`：去任何地方（输入文件名打开文件，:行号定位到当前文件指定行，@名字定位到当前文件指定标志）
2. `Ctrl+G`：去指定行（`Ctrl+P`+:）
3. `Ctrl+R`：去指定标志（`Ctrl+P`+@）
4. `Ctrl+Z`: 撤销
5. `Ctrl+X`: 剪切（整行）
6. `Ctrl+C`: 复制（整行）
5. `Ctrl+Y`: 恢复撤销
6. `Ctrl+D`: 选择当前光标的词，连续按继续选择与选中词相同的词
7. `Ctrl+F`: 查找
8. `Ctrl+Shift+F`: 在当前文件夹查找
8. `Ctrl+H`: 替换
8. `ctrl+L`: 选择整行
9. `Ctrl+Shift+Up或Down`: 上下移动代码
10. `Ctrl+[或]`: 左右移动代码
11. `Ctrl+Shift+[或]`: 折叠展开代码
10. `Ctrl+/`: 单行注释，
11. `Ctrl+Shift+/`: 块注释
11. `Ctrl+Enter`: 光标后插入行
12. `Ctrl+Shift+Enter`: 光标前插入行
12. `Ctrl+F2`: 进行增刪标记
13. `F2`: 跳到下一个标记
14. `Shift+F2`: 跳到上一个标记
13. `Ctrl+KU`: 改为大写
14. `Ctrl+KL`: 改为小写
15. `Ctrl+J`: 合并行
16. `Ctrl+Shift+P`: 输入命令
eg：  
package xx功能：安装，卸载包等  
file xx功能：关闭，保存全部文件等  
set xx格式：设置该文件的语法格式  


# 配置
- 显示当前编码
```"show_encoding": true,```

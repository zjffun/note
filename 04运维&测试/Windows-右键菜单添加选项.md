1. 新建add.reg
2. 输入选项名和选项对应程序路径

        Windows Registry Editor Version 5.00
        [HKEY_CLASSES_ROOT\*\shell\选项名]
        [HKEY_CLASSES_ROOT\*\shell\选项名\command]
        @="选项对应程序路径 \"%1\""
        
3. 以管理员身份执行add.reg


eg：右键菜单添加使用Sublime打开的选项

```
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text]
[HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text\command]
@="C:\\Program Files (x86)\\Sublime Text 3\\sublime_text.exe \"%1\""
```
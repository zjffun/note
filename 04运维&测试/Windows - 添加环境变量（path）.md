使用命令提示符（(cmd)(批处理)(Batch)(.bat)）添加环境变量

# 永久环境变量

## 命令提示符下修改

== 注意：要使用管理员身份运行 cmd==

    set PATH=%PATH%;要添加的路径
    reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v "Path" /t REG_EXPAND_SZ /d "%PATH%" /f

## 批处理修改

1.  新建 add.bat

2.  设置要永久加入到 path 环境变量中的路径

        ::关闭回显
        @echo off
        ::设置要永久加入到path环境变量中的路径
        set My_PATH=要添加的路径
        set PATH=%PATH%;%My_PATH%
        reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v "Path" /t REG_EXPAND_SZ /d "%PATH%" /f
        exit

3.  使用管理员身份运行 add.bat

eg: 设置 python 的环境变量

    set PATH=%PATH%;C:\Python2.7\;C:\Python2.7\Scripts\;
    reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v "Path" /t REG_EXPAND_SZ /d "%PATH%" /f

# 临时环境变量

退出 cmd 就消失的环境变量

## 命令提示符

    set PATH=%PATH%;要添加的路径

## 批处理

    @echo off
    ::设置要临时加入到path环境变量中的路径
    set My_PATH=D:\AppFolder
    set PATH=%PATH%;%My_PATH%

    ::下面写你其它脚本命令

    pause

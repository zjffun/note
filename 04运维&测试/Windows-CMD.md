---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Tue, 25 Sep 2018 12:52:45 GMT'
---

# cmd 命令

官方文档：ntcmds.chm

查看命令的帮助:`命令 \?`

## windows 服务相关

### net

-   启动`net start ServiceName`
-   停止`net stop ServiceName`
-   显示用法`net`

### sc

-   启动`sc start ServiceName`
-   停止`sc stop ServiceName`
-   显示用法`sc`
-   创建服务：`sc create MySQL binpath= "C:\Program Files (x86)\mysql-5.7.23-win32\bin\mysqld.exe"`\
    注意：选项名称包括等号。等号和值之间需要一个空格。\
    （mysqld install 也会创建 mysql 服务）

## 文件操作

1.  查看文件：dir
2.  创建文件: >filename
3.  写文件: test>filename
4.  批量改文件名：ren\
    例将后缀全部变为 ejs：`ren *.* *.ejs`

## 快速打开

1.  calc----------- 启动计算器
2.  regedit - 或 - regedt1------- 注册表编辑器
3.  notepad-------- 打开记事本
4.  taskmgr----- 任务管理器
5.  write---------- 写字板
6.  mspaint-------- 画图板
7.  Nslookup-------IP 地址侦测器
8.  explorer------- 打开资源管理器
9.  charmap-------- 启动字符映射表
10. Msconfig.exe--- 系统配置实用程序
11. winver--------- 检查 Windows 版本
12. dxdiag--------- 检查 DirectX 信息
13. Msconfig.exe--- 系统配置实用程序
14. mstsc---------- 远程桌面连接
15. magnify-------- 放大镜实用程序
16. netstat -an----(TC) 命令检查接口
17. devmgmt.msc--- 设备管理器
18. eventvwr------- 事件查看器
19. eudcedit------- 造字程序
20. explorer------- 打开资源管理器
21. osk------------ 打开屏幕键盘
22. packager------- 对象包装程序
23. iexpress------- 木马捆绑工具，系统自带

## 其他功能

1.  chm 转换为 html：`hh -decompile <输出文件夹路径> <要反编译的 CHM 文件全路径名>`

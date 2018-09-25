# cmd命令

官方文档：ntcmds.chm

查看命令的帮助:`命令 \?`

## windows服务相关
### net
- 启动`net start ServiceName`
- 停止`net stop ServiceName`
- 显示用法`net`

### sc
- 启动`sc start ServiceName`
- 停止`sc stop ServiceName`
- 显示用法`sc`
- 创建服务：`sc create MySQL binpath= "C:\Program Files (x86)\mysql-5.7.23-win32\bin\mysqld.exe"`  
注意: 选项名称包括等号。等号和值之间需要一个空格。  
（mysqld install也会创建mysql服务）


## 文件操作
1. 查看文件：dir  
1. 创建文件: >filename  
1. 写文件: test>filename  
2. 批量改文件名：ren  
例将后缀全部变为ejs：`ren *.* *.ejs`

## 快速打开
1. calc-----------启动计算器
1. regedit-或-regedt1-------注册表编辑器
1. notepad--------打开记事本
1. taskmgr-----任务管理器
1. write----------写字板 
1. mspaint--------画图板 
1. Nslookup-------IP地址侦测器
1. explorer-------打开资源管理器
1. charmap--------启动字符映射表
1. Msconfig.exe---系统配置实用程序 
1. winver---------检查Windows版本 
1. dxdiag---------检查DirectX信息
1. Msconfig.exe---系统配置实用程序
1. mstsc----------远程桌面连接 
1. magnify--------放大镜实用程序 
1. netstat -an----(TC)命令检查接口
1. devmgmt.msc--- 设备管理器 
1. eventvwr-------事件查看器 
1. eudcedit-------造字程序 
1. explorer-------打开资源管理器
1. osk------------打开屏幕键盘 
1. packager-------对象包装程序 
1. iexpress-------木马捆绑工具，系统自带



## 其他功能
1. chm转换为html：hh -decompile <输出文件夹路径> <要反编译的CHM文件全路径名>

# 开启 Hyper-V

开启后会有提示让重启电脑，重启就 OK

```
:: 创建cmd
(echo pushd "%~dp0"
echo dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
echo for /f %%i in ^('findstr /i . hyper-v.txt 2^^>nul'^) do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
echo del hyper-v.txt
echo Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL) > open-hyper-v.cmd

:: 运行
open-hyper-v.cmd
```

# 临时修改注册表，设置为专业版（重启后会还原）

```bash
REG ADD "HKEY_LOCAL_MACHINE\software\Microsoft\Windows NT\CurrentVersion" /v EditionId /T REG_EXPAND_SZ /d Professional /F
```

# 安装 Docker

现在就可以安装了

# 参考

[Windows10 家庭版安装 Docker Desktop（非 Docker Toolbox） - 简书](https://www.jianshu.com/p/1329954aa329/)

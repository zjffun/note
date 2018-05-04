# 安装
参考：http://scrapy-chs.readthedocs.io/zh_CN/0.24/intro/install.html#scrapy 

用到的文件：https://share.weiyun.com/c7813d7e8d08e9216938ed100dd57b01

1. 安装python-2.7.14.msi
2. 打开命令行，并且运行以下命令来修改 PATH:

        c:\python27\python.exe c:\python27\tools\scripts\win_add2path.py

3. 创建register.py文件，内容为

        #   
        # script to register Python 2.0 or later for use with win32all   
        # and other extensions that require Python registry settings   
        #   
        # written by Joakim Loew for Secret Labs AB / PythonWare   
        #   
        # source:   
        # http://www.pythonware.com/products/works/articles/regpy20.htm   
        #   
        # modified by Valentine Gogichashvili as described in http://www.mail-archive.com/distutils-sig@python.org/msg10512.html   
           
        import sys  
           
        from _winreg import *  
           
        # tweak as necessary   
        version = sys.version[:3]  
        installpath = sys.prefix  
           
        regpath = "SOFTWARE\\Python\\Pythoncore\\%s\\" % (version)  
        installkey = "InstallPath"  
        pythonkey = "PythonPath"  
        pythonpath = "%s;%s\\Lib\\;%s\\DLLs\\" % (  
            installpath, installpath, installpath  
        )  
           
        def RegisterPy():  
            try:  
                reg = OpenKey(HKEY_CURRENT_USER, regpath)  
            except EnvironmentError as e:  
                try:  
                    reg = CreateKey(HKEY_CURRENT_USER, regpath)  
                    SetValue(reg, installkey, REG_SZ, installpath)  
                    SetValue(reg, pythonkey, REG_SZ, pythonpath)  
                    CloseKey(reg)  
                except:  
                    print "*** Unable to register!"  
                    return  
                print "--- Python", version, "is now registered!"  
                return  
            if (QueryValue(reg, installkey) == installpath and  
                QueryValue(reg, pythonkey) == pythonpath):  
                CloseKey(reg)  
                print "=== Python", version, "is already registered!"  
                return  
            CloseKey(reg)  
            print "*** Unable to register!"  
            print "*** You probably have another Python installation!"  
           
        if __name__ == "__main__":  
            RegisterPy()  

2. 双击执行 register.py
3. 安装 pywin32-220.win-amd64-py2.7.exe
4. 双击执行 get-pip.py  
打开命令行窗口，确认 pip 被正确安装:```pip --version```
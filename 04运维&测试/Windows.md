# 查看版本等信息

运行`dxdiag`

# win10 系统环境变量修改重启后才生效？

以前用 win7 没遇到过，自从换了 win10 被坑了好多次。

## 解决：

使用管理员身份打开 cmd.exe 就生效了（可以新建个快捷方式名为 acmd，快捷方式选上以管理员身份打开 cmd，放到 windows 目录下，这样就可以在 win+r 的运行中输入 acmd 回车，以管理员身份打开 cmd 了。）

## 其他解决方法：

别人的博客查到的[如何使 windows 系统环境变量的改变即时生效](http://blog.csdn.net/lioncode/article/details/6037683)\
比较简单的是：在高级属性中设置完毕后，在任意 cmd 下设置一次 path 的值（任意设置），达到全局广播的目的。（就是 set PATH=xxx，然后关掉 cmd 再打开就可以开心地使用了）

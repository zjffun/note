# 查看版本等信息
运行`dxdiag`

# win10系统环境变量修改重启后才生效？
以前用win7没遇到过，自从换了win10被坑了好多次。
## 解决：
使用管理员身份打开cmd.exe就生效了（可以新建个快捷方式名为acmd，快捷方式选上以管理员身份打开cmd，放到windows目录下，这样就可以在win+r的运行中输入acmd回车，以管理员身份打开cmd了。）

## 其他解决方法：
别人的博客查到的[如何使windows系统环境变量的改变即时生效](http://blog.csdn.net/lioncode/article/details/6037683)  
比较简单的是：在高级属性中设置完毕后，在任意cmd下设置一次path的值（任意设置），达到全局广播的目的。（就是set PATH=xxx，然后关掉cmd再打开就可以开心地使用了）
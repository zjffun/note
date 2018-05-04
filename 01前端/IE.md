# Activex
##  打开window.open打开的新页面ActiveX插件不好使
解决：window.open后设置关闭当前页面
```
window.opener = null
```
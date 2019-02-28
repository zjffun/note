# Activex

## 打开 window.open 打开的新页面 ActiveX 插件不好使

解决：window.open 后设置关闭当前页面

    window.opener = null

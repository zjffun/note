# 配置Dubug和Release生成不同的Web.config

https://msdn.microsoft.com/zh-cn/library/dd465326(VS.100).aspx

1. 创建Web.config、 Web.Debug.config、 Web.Release.config
2. Web.config写通用的配置
3. Web.Debug.config 和 Web.Release.config分别写开发和生成环境的配置（使用XML-Document-Transform）

eg:  
- Web.config：
```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <appSettings>
    <add key="ImagesFilePath" value="images_file/" />
    <add key="AttachmentPath" value="D:\Code\Web\" />
    <add key="SiteURL" value="http://localhost:3448/" />
  </appSettings>
  <system.webServer>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
    </staticContent>
  </system.webServer>
</configuration>
```

- Web.Debug.config：
无改动
```
<?xml version="1.0" encoding="utf-8"?>
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
</configuration>
```

- Web.Release.config：  
修改AttachmentPath和SiteURL  
删除system.webServer
```
<?xml version="1.0" encoding="utf-8"?>
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <appSettings>
    <add key="AttachmentPath" value="D:\" xdt:Transform="Replace" xdt:Locator="Match(key)" />
    <add key="SiteURL" value="http://192.168.10.11:8080/" xdt:Transform="Replace"  xdt:Locator="Match(key)" />
  </appSettings>
  <system.webServer xdt:Transform="Remove">
  </system.webServer>
</configuration>
```
---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Mon, 21 Jan 2019 14:24:27 GMT'
---

# 配置 Dubug 和 Release 生成不同的 Web.config

[Web.config Transformation Syntax for Web Application Project Deployment | Microsoft Docs](https://docs.microsoft.com/en-us/previous-versions/dd465326\(v=vs.100\))

1.  创建 Web.config、 Web.Debug.config、 Web.Release.config
2.  Web.config 写通用的配置
3.  Web.Debug.config 和 Web.Release.config 分别写开发和生成环境的配置（使用 XML-Document-Transform）

eg:

-   Web.config：

<!---->

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

-   Web.Debug.config：
    无改动

<!---->

```
<?xml version="1.0" encoding="utf-8"?>
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
</configuration>
```

-   Web.Release.config：

    修改 AttachmentPath 和 SiteURL

    删除 system.webServer

<!---->

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

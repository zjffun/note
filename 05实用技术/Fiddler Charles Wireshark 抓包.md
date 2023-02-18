---
date: 'Thu, 14 Nov 2019 15:38:37 GMT'
updated: 'Sat, 18 Feb 2023 05:33:46 GMT'
---

|                   | 使用 | 层次                    |
| ----------------- | -- | --------------------- |
| Fiddler / Charles | 简单 | 第七层应用层的 HTTP (S) 协议的包 |
| Wireshark         | 复杂 | 第三层网络层的包              |

注意：Fiddler / Charles 只能抓到走**系统代理**的流量。不走系统代理的流量（比如浏览器选择 “不使用代理”）它抓不到。

# Fiddler

-   [fiddler 配置及使用教程 - purplelavender - 博客园](https://www.cnblogs.com/woaixuexi9999/p/9247705.html)
-   [使用 Fiddler 抓取 Android 模拟器中的 Android_APP 请求 - ALonely - 博客园](https://www.cnblogs.com/alonely/p/9504912.html)
-   [fidder4 对安卓模拟器抓包 - yf0523 的博客 - CSDN 博客](https://blog.csdn.net/yf0523/article/details/81122765)

# Charles

## Map Remote

```xml
<?xml version='1.0' encoding='UTF-8'?>
<?charles serialisation-version='2.0'?>
<map>
  <toolEnabled>true</toolEnabled>
  <mappings>
    <mapMapping>
      <sourceLocation>
        <protocol>https</protocol>
        <host>test.com</host>
        <path>/path/*</path>
      </sourceLocation>
      <destLocation>
        <protocol>https</protocol>
        <host>test.com</host>
        <path>/path/</path>
      </destLocation>
      <preserveHostHeader>false</preserveHostHeader>
      <enabled>true</enabled>
    </mapMapping>
  </mappings>
</map>
```

## Add Cookies

`Tools` -> `Rewrite...` -> `Import`

```xml
<?xml version='1.0' encoding='UTF-8' ?>
<?charles serialisation-version='2.0' ?>
<rewriteSet-array>
  <rewriteSet>
    <active>true</active>
    <name>Untitled Set</name>
    <hosts>
      <locationPatterns>
        <locationMatch>
          <location>
            <protocol>https</protocol>
            <host>*.test.com</host>
          </location>
          <enabled>true</enabled>
        </locationMatch>
      </locationPatterns>
    </hosts>
    <rules>
      <rewriteRule>
        <active>true</active>
        <ruleType>1</ruleType>
        <matchHeader></matchHeader>
        <matchValue></matchValue>
        <matchHeaderRegex>false</matchHeaderRegex>
        <matchValueRegex>false</matchValueRegex>
        <matchRequest>true</matchRequest>
        <matchResponse>false</matchResponse>
        <newHeader>cookie</newHeader>
        <newValue>my_cookie=1</newValue>
        <newHeaderRegex>false</newHeaderRegex>
        <newValueRegex>false</newValueRegex>
        <matchWholeValue>false</matchWholeValue>
        <caseSensitive>false</caseSensitive>
        <replaceType>2</replaceType>
      </rewriteRule>
    </rules>
  </rewriteSet>
</rewriteSet-array>
```

# Wireshark

-   过滤两个 IP 之间的数据传输 `(ip.src == 10.252.60.xxx && ip.dst == 172.29.57.xxx) || (ip.src == 172.29.57.xxx && ip.dst == 10.252.60.xxx)`

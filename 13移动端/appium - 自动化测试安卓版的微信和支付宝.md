---
updated: 'Sat, 09 Nov 2019 05:06:44 GMT'
date: 'Sat, 09 Nov 2019 05:06:44 GMT'
---

# 常见问题

-   起步: [Getting Started - Appium](http://appium.io/docs/en/about-appium/getting-started/index.html)
-   获取应用信息：[android - How to view AndroidManifest.xml from APK file? - Stack Overflow](https://stackoverflow.com/questions/4191762/how-to-view-androidmanifest-xml-from-apk-file)

```bash
aapt dump badging my.apk
```

-   检查元素：使用 appium-desktop [appium/appium-desktop: Appium Server and Inspector in Desktop GUIs for Mac, Windows, and Linux](https://github.com/appium/appium-desktop)
-   不重置设置应用：`'noReset' : True'`

```js
const opts = {
  port: 4723,
  capabilities: {
    platformName: "Android",
    deviceName: "cancro_wc_lte",
    appPackage: "com.tencent.mm",
    appActivity: ".ui.LauncherUI",
    automationName: "UiAutomator2",
    // 加上这个
    noReset: true
  }
};
```

-   等待元素出现：[Implicit Wait - Appium](https://appium.io/docs/en/commands/session/timeouts/implicit-wait/)

```js
// webdriver.io example
driver.setImplicitTimeout(5000)
```

-   adb 链接夜神模拟器：`adb.exe connect 127.0.0.1:62001`

-   adb 安装 APP：`adb.exe install <app name.apk>`

-   Android Studio 中的安卓模拟器无法装微信：

    架构问题将`x86`模拟器换成`arm`的就可以了（理论上可以，但`arm`的模拟器在我的电脑上未响应）。使用模拟器坑太多，推荐使用真机。

    [android - INSTALL_FAILED_NO_MATCHING_ABIS when install apk - Stack Overflow](https://stackoverflow.com/questions/24572052/install-failed-no-matching-abis-when-install-apk)

    [android - The APK failed to install. Error: Could not parse error string - Stack Overflow](https://stackoverflow.com/questions/51791960/the-apk-failed-to-install-error-could-not-parse-error-string)

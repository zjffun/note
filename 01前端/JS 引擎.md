最早的 JS 引擎是纯解释器，现代 JS 引擎已经使用 JIT（Just-in-time compilation：结合预编译（ahead-of-time compilation AOT）和解释器的优点的编译方式）以提高性能

# 主流引擎

Chrome V8、SpiderMonkey、JavaScriptCore、Chakra

> -   [Chrome V8](https://en.wikipedia.org/wiki/Chrome_V8) from [Google](https://en.wikipedia.org/wiki/Google) is the most used engine. [Google Chrome](https://en.wikipedia.org/wiki/Google_Chrome) and the many other [Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser))-based browsers use it, as do [applications](https://en.wikipedia.org/wiki/Application_software) built with [CEF](https://en.wikipedia.org/wiki/Chromium_Embedded_Framework), [Electron](https://en.wikipedia.org/wiki/Electron_(software_framework)), or any other [framework](https://en.wikipedia.org/wiki/Software_framework) that embeds Chromium. Other uses include the [Node.js](https://en.wikipedia.org/wiki/Node.js) [runtime system](https://en.wikipedia.org/wiki/Runtime_system). 
> -   [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) is developed by [Mozilla](https://en.wikipedia.org/wiki/Mozilla) for use in [Firefox](https://en.wikipedia.org/wiki/Firefox) and its [forks](https://en.wikipedia.org/wiki/Fork_(software_development)). The [GNOME Shell](https://en.wikipedia.org/wiki/GNOME_Shell) uses it for extension support. 
> -   [JavaScriptCore](https://en.wikipedia.org/wiki/JavaScriptCore) is [Apple](https://en.wikipedia.org/wiki/Apple_Inc.)'s engine for its [Safari](https://en.wikipedia.org/wiki/Safari_(web_browser)) browser. Other [WebKit](https://en.wikipedia.org/wiki/WebKit)-based browsers also use it. 
> -   [Chakra](https://en.wikipedia.org/wiki/Chakra_(JavaScript_engine)) is the current engine of the [Microsoft Edge](https://en.wikipedia.org/wiki/Microsoft_Edge) browser, forked from the [same-named](https://en.wikipedia.org/wiki/Chakra_(JScript_engine)) engine of [Internet Explorer](https://en.wikipedia.org/wiki/Internet_Explorer). However, Microsoft is now rebuilding Edge as a Chromium-based browser, so it will be using V8 instead of Chakra. Internet Explorer will continue to use its version of Chakra. 

Edge 换 Chromium 内核了。。

# 参考

[JavaScript engine - Wikipedia](https://en.wikipedia.org/wiki/JavaScript_engine)

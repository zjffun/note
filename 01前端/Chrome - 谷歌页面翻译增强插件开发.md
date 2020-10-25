最近想做一个 Chrome 的插件（看别的博客说其实叫插件不准确，应该叫拓展，大家叫习惯了就按习惯的来吧）。一开始咱先直接看了[Chrome 开发（360 翻译）](http://open.chrome.360.cn/extension_dev/overview.html)和[chrome extensions](https://developer.chrome.com/extensions)（这个官方的文档拓展的方法和属性有表格比较好找，但得会科学上网），之后卡住了开始上网搜发现[【干货】Chrome 插件 (扩展) 开发全攻略](http://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)这篇博客写的已经很全了，而且附带的 GitHub 上的 demo 也特别全。咱这里就稍微把咱做的插件遇到的问题写一写（几乎都是看文档和那个博客解决的）。

# [谷歌页面翻译增强插件](https://github.com/1010543618/google-page-translation-plus)

# 一：如何点击 Popup 中的按钮，操作当前打开的网页的 DOM

坑：

1.  给 Popup.html 中的 button 添加内联的 click 事件（会报安全策略不允许的错误）\
    解决：让 Popup.html 引入 Popup.js 文件，js 文件通过 id 找到 button 添加 click 事件

2.  在 Popup.js 里想办法获取到当前打开的网页的 window 对象操作其 DOM（咱是找了很久也没找到获取到的方法）\
    解决：\
    方案一：在 Popup.js 里使用 chrome.tabs.executeScript 让页面执行一段代码或一个 js 文件（这个方案能在进行只是让页面执行 js 时使用）。\
    方案二： 在 Popup.js 里使用 chrome.tabs.sendMessage 发送给 content-script（通过配置 manifest.json 的 content_scripts 插入到当前打开网页中的 js 文件）消息执行 content-script 中的代码（这个方案能在进行让页面执行 js 并接受返回消息时使用）。

# 二：如何进行数据的存储

咱想做的是先保存网页中的 pre 标签中的 html，然后翻译此网页，然后将保存的 pre 内容进行还原。

1.  保存网页中的 pre 标签中的内容
    在 Popup.js 里使用 chrome.tabs.sendMessage 发送给 content-script 消息执行获取全部 pre 标签中的 html 返回给 Popup.js，Popup.js 使用 localStorage 进行保存。

2.  翻译此网页
    在 Popup.js 里获取当前页面 url，并进行谷歌翻译

3.  将保存的 pre 内容进行还原
    在 content-script 中根据 url 判断是否是翻译过的页面，是的话给 Popup 发消息得到 pre 标签中的 html，将当前页面的 pre 标签中的 html 替换为刚刚得到的。

注：咱原本想用长连接的，但翻译网页时网页变了，长连接就断了，所以只能互相发消息

# 三：如何得知页面是否处理过或是否可编辑了

因为是每个页面的状态所以，在翻译的页面使用 DOM 节点保存一下

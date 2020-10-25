---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Tue, 25 Sep 2018 12:52:45 GMT'
---

> <https://en.wikipedia.org/wiki/Apache_JMeter>
>
> Apache JMeter 是 Apache 的一个项目，它是一个负载测试工具可以用于进行各种服务器的性能测试分析，它重点关注 web 应用程序。

# 下载

<http://jmeter.apache.org/download_jmeter.cgi>

# 使用

<https://jmeter.apache.org/usermanual/get-started.html>
其实跟着这个官方文档走基本的就会用了（一开始我的自尊心不允许我用 Chrome 的网页翻译来看这个文档，结果没太看懂，查了一些博客跟着做了做才弄明白流程）

软件在设置里可以调成中文的，能好用不少

## 构建测试计划

### 方式一：录制计划

上面提到的向导里的`File → Templates... → Recording`这个是录制计划的第一步。。

按照[jmeter_proxy_step_by_step](http://jmeter.apache.org/usermanual/jmeter_proxy_step_by_step.html)做就行

### 方式二：自定义计划

我这次学习使用只是进行简单的测试，没有深入学习，这里就举一个非常简单的例子说明一下大概的流程（详细学习的话请看：[3. Elements of a Test Plan](http://jmeter.apache.org/usermanual/test_plan.html)，
[4. Building a Web Test Plan](http://jmeter.apache.org/usermanual/build-web-test-plan.html)，
[5. Building an Advanced Web Test Plan](http://jmeter.apache.org/usermanual/build-adv-web-test-plan.html)）

简单的测试 4 步就能完成：

1.  新建 Test Plan
2.  Test Plan 右键 ->Add->Threads (Users)->Thread Group\
    注：Thread Group 中配置有多少用户，循环几次等
3.  Thread Group 右键 ->Add->Sampler->HTTP Request\
    注：HTTP Request 中配置测试的页面
4.  HTTP Request 右键 ->Add->Listener->View Results Tree
    注：添加 Listener 可以生成各种测试的结果

# 插件

1.  下载插件管理器：<https://jmeter-plugins.org/install/Install/>
2.  插件管理器的 jar 包放到`%JMeter%/lib/ext`
3.  重启 JMeter
4.  菜单栏 ->Options->Plugins Manager
5.  然后就可以管理插件了（经测试无法安装，还是手动安装吧：首先从 jmeter-plugins 下载插件的 zip，然后在`%JMeter%`解压 zip 到当前文件夹）

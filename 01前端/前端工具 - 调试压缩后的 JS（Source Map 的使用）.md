使用 Source Map 可以在 FF 的调试器、 Chrome 的 Sources 和 VSCode 中给压缩前的文件下断点，也可以方便定位错误发生的位置（定位到压缩前的文件）。

# 何为 Source Map

Source Map 可以将编译、语法转换或压缩后的代码与源码进行对应，从而方便调试。

[JavaScript Source Map 详解 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

[Source Map Revision 3 Proposal - Google 文档](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#)

# Grunt 中使用

配置 sourceMap 为 true 即可（注意低版本 grunt-contrib-uglify 配置方法不一样）

<https://github.com/gruntjs/grunt-contrib-uglify>

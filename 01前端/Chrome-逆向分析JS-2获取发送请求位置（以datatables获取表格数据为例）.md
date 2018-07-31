剧透：就是使用了一下Chrome Source的XHR/fetch Breakpoints 功能，在发送请求时在该行进入断点调试。


# 一：不认识一下XHR/fetch Breakpoints 这个功能么？
可以去 https://developers.google.com/web/tools/chrome-devtools/ 这里找找，但一般人都打不开，我在这里大概说一下。

1. 勾上Any XHR or fetch就能在发送任何请求时在该行进入断点调试
2. 同时点右上角的加号或右键选择 Add breakpoints ，输入一个字符串，在URL包含该字符串时在该行进入断点调试


# 二：不实战一下么？
1. 使用上述第二种方法，输入"paleo"这个字符串，当URL包含"paleo"是会在该行进入断点调试

![image](https://note.youdao.com/yws/api/personal/file/2D03AF11D1C2485E9CEFBC06C5D912C3?method=download&shareKey=efaebb0315fecec3c94e6a2cb3eabc80)

2. 查看调用堆栈发现在4717行开始处理请求得到的数据

![image](https://note.youdao.com/yws/api/personal/file/9E39A9FB73F74906833BFCFC33BF448D?method=download&shareKey=938e04e947fdabf71726cfbb2ff71fac)



PS：代码也没压缩过，不过逆向时也能用这种方法嘛
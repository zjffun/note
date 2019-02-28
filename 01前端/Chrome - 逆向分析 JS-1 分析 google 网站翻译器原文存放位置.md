剧透：就是使用了一下 Chrome DevTools 的 Memory 功能，通过已知的 JS 变量的值查找 JS 内存中变量的引用

# 一：不分析一下现有的网页翻译方法么？

总所周知，（As is well known to us all,）谷歌的网页翻译很强大，根据我的使用经验谷歌有五个途径进行网页翻译：
1\. 使用 Chrome 的《翻译此页》功能：这是唯一没有被墙的方法直接就能用，但无法显示原文
1\. 使用 google 翻译的网页翻译：这个方法可以显示原文（并且原文直接加到了 dom 里）并且处理起来方便，但这种方法不好调用且复杂的页面会乱掉（因为翻译时是将页面下载到 google 后台翻译，然后由 google 后台将页面返回）
1\. 《本次使用的方法》使用 google 网站翻译器：这个方法可以显示原文并且调用方便，但原文在 JS 深处（后面会写）
1\. 使用译者翻译工具：网页放到这里翻译后完全是乱的，但愿以后能好用
1\. 使用付费的 google 翻译：暂时没有试过，不知道能不能处理复杂的网页标签嵌套

经过挺长时间的分析我最后选择了《使用 google 网站翻译器》进行翻译，现在要解决的就是获取到原文

# 二：不分析一下使用 google 网站翻译器翻译后的网页的原文可能存放的位置么？

好长的标题。。

可能存在的位置：
1\. DOM 树中？：F12->Elements->Ctrl+F-> 输入原文查找。  
没有找到，不在 DOM 树中保存。
1\. 本地存储中？：F12->Application-> 查看 Local Storage 等。  
没有找到，不在本地存储中保存。
1\. 服务器上？：虽然一像就不可能，但还是看了一下，F12->Network-> 鼠标移到文字上看看显示原文是有网络请求没。
没有网络请求，不在服务器上。
1\. iframe 中？：没有。。
1\. 文件上？：你是在逗我？
1\. JavaScript 内存中？：没的跑，一定在这里了。（这个虽然是最有可能的，但因为我之前就尝试找过浪费好久也没找到，所以这回我先排除了其他可能，确定在 JS 内存中再进行专攻）

# 三：不想法找到 JS 内存中的变量么？

一开始我是尝试使用 Source 逆向《element_main.js》，但《element_main.js》过于复杂最后决定换方法。  

然后我决定递归遍历 window 对象

    function TraversalObject(obj)
    {
      for (var i in obj) {
        if (typeof (obj[i]) == "object") {
          console.log('===recursion===',i)
          TraversalObject(obj[i]); //递归遍历
        }
        else {
          console.log(i)
        }
      }
    }
    TraversalObject(window);

然后到 frames 死循环了（貌似这种无限的递归引用有很多）

那么，有一款可以查找 JS 内存中的变量的的器么？  
当然有！！！Chrome DevTools 的 Memory 就可以轻松查找到 JS 内存中的变量！！！

# 四：不使用 Chrome DevTools 的 Memory 来查找 JS 内存中的变量么？

1.  翻译后创建快照
    ![翻译后创建快照](https://note.youdao.com/yws/api/personal/file/5FE321FCA9194DB3A230142F4144BD7A?method=download&shareKey=eb7a1b4f76fcfb6e33a47c4525e433e6)

2.  Ctrl+F 在快照中查找字符串，将找到的该值的引用按距离 GC 根的距离升序排列（该值的引用为`window.closure_lm_452827.a.focus[0].Hd.o[9].l[0]`）
    ![image](https://note.youdao.com/yws/api/personal/file/11558711666341ADB26C8606749D5B1B?method=download&shareKey=1fc113469534c5bd65c855691d0f0941)

3.  原文的引用为`window.closure_lm_452827.a.focus[0].Hd.o`这个数组
    ![image](https://note.youdao.com/yws/api/personal/file/54D332E924EE481A8247CE95307A3FC3?method=download&shareKey=782e0c4f042208b454415eae4275f651)

4.  进一步测试使用`window.closure_lm_《数字》.a.focus[0].Hd.ia.c`这个数组可以获取到原文，译文，原文对应的译文的 DOM。使用这个数组就可以达到我保存网站翻译结果的需求了。可喜可贺！可喜可贺！
    ![image](https://note.youdao.com/yws/api/personal/file/D381EA24FA4248B4AB2E17470A8DCA39?method=download&shareKey=8935de64e7820d744fe81966ef30a4f9)

# 五：不看看花絮么？

Source 调试过程：
1\. 查看 DOM 发现上面没挂事件
1\. Global Listeners 查看 blur 和 focus，发现《element_main.js》中注册了这个事件
1\. 使用 {} 美化《element_main.js》
1\. 进行偷税的调试

通过 Source 调试《element_main.js》时我发现她的执行的过程是：
1\. 鼠标移动到翻译后的文字上执行一堆代码后将这句话高亮（这句话包含的 font 标签依次高亮）
1\. popup 中的文字替换成原文
1\. 显示 popup

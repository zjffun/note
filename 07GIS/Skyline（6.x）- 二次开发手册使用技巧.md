---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

毕业设计选择 Skyline 的 Web 端二次开发，由于以前没有接触过 ActiveX 控件的使用，二次开发手册是英文的读起来有点吃力，并且 IE 直接控制台输出 ActiveX 控件创建的对象看不到内部的属性和方法，使得整个毕设快做完了才感觉弄明了 Skyline 二次开发的套路。

# 手册存放位置

默认安装是：`C:\Program Files (x86)\Skyline\TerraExplorer Pro\Help\ProgrammersGuide.chm`

# 查看 ActiveX 控件创建的对象看的属性和方法

使用 `Object.keys()`，参数是要查看的对象。但这样 GetObject 获取的对象也还是看不了

```
// 获取对象
var groupID = SGWorld.ProjectTree.FindItem("红线");
var node = SGWorld.ProjectTree.GetNextItem(groupID, 11);
var object = SGWorld.ProjectTree.GetObject(node);

Object.keys(object)// 这里打印出一个空数组

// 但这个对象可以改变透明度（该对象是多边形，可以使用ITerrainPolyline66接口，有FillStyle属性）
object.FillStyle.Color.SetAlpha(100)
```

# 手册使用

1.  先学会 Working with SGWorld 的接口（公共用到的）
2.  再看 All Other Interfaces 的接口（地物，要素图层和一些其他的）

注意：操作地物在 All Other Interfaces 找到对应类型的地物，然后找对应的属性和方法。图层在 All Other Interfaces 中找 IFeature 开头的，然后找对应的属性和方法

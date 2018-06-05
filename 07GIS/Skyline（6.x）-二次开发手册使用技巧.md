毕业设计选择Skyline的Web端二次开发，由于以前没有接触过ActiveX控件的使用，二次开发手册是英文的读起来有点吃力，并且IE直接控制台输出ActiveX控件创建的对象看不到内部的属性和方法，使得整个毕设快做完了才感觉弄明了Skyline二次开发的套路。

# 手册存放位置
默认安装是：C:\Program Files (x86)\Skyline\TerraExplorer Pro\Help\ProgrammersGuide.chm

# 查看ActiveX控件创建的对象看的属性和方法
使用Object.keys()，参数是要查看的对象。但这样GetObject获取的对象也还是看不了
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
1. 先学会Working with SGWorld的接口（公共用到的）
1. 再看All Other Interfaces的接口（地物，要素图层和一些其他的）

注意：操作地物在All Other Interfaces找到对应类型的地物，然后找对应的属性和方法。图层在All Other Interfaces中找IFeature开头的，然后找对应的属性和方法

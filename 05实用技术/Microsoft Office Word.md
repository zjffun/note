# 查看全部格式标记
设置-显示-查看全部格式标记

# 批量修改图片大小
1. 在word中按alt+f11组合键，进入VBA模式
2. 在左边的工程资源管理器中找到你的word文档，在其上右键/添加/模块
3. 复制，粘贴如下代码，修改Mywidth和Myheigth为图片宽高

        Sub Macro()
        　　Mywidth=200 '图片宽度
        　　Myheigth=200 '图片高度
        　　For Each iShape In ActiveDocument.InlineShapes
            　　iShape.Height = Myheigth
            　　iShape.Width = Mywidth
        　　Next iShape
        End Sub

4. f5运行
　　

# 图片
## 自动编号
插入-题注

## 批量修改大小
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

## 批量居中
```
Sub ImageCenter()
    For Each iShape In ActiveDocument.InlineShapes
        iShape.Range.Paragraphs.Alignment = wdAlignParagraphCenter
    Next iShape
End Sub
```
## 批量修改图片名格式（图片名在图片下方）
设置样式为"题注"
```
Sub setImageNameStyle()
    For Each iShape In ActiveDocument.InlineShapes
        With iShape.Range
            .Collapse Direction:=wdCollapseStart
            .Move Unit:=wdParagraph, Count:=1
            .Select
            .Style = "题注"
        End With
    Next iShape
End Sub
```


# 表格
## 设置表头（第一行）和内容（其余行）样式
（推荐）添加tableBody，tableHead样式，给表头和表内容添加样式
```
Sub setTableStyle()
    For Each aTable In ActiveDocument.Tables
    
        '表内容
        aTable.Select
        With Selection
            .Style = "tableBody"
        End With
        
        '表头
        aTable.Cell(1, 1).Select
        With Selection
            .SelectRow
            .Style = "tableHead"
        End With
    Next aTable
End Sub

```

（不推荐）加粗表格第一行，直接修改样式
```
Sub BoldTablesFristRow()
    For Each aTable In ActiveDocument.Tables
        aTable.Cell(1, 1).Select
        With Selection
            .SelectRow
            For Each aCell In .Cells
                aCell.Range.Bold = True
            Next aCell
        End With
    Next aTable
End Sub
```

（不推荐）加粗表格第一行，直接修改样式，会报<无法访问此集合中单独的行，因为表格有纵向合并的单元格。>错误
```
Sub BoldTablesFristRow()
    For Each aTable In ActiveDocument.Tables
        For Each aCell In aTable.Rows.First.Cells
            aCell.Range.Bold = True
        Next aCell
    Next aTable
End Sub
```
## 批量修改表名格式（表名在表上方）
设置样式为"题注"
```
Sub setTableNameStyle()
    For Each aTable In ActiveDocument.Tables
        With aTable.Range
            .Collapse Direction:=wdCollapseStart
            .Move Unit:=wdParagraph, Count:=-1
            .Select
            .Style = "题注"
        End With
    Next aTable
End Sub

```


# 样式批量导入
样式-样式管理-导入/导出-选择两个文件-选择样式-复制

# 正则表达式
帮助-搜索"正则"

# 清除空白页眉页脚横线
选中空白页眉页脚-清除格式

# 插入带样式的代码
从别处复制

# 查看全部格式标记
设置-显示-查看全部格式标记



　　

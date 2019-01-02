# 解除合并，并复制原始值到每一个解除合并后的单元格

1.  对齐方式 -> 合并后居中 -> 取消单元格合并

2.  编辑 -> 查找和选择 -> 定位条件 -> 空值

3.  输入`=`然后按`↑`选择上一个单元格

4.  按下`Ctrl + Enter` 将表达式（本单元格使用上一个单元格的内容）应用到全部选择的单元格

> 详细操作步骤请参阅：[How to unmerge cells in Excel](https://www.ablebits.com/office-addins-blog/2018/03/07/unmerge-cells-excel/)

# 生成 GUID

不带连字符的版本：

    =CONCATENATE(DEC2HEX(RANDBETWEEN(0,4294967295),8),DEC2HEX(RANDBETWEEN(0,4294967295),8),DEC2HEX(RANDBETWEEN(0,4294967295),8),DEC2HEX(RANDBETWEEN(0,4294967295),8))

# 公式转换为计算后的值

复制内容 -> 选择性粘贴 -> 值

# 导入数据库

## 注意事项

导入前最好先：编辑 -> 清除 -> 清除格式

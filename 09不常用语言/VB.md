# 获取时间戳

DateDiff("s", #1/1/1970#, Now())

# 文件操作

## 查找文件或文件夹

### Dir 函数

-   语法：`Dir\[(pathname[, attributes])]`
-   说明：使用 Dir 函数会返回一个 String，用以表示一个文件名、目录名或文件夹名称，它必须与指定的模式或文件属性、或磁盘卷标相匹配。  
-   注：Dir 会返回匹配 pathname 的第一个文件名。若想得到其它匹配 pathname 的文件名，再一次调用 Dir，且不要使用参数。如果已没有合乎条件的文件，则 Dir 会返回一个零长度字符串 ("")。  


    //返回"WIN.INI"（文件存在），返回""(文件不存在)。
    MyFile = Dir("C:\WINDOWS\WIN.ini")   

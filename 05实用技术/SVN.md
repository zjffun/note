# 开始使用

首先是在项目跟目录建立 trunk，branches 和 tags 这三个文件夹

    MyProject
        branches
        trunk
        tags

# 分支

svn 创建的分支会在仓库新建一个文件夹进行存放，在分支的上级目录 Update 会把分支的这个文件夹带下来

-   创建：右键 ->TortoiseSVN->Branch/tag..\
    （"To path" 处输入新分支名）
-   切换：右键 ->TortoiseSVN->Switch..\
    （"To path" 处输入要切换到的分支名）
-   合并：右键 ->TortoiseSVN->Merge..  

# AnkhSVN（VS 的版本控制插件）

工具 -> 选项 ->Source Control-> 插件选择 -> 在下拉列表中选择 AnkhSVN

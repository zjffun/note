> Git是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。Git的读音为/gɪt/。

> Github是一个面向开源及私有软件项目的托管平台，因为只支持git 作为唯一的版本库格式进行托管，故名gitHub。

# 一：git基本操作
## 配置
姓名：`git config --global user.name "Your Name"`  
邮箱：`git config --global user.email "email@example.com"`
## 创建版本库
`git init`
## 添加
`git add filename`
## 提交
`git commit -m "describe"`
## 查看仓库状态
`git status`
## 查看文件修改内容
暂存区和工作区：`git diff filename`
版本库和暂存区：`git diff --cached filename`
版本库和版本库：`git diff HEAD^ HEAD filename`

## 查看历史记录[一行]
`git log [--pretty=oneline]`
## 查看历史记录（包括未来版本的）
`git log --reflog`
## 查看历史命令
`git reflog`
## 版本回退（现有的版本文件会消失）
回退一个版本：`git reset --hard HEAD^`  
回退两个版本：`git reset --hard HEAD^^`  
回退N个版本：`git reset --hard HEAD~N`  
回退到指定版本：
1. 通过查看历史记录获得历史版本号：`git log [--pretty=oneline]`
2. 跳转到指定版本：`git reset --hard 版本号`

## 版本前进
1. 通过查看历史命令查看未来版本号（git log获取不到未来版本号）：`git reflog`  
或通过以下命令查看未来版本号（貌似所有提交过的版本全部列出了）：`git log --reflog`
2. 跳转到指定版本：`git reset --hard 版本号`

## 撤销修改
暂存区->工作区：`git checkout -- filename`  
版本库->暂存区：`git reset HEAD filename`
## 删除文件
`git rm filename [--cached]`  
cached: 本地不删除  
（从版本控制中移除。如：将先添加到git然后写在gitignore中的文件，或写在gitignore中用git add -f强制添加到git的文件，从git中删除。）

## 查看某个版本的改动[一行]
https://git-scm.com/docs/git-show  
`git show 版本号 [--stat]`

## 分支（branch）
创建：`git branch dev`  
创建并切换：`git branch -b dev`  
切换到分支：`git checkout dev`  
查看分支：`git branch`  
合并指定分支到当前分支：` git merge dev`  
删除分支：`git branch -d dev`  
删除远程分支：`git push --delete origin devel`

### 修剪分支（变鸡）：rebase
https://git-scm.com/docs/git-rebase

## tag
### 查看
列出所有tag（按字母排序）：git tag
列出1.几的版本tag：git tag -l v1.*

### 创建
不带信息的tag：git tag v1.0
带信息的tag：git tag -a v1.0 -m 'first version'
为以前的commit添加tag：git tag -a v1.0 版本号

### 删除 
`git tag -d v1.0`

### 上传到github
push单个tag：git push origin [tagname]
push所有tag：git push [origin] --tags



# 二：git远程仓库
## 1. 创建SSH Key
`ssh-keygen -t rsa -C "youremail@example.com"`  
Enter file in which to save the key (/c/Users/Administrator/.ssh/id\_rsa): 指定rsa的位置和名字（默认是当前目录）

## 2. GitHub配置SSH Key
1. 登录GitHub->Account settings->SSH Keys
2. Title
3. key中粘贴id_rsa.pub文件的内容

## 3. GitHub创建仓库
登录GitHub创建仓库(Initialize this repository with a README看情况勾选)

## 4. 本地仓库push到GitHub
1. 关联远程库：`git remote add origin git@github.com:path/repo-name.git`
2. 推送[第一次push]：`git push [-u] [origin master]`
3. 推送到分支：`git push origin local\_branch:remote\_branch`

## 5. GitHub pull到本地仓库
GitHub上为最新版本，本仓库是旧版本可以用pull将本地更新到最新版本
`git pull [origin remote\_branch:local\_branch]`  
pull = fetch（下载） + merge（合并）



## 6. 从GitHub克隆到本地
`git clone git@github.com:path/repo-name.git`

## 7. git remote
1. git remote 不带参数：列出已经存在的远程分支
1. git remote -v | --verbose：列出详细信息，在每一个名字后面列出其远程url
1. git remote add [shortname] [url]：添加一个新的远程仓库,可以指定一个简单的名字,以便将来引用
1. git remote remove name：删除远程仓库

## 8.版本回退
1. 本地回滚
2. 删除远程分支
3. 本地push到远程




# 三：高级操作
## 寻找丢失的版本
`git fsck --lost-found`  
eg：A更新到B，B回退到A，A又更新到C。丢失的B用上面的命令找回。（版本回退后在旧版本提交产生的问题）






# 四：.gitignore
语法：
1. 以斜杠"/"开头表示根目录
1. 以斜杠"/"结尾表示匹配的最后一项是目录
1. 以星号"*"通配多个字符（全部文件）
1. 以问号"?"通配单个字符
1. 以叹号"!"表示不忽略（跟踪）匹配到的文件或目录

eg：忽略根目录下upload文件夹，除了2015文件夹
```
#最前面不加"/"则所有文件夹下的upload都会忽略
#不加"*"则将upload忽略而不是upload下的文件忽略，后面的!/upload/2015/无法生效
/upload/*

#忽略/upload/2015/文件夹
!/upload/2015/
```

eg：忽略/web/upload/下的所有文件和文件夹，除了/web/upload/img/20170301/文件夹
```
/web/upload/*

!/web/upload/img/
!/web/upload/img/20170301/
```

# 五：多账户配置
## user和email
- 全局配置（~/.gitconfig）
姓名：`git config --global user.name "Your Name"`  
邮箱：`git config --global user.email"email@example.com"`
`ssh-keygen -t rsa -C "youremail@example.com"`  
Enter file in which to save the key (/c/Users/Administrator/.ssh/id\_rsa): /c/Users/Administrator/.ssh/name\_rsa  

- 单个仓库配置（仓库/.git/config）
进入某仓库
姓名：`git config user.name "Your Name"`  
邮箱：`git config user.email"email@example.com"`
`ssh-keygen -t rsa -C "youremail@example.com"`
Enter file in which to save the key (/c/Users/Administrator/.ssh/id\_rsa): /c/Users/Administrator/.ssh/name\_rsa  

## 配置使用的key
这里使用哪个用户上传就把哪个用户放上面（不知道为什么只能用第一个）
1. 进入~/.ssh
2. 创建config文件
3. 配置每一个key

```
#global_key
Host github.com 
    HostName github.com
    IdentityFile ~/.ssh/name_rsa1
    PreferredAuthentications publickey
    User your_name1

#xxx_key
Host github.com                 
    HostName github.com
    IdentityFile ~/.ssh/name_rsa2
    PreferredAuthentications publickey
    User your_name2

# 配置文件参数
# Host : Host可以看作是一个你要识别的模式，对识别的模式，进行配置对应的的主机名和ssh文件
# HostName : 要登录主机的主机名
# User : 登录名
# IdentityFile : 指明上面User对应的identityFile路径
```

# 六：其他配置
入忽略文件权限的配置，具体如下：`$ git config core.filemode false`  
让文件名大小写敏感：`git config core.ignorecase false`  

查看配置：`$ cat .git/config`

# 七：在U盘中建立git仓库
- 建立：
在U盘作为仓库的目录（eg：I:\\repo\\test_project）执行`git --bare init --shared`  
bare：只有.git中的文件，且.git中的文件都放在当前目录下（git服务器）

- 使用：
直接使用建立时的路径访问就行  
eg：`git clone I:\repo\test_project`



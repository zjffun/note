> Git 是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。Git 的读音为 / gɪt/。
>
> Github 是一个面向开源及私有软件项目的托管平台，因为只支持 git 作为唯一的版本库格式进行托管，故名 gitHub。

# 一：git 基本操作

## 配置（配置文件位置）

Windows 下配置文件位置：`C:\Users\Administrator\.gitconfig`

-   姓名：`git config --global user.name "Your Name"`  
-   邮箱：`git config --global user.email "email@example.com"`  
-   支持 UTF-8 编码（解决不支持中文）：`git config --global core.quotepath false`，（Git Bash 可能要：`Git Bash 窗口右键 ->Options->Text->Locale 设置 zh_CN，Character set 设置 UTF-8`）
-   Git GUI 支持 UTF-8 编码：`git config --global gui.encoding utf-8`
-   入忽略文件权限的配置，具体如下：`git config core.filemode false`  
-   让文件名大小写敏感：`git config core.ignorecase false`  
-   查看配置：`cat .git/config`

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

## 查看历史记录

-   标准：`git log`
-   一行：`git log --pretty=oneline`
-   包括未来版本：`git log --reflog`
-   从首次提交排序：`git log --reverse`（git-log(1) Manual Page 的 Commit Ordering 下面）

## 查看历史命令

`git reflog`

## 版本回退（现有的版本文件会消失）

-   回退一个版本：`git reset --hard HEAD^`  
-   回退两个版本：`git reset --hard HEAD^^`  
-   回退 N 个版本：`git reset --hard HEAD~N`  
-   回退到指定版本：`git reset --hard 版本号`

## 版本前进

1.  通过查看历史命令查看未来版本号（git log 获取不到未来版本号）：`git reflog`\
    或通过以下命令查看未来版本号（貌似所有提交过的版本全部列出了）：`git log --reflog`
2.  跳转到指定版本：`git reset --hard 版本号`

## 撤销修改

暂存区 -> 工作区：`git checkout -- filename`\
版本库 -> 暂存区：`git reset HEAD filename`

## 删除文件

`git rm filename [--cached]`\
cached: 本地不删除\
（从版本控制中移除。如：将先添加到 git 然后写在 gitignore 中的文件，或写在 gitignore 中用 git add -f 强制添加到 git 的文件，从 git 中删除。）

## 查看某个版本的改动[一行]

<https://git-scm.com/docs/git-show>\
`git show 版本号 [--stat]`

## 分支（branch）

### 创建

-   创建：`git branch dev`  
-   创建并切换：`git branch -b dev` 

### 切换

`git checkout dev`  

### 查看

`git branch`  

### 合并指定分支到当前分支

`git merge dev` 

### 删除

-   删除本地分支：`git branch -d dev`  
-   删除远程分支：`git push --delete origin devel`

### 修剪分支（变鸡）：rebase

<https://git-scm.com/docs/git-rebase>

## tag

### 查看

-   列出所有 tag（按字母排序）：`git tag`
-   列出 1. 几的版本 tag：`git tag -l v1.*`

### 创建

-   不带信息的 tag：`git tag v1.0`
-   带信息的 tag：`git tag -a v1.0 -m 'first version'`
-   为以前的 commit 添加 tag：`git tag -a v1.0 版本号`

### 删除

`git tag -d v1.0`

### 上传到 github

-   push 单个 tag：`git push origin [tagname]`
-   push 所有 tag：`git push [origin] --tags`

# 二：git 远程仓库

## 1. 创建 SSH Key

`ssh-keygen -t rsa -C "youremail@example.com"`\
Enter file in which to save the key (/c/Users/Administrator/.ssh/id_rsa): 指定 rsa 的位置和名字（默认是当前目录）

## 2. GitHub 配置 SSH Key

1.  登录 GitHub->Account settings->SSH Keys
2.  Title
3.  key 中粘贴 id_rsa.pub 文件的内容

## 3. GitHub 创建仓库

登录 GitHub 创建仓库

## 4. 本地仓库 push 到 GitHub

1.  关联远程库：`git remote add origin git@github.com:path/repo-name.git`
2.  推送[第一次 push]：`git push [-u] [origin master]`
3.  推送到分支：`git push origin local\_branch:remote\_branch`

## 5. GitHub pull 到本地仓库

GitHub 上为最新版本，本仓库是旧版本可以用 pull 将本地更新到最新版本
`git pull [origin remote\_branch:local\_branch]`\
pull = fetch（下载） + merge（合并）

## 6. GitHub clone 到本地

`git clone git@github.com:path/repo-name.git`

-   clone 最近 N 次提交：`git clone --depth 1 git@github.com:path/repo-name.git`
-   fetch 指定提交：

<!---->

    git fetch git@github.com:path/repo-name.git <sha1-of-commit-of-interest>
    git reset --hard FETCH_HEAD

## 7. 配置远程仓库

1.  git remote 不带参数：列出已经存在的远程分支
2.  git remote -v | --verbose：列出详细信息，在每一个名字后面列出其远程 url
3.  git remote add [shortname] [url]：添加一个新的远程仓库, 可以指定一个简单的名字, 以便将来引用
4.  git remote remove name：删除远程仓库

## 8. 版本回退（不推荐）

1.  本地回滚
2.  删除远程分支
3.  本地 push 到远程

## 9. GitHub Pull Request

1.  Fork 官方的仓库
2.  clone 下来刚刚 Fork 的仓库  
3.  创建分支  
4.  修改代码  
5.  提交修改  
6.  push 修改到刚刚 Fork 的仓库
7.  在 GitHub 官方仓库上点击 Pull Request->New pull request
8.  注意 Compare changes 下面有一行小字有个链接 compare across forks，点击这个链接就能选择这个项目的 Fork 里的分支了进行比较了
9.  比较后觉得没问题了，点击 Create pull request 输入修改了什么就 OK 了

# 三：高级操作

## 寻找丢失的版本

`git fsck --lost-found`\
eg：A 更新到 B，B 回退到 A，A 又更新到 C。丢失的 B 用上面的命令找回。（版本回退后在旧版本提交产生的问题）

# 四：.gitignore

语法：

1.  以斜杠 "/" 开头表示根目录
2.  以斜杠 "/" 结尾表示匹配的最后一项是目录
3.  以星号 "\*" 通配多个字符（全部文件）
4.  以问号 "?" 通配单个字符
5.  以叹号 "!" 表示不忽略（跟踪）匹配到的文件或目录

eg：忽略根目录下 upload 文件夹，除了 2015 文件夹

    #最前面不加"/"则所有文件夹下的upload都会忽略
    #不加"*"则将upload忽略而不是upload下的文件忽略，后面的!/upload/2015/无法生效
    /upload/*

    #忽略/upload/2015/文件夹
    !/upload/2015/

eg：忽略 / web/upload / 下的所有文件和文件夹，除了 / web/upload/img/20170301 / 文件夹

    /web/upload/*

    !/web/upload/img/
    !/web/upload/img/20170301/

# 五：多账户配置

## user 和 email

-   全局配置（~/.gitconfig）
    姓名：`git config --global user.name "Your Name"`\
    邮箱：`git config --global user.email"email@example.com"`
    `ssh-keygen -t rsa -C "youremail@example.com"`\
    Enter file in which to save the key (/c/Users/Administrator/.ssh/id_rsa): /c/Users/Administrator/.ssh/name_rsa  

-   单个仓库配置（仓库 /.git/config）
    进入某仓库
    姓名：`git config user.name "Your Name"`\
    邮箱：`git config user.email"email@example.com"`
    `ssh-keygen -t rsa -C "youremail@example.com"`
    Enter file in which to save the key (/c/Users/Administrator/.ssh/id_rsa): /c/Users/Administrator/.ssh/name_rsa  

## 配置使用的 key

这里使用哪个用户上传就把哪个用户放上面（不知道为什么只能用第一个）

1.  进入~/.ssh
2.  创建 config 文件
3.  配置每一个 key

<!---->

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

# 六：在 U 盘中建立 git 仓库

-   建立：
    在 U 盘作为仓库的目录（eg：I:\\repo\\test_project）执行`git --bare init --shared`\
    bare：只有. git 中的文件，且. git 中的文件都放在当前目录下（git 服务器）

-   使用：
    直接使用建立时的路径访问就行\
    eg：`git clone I:\repo\test_project`

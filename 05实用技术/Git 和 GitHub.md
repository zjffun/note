> Git 是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。Git 的读音为 / gɪt/。
>
> GitHub 是一个面向开源及私有软件项目的托管平台，因为只支持 git 作为唯一的版本库格式进行托管，故名 GitHub。

# 一：Git 基本操作

## 配置

Windows 下配置文件位置：`C:\Users\Administrator\.gitconfig`

-   姓名：`git config --global user.name "Your Name"`  

-   邮箱：`git config --global user.email "email@example.com"`  

-   支持 UTF-8 编码（中文字符由显示转义字符调整为显示正常字符）：`git config --global core.quotepath false`

    Git Bash 可能还需要：`Git Bash 窗口右键 ->Options->Text->Locale 设置 zh_CN，Character set 设置 UTF-8`

-   Git GUI 支持 UTF-8 编码：`git config --global gui.encoding utf-8`

-   忽略文件权限：`git config core.filemode false`  

-   检查文件名大小写：`git config core.ignorecase false`  

-   查看配置：`cat .git/config`

## 版本（commit）

### 查看历史记录

-   标准：`git log`
-   一行：`git log --pretty=oneline`
-   包括未来版本：`git log --reflog`
-   按提交顺序逆序：`git log --reverse`（[--reverse : Git - git-log Documentation](https://git-scm.com/docs/git-log#Documentation/git-log.txt---reverse)）

### 版本回退

-   回退一个版本：`git reset HEAD^`  
-   回退两个版本：`git reset HEAD^^`  
-   回退 N 个版本：`git reset HEAD~N`  
-   回退到指定版本：`git reset 版本号`

### 版本前进

1.  通过查看历史命令查看未来版本号（`git log` 命令获取不到未来版本号）：`git reflog`

    或通过以下命令查看未来版本号：`git log --reflog`

2.  跳转到指定版本：`git reset 版本号`

### 查看某个版本的改动\[一行]

[Git - git-show Documentation](https://git-scm.com/docs/git-show)

`git show 版本号 [--stat]`

## 分支（branch）

### 创建

-   创建：`git branch dev`  
-   创建并切换：`git checkout -b dev` 

### 切换

-   `git checkout dev`  

### 查看

-   `git branch`  

### 合并

-   合并指定分支到当前分支：`git merge dev` 

### 删除

-   删除本地分支：`git branch -d dev`

### 从远程库删除

-   `git push --delete origin devel`

### 修剪分支（变鸡）：rebase

<https://git-scm.com/docs/git-rebase>

## 标签（tag）

### 查看

-   列出所有 tag（按字母排序）：`git tag`
-   列出 1. 几的版本 tag：`git tag -l v1.*`

### 创建

-   不带信息的 tag：`git tag v1.0`
-   带信息的 tag：`git tag -a v1.0 -m 'first version'`
-   为以前的 commit 添加 tag：`git tag -a v1.0 版本号`

### 删除

-   `git tag -d v1.0`

### 上传到远程库

-   push 单个 tag：`git push origin [tagname]`
-   push 所有 tag：`git push [origin] --tags`

### 从远程库删除

-   `git push origin :refs/tags/tagname` 或 `git push origin :tagname`

## 撤销修改

暂存区 -> 工作区：`git checkout filename`

版本库 -> 暂存区：`git reset HEAD filename`

## 查看历史命令

`git reflog`

## 换行（eol）

`core.autocrlf`：配置 eol 自动转换

-   true（默认）：提交时将 CRLF 变为 LF，window 下迁出时将 LF 变为 CRLF
-   input：提交时将 CRLF 变为 LF
-   false：不变

`core.eol`：配置 eol，当`core.autocrlf`为`true` 或 `input`时该配置失效

-   _lf_, _crlf_ 或_native_

# 二：Git 远程仓库

## 1. 创建 SSH Key

```bash
$ ssh-keygen -t rsa -C "youremail@example.com"
```

## 2. GitHub 配置 SSH Key

1.  登录 GitHub->Account settings->SSH Keys
2.  Title
3.  key 中粘贴 id_rsa.pub 文件的内容

## 3. GitHub 创建仓库

登录 GitHub 创建仓库

## 4. 本地仓库 push 到 GitHub

1.  关联远程库：`git remote add origin git@github.com:path/repo-name.git`
2.  推送\[第一次 push]：`git push [-u] [origin master]`
3.  推送到分支：`git push origin local_branch:remote_branch`

## 5. GitHub pull 到本地仓库

GitHub 上为最新版本，本仓库是旧版本可以用 pull 将本地更新到最新版本
`git pull [origin remote_branch:local_branch]`

pull = fetch（下载） + merge（合并）

## 6. GitHub clone 到本地

`git clone git@github.com:path/repo-name.git`

-   clone 最近 N 次提交：`git clone --depth 1 git@github.com:path/repo-name.git`
-   fetch 指定提交：
    ```bash
    git fetch git@github.com:path/repo-name.git <sha1-of-commit-of-interest>
    git reset --hard FETCH_HEAD
    ```
-   使用用户名和密码克隆私有仓库
    ```bash
    git clone https://username:password@github.com/username/repository.git
    git clone https://username@github.com/username/repository.git
    ```

## 7. 配置远程仓库

-   `git remote 不带参数`：列出已经存在的远程分支
-   `git remote -v | --verbose`：列出详细信息，在每一个名字后面列出其远程 url
-   `git remote add [shortname] [url]`：添加一个新的远程仓库, 可以指定一个简单的名字, 以便将来引用
-   `git remote remove name`：删除远程仓库

## 8. 版本回退

方案 1（推荐）：

```bash
$ git revert <commit>
$ git push origin master
```

方案 2（不推荐！！！）：

```bash
$ git reset --hard <commit>
$ git push origin master -f
```

方案 3（不推荐！！！）：

```bash
$ git reset --hard <commit>
$ # 删掉远程仓库的分支
$ git push <remote_name> :<branch_name>
$ git push <branch_name> <branch_name>
```

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

## 10. 保存用户名密码

这种方式可以在无法用 SSH Key 的场合使用

```bash
git config --global credential.helper store
git pull
```

[credentials - How to save username and password in GIT? - Stack Overflow](https://stackoverflow.com/questions/35942754/how-to-save-username-and-password-in-git)

# 三：高级操作

## 寻找丢失的版本

`git fsck --lost-found`

eg：A 更新到 B，B 回退到 A，A 又更新到 C。丢失的 B 用上面的命令找回。（版本回退后在旧版本提交产生的问题）

## 清除 untracked 的文件

谨慎使用可以先加上`-n`检查一下哪些文件将被删除。

`git clean [-d] [-f] [-x] [-n]`

-   `-d`：包括文件夹
-   `-f`：强制执行
-   `-x`：删除忽略的文件
-   `-n`：不删除文件，只列出哪些文件将被删除

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

## 配置 user 和 email

-   全局配置（~/.gitconfig）
    姓名：`git config --global user.name "Your Name"`

    邮箱：`git config --global user.email"email@example.com"`
    `ssh-keygen -t rsa -C "youremail@example.com"`

    Enter file in which to save the key (/c/Users/Administrator/.ssh/id_rsa): /c/Users/Administrator/.ssh/name_rsa  

-   单个仓库配置（仓库 /.git/config）
    进入某仓库
    姓名：`git config user.name "Your Name"`

    邮箱：`git config user.email"email@example.com"`
    `ssh-keygen -t rsa -C "youremail@example.com"`
    Enter file in which to save the key (/c/Users/Administrator/.ssh/id_rsa): /c/Users/Administrator/.ssh/name_rsa  

## 配置使用的 key

这里使用哪个用户上传就把哪个用户放上面（不知道为什么只能用第一个）

1.  进入~/.ssh
2.  创建 config 文件
3.  配置每一个 key

    \#global_key
    Host github.com 
    ​    HostName github.com
    ​    IdentityFile ~/.ssh/name_rsa1
    ​    PreferredAuthentications publickey
    ​    User your_name1

    \#xxx_key
    Host github.com  
    ​    HostName github.com
    ​    IdentityFile ~/.ssh/name_rsa2
    ​    PreferredAuthentications publickey
    ​    User your_name2

    # 配置文件参数

    # Host : Host 可以看作是一个你要识别的模式，对识别的模式，进行配置对应的的主机名和 ssh 文件

    # HostName : 要登录主机的主机名

    # User : 登录名

    # IdentityFile : 指明上面 User 对应的 identityFile 路径

# 六：在 U 盘中建立 git 仓库

-   建立：
    在 U 盘作为仓库的目录（eg：I:\\repo\\test_project）执行`git --bare init --shared`

    bare：只有. git 中的文件，且. git 中的文件都放在当前目录下（git 服务器）

-   使用：
    直接使用建立时的路径访问就行 

    eg：`git clone I:\repo\test_project`

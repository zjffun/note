---
updated: 'Sat, 18 Apr 2020 10:42:28 GMT'
date: 'Sun, 23 Jun 2019 10:22:25 GMT'
---

# 1 起步

## [Git 配置](https://gitee.com/progit/1-%E8%B5%B7%E6%AD%A5.html#1.5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE)

-   `/etc/gitconfig` 文件：系统中对所有用户都普遍适用的配置。若使用 `git config` 时用 `--system`         选项，读写的就是这个文件。
-   `~/.gitconfig` 文件：用户目录下的配置文件只适用于该用户。若使用 `git config` 时用 `--global`         选项，读写的就是这个文件。
-   当前项目的 git 目录中的配置文件（也就是工作目录中的 `.git/config` 文件）：这里的配置仅仅针对当前项目有效。每一个级别的配置都会覆盖上层的相同配置，所以 `.git/config` 里的配置会覆盖 `/etc/gitconfig` 中的同名变量。

# 2 Git 基础

## [2.2 记录每次更新到仓库](https://gitee.com/progit/2-Git-%E5%9F%BA%E7%A1%80.html#2.2-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93)

### 忽略某些文件

文件 `.gitignore` 的格式规范如下：

-   所有空行或者以注释符号 `＃` 开头的行都会被 Git 忽略。
-   可以使用标准的 glob 模式匹配。
-   匹配模式最后跟反斜杠（`/`）说明要忽略的是目录。
-   要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（`!`）取反。

所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。星号（`*`）匹配零个或多个任意字符；`[abc]` 匹配任何一个列在方括号中的字符（这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）；问号（`?`）只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如 `[0-9]` 表示匹配所有 0 到 9 的数字）。

## [2.3 查看提交历史](https://gitee.com/progit/2-Git-%E5%9F%BA%E7%A1%80.html#2.3-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2)

| 选项                | 说明                                                                 |
| ----------------- | ------------------------------------------------------------------ |
| `-p`              | 按补丁格式显示每个更新之间的差异。                                                  |
| `--stat`          | 显示每次更新的文件修改统计信息。                                                   |
| `--shortstat`     | 只显示 `--stat` 中最后的行数修改添加移除统计。                                       |
| `--name-only`     | 仅在提交信息后显示已修改的文件清单。                                                 |
| `--name-status`   | 显示新增、修改、删除的文件清单。                                                   |
| `--abbrev-commit` | 仅显示 SHA-1 的前几个字符，而非所有的 40 个字符。                                     |
| `--relative-date` | 使用较短的相对时间显示（比如，“2 weeks ago”）。                                     |
| `--graph`         | 显示 ASCII 图形表示的分支合并历史。                                              |
| `--pretty`        | 使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format（后跟指定格式）。 |

例如：

-   `git log`
-   `git log -p -2`
-   `git log --stat`
-   `git log --pretty=oneline`
-   `git log --pretty=format:"%h - %an, %ar : %s"`
-   `git log --pretty=format:"%h %s" --graph`

## [2.4 撤消操作](https://gitee.com/progit/2-Git-%E5%9F%BA%E7%A1%80.html#2.4-%E6%92%A4%E6%B6%88%E6%93%8D%E4%BD%9C)

### 修改最后一次提交

```bash
git commit --amend
```

## [2.7 技巧和窍门](https://gitee.com/progit/2-Git-%E5%9F%BA%E7%A1%80.html#2.7-%E6%8A%80%E5%B7%A7%E5%92%8C%E7%AA%8D%E9%97%A8)

### 自动补全

如果你用的是 Bash shell，可以试试看 Git 提供的自动补全脚本。下载 Git 的源代码，进入 `contrib/completion` 目录，会看到一个 `git-completion.bash` 文件。将此文件复制到你自己的用户主目录中（译注：按照下面的示例，还应改名加上点：`cp git-completion.bash ~/.git-completion.bash`），并把下面一行内容添加到你的 `.bashrc` 文件中：

```bash
$ source ~/.git-completion.bash
```

注 Ubuntu：

```bash
cp /usr/share/bash-completion/completions/git ~/.git-completion.bash
echo "source ~/.git-completion.bash" >> ~/.bashrc
```

### Git 命令别名

```bash
$ git config --global alias.last 'log -1 HEAD'
```

# 3 Git 分支

Git 中是 branch 指向 commit 的指针，HEAD 是指向 branch 的指针！

## [3.5 远程分支](https://gitee.com/progit/3-Git-%E5%88%86%E6%94%AF.html#3.5-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF)

我们用 `(远程仓库名)/(分支名)` 这样的形式表示远程分支。比如我们想看看上次同 `origin` 仓库通讯时 `master` 分支的样子，就应该查看`origin/master` 分支。

## [3.6 分支的衍合](https://gitee.com/progit/3-Git-%E5%88%86%E6%94%AF.html#3.6-%E5%88%86%E6%94%AF%E7%9A%84%E8%A1%8D%E5%90%88)

一般我们使用衍合的目的，是想要得到一个能在远程分支上干净应用的补丁 — 比如某些项目你不是维护者，但想帮点忙的话，最好用衍合：先在自己的一个分支里进行开发，当准备向主项目提交补丁的时候，根据最新的 `origin/master`进行一次衍合操作然后再提交，这样维护者就不需要做任何整合工作

# 4 服务器上的 Git

远程仓库通常只是一个裸仓库（bare repository） — 即一个没有当前工作目录的仓库。因为该仓库只是一个合作媒介，所以不需要从硬盘上取出最新版本的快照；仓库里存放的仅仅是 Git 的数据。简单地说，裸仓库就是你工作目录中 `.git` 子目录内的内容。

# 5 分布式 Git

## [5.2 为项目作贡献](https://gitee.com/progit/5-%E5%88%86%E5%B8%83%E5%BC%8F-Git.html#5.2-%E4%B8%BA%E9%A1%B9%E7%9B%AE%E4%BD%9C%E8%B4%A1%E7%8C%AE)

建议：

-   首先，请不要在更新中提交多余的白字符（whitespace）。Git 有种检查此类问题的方法，在提交之前，先运行 `git diff --check`，会把可能的多余白字符修正列出来。
-   接下来，请将每次提交限定于完成一次逻辑功能。并且可能的话，适当地分解为多次小更新，以便每次小型提交都更易于理解。（如果针对两个问题改动的是同一个文件，可以试试看`git add --patch`的方式将部分内容置入暂存区域）

涉及到的 Git 命令：

-   查看服务器新增提交：先`git fetch origin`，然后`git log origin/master ^master`
-   不产生提交的合并：`git merge --no-commit --squash featureB`

## [5.3 项目的管理](https://gitee.com/progit/5-%E5%88%86%E5%B8%83%E5%BC%8F-Git.html#5.3-%E9%A1%B9%E7%9B%AE%E7%9A%84%E7%AE%A1%E7%90%86)

### 检出远程分支

长期的合作，建立远程分支，例如：

```bash
$ git remote add jessica git://github.com/jessica/myproject.git
$ git fetch jessica
$ git checkout -b rubyclient jessica/ruby-client
```

临时合作，只需用 `git pull` 命令抓取远程仓库上的数据，例如：

```bash
$ git pull git://github.com/onetimeguy/project.git
  From git://github.com/onetimeguy/project
  * branch HEAD -> FETCH_HEAD
  Merge made by recursive.
```

### 决断代码取舍

#### 查看分支上都有哪些新增的提交

比如在 `contrib` 特性分支上打了两个补丁，仅查看这两个补丁的提交信息，可以用 `--not` 选项指定要屏蔽的分支 `master`，这样就会剔除重复的提交历史：

```bash
$ git log contrib --not master
```

#### 查看分支和其他分支间的差异

```bash
$ git diff master...contrib
```

这条命令相当于先用`git merge-base contrib master`找到公共组件的 SHA-1，然后用`git diff 公共组件的 SHA-1`

### 代码集成

一旦特性分支准备停当，接下来的问题就是如何集成到更靠近主线的分支中。此外还要考虑维护项目的总体步骤是什么。

#### 合并流程

一般最简单的情形，是在 `master` 分支中维护稳定代码，然后在特性分支上开发新功能，或是审核测试别人贡献的代码，接着将它并入主干，最后删除这个特性分支，如此反复。

#### 衍合与挑拣（cherry-pick）的流程

挑拣类似于针对某次特定提交的衍合。它首先提取某次提交的补丁，然后试着应用在当前分支上。如果某个特性分支上有多个提交，但你只想引入其中之一就可以使用这种方法。也可能仅仅是因为你喜欢用挑拣，讨厌衍合。例如`git cherry-pick 挑拣的 SHA-1`

### 给发行版签名

加 tag

### 生成内部版本号

```bash
$ git describe master
```

### 准备发布

现在可以发布一个新的版本了。首先要将代码的压缩包归档，方便那些可怜的还没有使用 Git 的人们。可以使用`git archive`：

```bash
$ git archive master --prefix='project/' | gzip > `git describe master`.tar.gz
```

这个压缩包解压出来的是一个文件夹，里面是你项目的最新代码快照。你也可以用类似的方法建立一个 zip 压缩包，在`git archive`加上`--format=zip`选项：

```bash
$ git archive master --prefix='project/' --format=zip > `git describe master`.zip
```

现在你有了一个 tar.gz 压缩包和一个 zip 压缩包，可以把他们上传到你网站上或者用 e-mail 发给别人。

### 制作简报

使用`git shortlog`命令可以方便快捷的制作一份修改日志（changelog），告诉大家上次发布之后又增加了哪些特性和修复了哪些 bug。实际上这个命令能够统计给定范围内的所有提交；假如你上一次发布的版本是 v1.0.1，下面的命令将给出自从上次发布之后的所有提交的简介：

```bash
$ git shortlog --no-merges master --not v1.0.1
```

# 6 Git 工具

## [6.1 修订版本（Revision）选择](https://gitee.com/progit/6-Git-%E5%B7%A5%E5%85%B7.html#6.1-%E4%BF%AE%E8%AE%A2%E7%89%88%E6%9C%AC%EF%BC%88Revision%EF%BC%89%E9%80%89%E6%8B%A9)

### 祖先引用

`^N`选择上次父提交的第几父提交（仅在合并提交时有用），`~N`选择向前第几次的父提交

例如: `git show HEAD~3^2`表示查看前三次的提交的第二父提交

```text
zjf@DESKTOP-5JD9B9T MINGW64 ~/Desktop/test/git (master)
$ git log --pretty=format:'%h %s' --graph
* 1945ca3 c9 (git show HEAD)
* deb9846 c8 (git show HEAD~ 或 git show HEAD^)
* 62d2c92 c7 (git show HEAD~2 或 git show HEAD^^)
*   cd081b7 c6 (git show HEAD~3)
|\
| * ee8af81 c4 (git show HEAD~3^2)
* | dc15520 c3 (git show HEAD~3^1)
* | f34e664 c2
|/
* 8919ec2 c1

zjf@DESKTOP-5JD9B9T MINGW64 ~/Desktop/test/git (master)
$ git show -q HEAD~3^2
commit ee8af8148af521f509c08ed8899643a0b4c88e6c (t1)
Author: zjf <zjffun@gmail.com>
Date:   Sat Jul 13 19:09:34 2019 +0800

    c4
```

### 提交范围

-   双点：`git log origin/master..HEAD`显示在 HEAD 分支上，但不在 origin/master 分支上的提交
-   多点：`git log refA refB --not refC`显示在 refA 或 refB 分支上，但不在 refC 分支上的提交
-   三点：`git log --left-right master...experiment`，查看 master 和 experiment 分支的不同提交，并标出不同的提交属于哪个分支

## [6.2 交互式暂存](https://gitee.com/progit/6-Git-%E5%B7%A5%E5%85%B7.html#6.2-%E4%BA%A4%E4%BA%92%E5%BC%8F%E6%9A%82%E5%AD%98)

```bash
$ git add -i
```

在`xxx>>`提示后面直接敲入回车会保存更改。

只让 Git 暂存文件的某些部分而忽略其他也是有可能的。在交互式的提示符下，输入`5`或者`p`（表示 patch，补丁）。Git 会询问哪些文件你希望部分暂存；然后对于被选中文件的每一节，他会逐个显示文件的差异区块并询问你是否希望暂存他们。

## [6.3 储藏（Stashing）](https://gitee.com/progit/6-Git-%E5%B7%A5%E5%85%B7.html#6.3-%E5%82%A8%E8%97%8F%EF%BC%88Stashing%EF%BC%89)

stash 跟 commit 很像不过是存在一个单独的栈里。

## [6.4 重写历史](https://gitee.com/progit/6-Git-%E5%B7%A5%E5%85%B7.html#6.4-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2)

### 改变最近一次提交

```
$ git commit --amend
```

### 修改、重排和压制提交

```
# 修改最近三次提交（将要修改的 pick 改为 edit、squash，或者改变顺序）
$ git rebase -i HEAD~3
# 根据提示输入下面的命令修改或继续
$ git commit --amend
$ git rebase --continue
```

### 拆分提交

在`git rebase -i`脚本中修改你想拆分的提交前的指令为 "edit"，然后在进入命令行后进行多次提交，然后`git rebase --continue`

### 核弹级选项: filter-branch

#### 从所有提交中删除一个文件

```bash
$ git filter-branch --tree-filter 'rm -f passwords.txt' HEAD
```

#### 将一个子目录设置为新的根目录

假设你完成了从另外一个代码控制系统的导入工作，得到了一些没有意义的子目录（trunk,
tags 等等）。如果你想让`trunk`子目录成为每一次提交的新的项目根目录，`filter-branch`也可以帮你做到，使用下面这条命令 Git 会自动地删除不对这个子目录产生影响的提交。

```bash
$ git filter-branch --subdirectory-filter trunk HEAD
```

#### 全局性地更换电子邮件地址

```
$ git filter-branch --commit-filter '
    if [ "$GIT_AUTHOR_EMAIL" = "schacon@localhost" ];
    then
    GIT_AUTHOR_NAME="Scott Chacon";
    GIT_AUTHOR_EMAIL="schacon@example.com";
    git commit-tree "$@";
    else
    git commit-tree "$@";
    fi' HEAD
```

## [6.5 使用 Git 调试](https://gitee.com/progit/6-Git-%E5%B7%A5%E5%85%B7.html#6.5-%E4%BD%BF%E7%94%A8-Git-%E8%B0%83%E8%AF%95)

### 查看每行代码的最近一次提交

例如：查看`index.js`的 12-22 的每一行最近一次提交分别是由谁在哪一天弄的

```bash
git blame -L 12,22 index.js
```

PS：`-C` 参数会尝试找出隐式的重命名动作。通常，你会把你拷贝代码的那次提交作为原始提交，因为这是你在这个文件中第一次接触到那几行。Git 可以告诉你编写那些行的原始提交，即便是在另一个文件里。

### 二分查找定位发生错误的提交

首先你运行`git bisect start`启动，然后你用`git bisect bad`来告诉系统当前的提交已经有问题了。然后你必须告诉 bisect 已知的最后一次正常状态是哪次提交，使用`git bisect good [good_commit]`：

```
$ git bisect start
$ git bisect bad
$ git bisect good v1.0
```

然后告诉 git 当前版本是否有错误

```bash
$ git bisect good
$ git bisect bad
```

当你完成之后，你应该运行`git bisect reset`来重设你的 HEAD 到你开始前的地方，否则你会处于一个诡异的地方：

```bash
$ git bisect reset
```

## [6.6 子模块](https://gitee.com/progit/6-Git-%E5%B7%A5%E5%85%B7.html#6.6-%E5%AD%90%E6%A8%A1%E5%9D%97)

子模块允许你将一个 Git 仓库当作另外一个 Git 仓库的子目录。这允许你克隆另外一个仓库到你的项目中并且保持你的提交相对独立。

```bash
$ git submodule
```

## [6.7 子树合并](https://gitee.com/progit/6-Git-%E5%B7%A5%E5%85%B7.html#6.7-%E5%AD%90%E6%A0%91%E5%90%88%E5%B9%B6)

子树归并的思想是你拥有两个工程，其中一个项目映射到另外一个项目的子目录中，反过来也一样。当你指定一个子树归并，Git 可以聪明地探知其中一个是另外一个的子树从而实现正确的归并 —— 这相当神奇。

```bash
# 拉取分支
$ git read-tree
# 对比分支
$ git diff-tree
```

# 7 自定义 Git

> 先过一遍第一章中提到的 Git 配置细节。Git 使用一系列的配置文件来存储你定义的偏好，它首先会查找`/etc/gitconfig`文件，该文件含有     对系统上所有用户及他们所拥有的仓库都生效的配置值（译注：gitconfig 是全局配置文件）， 如果传递`--system`选项给`git config`命令， Git 会读写这个文件。
>
> 接下来 Git 会查找每个用户的`~/.gitconfig`文件，你能传递`--global`选项让 Git 读写该文件。
>
> 最后 Git 会查找由用户定义的各个库中 Git 目录下的配置文件（`.git/config`），该文件中的值只对属主库有效。     以上阐述的三层配置从一般到特殊层层推进，如果定义的值有冲突，以后面层中定义的为准，例如：在`.git/config`和`/etc/gitconfig`的较量中， `.git/config`取得了胜利。虽然你也可以直接手动编辑这些配置文件，但是运行`git         config`命令将会来得简单些。

## [7.1 配置 Git](https://gitee.com/progit/7-%E8%87%AA%E5%AE%9A%E4%B9%89-Git.html#7.1-%E9%85%8D%E7%BD%AE-Git)

### 客户端基本配置

```bash
# 用户名和邮箱
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
# 文本编辑器
$ git config --global core.editor vim
# 提交模板文件
$ git config --global commit.template $HOME/.gitmessage.txt
# 分页器（默认用的是 less）
$ git config --global core.pager ''
# GPG签署密钥
$ git config --global user.signingkey <gpg-key-id>
# 忽略的文件
$ git config --global core.excludesfile
# 只有一个命令被模糊匹配到的情况下，Git 会自动运行该命令
$ git config --global help.autocorrect
# 输出着色
$ git config --global color.ui true
# 外部的合并与比较工具（P4Merge）
git config --global merge.tool
git config --global mergetool
git config --global diff.tool
git config --global difftool
# 处理行尾结束符（回车换行）
core.autocrlf
# 修正空白符问题
core.whitespace
```

### 服务器基本配置

```bash
# 强制推送时 Git 都检查一致性
$ git config --system receive.fsckObjects true
# 禁用“改变历史”的推送
$ git config --system receive.denyNonFastForwards true
# 禁用删除分支
$ git config --system receive.denyDeletes true
```

## [7.2 Git 属性](https://gitee.com/progit/7-%E8%87%AA%E5%AE%9A%E4%B9%89-Git.html#7.2-Git%E5%B1%9E%E6%80%A7)

> 一些设置项也能被运用于特定的路径中，这样，Git 以对一个特定的子目录或子文件集运用那些设置项。这些设置项被称为 Git 属性，可以在你目录中的`.gitattributes`文件内进行设置（通常是你项目的根目录），也可以当你不想让这些属性文件和项目文件一同提交时，在`.git/info/attributes`进行设置。

### 二进制文件

```bash
# 让 Git 把所有pbxproj文件（看着像文本文件，但通常比较其内容）当成二进制文件
# 现在 Git 会尝试转换和修正CRLF（回车换行）问题，但不会进行比较
*.pbxproj -crlf -diff
# Git 1.6及之后的版本中，可以用一个宏代替-crlf -diff
*.pbxproj binary

# 把Word文档转换成可读的文本文件，之后再进行比较
$ echo '*.doc diff=word' >> .gitattributes
$ git config diff.word.textconv strings

# 对比图像的元数据
$ echo '*.png diff=exif' >> .gitattributes
$ git config diff.exif.textconv exiftool
```

### 关键字扩展

```bash
# 把blob的SHA-1校验和自动注入文件的$Id$字段
$ echo '*.txt ident' >> .gitattributes
$ echo '$Id$' > test.txt
$ rm text.txt
$ git checkout -- text.txt
$ cat test.txt
	$Id: 42812b7653c7b88933f8a9d6cad0ca16714b9bb3 $
```

过滤器：

暂存区 -> 工作区：smudge

工作区 -> 暂存区：clean

```bash
# 暂存文件时调整缩进
$ echo '*.c filter=indent' >> .gitattributes
$ git config --global filter.indent.clean indent
$ git config --global filter.indent.smudge cat
```

### 导出仓库

```bash
# 不归档测试文件夹
$ echo 'test/ export-ignore' >> .gitattributes
```

### 合并策略

```bash
# 对 database.xml 只用 ours 这边的进行合并
database.xml merge=ours
```

## [7.3 Git 挂钩](https://gitee.com/progit/7-%E8%87%AA%E5%AE%9A%E4%B9%89-Git.html#7.3-Git%E6%8C%82%E9%92%A9)

> 有两组挂钩：客户端和服务器端。客户端挂钩用于客户端的操作，如提交和合并。服务器端挂钩用于 Git
> 服务器端的操作，如接收被推送的提交。

### 客户端挂钩

提交工作流挂钩：`pre-commit`、`prepare-commit-msg`、`commit-msg`、`post-commit`

电子邮件工作流挂钩：如果你通过 e-mail 接收由`git format-patch`产生的补丁，这些挂钩也许对你有用。

其他客户端挂钩：`pre-rebase`、`git checkout`

### 服务器端挂钩

`pre-receive`、`post-receive`、`update`

## [7.4 Git 强制策略实例](https://gitee.com/progit/7-%E8%87%AA%E5%AE%9A%E4%B9%89-Git.html#7.4-Git-%E5%BC%BA%E5%88%B6%E7%AD%96%E7%95%A5%E5%AE%9E%E4%BE%8B)（○）

> 本节中我们应用前面学到的知识建立这样一个 Git 工作流程：检查提交信息的格式，只接受纯 fast-forward 内容的推送，并且指定用户只能修改项目中的特定子目录。我们将写一个客户端脚本来提示开发人员他们推送的内容是否会被拒绝，以及一个服务端脚本来实际执行这些策略。

# 8 Git 与其他系统（○）

# 9 Git 内部原理

从根本上来讲 Git 是一套内容寻址 (content-addressable) 文件系统，在此之上提供了一个 VCS 用户界面。

由于 Git 一开始被设计成供 VCS 使用的工具集而不是一整套用户友好的 VCS，它还包含了许多底层命令，这些命令用于以 UNIX 风格使用或由脚本调用。这些命令一般被称为 "plumbing" 命令（底层命令），其他的更友好的命令则被称为 "porcelain" 命令（高层命令）。

当你在一个新目录或已有目录内执行 `git init` 时，Git 会创建一个 `.git` 目录，几乎所有 Git 存储和操作的内容都位于该目录下。如果你要备份或复制一个库，基本上将这一目录拷贝至其他地方就可以了。

该目录结构如下：

```bash
$ ls
    HEAD   ***指向当前分支
    branches/   新版本的 Git 不再使用
    config   项目特有的配置选项
    description   仅供 GitWeb 程序使用
    hooks/   目录保存了第七章详细介绍了的客户端或服务端钩子脚本
    index   ***保存了暂存区域信息
    info/   保存了一份不希望在 .gitignore 文件中管理的忽略模式 (ignored patterns)
    objects/   ***存储所有数据内容
    refs/   ***存储指向数据 (分支) 的提交对象的指针
```

## 9.2 `objects`

Git 从核心上来看不过是简单地存储键值对（key-value）。它允许插入任意类型的内容，并会返回一个键值，通过该键值可以在任何时候再取出该内容。可以通过底层命令 `hash-object`来示范这点，传一些数据给该命令，它会将数据保存在 `.git` 目录并返回表示这些数据的键值。

### Blob

```bash
# 初始化Git仓库
$ mkdir test
$ cd test
$ git init
	Initialized empty Git repository in /tmp/test/.git/
# objects 目录是空的
$ find .git/objects -type f
# 创建 Git 对象
$ echo 'test content' | git hash-object -w --stdin
    d670460b4b4aece5915caf5c68d12f560a9fe3e4
# 查看在 objects 目录生成的文件（Git 为每份内容生成一个文件）
$ find .git/objects -type f
    .git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
# 读取 Git 对象内容
$ git cat-file -p d670460b4b4aece5915caf5c68d12f560a9fe3e4
    test content
# 创建 Git 对象（version 1）
$ echo 'version 1' > test.txt
$ git hash-object -w test.txt
    83baae61804e65cc73a7201a7252750c76066a30
# 创建 Git 对象（version 2）
$ echo 'version 2' > test.txt
$ git hash-object -w test.txt
    1f7a7a472abf3dd9643fd615f6da379c4acb3e3a
# 查看在 objects 目录生成的文件
$ find .git/objects -type f
    .git/objects/1f/7a7a472abf3dd9643fd615f6da379c4acb3e3a
    .git/objects/83/baae61804e65cc73a7201a7252750c76066a30
    .git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
# 恢复 version 1 文件
$ git cat-file -p 83baae61804e65cc73a7201a7252750c76066a30 > test.txt
$ cat test.txt
    version 1
# 恢复 version 2 文件
$ git cat-file -p 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a > test.txt
$ cat test.txt
    version 2
```

### tree

通常 Git 根据你的暂存区域或 index 来创建并写入一个 tree 。

在上面已经创建了文件，需要指明将哪个文件索引（文件和版本）写入树。这需要将文件加入暂存区。

```bash
# 由于该文件原先并不在暂存区域中 (甚至就连暂存区域也还没被创建出来呢) ，必须传入 `--add` 参数
# 由于要添加的文件并不在当前目录下而是在数据库中，必须传入`--cacheinfo` 参数
# 同时指定了文件模式（100644 ），SHA-1 值和文件名
$ git update-index --add --cacheinfo 100644 \
    83baae61804e65cc73a7201a7252750c76066a30 test.txt
# 将索引写入树1
$ git write-tree
	d8329fc1cc938780ffdd9f94e0d364e0ea74f579
# 查看这颗树1
$ git cat-file -p d8329fc1cc938780ffdd9f94e0d364e0ea74f579
    100644 blob 83baae61804e65cc73a7201a7252750c76066a30 test.txt
# 查看刚才创建的树的类型
$ git cat-file -t d8329fc1cc938780ffdd9f94e0d364e0ea74f579
    tree
# 更新 test.txt 索引
$ git update-index test.txt
# 创建新文件并建立索引
$ echo 'new file' > new.txt
$ git update-index --add new.txt
# 将索引写入树2
$ git write-tree
    0155eb4229851634a0f03eb265b69f5a2d56f341
# 查看这颗树2
$ git cat-file -p 0155eb4229851634a0f03eb265b69f5a2d56f341
    100644 blob fa49b077972391ad58037050f2a75f74e3671e92 new.txt
    100644 blob 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a test.txt
# 将第一次创建的树作为子目录加入索引
$ git read-tree --prefix=bak d8329fc1cc938780ffdd9f94e0d364e0ea74f579
# 将索引写入树3
$ git write-tree
    3c4e9cd789d88d8d89c1073707c3585e41b0e614
# 查看这棵树3
$ git cat-file -p 3c4e9cd789d88d8d89c1073707c3585e41b0e614
    040000 tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579 bak
    100644 blob fa49b077972391ad58037050f2a75f74e3671e92 new.txt
    100644 blob 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a test.txt
```

### commit

```bash
# 使用树1创建 commit 对象
$ echo 'first commit' | git commit-tree d8329f
    fdf4fc3344e67ab068f836878b6c4951e3b15f3d
# 查看 commit 对象
$ git cat-file -p fdf4fc3
    tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579
    author Scott Chacon <schacon@gmail.com> 1243040974 -0700
    committer Scott Chacon <schacon@gmail.com> 1243040974 -0700

    first commit
# 使用树2、树3创建 commit 对象
$ echo 'second commit' | git commit-tree 0155eb -p fdf4fc3
    cac0cab538b970a37ea1e769cbbde608743bc96d
$ echo 'third commit' | git commit-tree 3c4e9c -p cac0cab
    1a410efbd13591db07496601ebc7a059dd55cfe9
# 现在已经有了真实的 Git 历史了
# 如果运行 git log 命令并指定最后那个 commit 对象的 SHA-1 便可以查看历史
$ git log --stat 1a410e
    commit 1a410efbd13591db07496601ebc7a059dd55cfe9
    Author: Scott Chacon <schacon@gmail.com>
    Date: Fri May 22 18:15:24 2009 -0700

    third commit

    bak/test.txt | 1 +
    1 files changed, 1 insertions(+), 0 deletions(-)

    commit cac0cab538b970a37ea1e769cbbde608743bc96d
    Author: Scott Chacon <schacon@gmail.com>
    Date: Fri May 22 18:14:29 2009 -0700

    second commit
```

以下所列是目前为止样例中的所有对象，每个对象后面的注释里标明了它们保存的内容：

```bash
$ find .git/objects -type f
    .git/objects/01/55eb4229851634a0f03eb265b69f5a2d56f341 # tree 2
    .git/objects/1a/410efbd13591db07496601ebc7a059dd55cfe9 # commit 3
    .git/objects/1f/7a7a472abf3dd9643fd615f6da379c4acb3e3a # test.txt v2
    .git/objects/3c/4e9cd789d88d8d89c1073707c3585e41b0e614 # tree 3
    .git/objects/83/baae61804e65cc73a7201a7252750c76066a30 # test.txt v1
    .git/objects/ca/c0cab538b970a37ea1e769cbbde608743bc96d # commit 2
    .git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4 # 'test content'
    .git/objects/d8/329fc1cc938780ffdd9f94e0d364e0ea74f579 # tree 1
    .git/objects/fa/49b077972391ad58037050f2a75f74e3671e92 # new.txt
    .git/objects/fd/f4fc3344e67ab068f836878b6c4951e3b15f3d # commit 1
```

## 9.3 `refs`

Git 中可以用一个简单的名字来记录 SHA-1 值。你可以在 `.git/refs` 目录下面找到这些包含 SHA-1
值的文件。

```bash
# 查看 refs 文件夹
$ find .git/refs
    .git/refs
    .git/refs/heads
    .git/refs/tags
# 查看 refs 文件夹的文件（现在还没有是空的）
$ find .git/refs -type f
# 创建一个新的引用帮助你记住最后一次提交，技术上你可以这样做
$ echo "1a410efbd13591db07496601ebc7a059dd55cfe9" > .git/refs/heads/master
# 现在，你就可以在 Git 命令中使用你刚才创建的引用而不是 SHA-1 值
$ git log --pretty=oneline master
    1a410efbd13591db07496601ebc7a059dd55cfe9 third commit
    cac0cab538b970a37ea1e769cbbde608743bc96d second commit
    fdf4fc3344e67ab068f836878b6c4951e3b15f3d first commit
# 当然，我们并不鼓励你直接修改这些引用文件，Git 提供了一个安全的命令 update-ref
$ git update-ref refs/heads/master 1a410efbd13591db07496601ebc7a059dd55cfe9
$ git update-ref refs/heads/test cac0ca
$ git log --pretty=oneline test
    cac0cab538b970a37ea1e769cbbde608743bc96d second commit
    fdf4fc3344e67ab068f836878b6c4951e3b15f3d first commit
```

HEAD 文件是一个指向你当前所在分支的引用标识符。

```bash
$ cat .git/HEAD
    ref: refs/heads/master
$ git checkout test
$ cat .git/HEAD
    ref: refs/heads/test
```

Tag 对象指向一个 commit 而不是一个 tree。它就像是一个分支引用，但是不会变化 —— 永远指向同一个 commit，仅仅是提供一个更加友好的名字。

如果你添加了一个 remote 然后推送代码过去，Git 会把你最后一次推送到这个 remote 的每个分支的值都记录在 `refs/remotes`目录下。远程引用和分支主要区别在于他们是不能被 check out 的。Git 把他们当作是标记这些了这些分支在服务器上最后状态的一种书签。

```bash
# 添加一个叫做 origin 的 remote 然后把你的 master 分支推送上去
$ git remote add origin git@github.com:schacon/simplegit-progit.git
$ git push origin master
    Counting objects: 11, done.
    Compressing objects: 100% (5/5), done.
    Writing objects: 100% (7/7), 716 bytes, done.
    Total 7 (delta 2), reused 4 (delta 1)
    To git@github.com:schacon/simplegit-progit.git
    a11bef0..ca82a6d master -> master
# 查看 refs/remotes/origin/master 这个文件
$ cat .git/refs/remotes/origin/master
    ca82a6dff817ec66f44342007202690a93763949
```

## [9.4 Packfiles](https://gitee.com/progit/9-Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86.html#9.4-Packfiles)（○）

## [9.5 The Refspec](https://gitee.com/progit/9-Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86.html#9.5-The-Refspec)

查看`.git/config`文件，有下面这样的配置指定了远程的名称 (`origin`), 远程仓库的 URL 地址，和用于获取操作的 Refspec

```text
    [remote "origin"]
        url = git@github.com:schacon/simplegit-progit.git
        fetch = +refs/heads/*:refs/remotes/origin/*
```

Refspec 的格式是一个可选的 `+` 号，接着是 `<src>:<dst>` 的格式，这里 `<src>`
是远端上的引用格式， `<dst>` 是将要记录在本地的引用格式。可选的 `+` 号告诉 Git 在即使不能快速演进的情况下，也去强制更新它。

缺省情况下 refspec 会被 `git remote add` 命令所自动生成， Git 会获取远端上 `refs/heads/` 下面的所有引用，并将它写入到本地的 `refs/remotes/origin/`。

```bash
# 这三种写法等效
$ git log origin/master
$ git log remotes/origin/master
$ git log refs/remotes/origin/master

# 拉取远程的 master 分支到本地的 origin/mymaster 分支
$ git fetch origin master:refs/remotes/origin/mymaster

# 可以在命令行上指定多个 refspec
$ git fetch origin master:refs/remotes/origin/mymaster \
topic:refs/remotes/origin/topic
    From git@github.com:schacon/simplegit
    ! [rejected] master -> origin/mymaster (non fast forward)
    * [new branch] topic -> origin/topic

# 推送 refspec
$ git push origin master:refs/heads/qa/master

# 删除远程分支
$ git push origin :topic
```

一些设置：

```text
# 只拉取远程的 master 分支，可以把 fetch 这一行修改
fetch = +refs/heads/master:refs/remotes/origin/master

# 每次获取 master 分支和 QA 组的所有分支
[remote "origin"]
    url = git@github.com:schacon/simplegit-progit.git
    fetch = +refs/heads/master:refs/remotes/origin/master
    fetch = +refs/heads/qa/*:refs/remotes/origin/qa/*

# 指定默认推送
[remote "origin"]
    url = git@github.com:schacon/simplegit-progit.git
    fetch = +refs/heads/*:refs/remotes/origin/*
    push = refs/heads/master:refs/heads/qa/master
```

## [9.6 传输协议](https://gitee.com/progit/9-Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86.html#9.6-%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)

> Git 可以以两种主要的方式跨越两个仓库传输数据：基于 HTTP 协议之上，和 `file://`, `ssh://`, 和 `git://`
> 等智能传输协议。

## [9.7 维护及数据恢复](https://gitee.com/progit/9-Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86.html#9.7-%E7%BB%B4%E6%8A%A4%E5%8F%8A%E6%95%B0%E6%8D%AE%E6%81%A2%E5%A4%8D)

### 数据恢复

> 通常最快捷的办法是使用 `git reflog` 工具。当你 (在一个仓库下) 工作时，Git 会在你每次修改了 HEAD 时悄悄地将改动记录下来。当你提交或修改分支时，reflog 就会更新。

PS: reflog 数据是保存在 .git/logs/ 目录下的。

```bash
$ git reflog
    1a410ef HEAD@{0}: 1a410efbd13591db07496601ebc7a059dd55cfe9: updating HEAD
    ab1afef HEAD@{1}: ab1afef80fac8e34258ff41fc1b867c702daa24b: updating HEAD
```

### 移除对象

> Git 有许多过人之处，不过有一个功能有时却会带来问题：`git clone` 会将包含每一个文件的所有历史版本的整个项目下载下来。如果项目包含的仅仅是源代码的话这并没有什么坏处，毕竟 Git
> 可以非常高效地压缩此类数据。不过如果有人在某个时刻往项目中添加了一个非常大的文件，那们即便他在后来的提交中将此文件删掉了，所有的签出都会下载这个大文件。因为历史记录中引用了这个文件，它会一直存在着。

```bash
# 底层命令 git verify-pack 可以识别出大对象
$ git verify-pack -v .git/objects/pack/pack-3f8c0...bb.idx | sort -k 3 -n | tail -3
    e3f094f522629ae358806b17daf78246c27c007b blob 1486 734 4667
    05408d195263d853f09dca71d55116663690c27c blob 12908 3478 1189
    7a9eb2fba2b1811321254ac360970fc169ba2330 blob 2056716 2056872 5401
# 给 rev-list 命令传入 --objects 选项，它会列出所有 commit SHA 值
$ git rev-list --objects --all | grep 7a9eb2fb
    7a9eb2fba2b1811321254ac360970fc169ba2330 git.tbz2
# 找出哪些 commit 修改了这个文件
$ git log --pretty=oneline --branches -- git.tbz2
    da3f30d019005479c99eb4c3406225613985a1db oops - removed large tarball
    6df764092f3e7c8f5f94cbe08ee5cf42e92a0289 added git tarball
# 必须重写从 6df76 开始的所有 commit 才能将文件从 Git 历史中完全移除
$ git filter-branch --index-filter \
    'git rm --cached --ignore-unmatch git.tbz2' -- 6df7640^..
    Rewrite 6df764092f3e7c8f5f94cbe08ee5cf42e92a0289 (1/2)rm 'git.tbz2'
    Rewrite da3f30d019005479c99eb4c3406225613985a1db (2/2)
    Ref 'refs/heads/master' was rewritten
# 删除 reflog 以及运行 filter-branch 时 Git 往 .git/refs/original 添加的一些 refs 对它的引用
$ rm -Rf .git/refs/original
$ rm -Rf .git/logs/
# repack
$ git gc
    Counting objects: 19, done.
    Delta compression using 2 threads.
    Compressing objects: 100% (14/14), done.
    Writing objects: 100% (19/19), done.
    Total 19 (delta 3), reused 16 (delta 1)
# 查看结果
$ git count-objects -v
    count: 8
    size: 2040
    in-pack: 19
    packs: 1
    size-pack: 7
    prune-packable: 0
    garbage: 0
```

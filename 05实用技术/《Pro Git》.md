# 1 起步

## [Git 配置](https://gitee.com/progit/1-%E8%B5%B7%E6%AD%A5.html#1.5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE)

-   `/etc/gitconfig` 文件：系统中对所有用户都普遍适用的配置。若使用 `git config` 时用 `--system`         选项，读写的就是这个文件。     
-   `~/.gitconfig` 文件：用户目录下的配置文件只适用于该用户。若使用 `git config` 时用 `--global`         选项，读写的就是这个文件。     
-   当前项目的 git 目录中的配置文件（也就是工作目录中的 `.git/config` 文件）：这里的配置仅仅针对当前项目有效。每一个级别的配置都会覆盖上层的相同配置，所以 `.git/config` 里的配置会覆盖 `/etc/gitconfig` 中的同名变量。

# 2 Git 基础

## [2.2     记录每次更新到仓库](https://gitee.com/progit/2-Git-%E5%9F%BA%E7%A1%80.html#2.2-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93)

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

如果你用的是 Bash shell，可以试试看 Git 提供的自动补全脚本。下载 Git 的源代码，进入 `contrib/completion` 目录，会看到一个 `git-completion.bash` 文件。将此文件复制到你自己的用户主目录中（译注：按照下面的示例，还应改名加上点：`cp git-completion.bash ~/.git-completion.bash`），并把下面一行内容添加到你的     `.bashrc` 文件中：

```bash
$ source ~/.git-completion.bash
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

使用`git shortlog`命令可以方便快捷的制作一份修改日志（changelog），告诉大家上次发布之后又增加了哪些特性和修复了哪些 bug。实际上这个命令能够统计给定范围内的所有提交; 假如你上一次发布的版本是 v1.0.1，下面的命令将给出自从上次发布之后的所有提交的简介：

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

    $ git commit --amend

### 修改、重排和压制提交

    # 修改最近三次提交（将要修改的 pick 改为 edit、squash，或者改变顺序）
    $ git rebase -i HEAD~3
    # 根据提示输入下面的命令修改或继续
    $ git commit --amend
    $ git rebase --continue

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

    $ git filter-branch --commit-filter '
        if [ "$GIT_AUTHOR_EMAIL" = "schacon@localhost" ];
        then
        GIT_AUTHOR_NAME="Scott Chacon";
        GIT_AUTHOR_EMAIL="schacon@example.com";
        git commit-tree "$@";
        else
        git commit-tree "$@";
        fi' HEAD

## [6.5 使用 Git 调试](https://gitee.com/progit/6-Git-%E5%B7%A5%E5%85%B7.html#6.5-%E4%BD%BF%E7%94%A8-Git-%E8%B0%83%E8%AF%95)

### 查看每行代码的最近一次提交

例如：查看`index.js`的 12-22 的每一行最近一次提交分别是由谁在哪一天弄的

```bash
git blame -L 12,22 index.js
```

PS：`-C` 参数会尝试找出隐式的重命名动作。通常，你会把你拷贝代码的那次提交作为原始提交，因为这是你在这个文件中第一次接触到那几行。Git 可以告诉你编写那些行的原始提交，即便是在另一个文件里。 

### 二分查找定位发生错误的提交

首先你运行`git bisect start`启动，然后你用`git bisect bad`来告诉系统当前的提交已经有问题了。然后你必须告诉 bisect 已知的最后一次正常状态是哪次提交，使用`git bisect good [good_commit]`：

    $ git bisect start
    $ git bisect bad
    $ git bisect good v1.0

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

子树归并的思想是你拥有两个工程，其中一个项目映射到另外一个项目的子目录中，反过来也一样。当你指定一个子树归并，Git 可以聪明地探知其中一个是另外一个的子树从而实现正确的归并——这相当神奇。

```bash
# 拉取分支
$ git read-tree
# 对比分支
$ git diff-tree
```

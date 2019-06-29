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

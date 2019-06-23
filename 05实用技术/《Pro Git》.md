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

    source ~/.git-completion.bash

### Git 命令别名

```bash
git config --global alias.last 'log -1 HEAD'
```

# 3 Git 分支

Git 中是 branch 指向 commit 的指针，HEAD 是指向 branch 的指针！

## [3.5 远程分支](https://gitee.com/progit/3-Git-%E5%88%86%E6%94%AF.html#3.5-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF)

我们用 `(远程仓库名)/(分支名)` 这样的形式表示远程分支。比如我们想看看上次同 `origin` 仓库通讯时 `master` 分支的样子，就应该查看`origin/master` 分支。

## [3.6 分支的衍合](https://gitee.com/progit/3-Git-%E5%88%86%E6%94%AF.html#3.6-%E5%88%86%E6%94%AF%E7%9A%84%E8%A1%8D%E5%90%88)

一般我们使用衍合的目的，是想要得到一个能在远程分支上干净应用的补丁 — 比如某些项目你不是维护者，但想帮点忙的话，最好用衍合：先在自己的一个分支里进行开发，当准备向主项目提交补丁的时候，根据最新的 `origin/master`进行一次衍合操作然后再提交，这样维护者就不需要做任何整合工作

---
updated: 'Tue, 29 Oct 2019 11:33:36 GMT'
date: 'Wed, 20 Feb 2019 01:07:19 GMT'
---

# [Vim documentation: usr_toc](http://vimdoc.sourceforge.net/htmldoc/usr_toc.html)

# 标准术语与 Vim 术语对照

| Standard terminology | Vim’s jargon                             |
| -------------------- | ---------------------------------------- |
| paste                | put                                      |
| copy                 | yank                                     |
| cut                  | delete                                   |
| delete               | delete and write to “blackhole” register |

# 寄存器

> [Meet the yank register](http://vimcasts.org/episodes/meet-the-yank-register/)

-   blackhole register：`"_`
-   default register ：`""`
-   yank register： `"0`

## 使用方法

删除：`"_d`

粘贴：`"0p`

# 其他

-   显示行号：`:set number`或`:set nu`
-   隐藏行号：`:set nonumber`或`:set nonu`

# 缩进

> [Indenting source code | Vim Tips Wiki | FANDOM powered by Wikia](https://vim.fandom.com/wiki/Indenting_source_code)

```text
:set expandtab
:set shiftwidth=2
:set softtabstop=2
```

# 显示空白字符

```text
:e ++ff=unix
:set list
```

-   `^M`: CR
-   `^I`: tab

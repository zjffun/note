# [Vim documentation: usr_toc](http://vimdoc.sourceforge.net/htmldoc/usr_toc.html)

# 标准术语与 Vim 术语对照

| Standard terminology | Vim’s jargon                             |
| -------------------- | ---------------------------------------- |
| paste                | put                                      |
| copy                 | yank                                     |
| cut                  | delete                                   |
| delete               | delete and write to “blackhole” register |

# 寄存器

-   blackhole register：`"_`
-   default register ：`""`
-   yank register： `"0`

## 使用方法

删除：`“_d`

粘贴：`"0p`

# 其他

-   显示行号：`:set number`或`:set nu`

参考：
[Meet the yank register](http://vimcasts.org/episodes/meet-the-yank-register/)

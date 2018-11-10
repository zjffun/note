> 翻译自：[Generating a parse tree from a shell grammar - DEV Community 👩‍💻👨‍💻](https://dev.to/oyagci/generating-a-parse-tree-from-a-shell-grammar-f1)

语法树表示命令的语法结构，使我们轻松地执行用户键入的命令。

下面让我们来翻译这个在shell中可以被视为一个整体执行的命令：
```
ls | cat -e
```

# 1.将输入转化翻译为符号（tokens）
我们用4个符号代表我们的输入，每个符号都有值和类型：
```text
ls -> WORD
| -> PIPE
cat -> WORD
-e -> WORD
```

# 2.创建文法
解析后我们希望获得下面这种形式：
```text
              pipe_sequence
              /          \
simple_command      simple_command    
      |              /          \
   cmd_name       cmd_name     cmd_suffix
      |              |             |
     'ls'          'cat'        cmd_word
                                   |
                                 '-e'
```

所以我们要创建文法。文法是构建语法树的一系类规则。

`sh`文法的简单的版本：
```text
pipe_sequence    : simple_command
                 | pipe_sequence '|' simple_command
                 ;
cmd_suffix       : cmd_word
                 | cmd_word cmd_word
                 ;
simple_command   : cmd_name
                 | cmd_name cmd_suffix
                 ;
cmd_name         : WORD                   
                 ;
cmd_word         : WORD
                 ;
```

这个文法表示：
1. `pipe_sequence`是一个`simple_command`后面跟着0个或多个`simple_command`
2. `cmd_suffix`是一个或多个`cmd_word`
3. `simple_command`是一个`cmd_name` 后面带有0个或一个`cmd_suffix`
4. `cmd_name`和`cmd_word`是`WORD`符号

每一个规则都将用方法实现。

# 3.实现文法
cmd_word
```
/*
** struct s_parser is a data type containing informations about the current parser
** (like the tokens list)
*/
struct s_cmd_word    *cmd_word(struct s_parser *p)
{
    struct s_cmd_word    *w = NULL;

    /*
    ** p->tokens is a liked list containing all the tokens
    ** p->tokens->type is an enum corresponding to the token's type
    */
    if (p->tokens->type == T_WORD)
    {
        w = malloc(sizeof(struct s_cmd_word));
        w->data = strdup(t->data);
        p->tokens = p->tokens->next
        return (w);        
    }
    else
        return (NULL);
}

```

pipe_sequence
```
struct s_pipe_sequence    *pipe_sequence(struct s_parser *p)
{
    struct s_pipe_sequence    *ps;
    struct s_simple_command   *sc;

    ps = malloc(sizeof(struct s_pipe_sequence));
    while (sc = simple_command(p))
    {
        /* This function pushes a new element into a linked list */
        ft_lstpush(sc, &ps->simple_commands);
        if (p->tokens->type == T_PIPE)
            p->tokens = p->tokens->next;
    }
    if (ps->sc)
        return (ps);
    free(ps);
    return (NULL);
}

```

其他的和上面的类似。

最终您可以通过文法生成语法树。

当然这是一个非常简单的版本，但这就是手动生成语法树的全部内容。

如果您想实现一个shell应该首先看这里[The Open Group Base Specifications Issue 7, 2018 edition](http://pubs.opengroup.org/onlinepubs/9699919799/)，这是理解shell（例如`sh`）如何运作首先要看的网站。




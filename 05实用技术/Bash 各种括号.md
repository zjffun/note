注：

- ``$( Dollar Single Parentheses )`` 是将返回括号内执行结果字符串，`${dollar braces}` 是返回变量的值

# 单括号 `( Single Parentheses )`

Single parenthesis will run the commands inside in a subshell.

```bash
a='This string'
( a=banana; mkdir $a )
echo $a
# => 'This string'
ls
# => ...
# => banana/
```

# \$ + 单括号 `$( Dollar Single Parentheses )`

This is for interpolating a subshell command output into a string.

`` `backquotes` `` 的功能与它类似。

```bash
intro="My name is $( whoami )"
echo $intro
# => My name is ryan

# And just to prove that it's a subshell...
a=5
b=$( a=1000; echo $a )
echo $b
# => 1000
echo $a
# => 5
```

# 单方括号 `[ Single Square Brackets ]`

This is an alternate version of the built-in test.

```bash
if [ -f my_friends.txt ]
then
    echo "I'm so loved!"
else
    echo "I'm so alone."
fi

[[ Double Square Brackets ]]

True/false testing.

pie=good
[[ $pie =~ d ]]; echo $?
# => 0, it matches the regex!
```

# 单花括号 `{Single Curly Braces}`

Single curly braces are used for expansion.

```bash
echo h{a,e,i,o,u}p
# => hap hep hip hop hup
echo "I am "{cool,great,awesome}
# => I am cool I am great I am awesome

mv friends.txt{,.bak}
# => braces are expanded first, so the command is `mv friends.txt friends.txt.bak`
```

# \$ + 花括号 `${dollar braces}`

Note that there are no spaces around the contents. This is for variable interpolation. You use it when normal string interpolation could get weird

```bash
# I want to say 'bananaification'
fruit=banana
echo $fruitification
# => "" No output, because $fruitification is not a variable.
echo ${fruit}ification
# => bananaification
```

> 参见：[Bash Brackets Quick Reference - DEV](https://dev.to/rpalo/bash-brackets-quick-reference-4eh6)

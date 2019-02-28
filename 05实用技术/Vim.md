# Moving

-   h moves the cursor one character to the left.
-   j moves the cursor down one line.
-   k moves the cursor up one line.
-   l moves the cursor one character to the right.
-   0 moves the cursor to the beginning of the line.
-   $ moves the cursor to the end of the line.
-   w move forward one word.
-   b move backward one word.
-   G move to the end of the file.
-   gg move to the beginning of the file.
-   \`. move to the last edit.
-   `: 行号` 去指定行

# Editing

-   d starts the delete operation.
-   dw will delete a word.
-   d0 will delete to the beginning of a line.
-   d$ will delete to the end of a line.
-   dgg will delete to the beginning of the file.
-   dG will delete to the end of the file.
-   u will undo the last operation.
-   Ctrl-r will redo the last undo.
-   v highlight one character at a time.
-   V highlight one line at a time.
-   Ctrl-v highlight by columns.
-   p paste text after the current line.
-   P paste text on the current line.
-   y yank text into the copy buffer.
-   单行复制：在命令模式下，将光标移动到将要复制的行处，按 “yy” 进行复制；
-   多行复制：在命令模式下，将光标移动到将要复制的首行处，按 “nyy” 复制 n 行；其中 n 为 1、2、3……
-   直接复制粘贴：命令行模式下输入`开始复制行号, 结束复制行号 co 复制到 N 行后`
-   删除多行：`开始行, 结束行 de`

# Searching and Replacing

-   /_text_ search for _text_ in the document, going forward.
-   n move the cursor to the next instance of the text from the last search. This will wrap to the beginning of the document.
-   N move the cursor to the previous instance of the text from the last search.
-   ?_text_ search for _text_ in the document, going backwards.
-   :%s/_text_/_replacement text_/g search through the entire document for _text_ and replace it with _replacement text_.
-   :%s/_text_/_replacement text_/gc search through the entire document and _confirm_ before replacing text.

# Saving and Quitting

# 其他

-   显示行号：`:set number`或`:set nu`

参考：[Vim 101: A Beginner's Guide to Vim | Linux.com | The source for Linux information](https://www.linux.com/learn/vim-101-beginners-guide-vim)

对一组仓库使用一套配置，另一组仓库使用另一套配置的需求也是有的，比如公司仓库的配置和我个人项目的仓库配置并不完全相同，每次都修改单个仓库的配置太麻烦并且可能会粗心忘改了以错误的配置进行提交，如何对一个文件夹中的项目（公司的项目）都使用同一套配置呢？

答案是用`includeIf`！

下面是一个让`~/Desktop/corp/`这个目录下的仓库都使用`~/Desktop/corp/.gitconfig`配置的例子：

-   全局的 Git 配置（`~/.gitconfig`）

```text
[user]
	name = zjf
	email = zjffun@gmail.com

[includeIf "gitdir:~/Desktop/corp/"]
	path = ~/Desktop/corp/.gitconfig
```

-   公司的 Git 配置 (`~/Desktop/corp/.gitconfig`)

```text
[user]
	name = zhangjufeng
	email = jufeng.zhang@corporation.com
```

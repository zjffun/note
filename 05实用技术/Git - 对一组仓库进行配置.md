# 全局 git 配置（`~/.gitconfig`）

```text
[user]
	name = zjf
	email = zjffun@gmail.com

[includeIf "gitdir:~/Desktop/corp/"]
	path = ~/Desktop/corp/.gitconfig
```

# 公司的 git 配置 (`~/Desktop/corp/.gitconfig`)

```text
[user]
	name = zhangjufeng
	email = jufeng.zhang@corporation.com
```

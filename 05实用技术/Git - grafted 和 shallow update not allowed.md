---
updated: 'Mon, 27 May 2019 16:17:25 GMT'
date: 'Mon, 27 May 2019 16:17:25 GMT'
---

一般人对开源的模板进行修改是总会进行这样的一条龙操作

```bash
# 克隆最近一次提交
git clone xxx --depth 1
# 修改修改修改 提交提交提交
vim xxx
git commit -am "First commit"
vim xxx
git commit -am "xxx complete"
# 将源更换为自己新建的仓库
git remote set-rul origin xxx
# 推上去（这步会报错 shallow update not allowed ）
git push -u origin master
```

# 报错 `shallow update not allowed` ！？

为什么会变成这样呢…… 第一次，有了合适的模板；第一次觉得这个一套下来自己很 6。这两件愉快的事情交织在了一起。而这两份喜悦，又会给我带来许许多多的喜悦。我本应该获得了这种如梦一般的幸福时光才对。可是，为什么，为什么最后一步会报错呢……

其实这个错有比较简单的方法直接删掉`.git`目录重新 init 就好。。

然而我们如果已经提交了几次并且不想丢失这些提交可以使用 `git filter-branch -- --all` 这样就可以去掉克隆的提交的  `grafted` 标记了，然后愉快地进行 `git push -u origin master` 了。

更详细的内容就查看参考和文档吧。Git 真是厉害啊！

# 参考

-   [git shallow clone - how do I remove the "grafted tag" and what is it? - Stack Overflow](https://stackoverflow.com/questions/49731594/git-shallow-clone-how-do-i-remove-the-grafted-tag-and-what-is-it)
-   [How to update a git shallow clone? - Stack Overflow](https://stackoverflow.com/questions/41075972/how-to-update-a-git-shallow-clone)

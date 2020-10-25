---
updated: 'Mon, 25 May 2020 11:33:14 GMT'
date: 'Mon, 25 May 2020 11:33:14 GMT'
---

# 查看仓库大小

```bash
git count-objects -vH
```

# 查找大文件

```bash
git rev-list --objects --all \
| git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \
| sed -n 's/^blob //p' \
| sort --numeric-sort --key=2 \
| cut -c 1-12,41- \
| $(command -v gnumfmt || echo numfmt) --field=2 --to=iec-i --suffix=B --padding=7 --round=nearest
```

解释：

```bash
# 获取全部 obj
git rev-list --objects --all \
# 获取 obj 的信息
| git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \
# 打印 'blob ' 开头的行，并将开头的 'blob ' 替换为空字符串
| sed -n 's/^blob //p' \
# 使用第二列（文件大小）排序
| sort --numeric-sort --key=2 \
# 将 obj 的 12 位后的 sha1 值删除
| cut -c 1-12,41- \
# 用直观的单位显示文件大小
| $(command -v gnumfmt || echo numfmt) --field=2 --to=iec-i --suffix=B --padding=7 --round=nearest
```

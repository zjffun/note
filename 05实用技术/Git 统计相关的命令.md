# 查看全部作者

```bash
git log --format='%aN' | sort -u
```

# 查看某一作者的改动统计

包括：修改的文件个数、增加的行数、删除的行数

```bash
git log --shortstat --author="Marcin Olichwirowicz" | grep -E "fil(e|es) changed" | awk '{files+=$1; inserted+=$4; deleted+=$6} END {print "files changed: ", files, "lines inserted: ", inserted, "lines deleted: ", deleted }'
```

> [Git statistics for repo per author (Example)](https://coderwall.com/p/pek-yg/git-statistics-for-repo-per-author)

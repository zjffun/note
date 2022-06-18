---
updated: 'Mon, 13 Jun 2022 12:52:18 GMT'
date: 'Mon, 19 Aug 2019 11:24:11 GMT'
---

# Windows 下配置

先确保 p4merge 的路径（默认：`C:\Program Files\Perforce\`）在环境变量中

```text
C:\Users\zjffu>where p4merge
  C:\Program Files\Perforce\p4merge.exe
C:\Users\zjffu>path
  ...;C:\Program Files\Perforce\;...
```

然后

```bash
git config --global diff.tool p4merge
git config --global difftool.p4merge.cmd 'p4merge "$LOCAL" "$REMOTE"'

git config --global merge.tool p4merge
git config --global mergetool.p4merge.cmd 'p4merge "$BASE" "$LOCAL" "$REMOTE" "$MERGED"'
```

使用

```bash
git difftool
git mergetool
```

# macOS

```bash
brew cask install p4v
git config --global merge.tool p4merge
```

See: [p4merge for conflict-resolution on macOS](https://pete-woods.com/2018/11/p4merge-for-conflict-resolution-on-macos/)

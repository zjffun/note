---
updated: 'Fri, 01 May 2020 01:06:29 GMT'
date: 'Fri, 01 May 2020 01:06:29 GMT'
---

以 lrzsz 为例。

下载待安装软件包：

```bash
mkdir lrzsz
cd lrzsz
sudo apt install apt-rdepends
apt download $(apt-rdepends lrzsz | grep -v "^ ")
cd ../
tar -zcf lrzsz.tar.gz ./lrzsz
```

安装：

```bash
tar -zxf lrzsz.tar.gz
cd lrzsz
sudo dpkg -i *
```

PS：

```bash
# 列出安装包版本
apt-cache madison lrzsz
```

-   [apt - How can I see all versions of a package that are available in the archive? - Ask Ubuntu](https://askubuntu.com/questions/447/how-can-i-see-all-versions-of-a-package-that-are-available-in-the-archive)
-   [Download Packages With Dependencies Locally In Ubuntu - OSTechNix](https://www.ostechnix.com/download-packages-dependencies-locally-ubuntu/)

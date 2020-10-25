---
updated: 'Mon, 25 May 2020 11:33:14 GMT'
date: 'Mon, 25 May 2020 11:33:14 GMT'
---

修改配置文件

```bash
vim ~/.pip/pip.conf
```

内容为

```conf
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = https://pypi.tuna.tsinghua.edu.cn
```

其他源：

1.  阿里云 <http://mirrors.aliyun.com/pypi/simple/>
2.  豆瓣 <http://pypi.douban.com/simple/>
3.  清华大学 <https://pypi.tuna.tsinghua.edu.cn/simple/>
4.  中国科学技术大学 <http://pypi.mirrors.ustc.edu.cn/simple/>
5.  华中科技大学 <http://pypi.hustunique.com/>

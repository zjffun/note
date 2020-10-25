---
updated: 'Mon, 24 Jun 2019 15:10:02 GMT'
date: 'Mon, 24 Jun 2019 15:10:02 GMT'
---

# Error “530: permission denied”

## 原因

设置了`userlist_enable`为`YES`（使用用户列表），`userlist_deny`默认为`YES`（用户列表为阻止访问列表）。这和我们希望`userlist`文件中的用户可登陆用户的想法正好相反，配置了反而阻止登陆了。

> ftpusers 不受任何配制项的影响，它总是有效，它是一个黑名单！该文件存放的是一个禁止访问 FTP 的用户列表，通常为了安全考虑，管理员不希望一些拥有过大权限的帐号（比如 root) 登入 FTP，以免通过该帐号从 FTP 上传或下载一些危险位置上的文件从而对系统造成损坏。
>
> 而 user_list 则是和 vsftpd.conf 中的 userlist_enable 和 userlist_deny 两个配置项紧密相关的，它可以有效，也可以无效，有效时它可以是一个黑名单，也可以是一个白名单！

## 解决

设置`userlist_deny`为`NO`，让`userlist`文件中的用户为可登陆用户。

或者设置了`userlist_enable`为`NO`，不使用用户列表（不推荐）。

## 参见

> -   [Error “530: permission denied” when user logs in to vsftpd server via ftp – The Geek Diary](https://www.thegeekdiary.com/error-530-permission-denied-when-user-logs-in-to-vsftpd-server-via-ftp/)
> -   <https://blog.csdn.net/bluishglc/article/details/42273197>

---
updated: 'Mon, 16 Nov 2020 02:46:10 GMT'
date: 'Wed, 15 Apr 2020 11:40:57 GMT'
---

```bash
mkdir ~/.ssh

# 添加公钥

cat id_rsa.pub >> ~/.ssh/authorized_keys
# 或者
# ssh-copy-id -i ~/.ssh/mykey user@host
```

> -   [What is SSH Public Key authentication?](https://www.ssh.com/ssh/public-key-authentication)

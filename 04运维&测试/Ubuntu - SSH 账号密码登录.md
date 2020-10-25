---
updated: 'Wed, 15 Apr 2020 11:40:57 GMT'
date: 'Wed, 15 Apr 2020 11:40:57 GMT'
---

```bash
# install
apt install openssh-server

# config
cp /etc/ssh/sshd_config /etc/ssh/sshd_config-bak
echo "PermitRootLogin yes" > /etc/ssh/sshd_config

# start
sudo service ssh start
# OR
# sudo /etc/init.d/ssh start
# OR for systemd based Ubuntu Linux 16.04 LTS or above server:
# sudo systemctl start ssh 
```

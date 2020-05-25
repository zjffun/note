```bash
# 1. 编辑
sudo vim /etc/default/grub

# GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
# 改为
# GRUB_CMDLINE_LINUX_DEFAULT="quiet splash video=hyperv_fb:1920x1080"

# 2. 刷新
sudo update-grub

# 3. 重启
sudo reboot
```

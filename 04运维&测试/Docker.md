# 删除带 none 的镜像

先停止容器，然后删除。

```bash
$ docker stop $(docker ps -a | grep "Exited" | awk '{print $1 }')  //停止容器 
  
$ docker rm $(docker ps -a | grep "Exited" | awk '{print $1 }')  //删除容器 
  
$ docker rmi $(docker images | grep "none" | awk '{print $3}')  //删除镜像 
```

# 查看启动容器的命令

容器外部（物理机上）

```bash
docker inspect name_or_id
```

容器内部

```bash
ps -fe
```

# 参考

> -   [docker 如何删除 none 镜像_docker_脚本之家](https://www.jb51.net/article/116096.htm)

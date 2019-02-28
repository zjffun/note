# 创建 ssh-keygen

使用：`ssh-keygen -t rsa -C "youremail@example.com"`  
参数：  

-   \-t 指定密钥类型。如果没有指定则默认生成用于 SSH-2 的 RSA 密钥。
-   \-C comment 提供一个新注释

# 调试

## ssh -vT git@github.com 查看错误原因

发现 Trying private key 用的 id_rsa，没用我自己起名的，所以配置 ssh_config

    $ ssh -vT git@github.com
    OpenSSH_7.3p1, OpenSSL 1.0.2k  26 Jan 2017
    debug1: Reading configuration data /etc/ssh/ssh_config
    debug1: Connecting to github.com [192.30.255.112] port 22.
    debug1: Connection established.
    debug1: key_load_public: No such file or directory
    debug1: identity file /c/Users/Administrator/.ssh/id_rsa type -1
    debug1: key_load_public: No such file or directory
    debug1: identity file /c/Users/Administrator/.ssh/id_rsa-cert type -1
    debug1: key_load_public: No such file or directory
    debug1: identity file /c/Users/Administrator/.ssh/id_dsa type -1
    debug1: key_load_public: No such file or directory
    debug1: identity file /c/Users/Administrator/.ssh/id_dsa-cert type -1
    debug1: key_load_public: No such file or directory
    debug1: identity file /c/Users/Administrator/.ssh/id_ecdsa type -1
    debug1: key_load_public: No such file or directory
    debug1: identity file /c/Users/Administrator/.ssh/id_ecdsa-cert type -1
    debug1: key_load_public: No such file or directory
    debug1: identity file /c/Users/Administrator/.ssh/id_ed25519 type -1
    debug1: key_load_public: No such file or directory
    debug1: identity file /c/Users/Administrator/.ssh/id_ed25519-cert type -1
    debug1: Enabling compatibility mode for protocol 2.0
    debug1: Local version string SSH-2.0-OpenSSH_7.3
    debug1: Remote protocol version 2.0, remote software version libssh-0.7.0
    debug1: no match: libssh-0.7.0
    debug1: Authenticating to github.com:22 as 'git'
    debug1: SSH2_MSG_KEXINIT sent
    debug1: SSH2_MSG_KEXINIT received
    debug1: kex: algorithm: curve25519-sha256@libssh.org
    debug1: kex: host key algorithm: ssh-rsa
    debug1: kex: server->client cipher: chacha20-poly1305@openssh.com MAC: <implicit                                                 > compression: none
    debug1: kex: client->server cipher: chacha20-poly1305@openssh.com MAC: <implicit                                                 > compression: none
    debug1: expecting SSH2_MSG_KEX_ECDH_REPLY
    debug1: Server host key: ssh-rsa SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5                                                 SY8
    debug1: Host 'github.com' is known and matches the RSA host key.
    debug1: Found key in /c/Users/Administrator/.ssh/known_hosts:2
    debug1: rekey after 134217728 blocks
    debug1: SSH2_MSG_NEWKEYS sent
    debug1: expecting SSH2_MSG_NEWKEYS
    debug1: rekey after 134217728 blocks
    debug1: SSH2_MSG_NEWKEYS received
    debug1: SSH2_MSG_SERVICE_ACCEPT received
    debug1: Authentications that can continue: publickey
    debug1: Next authentication method: publickey
    debug1: Trying private key: /c/Users/Administrator/.ssh/id_rsa
    debug1: Trying private key: /c/Users/Administrator/.ssh/id_dsa
    debug1: Trying private key: /c/Users/Administrator/.ssh/id_ecdsa
    debug1: Trying private key: /c/Users/Administrator/.ssh/id_ed25519
    debug1: No more authentication methods to try.
    Permission denied (publickey).

# ssh_config

linux 配置 "/etc/ssh/ssh_config" 文件
window 配置 "C:\\Program Files\\Git\\etc\\ssh\\ssh_config" 文件
名称 | 值 | 说明
\---\|---\|---
IdentityFile | ~/.ssh/identity | 设置从哪个文件读取用户的 RSA 安全验证标识。

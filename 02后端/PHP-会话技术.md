B/S请求响应模式是无状态的。任意的请求间不存在任何的联系，不能将请求状态保持下去。  
会话技术可以给每个浏览器分配持久数据，这些数据不会随着一次请求和相应结束而销毁。  

# COOKIE
cookie是一种允许服务器端脚本在浏览器端存储数据的技术。
cookie特点：
1. 允许服务器向浏览器发送指令，用来管理存储在浏览器端的cookie数据。
1. 浏览器如果存储了某台服务器所设置的cookie数据，浏览器再向服务器请求时，会携带存储的cookie数据到服务器端。
1. cookie的有效期，有效路径等在浏览器进行判断是否发送给服务器端

## 设置cookie
setCookie(KEY, VALUE, [有效期（时间戳表示）], [有效路径], [有效域], [是否仅安全传输], [HTTPONLY])  
==setCookie()前不能存在任何的输出==

KEY：
设置成数组形式（user[name]）在浏览器保存时是字符串，获取时被PHP整理成数组。

有效期：
1. 0：表示会话周期（默认值）
1. PHP\_INT\_MAX：逻辑上表示永久有效的cookie

有效路径：
1. 默认在当前路径及其后代路径有效（通常设置为'/'站点根目录有效，也就是整站有效）
1. 这里的路径不是代码所在文件的本地磁盘路径，而是URL请求的路径关系
1. 不同路径下同名的cookie可以同时存储于浏览器端
1. 浏览器发出请求时，会先查找当前目录内有效的cookie，再向上查找，将所有有效的逻辑上表示永久有效的cookie都携带到服务器端，服务器在形成$_COOKIE时，会出现重写效果，先出现的保留

有效域：
1. 默认在当前域下有效。
1. 通过设置，可以使cookie的有效域扩展到某个一级域名下的所有子域（.domain_name.com）

是否仅安全传输：
1. 默认不论浏览器发出的是http还是https都会将有效的cookie携带的服务器端
1. 设置为true表示激活仅安全连接传输，此时浏览器在向服务器发出请求时，如果请求协议为http，就不会向服务器发送这些设置为仅安全连接传输的cookie数据

HTTPONLY：
1. 默认浏览器存储的cookie是可以被其他脚本所处理的
1. 设置为true表示仅仅在http请求中使用（建议，该属性设置为true）

```
setCookie('is_click', 'true', time()+3600*24*30, '/', '.kongciyuan.com', false, true);
```

## 修改cookie
setCookie(KEY, 新VALUE, 新[有效期（时间戳表示）], 新[有效路径], 新[有效域], 新[是否仅安全传输], 新[HTTPONLY])
```
setCookie('is_click', 'false', time()+3600*24*30, '/', '.kongciyuan.com', false, true);
```

## 删除cookie
标准做法：setCookie('KEY, '', time()-1)  
还可以使用：setCookie(KEY, '')或setCookie(KEY)

## 获取cookie
使用超全局数组变量：$_COOKIE
浏览器在向服务器发送请求时，会检测cookie的是否有效，只有没有过有效期的cookie数据请求时，才会携带。


# SESSION
将数据存储在服务器端，浏览器只储存sessionid

## 开启session机制
使用session\_starat();函数，或在php.ini中设置session.auto\_start = 1自动开启session  
==session_start()函数前不应该有输出==

## 增，删，改，查SESSION
通过对$_SESSION数组操作就完成对SESSION的操作。  
- 增：$_SESSION['user'] = 'root';
- 删（不完全）：unset($_SESSION['user']);
- 改：$_SESSION['user'] = 'admin';
- 查：var\_dump($\_SESSION['user']);

完全整删除session全部数据：
```
//数据区，$_SESSION全局数组，存sessionid的cookie
Session_destroy();
unset($_SESSION);
setCookie(session_name(), '', time()-1);
```
清空session数据：  
不要：```unset($_SESSION);```  
使用：```$_SESSION = array();```


## session属性
session属性特征由浏览器的cookie中存储的sessionid决定  
1. 在php.ini中配置
```
session.cookie_lifetime = 0
session.cookie_path = /
session.cookie_domain =
session.cookie_secure =
session.cookie_httponly =
```
2. 在脚本中，使用函数ini_set()来进行配置的修改
3. （推荐）使用函数session\_set\_cookie\_params(有效期, 有效路径, 有效域, 是否仅安全传输, 是否HTTPONLY)

## session销毁
使用函数session_destroy()：删除当前session对应的数据区，关闭session机制（关闭session机制后，余下的session操作都不处理）  
session销毁只将持久化的session清除了，$_SESSION变量是不会自动消失的。  

## 重写session的存储机制
注意：
1. 先执行session\_set\_save\_handler()再执行session\_start()
1. 保证session不自动开启（可以通过.htaccess配置：php\_flag session.auto\_start = 0）
1. 配置session存储机制为用户自定义（默认是files）：session.save_handler = user
示例：
```
<?php
//配置session存储机制
ini_set('session.save_handler', 'user');
//设置session处理器
//session_set_save_handler(开始函数, 结束函数, 读函数, 写函数, 删除函数, 垃圾回收函数)
session_set_save_handler(
  'userSessionBegin',
  'userSessionEnd',
  'userSessionRead',
  'userSessionWrite',
  'userSessionDelete',
  'userSessionGC'
);

echo 'start'.'</br>';
session_start();//执行userSessionBegin，userSessionRead

echo '</br>'.'set'.'</br>';
$_SESSION['user'] = 'root';//没有使用函数

echo '</br>'.'get'.'</br>';//没有使用函数
$_SESSION['user'];

echo '</br>'.'del'.'</br>';
session_destroy();//使用session_destroy()执行userSessionDelete，否则执行userSessionWrite

function userSessionBegin() {
    echo 'userSessionBegin'.'</br>';
}
function userSessionEnd() {
  echo 'userSessionEnd'.'</br>';
}
function userSessionRead() {
    echo 'userSessionRead'.'</br>';
}
function userSessionWrite() {
  echo 'userSessionWrite'.'</br>';
}
function userSessionDelete() {
    echo 'userSessionDelete'.'</br>';
}
function userSessionGC() {
    /*
    概率分子：session.gc_probability = 1
    概率分母：session.gc_divisor = 1000
    session最长时间：session.gc_maxlifetime = 1800
    */
    echo 'userSessionGC'.'</br>';
}
```


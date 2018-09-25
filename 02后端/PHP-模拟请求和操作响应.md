# 模拟请求
## fsockopen
```
<?php
// 建立连接
$link = fsockopen('localhost', '80');

define('CRLF', "\r\n");
// 请求行
$request_data = 'GET /'.CRLF;
// 请求头
$request_data .= 'Host: localhost'.CRLF;
$request_data .= 'User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:51.0) Gecko/20100101 Firefox/51.0'.CRLF;
$request_data .= 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'.CRLF;
$request_data .= 'Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3'.CRLF;
$request_data .= 'Accept-Encoding: gzip, deflate, br'.CRLF;
$request_data .= 'Cookie: 123'.CRLF;
$request_data .= 'Connection: keep-alive'.CRLF;
$request_data .= 'Upgrade-Insecure-Requests: 1'.CRLF;
// 空行表示请求头结束
$request_data .= CRLF;

fwrite($link, $request_data);
//feof:（end of file）用于检测是否到到数据流末尾
while (!feof($link)) {
	echo fgets($link, 1024);
}
fclose($link);
```

## CURL（Client URL）
开启php_curl.dll拓展
### 模拟GET请求
```
<?php
// 建立连接
$curl = curl_init();
//设置
$url = 'localhost';
curl_setopt($curl, CURLOPT_URL, $url);
//发送
var_dump(curl_exec($curl));
//关闭
curl_close($curl);
```

### POST请求
```
<?php
// 建立连接
$curl = curl_init();
//设置
$url = 'localhost';
curl_setopt($curl, CURLOPT_URL, $url);
# 设置开启post请求
curl_setopt($curl, CURLOPT_POST, $url);
$post_data = array(
	'user_name' => 'admin',
	'user_pwd' => '123456'
	);
curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
//发送
var_dump(curl_exec($curl));
//关闭
curl_close($curl);
```

### 处理响应数据
CURLOPT_RETURNTRANSFER：是将响应直接输出，还是以返回值的形式处理  
以返回值的形式处理响应数据：```curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);```

### POST文件上传
Post数据使用文件地址，前使用@标志为文件而不是字符串  
```$post_data = array('image' => '@c:/1.jpg');```

### 处理会话COOKIE
CURLOPT_COOKIEFILE：是否发送cookie
CURLOPT_COOKIEJAR：指定存储服务器所设置的cookie变量存储位置  
```curl_setopt($curl, CURLOPT_COOKIEFILE, true);```
```curl_setopt($curl, CURLOPT_HEADER, 'c:/cookie.txt');```

### 处理响应头
CURLOPT_HEADER：是否获取响应头数据
获取响应头数据：```curl_setopt($curl, CURLOPT_HEADER, true);```

# 操作响应
## 操作响应头：
header()函数
1. json：```header("Content-Type: application/json")```;  
（ie6：```header("Content-Type: text/json");```）
2. 图片：```header('Content-Type:image/jpeg');```，```header('Content-Type:image/png');```等;
3. 编码：```header("Content-Type:text/html; Charset=utf-8");```
4. 下载：```header("Content-Disposition:attachment; filename = \"filename.jpg\"");```

## 操作响应主体
任何的输出，都是响应主体。（echo，print，var_dump，PHP标签之外的所有HTML代码）

## 控制浏览器缓存
header('Expires: ' . gmdate('D, d M Y H:i:s', time()+5) . ' GMT');  
Expires：有效期（GMT：格林威治时间）   
gmdate() 将时间戳格式化为格林威治平时  
```
<?php
header('Expires: ' . gmdate('D, d M Y H:i:s', time()+5) . ' GMT');
echo time(), "<a href=''>self</a>";
```
## HTTP下载
1. 直接链接到文件下载文件
2. 通过php下载文件
下载：文件从服务器端传输到浏览器端（发生于服务器响应时）  
PHP仅仅需要将需要下载的内容作为响应主体输出即可  
通过响应头：Content-Disposition：告知浏览器，接受到响应主体后的处理方式（attachment 表示以附件的方式处理响应主体）  
如果是文件的下载：将文件内容作为响应主体输出即可  

```
<?php
$file = './test.php';

//basename获取一个地址中的名字部分（最后一个斜杠之后）
header('Content-Disposition: Attachment;filename=' . basename($file));
$finfo = new Finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file);
header('Content-Type: ' . $mime);
header('Content-Length: ' . filesize($file));

//b 二进制模式，用于兼容处理文本与二进制文件
$mode = 'rb';
$handle = fopen($file, $mode);
while(!feof($handle)) {
	echo fgets($handle, 1024);
}
fclose($handle);
```

## 跳转
### 立即跳转
Header("Location: URL地址");  
注意：
1. Header()函数前不能存在任何的输出内容
1. Header()函数后边的代码也会照常执行

### 提示跳转
Header("Refresh: N（秒数）; URL=URL地址");  
注意：会在当前页面停留N秒后跳转到指定URL地址

```
public function goto($url){
    header("Location:$url");
}
public function info($url, $info, $wait = 3){
    header("Refresh: $wait; URL=$url");
    echo $info;
}
public function success($url, $wait = 3){
    header("Refresh: $wait; URL=$url");
    echo '操作成功';
}
public function error($url, $wait = 3){
    header("Refresh: $wait; URL=$url");
    echo '操作失败';
}
```


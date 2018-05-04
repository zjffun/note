# 目录操作
- 创建目录：mkdir(目录地址, 权限, 是否递归创建=false);
- 删除目录：rmdir(目录地址);（仅仅可以删除空目录，不支持递归删除）
- 移动（改名）：rename(旧地址, 新地址);

注意：目录地址用绝对路径，./或../开头（windows下直接/开头不认，linux没测试）

## 获取目录内容
```
<?php
$path = './';
//打开文件夹
$dir_handle = opendir($path);
//读取文件夹
while(false !== $file = readdir($dir_handle)){
  if ($file == '.' || $file == '..') continue;
  echo $file, '<br>';
}
//关闭文件夹
closedir($dir_handle);
```
## 递归获取目录内容
```
<?php
$path = './';

function read_dirs_tree($path, $deep=0){
  //打开文件夹
  $dir_handle = opendir($path);
  //读取文件夹
  while(false !== $file = readdir($dir_handle)){
    if ($file == '.' || $file == '..') continue;
    echo str_repeat('-', $deep*4), $file, '<br>';
    //是否是目录
    if (is_dir($path.'/'.$file)) {
      //是目录，调用自身
      $func_name = __FUNCTION__;
      $func_name($path.'/'.$file, $deep+1);
    }
  }
  //关闭文件夹
  closedir($dir_handle);
}

read_dirs_tree($path);
```
## 目录文件名编码问题
Windows默认使用gbk编码
1. 项目->windows：iconv('UTF-8', 'GBK', 字符串);
1. windows->项目：iconv('GBK', 'UTF-8', 字符串);


# 文件上传
## 浏览器端
form设置：method="post" enctype="multipart/form-data"

## 服务器端
PHP服务器在接受到文件型的表单数据后将文件存储于上传临时目录（在脚本周期内有效）  
php.ini配置：  
1. upload\_tmp\_dir：修改上传的临时文件的路径  
1. max\_file\_uploads：修改最多上传文件数  
1. post\_max\_size：修改最大post数据最大限制  
1. php_fileinfo.dll：开启MIME检测拓展  

error分类（0：上传成功）：  
- 1：文件过大，大于php的配置
- 2：文件过大，超过了表单元素max\_file\_size（目前也是服务器PHP判断的。但是PHP提出希望当文件过大时，在浏览器请求时就可以利用该值进行判断大小）
- 3：上传部分文件。
- 4：没有上传文件。
- 5：逻辑上，上传的为空文件（长度为0）
- 6：没有找到临时上传目录（权限控制）。
- 7：临时文件写入失败（磁盘空间，权限）。

```
<meta charset="utf8">
<form action="" method="post" enctype="multipart/form-data">
  <input type="file" name="upload_file">
  <input type="submit" value="上传">
</form>

<?php
class Upload{
  private $_max_size;
  private $_type_map;
  private $_allow_ext_list;
  private $_allow_mime_list;
  private $_upload_path;
  private $_prefix;
  //存储文件上传的错误信息
  private $_error;
  public function getError() {
    return $this->_error;
  }

  public function __construct() {
    $this->_max_size = 1024*1024;
    //设置一个后缀名与mime的映射关系，就可以只修改允许的后缀名，就可以影响到$allow_ext_list和$allow_mime_list
    $this->_type_map = array(
      '.png'  => array('image/png', 'image/x-png'),
      '.jpg'  => array('image/jpeg', 'image/pjpeg'),
      '.jpeg' => array('image/jpeg', 'image/pjpeg'),
      '.gif'  => array('image/gif'),
      );
    $this->_allow_ext_list = array('.png', '.jpg');
    $allow_mime_list = array();
    foreach($this->_allow_ext_list as $value) {
      //得到每个后缀名（将所有$this->_type_map下的数组元素合并成新数组）
      $allow_mime_list = array_merge($allow_mime_list, $this->_type_map[$value]);
    }
    // 去重
    $this->_allow_mime_list = array_unique($allow_mime_list);
    // 合并，去重后$allow_mime_list = array('image/png', 'image/gif', 'image/jpeg', 'image/pjpeg', 'image/x-png');
    $this->_upload_path = './';
    $this->_prefix = '';
  }

  public function __set($p, $v) {//属性重载
    $allow_set_list = array('_upload_path', '_prefix', '_allow_ext_list', '_max_size');
    //给没有加上"_"的参数添加"_"
    if(substr($p, 0, 1) !== '_') {
      $p = '_' . $p;
    }

    $this->$p = $v;
  }


  /**
   * 上传单个文件
   */
  public function uploadOne($tmp_file) {

    # 是否存在错误
    if($tmp_file['error'] != 0) {
      $this->_error = '文件上传错误';
      return false;
    }

    # 尺寸
    if ($tmp_file['size'] > $this->_max_size) {
      $this->_error = '文件过大';
      return false;
    }

    # 类型
    # 从原始文件名中提取后缀
    $ext = strtolower(strrchr($tmp_file['name'], '.'));
    if (!in_array($ext, $this->_allow_ext_list)) {
      $this->_error = '类型不合法';
      return false;
    }

    # MIME, type元素。
    if (!in_array($tmp_file['type'], $this->_allow_mime_list)) {
      $this->_error = '类型不合法';
      return false;
    }

    //PHP自己获取文件的mime，进行检测
    $finfo = new Finfo(FILEINFO_MIME_TYPE);//获得一个可以检测文件MIME类型信息的对象
    $mime_type = $finfo->file($tmp_file['tmp_name']);//检测
    if (!in_array($mime_type, $this->_allow_mime_list)) {
      $this->_error = '类型不合法';
      return false;
    }

    # 移动
    # 上传文件存储地址
    //创建子目录
    $subdir = date('YmdH') . '/';
    if(!is_dir($this->_upload_path . $subdir)) {//检测是否存在
      //不存在
      mkdir($this->_upload_path . $subdir);
    }

    # 上传文件起名
    $upload_filename = uniqID($this->_prefix, true) . $ext;
    if (move_uploaded_file($tmp_file['tmp_name'], $this->_upload_path . $subdir . $upload_filename)) {
      // 移动成功，返回文件名
      return $subdir . $upload_filename;
    } else {
      // 移动失败
      $this->_error = '移动失败';
      return false;
    }

  }
}
var_dump($_FILES);
if ($_FILES) {
  $upload = new Upload();

  if ($new_filename = $upload->uploadOne($_FILES['upload_file'])) {
    echo $new_filename;
  }else{
    echo $upload->getError();
  }
}
```

# 文件操作
## 写入file\_put\_contents(文件地址, 内容)
文件不存在则自动创建  
默认为替换写，第三个参数使用FILE_APPEND常量表示追加写

## 读取file\_get\_contents(文件地址)
当操作的文件过大时不能一次性操作全部文件内容这个函数不适用！

```
<?php
$file = './test.txt';
$content = date('H:i:s').'\n';
var_dump(file_put_contents($file, $content));//返回字节数

file_put_contents($file, $content, FILE_APPEND);//追加写

var_dump(file_get_contents($file));
```

## 使用文件句柄和指针操作文件
### 打开文件句柄：fopen(文件地址, 打开方式);
PHP提供了如下打开模式（+扩展，扩展了操作）：
1. r（read）读模式
1. w（write）替换写模式，将文件内容清零，自动创建不存在的文件，只能打开已经存在的文件
1. a（append）追加写模式
1. x 替换写，不会自动创建不存在的文件
1. r+读写模式，将文件指针放在文件开头。
1. w+读替换写模式，将文件内容清零，将文件指针放在文件开头，自动创建不存在的文件。
1. a+读追加写模式，写操作永远在文件末尾，读操作受限于文件指针。
1. x+读替换写模式，将文件内容清零，将文件指针放在文件开头，不会自动创建不存在的文件，只能打开已经存在的文件

### 读取指定长度的字符串内容（单位字节）：fread(文件句柄, 长度);
长度最大值为8192个字节。

### 读取指定长度的字符串内容（单位字节）：fgets(文件句柄, 长度);  
长度：指的是会读取长度-1个字节  
行末也是该函数的终止读操作条件  
终止读取取决于先满足那个条件，因此该函数也称读行函数  
最常用：fgets($handle, 1024)
### 一次读取一个字节的数据：fgetc(文件句柄);
读取指针位置字符，操作时会移动指针。


### 在指定位置写入内容：fwrite(文件句柄，写入内容);
位置通常由文件指针来指示，如果是a模式，不论指针在哪里，只能在末尾写。

### 关闭文件句柄：fclose(); 

### 其他文件函数
1. ftell(文件句柄)获取指针位置
1. fseek(文件句柄, int $offset)设置指针位置
1. filemtime(文件地址)文件的最后修改时间
1. filesize(文件地址)文件大小

```
<?php
$file = './test.txt';
header('Content-type:text/html;charset=utf-8');
$file_handle = fopen($file, 'w+');
fwrite($file_handle, "中文字符和字节");

fseek($file_handle, 0);
echo'fread：',fread($file_handle, 5),'<hr/>';//中？
echo'fgets：',fgets($file_handle, 2),'<hr/>';//?
echo'fgetc：',fgetc($file_handle),'<hr/>';//?
echo'ftell：',ftell($file_handle),'<hr/>';//7
echo'filemtime：',filemtime($file),'<hr/>';//1487850244
echo'filesize：',filesize($file),'<hr/>';//21(3*7)
fclose($file_handle);
```
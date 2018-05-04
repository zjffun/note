# php操作二进制
## pack()：将数据打包为二进制。  
- 语法：pack(format,args+)  
- 说明：  
format规定在包装数据时所使用的格式。  
args+规定被包装的一个或多个参数。

|format|说明|
|---|---|
|a|将字符串空白以 NULL 字符填满|
|A|将字符串空白以 SPACE 字符 (空格) 填满|
|h|十六进位字符串，低位在前|
|H|十六进位字符串，高位在前|
|c|有号字符|
|C|无号字符|
|s|有号短整数 (十六位，依计算机的位顺序)|
|S|无号短整数 (十六位，依计算机的位顺序)|
|n|无号短整数 (十六位, 高位在后的顺序)|
|v|无号短整数 (十六位, 低位在后的顺序)|
|i|有号整数 (依计算机的顺序及范围)|
|I|无号整数 (依计算机的顺序及范围)|
|l|有号长整数 (卅二位，依计算机的位顺序)|
|L|无号长整数 (卅二位，依计算机的位顺序)|
|N|无号短整数 (卅二位, 高位在后的顺序)|
|V|无号短整数 (卅二位, 低位在后的顺序)|
|f|单精确浮点数 (依计算机的范围)|
|d|倍精确浮点数 (依计算机的范围)|
|x|空位|
|X|倒回一位|
|@|填入 NULL 字符到绝对位置|

## unpack()：将二进制解包为某种数据。
- 语法：unpack(format,args+)
- 说明：  
format规定在包装数据时所使用的格式。  
args+规定被解包的一个或多个参数。   
（format和pack一样用）

- strlen()：获取字节数。
- filesize()：获取文件字节数。
- fread()：读二进制文件。
- substr()：字符串截取。


（以后用到再好好整理一下）  
原来的测试代码：
```
<?php
//A字符
$str=(pack("A*", "哈哈哈"));
$str2 = '1'.$str;
echo $str2,"=",strlen($str2),"字节\n";
echo substr($str2,0,1),"--\n";
echo substr($str2,1,strlen($str2)),"--\n";

$PSize = filesize('C:/Users/Administrator/Desktop/123.png');
// var_dump(fopen('C:/Users/Administrator/Desktop/123.png', "r"));
$picturedata = fread(fopen('C:/Users/Administrator/Desktop/123.png', "r"), $PSize);
$picstr = (pack("A*", $picturedata));
$picstr2 = '0'.$picstr;
echo $picstr2,"=",strlen($picstr2),"字节\n";
echo substr($picstr2,0,1),"--\n";
echo substr($picstr2,1,strlen($picstr2)),"--\n";
```
# 一. 介绍

> PHP（外文名: PHP: Hypertext Preprocessor，中文名：“超文本预处理器”）是一种通用开源脚本语言。语法吸收了 C 语言、Java 和 Perl 的特点，利于学习，使用广泛，主要适用于 Web 开发领域。PHP 独特的语法混合了 C、Java、Perl 以及 PHP 自创的语法。它可以比 CGI 或者 Perl 更快速地执行动态网页。用 PHP 做出的动态页面与其他的编程语言相比，PHP 是将程序嵌入到 HTML（标准通用标记语言下的一个应用）文档中去执行，执行效率比完全生成 HTML 标记的 CGI 要高许多；PHP 还可以执行编译后代码，编译可以达到加密和优化代码运行，使代码运行更快。

[PHP 中文手册](http://php.net/manual/zh/)  
[PHP 英文手册](http://php.net/manual/en/)

# 二. 运行 PHP

php.exe -f "filename"

    cd C:\wamp\bin\php\php5.5.12
    //^在dos中转义，>新建文件写一行，>>继续写一行
    echo ^<?php > test.php
    echo phpinfo(); >> test.php
    php.exe -f "test.php"

php.exe -r "php 代码"

    php.exe -r "$i = 10; echo $i;"

# 三. PHP 脚本嵌入

标准形式

    # php代码后没有其他内容结束标记有时可以省略
    <?php
        php代码
    ?>
    <script  language=”php”>
        php代码
    </script>

短标签形式（需设置 php.ini 中 short_open_tag = On）

    <?
    .....这里是php代码
    ?>

# 四. 基本语法

-   变量名区分大小写  
-   常量名区分大小写（可设置不区分） 
-   函数名不区分大小写
-   系统中使用的关键字也不区分大小写
-   一个 php 标记块中的最后一个分号在有结束标记时可省略


    #可省略
    <?php
    echo 1
    ?>
    #不可省略
    <?php
    echo 1;

# 五. 变量

## 使用

-   变量必须以 $ 开头，后面紧跟变量名
-   定义变量：直接给变量赋值，就是定义


    <?php
    $v1 = 1;

-   判断变量是否存在：isset()  
    存在就返回 true，不存在就返回 false，null 返回 false


    <?php
    $v1 = null;
    echo isset($v1);

-   判断变量是否为空：empty()


    <?php
    $v1 = null;
    $v2 = 0;
    $v3 = 1;
    echo empty($v1)."===";
    echo empty($v2)."===";
    echo empty($v3)."===";

-   修改变量值：直接给变量赋新值
-   删除变量：unset()  
    unset() 断开变量名跟该变量名所指向的数据的引用

## 命名规则

### 基本规则

1.  只能使用大小写字母，数字和下划线（\_）
2.  不能以数字开头
3.  不能跟系关键字重名

### 经典命名规则

1.  匈牙利命名法：该命名法是在每个变量名的前面加上若干表示数据类型的字符。基本原则是：变量名 = 属性 + 类型 + 对象描述。如 i 表示 int, 所有 i 开头的变量命都表示 int 类型。s 表示 String, 所有变量命以 s 开头的都表示 String 类型变量。
2.  骆驼命名法：混合使用大小写字母来构成变量和函数的名字，如 userName。
3.  帕斯卡命名法（pascal 命名法）：做法是首字母大写，如 UserName, 常用在类的变量命名中。
4.  下划线法：使用小写字母和下划线来构成变量和函数的名字，如 user_name。

## 传值方式

### 值传递（默认）

将一个变量的数据拷贝一份，然后赋值给另一个变量。

### 引用传递

将一个变量的引用拷贝一份，然后赋值给另一个变量（将另一个变量指向被引用传递变量的数据）。

## 可变变量

一个变量的名是另一个变量。

    <?php
    $v1 = 'v2';
    $v2 = 10;
    echo $$v1;//10

## 预定义变量

-   $GLOBALS — 引用全局作用域中可用的全部变量
-   $\_SERVER — 服务器和执行环境信息
-   $\_GET — HTTP GET 变量
-   $\_POST — HTTP POST 变量
-   $\_FILES — HTTP 文件上传变量
-   $\_REQUEST — HTTP Request 变量
-   $\_SESSION — Session 变量
-   $\_ENV — 环境变量
-   $\_COOKIE — HTTP Cookies
-   $php_errormsg — 前一个错误信息
-   $HTTP_RAW_POST_DATA — 原生 POST 数据
-   $http_response_header — HTTP 响应头
-   $argc — 传递给脚本的参数数目
-   $argv — 传递给脚本的参数数组

## 超全局变量

PHP 中的许多预定义变量都是 “超全局的”，这意味着它们在一个脚本的全部作用域中都可用。在函数或方法中无需执行 global $variable; 就可以访问它们。 

-   $GLOBALS
-   $\_SERVER
-   $\_GET
-   $\_POST
-   $\_FILES
-   $\_COOKIE
-   $\_SESSION
-   $\_REQUEST
-   $\_ENV

## 变量序列化

序列化就是将一个变量的数据转换为字符串（并不是类型转换），目的是将该字符串进行存储和传输。  
serialize：序列化  
unserialize：反序列化

    <?php
    $arr = array('z'=>1,'x'=>2,'c'=>3,'zxc');
    var_dump($s = serialize($arr));//序列化 
    file_put_contents('./test_serialize', $s);
    var_dump(unserialize(file_get_contents('./test_serialize')));//反序列化

# 六. 常量

常量是一个简单值的标识符（名字），在脚本执行期间该值不能改变。  
传统上常量标识符总是大写的。 

## 定义常量

1.  使用 define() 函数定义
2.  使用 const 语法定义  
    使用 const 关键字定义常量必须处于最顶端的作用区域，因为用此方法是在编译时定义的。这就意味着不能在函数内，循环内以及 if 语句之内用 const 来定义常量。 

-   const 和 define 的区别？

1.  使用 const 使得代码简单易读，const 本身就是一个语言结构，而 define 是一个函数。另外 const 在编译时要比 define 快很多。
2.  const 用于类成员变量的定义，一经定义，不可修改。define 不可以用于类成员变量的定义，可用于全局常量。
3.  const 可在类中使用，define 不能
4.  const 不能再条件语句中定义常量，define 可以


    <?php
    define('CONST1', 123);
    const CONST2 = 456; 

## 使用常量

1.  直接使用
2.  使用 constant() 函数


    <?php
    define('CONST1', 123);
    echo CONST1;
    echo constant('CONST1');//constant(CONST1)->constant('123');

## 检查常量：defined()

defined() 返回布尔值

    <?php
    define('CONST1', 123);
    echo 'CONST1---'.defined('CONST1');
    echo 'CONST2---'.defined('CONST2');

## 预定义常量

-   内核预定义常量：是在 PHP 的内核中就定义好了的常量。区分大小写。  
    PHP_VERSION：返回 PHP 的版本。  
    PHP_OS：返回执行 PHP 解释器的操作系统名称。  
    PHP_EOL：系统换行符，Windows 是（\\r\\n），Linux 是（\\n），MAC 是（\\r）。  
-   标准预定义常量：PHP 默认定义的常量。区分大小写。  
    M_PI：返回π的值。  
    M_PI_2：返回π/2 的值。  
    M_1_PI：返回 1/π的值。 


    <?php
    var_dump(PHP_VERSION);
    var_dump(PHP_OS);
    var_dump(PHP_EOL);
    var_dump(M_PI);
    var_dump(M_PI_2);
    var_dump(M_1_PI);

# 七. 魔术常量

| 名字                | 说明                                                                                                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_\_LINE\_\_      | 文件中的当前行号。                                                                                                                                                               |
| \_\_FILE\_\_      | 文件的完整路径和文件名。如果用在被包含文件中，则返回被包含的文件名。                                                                                                                                      |
| \_\_DIR\_\_       | 文件所在的目录。如果用在被包括文件中，则返回被包括的文件所在的目录。它等价于 dirname(\_\_FILE\_\_)。除非是根目录，否则目录中名不包括末尾的斜杠。                                                                                     |
| \_\_FUNCTION\_\_  | 函数名称。自 PHP 5 起本常量返回该函数被定义时的名字（区分大小写）。在 PHP 4 中该值总是小写字母的。                                                                                                                |
| \_\_CLASS\_\_     | 类的名称。自 PHP 5 起本常量返回该类被定义时的名字（区分大小写）。在 PHP 4 中该值总是小写字母的。类名包括其被声明的作用区域（例如 Foo\\Bar）。注意自 PHP 5.4 起\_\_CLASS\_\_对 trait 也起作用。当用在 trait 方法中时，\_\_CLASS\_\_是调用 trait 方法的类的名字。 |
| \_\_TRAIT\_\_     | Trait 的名字。自 PHP 5.4 起此常量返回 trait 被定义时的名字（区分大小写）。Trait 名包括其被声明的作用区域（例如 Foo\\Bar）。                                                                                        |
| \_\_METHOD\_\_    | 类的方法名。返回该方法被定义时的名字（区分大小写）。                                                                                                                                              |
| \_\_NAMESPACE\_\_ | 当前命名空间的名称（区分大小写）。此常量是在编译时定义的。                                                                                                                                           |

    <?php
    var_dump(__LINE__);
    var_dump(__FILE__);
    var_dump(__DIR__);
    var_dump(__FUNCTION__);
    var_dump(__CLASS__);//get_class()必须有对象才能获得类名
    var_dump(__TRAIT__);
    var_dump(__METHOD__);
    var_dump(__NAMESPACE__);

# 八. 数据类型

-   标量类型： int， float， string， bool
-   复合类型： array， object
-   特殊类型： null， resouce

## 1. 整数类型（int）

-   十进制：123
-   八进制：0123
-   十六进：0x123

* * *

dec(Decimal): 十进制  
bin(Binary)：二进制  
oct(Octal)：八进制  

## hex(Hexadecimal)：十六进制

== 十进制是数组，二、八、十六进制是字符串 ==  
十进制转二进制 decbin()  
十进制转八进制 decoct()  
十进制转十六进制 dechex()  
二进制转十进制 bindec()  
八进制转十进制 octdec()  
十六进制转十进制 hexdec()  

    <?php
    var_dump(decbin(123));
    var_dump(bindec('101010'));

## 2. 浮点类型（float， double， real）

-   普通表示：$v1 = 1.23;
-   科学计数法表示：$v1 = 1.23E3;（$v1 = 123E3；// 结果值是 123000，但也是一个浮点数。）  

### 浮点数不应直接进行大小比较

应该设置在一定精度要求下比较

    <?php
    $v1 = 1.2/3;
    echo '$v1='."$v1\r\n";

    //0.4==0.4不会打印
    if($v1 == 0.4){
      echo "$v1==0.4\r\n";
    }

    //设置在0.001的精度下比较
    //400==0.4*1000会打印
    if(round($v1*1000) == 0.4*1000){
      echo ($v1*1000)."==0.4*1000\r\n";
    }

### 整数运算的结果超出整数的范围后，会自动转换为浮点数。

    <?php
    var_dump(12345*1000000);

## 3. 字符串类型（string）

-   单引号字符串：不识别变量，识别反斜杠单引号转义字符
-   双引号字符串：识别变量和换行回车等转义字符
-   nowdoc（单引号）定界符字符串：不识别转义字符
-   heredoc（双引号）定界符字符串：识别变量，识别转义字符


    <?php
    $v1 = 123;
    echo '$v1\r\n';
    echo "---\r\n";

    echo "$v1\r\n";
    echo "---\r\n";

    echo <<<'HTML'
    'html1'$v1
    HTML;//'html1'$v1


    echo "---\r\n";
    /*
    HTML;为最后一行报错：
    Parse error: syntax error, 
    unexpected end of file, expecting variable (T_VARIABLE) 
    or heredoc end (T_END_HEREDOC) 
    or ${ (T_DOLLAR_OPEN_CURLY_BRACES) 
    or {$ (T_CURLY_OPEN)
    */
    echo <<<"HTML"
    "html2"$v1
    HTML;//'html1'123
    //要有一行

## 4. 布尔类型（bool）

true 或 false 两个值
隐式转换为布尔值是为 false 的是：

1.  0
2.  0.0
3.  null
4.  ""1."0"
5.  array()
6.  未定义的变量 (会报 Notice: Undefined variable)

    <?php
    if($v1){
      echo 'yse';
    }else{
      echo 'no';
    }

## 5. 数组类型（array）

### 分类

1.  键值关系：关联数组，索引数组
2.  数组层次：一维数组，二维数组，多维数组

### 定义

1.  使用 array() 方法
2.  使用变量 \[]


    <?php
    //使用array定义
    $arr1 = array('test1'=>1,'test2'=>2,3,4,5);
    //使用变量[]定义
    $arr2['test1'] = 1;
    $arr2['test2'] = 2;
    $arr2[] = 3;
    $arr2[] = 4;
    $arr2[] = 5;
    var_dump($arr1, $arr2);
    //使用变量[]添加
    $arr1[] = 6;
    var_dump($arr1);

    <?php
    //linux使用[]包围数组会报错:Parse error: syntax error, unexpected '['，不知什么原因 
    $array1 = array(1,2,'third');
    $array2 = array('one' => 1, 'two' => 2, 'three' => 'third');
    $array3 = [1,2,'third'];//尽量使用
    $array4 = ['one' => 1, 'two' => 2, 'three' => 'third'];//尽量使用
    var_dump($array1,$array2,$array3,$array4);

### 遍历

数组指针：

-   current($arr);  // 取得 $arr 中当前指针所指向的元素的值，如果没有指向元素，则为 false
-   key($arr);      // 取得 $arr 中当前指针所指向的元素的下标
-   next($arr1);   // 将指针移向 “下一个元素”，然后取得该下一个元素的值
-   prev($arr);     // 将指针移向 “上一个元素”，然后取得该上一个元素的值
-   reset($arr);    // 将指针移向 “第一个元素”，然后取得该元素的值——数组指针初始化
-   end($arr);      // 将指针移向 “最后一个元素”，然后取得该元素的值
-   each($arr);     // 取得当前元素的下标和值，然后移动指针到下一个位置。

1.  foreach
    ==foreach 不会主动释放 $value==

-   传递方式  
    默认值传递，引用传递要在变量前加 &（foreach($arr as $key => &$value){...}）  
    $key 不能设置为引用传递  
    因为引用传递不会自动销毁 $value 所以引用传递注意要手动销毁 $value，不然可能不小心通 $value 修改了数组最后一项。（eg：在两个循环都用 $value 时第一个用了引用传递，第二个用值传递。会将数组最后一项的值改成倒数第二项）


    <?php
    $arr = array(1,2,3,4,5);

    foreach ($arr as $key => &$value) {
      echo $value;
    }
    var_dump($arr);//最后一项是5
    var_dump($value);//5（没有释放）


    foreach ($arr as $key => $value) {
      echo $value;
    }
    var_dump($arr);//最后一项是4
    var_dump($value);//4（因为上面的$value引用传递了，最后$value一直指向数组最后一个元素）

    $val = 2;
    $value = 1;//现在$value还是指向数组最后一个元素
    foreach ($arr as $key => $val) {
      echo $val;
    }
    var_dump($arr);//最后一项是1
    var_dump($val);//1（虽然foreach结束但$val不是2，而是最后一项数组最后一项的值1）

-   foreach 过程中进行修改
    foreach 默认是原数组上进行遍历。  
    如果在遍历过程中对数组进行了某种修改或使用了数组指针函数，则会复制数组后在复制的数组上继续遍历循环。  
    foreach 中如果值变量是引用传递，则无论如何都是在原数组上进行。


    <?php
    $arr = array('test1'=>'test','test2'=>'test',22,33);
    echo '$value';
    foreach($arr as $key => $value){
      $arr[] = 'new';
      echo $value;//没有new
    }

    echo '&$value';
    foreach($arr as $key => &$value){
      //每次加上new会循环这个加上的new，进入循环又会加一个new
      $arr[] = 'new';
      echo $value;//有new并死循环
    }

1.  for+next+reset 遍历数组


    <?php
    $arr = array('test1'=>'test','test2'=>'test',22,33);
    reset($arr);//数组指针初始化
    $len = count($arr);
    for($i=0;$i<$len;$i++){
    $key = key($arr);//key
    $value = current($arr);//value
    echo $key,$value;
    next($arr);//指针移到下一个元素
    }

1.  while+each()+list() 遍历数组


    <?php
    $arr = array('test1'=>'test','test2'=>'test',22,33);
    var_dump(each($arr));//四个元素0，1，key，value
    list($v1, $v2) = array('test'=>'test',1=>1,2);//将数字索引对应的值放到list的变量中
    var_dump($v1, $v2);//null,1

    reset($arr);//数组指针初始化
    //当each到数组最后的时候，就返回false，即此时循环结束
    while(list($key, $value)=each($arr)){
      var_dump($key, $value);
    }

### 排序

1.  冒泡排序：俩俩比较大小交换位置


    <?php
    $arr = array(10,10,5,4,3,6,1,8);
    $len = count($arr);
    for($i=0; $i<$len-1; ++$i){
      for($j=0; $j<$len-$i-1; ++$j){
        ($arr[$j] > $arr[$j+1]) && change($arr[$j], $arr[$j+1]);
      }
    }
    function change(&$v1, &$v2){
      $v1 += $v2;
      $v2 = $v1 - $v2;
      $v1 -= $v2;
    }
    var_dump($arr);

1.  选择排序：选择出最大的与最后一个交换


    <?php
    $arr = array(10,10,5,4,3,6,1,8);
    $len = count($arr);
    for($i=0; $i<$len-1; ++$i){
      $max = 0;
      for($j=1; $j<$len-$i; ++$j){
        ($arr[$j] > $arr[$max]) && $max = $j;
      }
      ($max != $len-$i-1) && change($arr[$len-$i-1], $arr[$max]);
    }
    function change(&$v1, &$v2){
      $v1 += $v2;
      $v2 = $v1 - $v2;
      $v1 -= $v2;
    }
    var_dump($arr);

### 查找

1.  顺序查找：直接 foreach
2.  二分查找：必须是排好序并且下标连续的数组  
    效率：2^n 个数据，需要 n 次查找

## 6. 对象类型（object）

    <?php
    class myClass{
      public $v1 = 123;
      public function myfunc(){
        echo $this->v1;
      }
    }
    $myobj = new myClass();
    echo $myobj->v1;
    $myobj->myfunc();

## 7. 资源类型（resource）

资源 resource 是一种特殊变量，保存了到外部资源的一个引用。资源是通过专门的函数来建立和使用的。  
由于资源类型变量保存有为打开文件、数据库连接、图形画布区域等的特殊句柄，因此将其它类型的值转换为资源没有意义。 

## 8. 空类型（null）

变量没有指向任何空间

## 10. 类型想关函数

getType(变量名)：获取一个变量的类型名称  
setType(变量名，目标类型字符串)：设置一个变量的类型  
is_XX 类型 () 系列函数：判断某个数据是否是某种类型，包括：

1.  is_int()
2.  is_float()
3.  is_bool()
4.  is_numeric()
5.  is_array()
6.  is_string()
7.  is_scalar()：判断是否为标量类型（即 int，float，stirng，bool）

    <?php
    $v1 = 123;
    echo getType($v1)."---";
    echo setType($v1, 'string')."---";
    echo is_int($v1)."---";
    echo is_string($v1)."---";

## 11. 类型转换

### 自动转换

-   自动转换是弱类语言的一个最基本也最方便的一个特征：它会在各种运算中根据运算符的需要也将非该运算符所能处理的数据转换为可以处理的数据。
-   if(数据){}：转为 bool 类型
-   算术运算符：转为数字类型
-   连接运算符：转为字符串类型
-   比较运算符：转为布尔类型或数字类型  
    两边如果有至少一个布尔，则另一边就会转为布尔，并进行比较  
    否则，就转为数字进行比较

### 强制转换

通过语法来让某数据转换为另一种类型的数据

    <?php
    echo (int) 12.3;
    echo (float) 123;

### 字符串转数字

    <?php
    var_dump((int)"12.3");
    var_dump((float)"12.3");
    var_dump((int)"12.3a");
    var_dump((float)"12.3a");
    var_dump((int)"a12.3");
    var_dump((float)"a12.3");

# 九. 运算符

## 算术运算符

\+，-，\*，/，%（取整后取余），++，--（前 ++ 或 -- 效率高）  
字符串 ++：下一字符  
null++：1  
false++：没用

    <?php
    $str1 = "abc";
    echo ++$str1."---";//abd

    $str1 = "张";
    echo ++$str1."---";//???

    $v1 = null;
    echo ++$v1."---";//1

    $v2 = false;
    echo ++$v2."---";//没用还是false

## 比较运算符

\>，>=，&lt;，&lt;=，\\=\\=，!=，\\=\\=\\=，!\\=\\=  
==：数据内容相等  
===：数据内容和类型都相等  
字符串的比较规则：按字符的先后顺序找到第一个不同的字符当做整个字符串比较大小  

    <?php
    $str123 = "123";
    $int123 = 123;
    $v1 = $str123 == $int123;
    $v2 = $str123 === $int123;
    $v3 = "abd" > "abc";
    echo "$str123 == $int123 $v1 \r\n";
    echo "$str123 === $int123 $v2 \r\n";
    echo "'abc' > 'abd' $v3 \r\n";

## 逻辑运算符

&&，||，!

### 逻辑短路

逻辑与短路：如果前面是真执行后面的

    <?php
    !defined('BASEPATH') && exit('No direct script access allowed');

逻辑或短路：如果前面是假执行后面的

    <?php
    defined('BASEPATH') || exit('No direct script access allowed');

## 字符串运算符

.，.=

## 赋值运算符

=，+=，-=，\*=，/=，%=，.=

## 条件（三目）运算符

数据 1  ?  数据 2 : 数据 3

    <?php
    $is_show = true;
    echo $is_show ? 'show' : 'hide';

## 位运算符

&，|，~，^，&lt;&lt;，>>

    <?php
    $v1 = 1&2;
    $v2 = 1|2;
    $v3 = ~1;
    $v4 = 1^2;
    $v5 = 1<<1;
    $v6 = 1>>1;

    echo "1&1->".$v1.PHP_EOL;//0
    echo "1|1->".$v2.PHP_EOL;//3
    echo "~1->".$v3.PHP_EOL;//2
    echo "1^2->".$v4.PHP_EOL;//3
    echo "1<<1->".$v5.PHP_EOL;//2
    echo "1>>1->".$v6.PHP_EOL;//0

### 源码，补码，反码

-   源码：
    1 ：00000001  
    -1：10000001
-   反码：
    1 ：00000001  
    -1：11111110
-   补码：（负数是反码加 1）
    1 ：00000001  
    -1：11111111

计算机中的加减法都是：补码 + 补码 = 补码（都转换成补码运算）

### 位运算开关

1：开，0：关  

-   设定
    第一个开：00000001  
    第二个开：00000010  
    第三个开：00000100  
    第四个开：00001000  
    第五个开：00010000  
    第一，二个开：00000011  
    第一，二，五个开：00010011  
-   查询
    当前状态 & 查询状态（大于 0 表示是当前状态）
-   开启
    设置当前状态为：当前状态 | 要开启的状态
-   关闭
    设置当前状态为：当前状态 & ~ 要关闭的状态

eg：PHP 的错误
值 | 常量 | 说明
\---\|---\|---
1|  E_ERROR (integer)|  致命的运行时错误。这类错误一般是不可恢复的情况，例如内存分配导致的问题。后果是导致脚本终止不再继续运行。
2|  E_WARNING (integer)|  运行时警告 (非致命错误)。仅给出提示信息，但是脚本不会终止运行。
4|  E_PARSE (integer)|  编译时语法解析错误。解析错误仅仅由分析器产生。
8|  E_NOTICE (integer)| 运行时通知。表示脚本遇到可能会表现为错误的情况，但是在可以正常运行的脚本里面也可能会有类似的通知。
16| E_CORE_ERROR (integer)| 在 PHP 初始化启动过程中发生的致命错误。该错误类似 E_ERROR，但是是由 PHP 引擎核心产生的。
32| E_CORE_WARNING (integer)| PHP 初始化启动过程中发生的警告 (非致命错误) 。类似 E_WARNING，但是是由 PHP 引擎核心产生的。
64| E_COMPILE_ERROR (integer)|  致命编译时错误。类似 E_ERROR, 但是是由 Zend 脚本引擎产生的。
128|  E_COMPILE_WARNING (integer)|  编译时警告 (非致命错误)。类似 E_WARNING，但是是由 Zend 脚本引擎产生的。
256|  E_USER_ERROR (integer)| 用户产生的错误信息。类似 E_ERROR, 但是是由用户自己在代码中使用 PHP 函数 trigger_error() 来产生的。
512|  E_USER_WARNING (integer)| 用户产生的警告信息。类似 E_WARNING, 但是是由用户自己在代码中使用 PHP 函数 trigger_error() 来产生的。
1024| E_USER_NOTICE (integer)|  用户产生的通知信息。类似 E_NOTICE, 但是是由用户自己在代码中使用 PHP 函数 trigger_error() 来产生的。
2048| E_STRICT (integer)|  启用 PHP 对代码的修改建议，以确保代码具有最佳的互操作性和向前兼容性。
4096| E_RECOVERABLE_ERROR (integer)|  可被捕捉的致命错误。 它表示发生了一个可能非常危险的错误，但是还没有导致 PHP 引擎处于不稳定的状态。 如果该错误没有被用户自定义句柄捕获 (参见 set_error_handler())，将成为一个 E_ERROR　从而脚本会终止运行。
8192| E_DEPRECATED (integer)|  运行时通知。启用后将会对在未来版本中可能无法正常工作的代码给出警告。
16384|  E_USER_DEPRECATED (integer)|  用户产少的警告信息。 类似 E_DEPRECATED, 但是是由用户自己在代码中使用 PHP 函数 trigger_error() 来产生的。
30719|  E_ALL (integer)| E_STRICT 出外的所有错误和警告信息。

    <?php
    echo "NOTICE->".sprintf("%'016s",decbin(E_ERROR)).PHP_EOL;//致命性运行时错 
    echo "NOTICE->".sprintf("%'016s",decbin(E_WARNING)).PHP_EOL;//运行时警告
    echo "NOTICE->".sprintf("%'016s",decbin(E_PARSE)).PHP_EOL;//编译时解析错误 
    echo "NOTICE->".sprintf("%'016s",decbin(E_NOTICE)).PHP_EOL;//运行时提醒
    echo "STRICT->".sprintf("%'016s",decbin(E_STRICT)).PHP_EOL;//PHP 对代码的修改建议，以确保代码具有最佳的互操作性和向前兼容性。 
    echo "DEPRECATED->".sprintf("%'016s",decbin(E_DEPRECATED)).PHP_EOL;//运行时通知
    echo "ALL->".sprintf("%'016s",decbin(E_ALL)).PHP_EOL;//所有的错误和警告

    //禁用错误报告
    error_reporting(0);
    //只显示运行时错误
    error_reporting(E_ERROR | E_WARNING | E_PARSE);
    //只显示运行时错误和异常
    error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
    // 除了 E_NOTICE，报告其他所有错误（这是在 php.ini 里的默认设置）
    error_reporting(E_ALL ^ E_NOTICE);
    // 报告所有 PHP 错误 
    error_reporting(E_ALL);
    // 报告所有 PHP 错误
    error_reporting(-1);
    ini_set('error_reporting', E_ALL);

## 数组运算符

\+，\\=\\=，!=（&lt;>），\\=\\=\\=，!\\=\\=  
+：将右边的数组项合并到左边数组的后面，得到一个新数组。如有重复键，则结果以左边的为准。

    <?php
    $arr1 = array(1,2,3,4);
    $arr2 = array(1,4,5,6,7);
    var_dump($arr1+$arr2);//1,2,3,4,7

==：两个数组具有相同的键名和键值则返回 true。  
===：如果两个数组具有相同的键名和键值且顺序和类型都一样。  

    <?php
    $arr1 = array(1=>'1',2=>'2',3=>'3',4=>'4');
    $arr2 = array(1=>1,2=>2,3=>3,4=>4);
    $arr3 = array(1=>'1',2=>'2',4=>'4',3=>'3');
    var_dump($arr1 == $arr2);//true
    var_dump($arr1 === $arr2);//false
    var_dump($arr1 == $arr3);//true
    var_dump($arr1 === $arr3);//false

## 错误控制运算符

@：用于可能发生错误的表达式（通常错误控制运算符用在程序开发测试阶段无法预测的可能出错的位置，一般是获取外部资源的时候）。

    <?php
    $link = @mysqli_connect('localhost','root','error') or die ('can not connect');

## 运算符的优先级

1.  括号最优先，赋值最落后
2.  算术运算符 > 比较运算符 > 逻辑运算符（非运算符比算术运算符优先级高）

# 十：流程控制

## 程序框图

-   开始，结束：椭圆
-   语句（块）：正方形
-   判断：菱形
-   输入输出：平行四边型

## 分支结构

1.  if 语句
2.  if else 语句
3.  if elseif 语句
4.  if elseif else 语句
5.  switch 语句


    <?php
    //if语句
    if(true)
      echo 1;
    //if else 语句
    if(false)
      echo 1;
    else
      echo 1;
    //if elseif语句
    if(false)
      echo 1;
    elseif(true)
      echo 1;
    //if elseif else语句
    if(false)
      echo 1;
    elseif(true)
      echo 1;
    else 
      echo 1;
    //switch
    //break一般都加上，除非特殊应用
    switch (1){
      case 1:
        echo 1;
        break;
      case 2:
        echo 1;
        break;
      default:
        echo 1;
    }

## 循环结构

1.  while 循环
2.  do while 循环
3.  for 循环


    <?php
    while(false){
      echo 'whilefalse';//不打印
    }
    do{
      echo 'dowhilefalse';//打印
    }while(false);
    //不是三个参数是三个表达式
    for($v=10;$v<11;++$v){
      echo $v;//10
    }

### 循环的中断

break 中断：结束这个循环。
continue 中断：进行下一循环。
可以加上中断的层数。（eg：break 2;）

    <?php
    //continue 2; = break;（要有两重循环）
    for($v=1;$v<10;++$v){
      for($n=1;$n<10;++$n){
        if($n>$v){
          echo PHP_EOL;
          break;
        }else
          echo "$v*$n=".$v*$n.' ';
      }
    }
    echo PHP_EOL;
    for($v=1;$v<10;++$v){
      for($n=1;$n<10;++$n){
        if($n>$v){
          echo PHP_EOL;
          continue 2;
        }else
          echo "$v*$n=".$v*$n.' ';
      }
    }
    //continue 2;错了
    echo PHP_EOL;
    for($n=1;$n<10;++$n){
      if($n>3){
        echo PHP_EOL;
        continue 2;
      }else
        echo "$n=".$n.' ';
    }

## 流程控制的替换语法

    if ( ... ) : 
    //语句块
    endif;

    if ( ... ) :  
    //语句块
    else: 
    //语句块
    endif;

    if ( ... ): 
    //语句块
    elseif( ... ) : 
    //语句块
    elseif( ... ): 
    //语句块
    else: 
    //语句块
    endif;

    switch( ... ) : 
    case ... 
    case ... 
    endSwitch;

    while(...): 
    //语句块
    endwhile;

    for(...; ...; ...): 
    //语句块
    endfor;

    foreach( )：
    //语句块
    endForeach；

## goto 语句（跳转语句）

严重不推荐适用！
它可以让我们的程序执行流程 “任意跳转”。
语法：
goto 标识符 1；
... 很多语句。
标识符 1：
... 很多语句。
标识符 2：
... 很多语句。
goto 标识符 2；
注意：

-   不能跳入循环中
-   不能跳入函数中
-   不能跳出函数外
-   不能跳出文件外


    <?php
    goto a;
    b:
    echo 'heyheyhey'.' ';
    goto c;
    d:
    echo 'This is library'.PHP_EOL;
    a:
    goto b;
    c:
    echo 'Good job'.PHP_EOL;
    if(rand(0,1))
      goto d;
    else
      goto a;

## 控制脚本执行进度

-   终止 php 脚本的运行：die(); 或 exit();
    > die 是一种 “语言结构”，并非函数，可以不写括号。
    > echo 也是一种语言结构，而非函数：
    > echo (“abc”);
    > echo  “abc”;
    > echo  “abc”, “def”, 123;


    <?php
    echo 'abc';
    echo 'abc','def';
    echo('abc');
    die('123');
    die;
    exit('123');
    //echo('abc','def');//错
    //exit '123';//错
    //die '123';//错

-   让 php 脚本停止 n 秒，然后继续执行：sleep(n);


    //PHP默认最长执行执行超过30s可能报错用set_time_limit()解决。
    <?php
    echo "start";
    sleep(50);
    echo "ok";

# 十一：文件加载

include，include_once，require，require_once（是语言结构，不是函数）

-   加载 / 引入 / 包含 / 载入不存在的文件 include


    <?php
    //./1.php不存在
    include('./1.php');//warning
    require('./1.php');//warning error

-   加上 once 只会引入一次


    dos代码：
    cd C:\Users\Administrator\Desktop
    ::^在dos中转义，>新建文件写一行，>>继续写一行
    echo ^<?php > include_once_test.php
    echo echo 1; >> include_once_test.php
    php代码：
    <?php
    include('./include_once_test.php');//加载
    include('./include_once_test.php');//加载
    include_once('./include_once_test.php');//不加载

-   文件加载返回值
    使用 include，include_once，require，require_once 时成功会返回 1


    dos代码：
    cd C:\Users\Administrator\Desktop
    ::^在dos中转义，>新建文件写一行，>>继续写一行
    echo ^<?php > include_test.php
    echo echo "php"; >> include_test.php
    php代码：
    <?php echo include('include_test.php')?>//输出php1
    <?php echo include'include_test.php'?>//输出php1
    <?= include('include_test.php')?>//输出php1

    <? include('include_test.php') ?>//输出php
    <? include'include_test.php' ?>//输出php

## 文件加载路径

### 相对路径

./  表示当前网页文件的所在位置（文件夹，目录）  
../ 表示当前网页文件的所在位置的上一级位置（文件夹，目录）  
这种相对位置对一个网站中的所有内容（包括 php，html，图片，css，js 文件）都有效。

### 绝对路径：

1.  本地绝对路径：  
    window 系统： c:/dir1/dir1/test.php  
    unix 系列系统： /dir1/dir1/test.php  
2.  网络绝对路径：  <http://www.abc.com/dir1/dir1/test.php>

### 只有文件名（不写路径）

1.  首先在 php.ini 设置的 include 目录中查找：


    php.ini：
    ;;;;;;;;;;;;;;;;;;;;;;;;;
    ; Paths and Directories ;
    ;;;;;;;;;;;;;;;;;;;;;;;;;

    ; UNIX: "/path1:/path2"
    ;include_path = ".:/php/includes"
    ;
    ; Windows: "\path1;\path2"
    ;include_path = ".;c:\php\includes"

    php脚本中设置：
    <?php
    //get_include_path获取以前的设置别给原有的覆盖了
    $path = get_include_path();
    //PATH_SEPARATOR目录分隔符（unix：":"，windows：";"）
    set_include_path($path.PATH_SEPARATOR."c:/dir1");
    echo get_include_path();

1.  php.ini 设置中没找到，当前工作目录查（地址栏中显示的那个文件名所在目录）
2.  当前工作目录中没找到，则在当前 include 命令所在文件的目录中查找

## 文件加载执行过程

就像是把 include，include_once，require，require_once 那一行语句替换成要加载的文件并执行。  
注意：在哪里使用就在哪里替（eg：在下面的例子中，在函数中调用函数会找不到上层函数的变量）

    test.php
    <?php
    class TestInclude{
      public function func(){
        $val = 'func';
        $this->inc();
      }
      public function inc(){
        // $val = 'inc';
        //在test2中var_dump($val);能找到$val = 'inc';
        include './test2.php';
      }
    }
    $ti = new TestInclude();
    $ti->inc();//在test2中var_dump($val);找不到$val = 'func';

    test2.php
    <?php
    var_dump($val);

## 文件加载中的 return

1.  结束脚本
    `return;`

2.  结束脚本带返回值 (在加载脚本的语句接收)
    `return 'Hello World'`

# 十二：错误处理

## 错误的分类

语法错误（程序没法跑），运行时错误（跑半道没法跑了），逻辑错误（程序正常跑，结果不对）

## 错误的分级

error， warning，notice 什么的

## 错误的触发

### 系统错误

自己就触发了

    <?php
    $i = 1/0;//Warning: Division by zero in C:\Users\Administrator\Desktop\test.php

### 用户自定义错误

自己根据需求设置的错误

    <?php
    $money = 100;
    if($money < 60)
      trigger_error("你连终身卡都买不起，这游戏不适合你。", E_USER_ERROR);
    elseif($money >= 60 && $money < 10000)
      trigger_error("先生先买个终身卡，再把648，328，198首冲都买了吧。", E_USER_WARNING);
    elseif($money >= 10000 && $money < 10000000)
      trigger_error("只要冲够钱您就会变得更强。", E_USER_NOTICE);
    elseif($money >= 10000000)
      echo "先定一个小目标，冲他一个亿。喵";

## 错误的显示控制

-   是否显示
    php.ini 中：
    `display_error = On;`
     （On 显示，Off 不显示）  
    脚本中：
    `ini_set(“display_error”,  1);`
    （1,true 显示，0,false 不显示）
-   显示哪些级别的错误
    php.ini 中：
    `error_reporting = E_ALL;`
    （本质是数字，可以用位运算控制）
    脚本中：
    `ini_set(“error_reporting”,  E_ALL);`

## 错误日志

在开发阶段：我们通常都是显示所有错误——意图解决错误  
在产品阶段：我们通常都是隐藏所有错误——并同时将错误信息记录到文件中——错误日志文件  
log_errors（是否记录错误日志），error_log（设定错误日志的文件名，设置为 syslog 会放到系统错误日志中）
php.ini 中设置错误日志：

    log_errors=On//开启
    error_log='php_error.log'//设置文件

脚本中错误日志：

    ini_set('log_errors', On);//开启
    ini_set('error_log', 'php_error.log');//设置文件

## 自定义错误处理

1.  设定要用来进行自定义处理错误的自定义函数名
2.  自己去定义该函数，并在其中进行任何错误信息的输出（或记录）


    <?php
    set_error_handler('myError', E_ALL);

    echo "$i";

    function myError($errNo, $errMsg, $errFile, $errLine){
      echo "大事不好了，文件： $errFile 的第 $errLine 行错了，赶紧去百度吧。".PHP_EOL;
      echo "错误号：$errNo ，$errMsg";
    }

# 十三：函数

## 定义函数

形参可以有默认值（默认值只能是常量表达式，或常量，不能是变量）
形参可以设置为引用传递

    <?php
    function myFunc($arg1, $arg2){
      return $arg1 + $arg2;
    }
    function myFunc2($arg1, $arg2 = 1){
      return $arg1 + $arg2;
    }
    function myFunc3(&$arg1, $arg2){
      $arg1 += $arg2;
    }

## 调用函数

1.  没有返回值：直接用
2.  有返回值：当做一个变量用
3.  引用传递的形参只用能变量当形参


    <?php
    //有返回值
    function myFunc($arg1, $arg2){
      return $arg1 + $arg2;
    }
    echo myFunc(1,2);
    //没有返回值
    function myFunc2($arg1, $arg2){
      echo $arg1 + $arg2;
    }
    myFunc2(1,2);
    //引用传递
    $v1 = 1;
    function myFunc3(&$arg1, $arg2 = 2){
      $arg1 += $arg2;
    }
    myFunc3($v1);
    echo $v1;

## 函数调用流程

1.  实际参数传数据给形式参数
2.  程序执行流程进入到函数中（一个独立的运行空间），跟全局执行空间是隔离的
3.  执行函数内的代码
4.  碰到 return 语句或执行到函数结尾，终止函数的执行，跳回函数开始调用的位置

## 参数数量

实参可以多于，少于形参。

    <?php
    function myFunc($arg1, $arg2){
      echo $arg1 + $arg2;
    }
    //多于：舍去多余的
    myFunc(1,2,3,4);//3
    //少于：用到时找不到会警告
    myFunc(1);//1

定义时可以不给定形参，调用时可以给定任意个数的实参。

    <?php
    function myFunc(){
      var_dump(func_get_args());  //获得一个函数所接收到的所有实参数据，并结果是一个数组
      var_dump(func_get_arg(1));  //获得一个函数所接收到的第n歌实参数据（n从0开始）
      var_dump(func_num_args());  //获得一个函数所接收到的所有实参数据的个数
    }
    myFunc(1,2,3,4,5);

## 函数返回值

引用传递返回值

    <?php
    function &myFunc(){
      static $result = 0;//静态变量，第一次调用这个函数赋值，再次调用这个函数不会被赋值
      return $result;
    }
    $v1 = &myFunc();//0
    echo $v1;
    $v1++;
    $v1 = &myFunc();//1
    echo $v1;

## 可变函数

函数名是变量

    <?php
    function myFunc($func){
      function f1(){
        echo "function f1";
      }
      $func();
    }
    myFunc('f1');

## 匿名函数

1.  将函数赋值给变量


    <?php
    $myFunc = function(){
        echo "myFunc";
    };//这是赋值，这个分号必须有
    $myFunc();

1.  用于能够使用（匿名）函数当作实参的函数（eg：call_user_func_array()）


    <?php
    $arr = array(1,2,3,4,5,6,7);
    //求和
    $sum = call_user_func_array(function(){
      $arr = func_get_args();
      $sum = 0;
      foreach($arr as $v){
        $sum += $v;
      }
      return $sum;
    },$arr);
    echo $sum;

## 变量的作用域

-   局部作用域：只能在所定义的函数范围内使用。
-   全局作用域：在函数的 “外部” 范围使用。  
    php 中全局作用域变量函数不能直接使用（js 可以）
-   超全局作用域：就是在函数的内部和外部都可以使用。
-   静态局部作用域：数据能够在函数退出后仍然保持不丢失。

### 局部访问全局变

使用：

1.  局部范围使用 global 关键字：局部创建同名变量指针指向全局变量对应的数据。
2.  局部范使用 $GLOBALS 超全局数组来使用全局变量：直接操作全局变量

    <?php
    $global1 = 123;
    $global2 = 456;
    function get_global(){
      global $global1;
      echo $global1;//123
      echo $GLOBALS['global2'];//456
      
      unset($global1);
      unset($GLOBALS['global2']);
    };
    get_global();
    echo "---".$global1;//123
    echo $global2;//undefined

### 全局访问局部变量

1.  在函数内部为 $GLOBALS 数组添加元素
2.  引用传递方式传参数
3.  引用传递方式传返回值


    <?php
    function set_global(){
      $GLOBALS['local'] = 'local';
    };
    set_global();
    echo $local;

    function get_local1(&$v1){
        $local = 'local';
        $v1 = $local;
    }
    get_local1($v1);
    echo $v1;

    function &get_local2(){
        $local = 'local';
        return $local;
    }
    $v1 = &get_local2();
    echo $v1;

## 检查函数是否存在：function_exists(string)

    <?php
    if(function_exists('link_db') == false){
      function link_db(){
        @mysqli_connect('localhost','123456') or die(mysqli_connect_error());
      }
    }
    link_db();

## 字符串函数

### 查找字符位置函数

-   `strpos($str,search,[int])`: 查找 search 在 $str 中的第一次位置从 int 开始
-   `stripos($str,search,[int])`: 查找 search 在 $str 中的第一次位置从 int 开始（大小写不敏感）
-   `strrpos($str,search,[int])`: 查找 search 在 $str 中的最后一次出现的位置从 int 开始

### 提取子字符函数

-   `substr($str,$start[,$length])`: 从 $str 中 strat 位置开始提取 length 长度的字符串
-   `strstr($str1,$str2)`: 从 $str1(第一个的位置) 搜索 $str2 并从它开始截取到结束字符串
-   `stristr($str1,$str2)`: 从 $str1(第一个的位置) 搜索 $str2 并从它开始截取到结束字符串（大小写不敏感）
-   `strrchr($str1,$str2)`: 从最后一次搜索到的字符处返回（用处：取路径中文件名）

### 替换字符串的 PHP 字符串函数

-   `str_replace(search,replace,$str)`: 从 $str 中查找 search 用 replace 来替换
-   `str_ireplace(search,replace,$str)`: 从 $str 中查找 search 用 replace 来替换（大小写不敏感）
-   `strtr($str,search,replace)`: 从 $str 中查找 search 到结束用 replace 来替换（replace 不能为 ""）
-   `substr_replace($str,$rep,$start[,length])`:$str 原始字符串,$rep 替换后的新字符串,$start 起始位置,$length 替换的长度

### 比较字符函数

-   strcmp($str1,$str2):$str1>=&lt;$str2 分别为 1,0,-1
-   strcasecmp($str1,$str2):$str1>=&lt;$str2 分别为 1,0,-1（不分大小写）
-   strnatcmp($str1,$str2): 按自然排序比较字符串
-   strnatcasecmp($str1,$str2): 按自然排序比较字符串（区分大小写）

### 字符大小写转换的 PHP 字符串函数

-   strtolower($str): 字符串转换为小写
-   strtoupper($str): 字符串转换为大写
-   ucfirst($str): 将函数的第一个字符转换为大写
-   ucwords($str): 将每个单词的首字母转换为大写

### 分割成数组的 PHP 字符串函数

-   `str_split($str,len)`: 把 $str 按 len 长度进行分割返回数组
-   `expload(search,$str[,limit]`)\`: 把 $str 按 search 字符进行分割返回数组
-   `split(search,$str[,limit])`: 把 $str 按 search 字符进行分割返回数组（可以用正则）

### 正则表达式

-   preg_quote($str); 转义正则表达式字符
-   preg_replace(pattern,replace,$str); 正则表达式的搜索和替换
-   preg_match(pattern,$str,$match); 匹配正则表达式（$match 匹配的结果）
-   preg_split(pattern,$str); 分隔字符串
-   preg_grep(pattern,$array); 返回匹配模式的数组条目   

### 字符长度

-   strlen($str)

### 去除空格

-   ltrim($str)
-   rtrim($str)
-   trim($str)

### 加空格函数

-   chunk_split($str,2): 向 $str 字符里面按 2 个字符就加入一个空格

### HTML 代码有关函数

-   nl2br(): 转义 HTML
-   strip_tags($str)：去除 HTML 和 PHP 标记

### 数据库相关的 PHP 字符串函数

-   addslashes($str)

## 递归函数（效率低）：函数内部有一条代码去调用自身（由大到小）

求阶乘：

    <?php
    function factorial($n){
      if($n == 1)
        return 1;
      $result = factorial($n-1) * $n;
      return $result;
    }
    echo factorial(10);

## 递推 / 迭代算法：每一次的结果是下一次的初始值（由小到大）

求斐波那契数列的第 n 项的值：

    <?php
    function fibonacci($n){
      $last = 1;
      $result = 1;
      if($n <= 2){
        return 1;
      }
      for($i=2;$i<$n;++$i){
        $temp = $result;
        $result += $last;
        $last = $temp;
        
      }
      return $result;
    }
    echo fibonacci(6);

# 十四：操作 mysql 数据库

== 不推荐使用 mysql_XXX() 这些方法 ==

1.  连接数据库

2.  设定连接编码
    php 执行
    `mysqli_query($link, 'CHARSET utf8');`
    还是会乱码（dos 下执行 CHARSET 不会乱码，并且和 SET NAMES utf8 一样改变了 client,connection,results）。

3.  选择数据库

4.  执行 sql 命令
    mysqli_query 执行无返回数据的语句：返回 true 表示执行成功，返回 false 失败
    mysqli_query 执行有返回数据的语句：返回对象表示执行成功，返回 false 失败

5.  处理返回结果

    <?php
    //1. 连接数据库
    $link = mysqli_connect('localhost', 'root', '123456');
    //2. 设定连接编码
    mysqli_set_charset($link, "utf8");//也可以使用：mysqli_query($link, "set names utf8");
    //3. 选择数据库
    mysqli_select_db($link, "test");//也可以使用：mysqli_query($link, "use test");
    //4. 执行sql命令
    $result = mysqli_query($link, "show tables");
    //5. 处理返回结果
    var_dump($result);
    if($result !== false){
        // mysql和mysqli方法不同
        
        // 获取全部结果，并形成二维数组
        // mysqli_fetch_array获取一个结果
        $fields = mysqli_fetch_fields($result);
        while($rec = mysqli_fetch_array($result)){
          foreach ($fields as $field) {
            $field_name = $field->name;
            $tables[$field_name][] = $rec[$field_name];
          }
        }
        
        // 获取全部结果，没有字段名
        //mysqli_fetch_all获取全部结果
        mysqli_fetch_all($result);
    }

## PDO 操作数据库

### 步骤

1.  开启 PDO_mysql 相关扩展（php_pdo_mysql.dll）
2.  连接
3.  认证
4.  发送 SQL
5.  等待 mysql 服务器的执行结果
6.  处理执行结果


    <?php
    class PDODB{
      private $pdo;
      function __construct(){
        // 1.连接数据库
        $dsn = 'mysql:host=127.0.0.1;port=3306;dbname=mysql';
        $username = 'root';
        $password = '123456';
        $driver_options = array(
          PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES UTF8'
          );
        $this->pdo = new PDO($dsn, $username, $password, $driver_options);
      }
      function show_tables(){
        // 2.执行sql语句
        $result = $this->pdo->query('select * from user;');
        // 3.处理返回结果
        # 返回列名和数据的关联数组
        # $list = $result->fetchAll();
        # 返回数组，不显示列名
        $list = $result->fetchAll(PDO::FETCH_NUM);
        var_dump($list);
      }
    }
    $pdo = new PDODB();
    $pdo->show_tables();

### PDO 对象的常用方法

1.  errorInfo() 错误信息，包含错误信息的数组。
2.  errorCode() 错误代码
3.  beginTransaction() 开启事务
4.  rollback() 回滚事务
5.  commit() 提交事务
6.  inTransaction() 判断是否处于事务中
7.  lastInsertID() 最后形成的 auto_increment 字段的值
8.  Exec()，query()：执行 SQL 的方法，返回值类型不同。Exec() 返回值类型为整型表示当前执行 SQL 所影响的记录数，query() 返回的是对象类型。
    Query()：执行查询类，show，select，desc  
    Exec()：非查询类，insert，delete，update，DDL  

### 预处理（预编译）的执行方式

一条 SQL 的执行，MySQL 分成两大步骤：1 编译 ->2 执行  
优点：1. 连续执行多条结构相同的 SQL 速度快（结构已经编译好了）。2. 可以防止 sql 注入。

1.  编译统一的结构 $PDOStatement = $pdo->prepare(SQL 的结构);（SQL 结构中的数据部分，可以使用问号，或者冒号标签的语法来占用）
2.  绑定数据到中间编译结果 $PDOStatement->bindValue()
3.  执行 $PDOStatement->execute();

    <?php
    class PDODB{
      private $pdo;
      function __construct(){
        $dsn = 'mysql:host=127.0.0.1;port=3306;dbname=test';
        $username = 'root';
        $password = '123456';
        $driver_options = array(
          PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES UTF8'
          );
        $this->pdo = new PDO($dsn, $username, $password, $driver_options);
      }
      function crate_table_testpre(){
        $result = $this->pdo->exec('create table testpre (name varchar(20));');
        var_dump($result);
      }
      function insert_data(){
        $names = array(
          '张三', '李四', '王五'
          );
        $stmt = $this->pdo->prepare('insert into testpre values (:name)');
        foreach ($names as $key => $value) {
          $stmt->bindValue(':name', $value);
          $result = $stmt->execute();
          var_dump($result);
        }
      }
    }
    $pdo = new PDODB();
    $pdo->crate_table_testpre();
    $pdo->insert_data();

PDOStatement 对象的常用方法  

1.  errorInfo()：错误信息  
2.  errorCode()：错误信息  
3.  fetch()：从结果集中获取下一行
4.  fetchAll()：返回一个包含结果集中所有行的数组
5.  fetchColumn(index=0)：允许传递参数，表示获得第一条记录的第几个字段的值
6.  rowCount()：统计处理的记录数。影响了多少行（增删改）结果集中存在多少行（查）。
7.  closeCursor()：释放结果集光标（建议 fetch 之后，手动释放）。

# 十五：面向对象

OOP：object oriented program

## 类与对象

类：是用于描述 “某一些具有共同特征” 的物体的概念，是某一类物体的总称，包括属性和方法
对象：是指一个具体的 “物体”，该物体隶属于某个 “类别”（类）。通常，对象离不开类，没有类，就不能有对象。

### 类中成员

一个类的内部可以有 3 种代码：属性，方法和类常量，它们统称为 “类中成员”。

#### 一般属性：就是放在一个类中的变量。

定义形式：

1.  var $v1;// 定义不赋值
2.  var $v2 = 2;// 定义的同时可以赋值，该值只能是 “直接值” 或常量，不能是变量值，也不能是 “计算表达式”
3.  public $v1;
4.  public $2 = 2;// 其实 var 是 “public” 一个别名，正式用 public 更好。

错误定义形式：  
$v1 = 1;// 不写作用域  
var  $v2 = 1+3;// 右边不能是计算表达式  
public $v3 = $v2;// 右边不能是变量  

使用形式：  
$ 对象 -> 属性名;// 注意：属性名前面没有 $ 符号。

    <?php
    class C1{
      public $v1 = 10;
      var $v2 = 10;
      public $v3;
      var $v4;
    }
    $o1 = new C1();
    echo $o1->v1;

#### 一般方法：就是放在一个类中的函数。

定义：跟原来函数定义几乎一样。  
方法前可以加修饰词：public，protected，private，省略就算 “public”  
方法中的 $this 是一个 “伪对象”，代表当前所属类的当前对象。  
方法中使用 self 代表当前类名  
使用：通过类或类的对象来调用。

    <?php
    class C1{
      public $v1 = 123;
      function f1(){
        echo $this->v1;
      }
    }
    $o1 = new C1();
    echo $o1->f1();

#### 静态属性：所有对象的公共数据

定义：在定义属性的时候，前面加上关键字 static  
使用：  

1.  类::$ 静态属性名;（双冒号语法，也叫范围解释符）
2.  $ 对象名::$ 静态属性名;（属于最新的语法，低版本 php 可能报错，不推荐使用）

    <?php
    class C1{
      static $v1 = 123;
    }
    $o1 = new C1();
    echo C1::$v1;
    echo $o1::$v1;
    //echo $o1->$v1;对象无法这样使用静态属性

#### 静态方法：所有对象的公共方法

定义：在定义方法时前面加上 static（静态方法中不能出现 $this，只能使用静态属性和静态方法） 
使用：  

1.  类:: 静态方法名 ();（双冒号语法，也叫范围解释符）
2.  $ 对象名:: 静态方法名 ();（属于最新的语法，低版本 php 可能报错，不推荐使用）

    <?php
    class C1{
      static $v1 = 123;
      public $v2 = 456;
      static function f1(){
        echo C1::$v1;
        // echo $this->v2;错的
        // $this->f2();错的
        return new self;//self当前类名
      }
      function f2(){
        echo 123;
      }
    }
    $o1 = new C1();
    var_dump(C1::f1());
    var_dump($o1::f1());

#### 构造方法

构造方式是类中的一个特殊的方法，其作用是在实例化一个对象的同时，给该对象的属性赋值，使之一创建完成，就具有了其本身的特有数据（属性值）。

1.  该方法名字是固定的，为：\_\_construct();
2.  该方法必须是普通方法（不能是静态方法）
3.  通常该方法应该是 public
4.  通常该方法中使用 $this 这个关键字来对属性进行赋值
5.  当 new 类名 () 的时候，其实是在调用该构造方法
6.  如果一个类中定义了构造方法，则实例化该类时就会调用该方法，且实例化时的参数需要跟构造方法的参数匹配

    <?php
    class C1{
      function __construct($v1, $v2){
        $this->v1 = $v1;
        $this->v2 = $v2;
      }
      public $v1;
      public $v2;
    }
    $o1 = new C1(123, 456);
    var_dump($o1->v1);
    var_dump($o1->v2);

#### 析构方法

析构方法是 “销毁” 对象的时候会自动调用  
析构方法通常用于在销毁对象的时候来 “清理数据”  
通常，php 程序结束后，所有对象都会自动销毁（其实属于 php 内部的垃圾回收机制）
说明：

1.  析构方法通常不太需要去定义。
2.  析构方法不能调用。
3.  析构方法不能有形参。
4.  析构方法中可以用于清理一些在 php 代码结束后不能清理的数据，如生成的文件。

对象销毁的几个情形：

1.  脚本程序运行结束，自动销毁；
2.  明确地 unset() 一个对象变量，则被销毁；
3.  改变对象变量的值，被销毁；

实际上，当一个对象没有任何一个变量指向它的时候，该对象就会被自动销毁。如果整个程序结束，也会销毁。

    <?php
    class C1{
      function __construct(){
        echo 'construct'.PHP_EOL;
      }
      function __destruct(){
        echo 'destruct'.PHP_EOL;
      }
    }
    $o1 = new C1();//construct：$o1
    $o2 = new C1();//construct：$o2
    unset($o1);//construct：$o1
    //construct：$o2

创建对象：

1.  $ 对象名 = new 类名 ();// 对象名就是变量名；类是应该定义过了
2.  用可变类名创建对象
3.  $ 对象名 = new self;//self 指代类本身，这行代码只能在类内部方法中使用
4.  通过对象创建对象
5.  创建空对象，不通过类创建对象（php 不能 new Object() 要用强制类型转换，用于返回数据）

    <?php
    class C1{
      function f1(){
        $o3 = new self;
      }
    }
    $o1 = new C1();

    $class1 = 'C1';
    $o2 = new $class1();

    $o4 = new $o1;
    // 创建空对象
    $o5 = (object)null;
    // 不通过类创建对象
    $o6 = (object)array('name'=>123,'pwd'=>456);

对象的传值：
默认是值传递，可以使用引用传递
值传递：将这个对象复制一个给新变量（对象的属性和方法不复制，所以这两个对象共用一套属性和方法）
引用传递：将新变量指向当前对象的空间

    <?php
    class C1{
      public $v1 = 10;
    }
    $o1 = new C1();
    $o2 = $o1;
    $o3 = &$o1;
    var_dump($o1);//class C1#1
    var_dump($o2);//class C1#1
    var_dump($o3);//class C1#1

    $o1 = new C1();
    var_dump($o1);//class C1#2
    var_dump($o2);//class C1#1
    var_dump($o3);//class C1#2(引用传递)

### 类的继承

-   继承：一个类从另一个已有的类获得其特性，称为继承
-   派生：从一个已有的类产生一个新的类，称为派生
-   父类 / 子类：已有类为父类，新建类为子类。父类也叫 “基类”，子类也叫 “派生类”
-   单继承：一个类只能从一个上级类继承其特性信息。PHP 和大多数面向对象的语言都是单继承模式。C++ 是多继承
-   扩展：在子类中再来定义自己的一些新的特有的特性信息（属性，方法和常量）。没有扩展，继承也就没有意义了

#### 类成员的修饰符：

1.  public：公开的，可以在 “任何位置” 访问。
2.  protected：受保护的，可以在当前类或当前类的上下级具有继承关系的类中访问。
3.  private：私有的，只能在其所在的类中访问


    <?php
    class C1{
      public $test_public = 'test_public';
      protected $test_protected = 'test_protected';
      private $test_private = 'test_private';
      public function func(){
        echo $this->test_public;//可以访问
        echo $this->test_protected;//可以访问
        echo $this->test_private;//可以访问
      }
    }
    class C2 extends C1{
      public function func(){
        echo $this->test_public;//可以访问
        echo $this->test_protected;//可以访问
        echo $this->test_private;//不可以访问
      }
    }
    $o1 = new C1();
    $o2 = new C2();
    $o1->func();
    $o2->func();

    echo $o1->test_public;//可以访问
    //echo $o1->test_protected;//不可以访问
    //echo $o1->test_private;//不可以访问

#### parent 代表父类：

parent 通常用于在子类中调用父类的成员的时候使用，多数通常就是使用父类的 “静态类” 成员。因为 parent 代表的类，而非对象。

    <?php
    class C1{
      public $v;
      function __construct(){
        $this->v = 1;
      }
    }
    class C2 extends C1{
      public $v2;
      function __construct(){
        parent::__construct();
        $this->v2 = 1;
      }
    }
    $o2 = new C2();
    echo $o2->v;//1

#### override 重写：

重写就是将从父类继承下来的属性或方法重新定义  

1.  重写的方法权限应不低于父级权限（私有方法不能被覆盖，而是在子类中当做全新的使用）
2.  方法的参数应该跟父类的一致（构造方法参数可以和父类不一致）

    <?php
    class C1{
      function func1(){
        echo 123;
      }
    }
    class C2 extends C1{
      //protected function func1(){
      //  echo 456;
      //}//会报错
      ////function func1($v1){
      //    echo 456;
      //}//会报错
      function func1(){
        echo 456;
      }
    }

#### final class 最终类：

如果某个类不希望对其进行扩展，则可以将其声明为最终类。

    <?php
    final class C1{}
    class C2 extends C1{}//会报错Class C2 may not inherit from final class (C1)

#### final method 最终方法：

如果某个方法不希望被下级类覆盖，就可以对其声明为最终方法。

    <?php
    class C1{
      final function final_func(){
        
      }
    }
    class C2 extends C1{
      function final_func(){
        
      }//会报错Cannot override final method C1::final_func()
    }

## 抽象类，抽象方法

### 抽象类

在正常定义类的前面，加上关键字：abstract，那就构成抽象类。  
抽象类可以用来规范一些类的共同特性，但又不需要去对其进行实例化。  

### 抽象方法

抽象方法是一个没有方法体（也不含大括号）的方法。  
方法前面需要加上 abstract。  

### 抽象类，抽象方法细节

1.  如果一个方法定义为抽象方法，则其所在的类必须定义为抽象类。
2.  一个抽象类中，可以没有抽象方法但通常意义不大。
3.  子类继承自一个抽象类，则子类必须实现父类中的所有抽象方法，除非子类也继续作为抽象类
4.  子类实现抽象父类的方法时，访问控制修饰符的范围不能降低，且方法的参数也须一致（其实这就是重写，所以要满足重写的要求）。


    <?php
    abstract class Animal{
      public $legs = 4;
      public $eyes = 2;
      public abstract function run();
    }
    class Man extends Animal{
      public $legs = 2;
      public function run(){
        echo "man can run with 6 meters per second";
      }
    }
    class Dog extends Animal{
      public function run(){
        echo "man can run with 20 meters per second";
      }
    }

## PHP 中的重载

其基本语法是这样的：  
在一个类中，有多个同名的方法，每个方法的参数不同而已。这种现象就称为 “重载”。  
参数不同可以是：数量个数不同，或类型不同，或顺序不同。  
比如：  

    class  A{  
    int function f1(int x){...}
    int function f1(int x, int y){...}
    int function f1(string s, int m){...}

但，在 php 中，一个类中，根本就不可以定义多个同名方法——这直接是语法错误。  
实际上，php 中的重载指的是：  
属性重载：如果使用一个不存在的属性，就会去自动调用类中预先定义好的某个方法以处理数据  
方法重载：如果使用一个不存在的方法，就会去自动调用类中预先定义好的某个方法以处理该行为  

### 属性重载

属性有４种使用情形：

1.  取值：$v1 = 对象 -> 属性;
2.  赋值：对象 -> 属性 = XX 值;
3.  判断是否存在：isset(对象 -> 属性;)
4.  销毁：unset(对象 -> 属性;)

所谓属性重载，就是在面对上述 4 种情形的属性使用场景中，该对象如果来 “应对” 的问题。  
如果某属性不存在，但在语法中使用如下情形，则会发生

1.  取值：$v1 = 对象 -> 属性;       ===> 自动调用类中的 \*\*get() 方法
2.  赋值：对象 -> 属性 = XX 值;       ===> 自动调用类中的 \*\*set() 方法
3.  判断是否存在：isset(对象 -> 属性;)  ===> 自动调用类中的 \*\*isset() 方法
4.  销毁：unset(对象 -> 属性;)      ===> 自动调用类中的 \*\*unset() 方法

    <?php
    class C1{
      public $v1 = 1;
      public $propArr = array();
      function __get($propName){
        if(isset($this->propArr[$propName])){
          return $this->propArr[$propName];
        }
        return "不存在的属性 $propName";
      }
      
      function __set($propName,$value){
        $this->propArr[$propName] = $value;
      }
      
      function __isset($propName){
        if(isset($this->propArr[$propName])){
          return true;
        }
        return false;
      }
      
      function __unset($propName){
        unset($this->propArr[$propName]);
      }
    }
    $obj = new C1();
    $obj->v2 = 123;
    echo $obj->v2;//123
    echo isset($obj->v2);//1
    unset($obj->v2);

### 方法重载

当使用一个对象调用一个不存在的普通方法的时候，会自动去调用预先定义好的 “\_\_call” 方法。

    <?php
    class C1{
      function f1(){
        echo 'f1';
      }
      function f2($v){
        echo "f2 $v";
      }
      function __call($name, $array){
        $count = count($array);
        if($count == 0){
          $this->f1();
        }elseif($count == 1){
          $this->f2($array[0]);
        }
      }
    }
    $obj = new C1();
    $obj->ff();
    $obj->ff("123");

## interface 接口

接口中只有两类最简单特性信息：（没有普通方法）

1.  接口常量：其实就是常量
2.  抽象方法：只有方法名，没有方法体

接口可以看作是抽象类的更高层面的抽象规范，不考虑接口常量的话，那么就相当于之规定了下级类要做什么，至于怎么就，没有规定。  
接口可以实现 “多继承”（多实现），而类不行。  
一个类只能继承一个父类，但可以实现多个 “上级接口”，语法形式：
`class 类 A extends 类 B implements 接口 1, 接口 2,... {...}`

一个接口同样可以继承另一个接口（也是单继承）：
`interface 接口 1 extends 接口 2{...}`

    <?php
    interface I1{
      const V1 = 1;
      function f1();
    }
    interface I2 extends I1{
      const V2 = 2;
      function f2();
    }
    class C1 implements I1,I2{
      public function __construct(){
        echo self::V1;
        echo self::V2;
      }
      function f1(){}
      function f2(){}
    }
    $o1 = new C1();

## 类的自动加载

做法 1：使用\_\_autoload 魔术函数  

    <?php
    function testFile(){
      mkdir("C:/Users/Administrator/library");
      $file = fopen("C:/Users/Administrator/library/A.class.php", 'w');
      fwrite($file, "<?php\n");
      fwrite($file, "class A{}");
      fclose($file);
    }
    function __autoload($className){
      require "C:/Users/Administrator/library/{$className}.class.php";
    }
    testFile();
    $obj = new A();
    var_dump($obj);

做法 2：使用 spl_autoload_register 函数  
用 spl_autoload_register 函数可以声明多个可以用来代替\_\_autoload 函数作用的函数（类文件分布在不同的目录中可以使用这种方法）  

    <?php
    function testFile(){
      mkdir("C:/Users/Administrator/library");
      $file = fopen("C:/Users/Administrator/library/A.class.php", 'w');
      fwrite($file, "<?php\n");
      fwrite($file, "class A{}");
      fclose($file);
    }

    spl_autoload_register('autoload1');
    spl_autoload_register('autoload2');

    function autoload1($className){
      require "C:/Users/Administrator/library/{$className}.class.php";
    }
    function autoload2($className){
      require "C:/Users/Administrator/class/{$className}.class.php";
    }
    testFile();
    /*
    1.先看这个文件中是否加载该类
    2.autoload1运行后是否加载该类
    3.autoload2运行后是否加载该类
    */
    $obj = new A();
    var_dump($obj);

## 对象的复（克隆）制 clone

浅克隆（默认）：只能克隆对象中的 “非对象非资源” 数据  

    <?php
    class C1{public $v1 = 1;}
    class C2{
      public $v2 = 2;
      public $v3;
      public function __construct(){
        $this->v3 = new C1();
      }
    }
    var_dump($o1 = new C2());
    var_dump($o2 = clone $o1);//共用一个v3

深克隆：要想实现深克隆（一个对象的所有属性数据都彻底实现了 “复制”），就需要对该对象类使用魔术方法\_\_clone（），人为去复制浅克隆复制不了数据。  

    <?php
    class C1{public $v1 = 1;}
    class C2{
      public $v2 = 2;
      public $v3;
      public function __construct(){
        $this->v3 = new C1();
      }
      public function __clone(){
        $this->v3 = clone $this->v3;
      }
    }
    var_dump($o1 = new C2());
    var_dump($o2 = clone $o1);//新建了个v3

## 对象遍历

用 foreach 语句进行遍历（只能遍历可访问的属性）

    <?php
    class C1{
      public $v1 = 1;
      protected $v2 = 2;
      private $v3 = 3;
      public function fetchAllProp(){
        foreach($this as $key => $value){
          echo "$key => $value".PHP_EOL;
        }
      }
    }
    $o1 = new C1();
    //只有1
    foreach($o1 as $key => $value){
      echo "$key => $value".PHP_EOL;
    }
    echo "---".PHP_EOL;
    //有1,2,3
    $o1->fetchAllProp();

## PHP 内置标准类

stdclass：该类内部没有定义任何属性，但我们还是可以使用该类的属性（不存在的属性）

    <?php
    var_dump($obj = new stdclass());
    $obj->v1 = 1;
    $obj->v2 = 2;
    var_dump($obj);

## 将数据转换为对象

1.  对象转换为对象：没有变化
2.  数组转换为对象：数组的键名当作属性名，值为对应值（数字下标的属性无法用 "->" 操作）
3.  null 转换为对象：空对象
4.  其他标量数据转换为对象：属性名为固定的 “scalar”，值为该变量的值


    <?php
    var_dump($o_arr = (object) array("v1" => 1,"v2"=>2,3,4));
    var_dump($n_arr = (object) null);
    var_dump($n_arr = (object) 1);

## 类型约束

php 是弱类型语言，其特点是无需为变量指定类型，而且在其后也可以存储任何类型。  
但在 php 的较新的语法中，在某些特定场合，针对某些特定类型，也可以进行语法约束。  
特定场合：函数（或方法）的形参变量  
特定类型：对象类型（类名），接口类型（接口名），数组类型（array），函数类型（callable）  

    <?php
    class C1{}
    interface I1{}
    class C2 implements I1{}
    function f1(C1 $v){//只能传该类的对象
      var_dump($v);
    }
    function f2(I1 $v){//只能传实现该接口的类的对象
      var_dump($v);
    }
    function f3(array $v){//只能传数组
      var_dump($v);
    }
    function f4(callable $v){//只能传函数
      var_dump($v);
    }

## 魔术方法

### \_\_sleep() 和\_\_wakeup()

当对一个对象进行 “序列化” 操作的时候，会自动调用类中的**sleep() 方法；
当 “反序列化” 一个对象的时候，会自动调用对应类中的**wakeup() 方法；

    <?php
    class C1{
      public $v1 = 1;
      public $v2 = 2;
      function __sleep(){//只保存C1
        echo "__sleep";
        return array('v1');
      }
      function __wakeup(){//经常用于重新建立数据库连接，或执行其它初始化操作。 
        echo "__wakeup";
      }
    }
    var_dump($s = serialize(new C1));
    file_put_contents('./test_serialize', $s);
    var_dump(unserialize(file_get_contents('./test_serialize')));

### \_\_tostring()

当把一个对象当作一个 “字符串” 来看待（处理）的时候，会自动调用该魔术方法。
通过该方法，可以返回 “合适” 的字符串，也可以认为就是对象转换为字符串的结果。
如果没有改方法，会出错。

    <?php
    class C1{
      public $v1 = 1;
      public $v2 = 2;
      function __tostring(){
        return "{$this->v1},{$this->v2}";
      } 
    }
    var_dump((string)new C1());

### \_\_invoke()

对象当作一个 “方法”（函数）的时候，会自动调用该魔术方法。

    <?php
    class C1{
      public $v1 = 1;
      public $v2 = 2;
      function __invoke(){
        echo "你怎么可以拿对象当函数，好讨厌，锤你胸口";
      } 
    }
    $obj = new C1();
    $obj();//打印：你怎么可以拿对象当函数，好讨厌，锤你胸口

## 关类和对象的系统函数和运算符

系统函数  

-   class_exists()：判断某个类是否存在（定义过）
-   interface_exists()：判断接口是否存在
-   get_class()：获取某个对象的 “所属类名”
-   get_parent_class()：获取某个对象的 “所属父类的类名”
-   get_class_methods()：获取一个类的所有方法，返回一个索引数组，就是这些方法的名字。
-   get_class_vars()：获取一个类的所有属性，返回一个数组，下标为属性名，值为属性值。
-   get_declared_classes()：获得所有声明过的类（含系统中的类）
-   is_object()：判断是否对象
-   get_object_vars()：获得对象的所有属性，返回一个数组，下标为属性名，值为属性值

运算符  

-   new：实例化类
-   instanceof：判断一个对象是否是某个类的 “实例”


    <?php
    class C1{}
    class C2 extends C1{}
    $obj1 = new C1();
    $obj2 = new C2();
    var_dump($obj1 instanceof C1);//true
    var_dump($obj2 instanceof C1);//true

## 两个特定语法场景的辨析

### 对象向下传递特性：

当一个对象调用一个实例方法，然后，在该实例方法中又去 “静态” 调用另一个类的普通方法，则在类的普通方法中会自动获得在实例方法中的那个 $this 对象。

    <?php
    class C1{
      public $v1 = 1;
      function f1(){
        @C2::f2();
        @C2::f3();
      }
    }
    class C2{
      function f2(){
        var_dump($this);//有this
      }
      static function f3(){
        var_dump($this);//null
      }
    }
    $o1 = new C1();
    $o1->f1();

### static 后期静态绑定特性：

static 在类方法中代表调用该方法的对象所在的类

    <?php
    class C1{
      public static $v = 1;
      function f1(){
        echo self::$v;
        echo static::$v;
      }
    }
    class C2 extends C1{
      public static $v = 2;
    }
    $o1 = new C1();
    $o2 = new C2();
    $o1->f1();//11
    echo "---";
    $o2->f1();//1,2

可见 static 有 3 个不同含义的语法：

1.  函数中的静态变量：

    function f1(){static $v1 = 1;}

2.  类中的静态成员：


    class A{
        static $v1 = 1;
        static function f1(){}
    }

1.  方法中的动态指代 “当前类”：


    class A{
        function f1(){
            static::f2();//static此时指代调用f1这个方法的类（或对象的类）
            self::f2(); //self这里永远指代当前A这个类。
        }
    }

# 十六：设计模式

设计模式就是一些解决问题的 “常规做法”，是一种认为较好的经验总结。面对不同的问题，可能会有不同的解决办法，此时就可以称为不同的设计模式。

## 工厂模式

在实际应用中，遇到需要去实例化很多很多的类以得到对象的情况，可以设计出一个工厂（类），该工厂（类）的作用就是实例化各种对象。这种工厂通常只要指定类名，就可以据此获取一个该类的对象。

    <?php
    class factory{
      static function testFile(){
        mkdir("C:/Users/Administrator/class");
        $file = fopen("C:/Users/Administrator/class/A.class.php", 'w');
        fwrite($file, "<?php\n");
        fwrite($file, "class A{}");
        fclose($file);
      }
      static function getInstance($className){
        if(file_exists("C:/Users/Administrator/class/{$className}.class.php")){
          require_once "C:/Users/Administrator/class/{$className}.class.php";
          return $obj1 = new $className();
        }else{
          return null;
        }
      }
    }
    factory::testFile();
    $o1 = factory::getInstance("A");
    var_dump($o1);

## 单例模式

在实际应用中，对于某些类在使用它的时候，从程序运行的开始到结束都只需要一个对象就可以完成所有任务。就可以使用单例。  
单例：某个类，只允许其创建出一个对象，即使去进行多次创建，也只能得到一个对象。

    <?php
    class DB{
      public $db = 'mysql';
      
      private static $instance;
      //禁止通过构造方法创建对象（new对象）
      private function __construct(){}
      //禁止通过克隆对象（克隆产生的对象也是新对象）
      private function __clone(){}
      
      public static function getNew(){
        if( !isset(DB::$instance)){
          DB::$instance = new self;
        }
        return DB::$instance;
      }
    }
    $db1 = DB::getNew();
    $db1->db = 'mysql1';
    $db2 = DB::getNew();
    echo $db2->db;//mysql1

# 十七：php 开发

## 二次开发：

在一个成熟（常规业务逻辑实现）的产品上，完成自己项目的特定业务逻辑。

1.  论坛（discuz，phpwind）
2.  电商（ecshop，ecmall，shopex）
3.  内容管理 CMS（dede，wordpress）
4.  社交（ThinkSNS，UCenter Home）

## 基于框架开发：

框架：规范了结构，基础功能，但没有常规业务逻辑实现一种产品。  
（ZendFramework，ThinkPHP，YII，symfony，CI 等等）

## 流程：

1.  配置数据库


    CREATE DATABASE myimg CHARSET=utf8;
    GRANT ALL PRIVILEGES ON myimg.* TO 'myimg'@'%' IDENTIFIED BY '123456';

1.  配置服务器


    <VirtualHost *:80>
        DocumentRoot "C:/wamp/www/myimg"
        ServerName myimg.com
      <Directory "C:/wamp/www/myimg">
        Options FollowSymLinks
        AllowOverride all
        Require all granted
        DirectoryIndex index.php
      </Directory>
    </VirtualHost>
    127.0.0.1       myimg.com

1.  自定义框架


    1.创建单一入口文件
    2.声明路径常量
    3.初始化配置
    4.确定分发参数
    5.当前平台相关的路径常量
    6.注册自动加载
    7.请求分发

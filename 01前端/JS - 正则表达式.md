# 正则表达式

正则表达式，又称规则表达式。（英语：Regular Expression，在代码中常简写为 regex、regexp 或 RE）

## 创建 RegExp 对象

RegExp 对象用于存储检索模式。

    var patt1=new RegExp("e"，"g");//创建对象定义，检索模式为e（查找e这个字符）
    var patt1=/e/g;//直接量定义，检索模式为e（查找e这个字符）

## RegExp 对象的方法

RegExp 对象有 3 个方法：test()、exec() 以及 compile()。
1. test()：检索字符串中的指定值。返回值是被找到的值。如果没有发现匹配，则返回 null。

    //在"The best things in life are free"中查找e，因为这个字符串中存在e所以返回e
    var patt1=new RegExp("e");
    document.write(patt1.exec("The best things in life are free")); 

2.  exec()：检索字符串中的指定值。返回值是被找到的值。如果没有发现匹配，则返回 null。（exec 在全局匹配时会储存匹配到的位，再次执行时会从存储的位置开始匹配）


    //在"The best things in life are free"中查找e，因为这个字符串中存在5个e所以返回eeeeenull
    // g（global）：匹配全部
    var patt1=new RegExp("e","g");
    do
    {
        result=patt1.exec("The best things in life are free");
        document.write(result);
    }
    while (result!=null) 

3.  compile()：改变 RegExp 的检索模式


    //先查找e，再查找d。因为这个字符串中存在e，不存在d所以返回truefalse
    //查找e
    var patt1=new RegExp("e");
    document.write(patt1.test("The best things in life are free"));
    //查找d
    patt1.compile("d");
    document.write(patt1.test("The best things in life are free"));

## RegExp 对象属性

| 属性         | 描述                   | FF  | IE  |
| ---------- | -------------------- | --- | --- |
| global     | RegExp 对象是否具有标志 g。   | 1   | 4   |
| ignoreCase | RegExp 对象是否具有标志 i。   | 1   | 4   |
| lastIndex  | 一个整数，标示开始下一次匹配的字符位置。 | 1   | 4   |
| multiline  | RegExp 对象是否具有标志 m。   | 1   | 4   |
| source     | 正则表达式的源文本。           | 1   | 4   |

## 支持正则表达式的 String 对象的方法

| 方法      | 描述               | FF  | IE  |
| ------- | ---------------- | --- | --- |
| search  | 检索与正则表达式相匹配的值。   | 1   | 4   |
| match   | 找到一个或多个正则表达式的匹配。 | 1   | 4   |
| replace | 替换与正则表达式匹配的子串。   | 1   | 4   |
| split   | 把字符串分割为字符串数组。    | 1   | 4   |

## 修饰符

| 修饰符 | 描述                           |
| --- | ---------------------------- |
| i   | 执行对大小写不敏感的匹配。                |
| g   | 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。 |
| m   | 执行多行匹配。                      |

## 方括号（用于查找某个范围内的字符）

| 表达式                  | 描述                   |
| -------------------- | -------------------- |
| `[abc]`              | 查找方括号之间的任何字符。        |
| `[^abc]`             | 查找任何不在方括号之间的字符。      |
| `[0-9]`              | 查找任何从 0 至 9 的数字。     |
| `[a-z]`              | 查找任何从小写 a 到小写 z 的字符。 |
| `[A-Z]`              | 查找任何从大写 A 到大写 Z 的字符。 |
| `[A-z]`              | 查找任何从大写 A 到小写 z 的字符。 |
| `(red\|blue\|green)` | 查找任何指定的选项。           |

方括号里放 $ 不会匹配结尾要用《|》，eg：匹配 test 后面加《: 或 / 或? 或结尾》`test[\:\/\?]|$`

## 元字符（Metacharacter，是拥有特殊含义的字符

| 元字符     | 描述                            |
| ------- | ----------------------------- |
| .       | 查找单个字符，除了换行和行结束符。             |
| \\w     | 查找单词字符。                       |
| \\W     | 查找非单词字符。                      |
| \\d     | 查找数字。                         |
| \\D     | 查找非数字字符。                      |
| \\s     | 查找空白字符。                       |
| \\S     | 查找非空白字符。                      |
| \\b     | 匹配单词边界。                       |
| \\B     | 匹配非单词边界。                      |
| \\0     | 查找 NUL 字符。                    |
| \\n     | 查找换行符。                        |
| \\f     | 查找换页符。                        |
| \\r     | 查找回车符。                        |
| \\t     | 查找制表符。                        |
| \\v     | 查找垂直制表符。                      |
| \\xxx   | 查找以八进制数 xxx 规定的字符。            |
| \\xdd   | 查找以十六进制数 dd 规定的字符。            |
| \\uxxxx | 查找以十六进制数 xxxx 规定的 Unicode 字符。 |

## 量词

| 量词     | 描述                      |
| ------ | ----------------------- |
| n+     | 匹配任何包含至少一个 n 的字符串。      |
| n\*    | 匹配任何包含零个或多个 n 的字符串。     |
| n?     | 匹配任何包含零个或一个 n 的字符串。     |
| n{X}   | 匹配包含 X 个 n 的序列的字符串。     |
| n{X,Y} | 匹配包含 X 至 Y 个 n 的序列的字符串。 |
| n{X,}  | 匹配包含至少 X 个 n 的序列的字符串。   |
| n$     | 匹配任何结尾为 n 的字符串。         |
| ^n     | 匹配任何开头为 n 的字符串。         |

## 捕获

| 捕获    | 描述                                       |
| ----- | ---------------------------------------- |
| (x)   | 匹配'x' 并且记住匹配项。                           |
| (?:x) | 匹配接指定字符串 x 但是不记住匹配项（不在结果数组中单独将这个括号作为一项）。 |

    <!DOCTYPE html>
    <script>
    var test = 'this are some test text';
    console.log(test.match(/(te)(?:st)/));
    //[ 'test', 'te', index: 14, input: 'this are some test text' ]
    //(te)被捕捉了（结果数组第二项：test中的te被捕获），(?:st)没有被捕捉（结果数组中没有）
    //
    </script>

## 预查

| 预查 | 描述 |
| (?=x) | 匹配任何其后紧接指定字符串 x 的字符串（正向肯定查找）。 |
| (?!x) | 匹配任何其后没有紧接指定字符串 x 的字符串（正向否定查找）。 |

貌似 ES7 要支持**反向预查**，先用括号代替吧

    <!DOCTYPE html>
    <script>
    var test = 'this are some test text';
    console.log(test.match(/te(st.*)/));
    console.log('反向预查：'+test.match(/te(st.*)/)[1]);
    /*
    [ 'test text',
      'st text',
      index: 14,
      input: 'this are some test text' ]
    反向预查：st text
    */
    </script>

正向预查使用情况：预查结尾的条件，预查的条件不纳入匹配结果，预查条件不影响《当前匹配位置指针》 
eg：找出所有的 \\&lt;h1 > 到下个 \\&lt;h1 > 的内容

    <!DOCTYPE html>
    <h1></h1>
    <h2></h2>
    <p></p>
    <h2></h2>
    <p></p>
    <pre><code></code></pre>

    <h1></h1>
    <h2></h2>
    <p></p>

    <h1></h1>
    <h2></h2>
    <pre><code></code></pre>

    <h1></h1>
    <h2></h2>
    <script>
    var body = document.getElementsByTagName('body');
    var testhtml = body[0].innerHTML;
    //script本身在body中，script的代码也被匹配
    console.log(testhtml.match(/<h1>([\s\S]*?)(?=<h1>)/g));
    </script>

## 匹配结果

| 属性        | 含义                 |     |
| --------- | ------------------ | --- |
| `$1...$9` | 如果它 (们) 存在，是匹配到的子串 |     |
| `$_`      | 被匹配的串              |     |
| `$*`      | 是否进行多行匹配 (bool 型)  |     |
| `$&`      | 最后一次匹配的索引          |     |
| `$+`      | 最后一个括号括起来的子串       |     |
| $\`       | 最近一次匹配以左的子串        |     |
| `$'`      | 最近一次匹配以右的子串        |     |

    var test = 'this are some test text';
    document.write(test.replace(/(this).*?(text)/, "\$1 = $1,\$2 = $2,\$_ = $_,\$* = $*,\$& = $&,\$+ = $+,\$` = $`,\$' = $'"));

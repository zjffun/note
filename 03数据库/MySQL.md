# 一：mysql基础
## 数据库存储的本质是文件存储  
1. mysql数据库的数据存放在安装目录的data目录下（eg：C:\wamp\bin\mysql\mysql5.6.17\data）
2. 每个库是一个以库名为文件夹名的文件夹
3. 每个库有db.opt文件
4. 每张表有.frm文件，MyISAM存储引擎的表还有.MYD和.MYI文件

## 关系数据库常见术语
- 数据：data
- 数据库：database
- 数据库管理系统dbms（就是oracle，mysql等产品）：database management system
- 表：table
- 字段：field，列：column
- 记录：record，行：row

## 数据库操作的基本模式
1. 建立连接（认证身份）
1. 客户端向服务器端发送sql命令
1. 服务器端执行命令，并返回执行的结果
1. 客户端接收结果（并显示）
1. 断开连接

## 启动/停止mysql服务
- window：  
命令行模式：net start/stop mysql
桌面模式：控制面板->管理工具->服务->mysql->启动/停止
- linux：  
service mysqld start/stop/restart

## 登录/退出mysql
登录：```mysql [-h服务器地址] -u登录名 -P端口号 -p```或```mysql [--host=服务器地址] --user=用户名 --port=端口 --password```  
退出：```quit; 或 exit;```

## 备份/恢复数据库
备份：```mysqldump -h服务器地址 -u登录名 -p密码 [--default-character-set=utf8] [--hex-blob] 要备份的数据库名 > 要保存到的文件```  
--default-character-set=utf8：设置默认字符集为utf8  
--hex-blob：导出blob字段时不加这个参数会可能会错。（eg：用sublime打开保存一下再进行导入就会报"Unknown command '\\\\'."等错）  

恢复：
- ```mysql -h服务器地址 -u登录名 -p密码 [--default-character-set=utf8] 数据库名 < 存有sql语句的文件```  
--default-character-set=utf8：设置默认字符集为utf8  
- 登录后执行```source 存有sql语句的文件路径;```  （window直接将文件托过去路径是反斜杠分隔，比较深的路径会解释成转义导致无法导入数据库。这时将反斜杠换成正斜杠，或将sql文件移动到前路径就行。）


## 注释
单行注释： ```#注释内容```或```-- 注释内容```（注意，两个“--”之后有一个空格）
多行注释： ```/*注释内容*/```

## 语句结束符
默认是";",自定义用delimiter
```
delimiter /
show databases /
```
## mysql数据库命名规则
mysql本身不区分大小写。
但在某些区分大小写的操作系统中，数据库名和表名会区分大小写。
推荐使用“下划线命名法”来对各种标识符命名：单词都用小写字母，单词之间用“_”分开。

# 二：数据类型
### 整数类型
tinyint(1字节)，smallint(2字节)，mediumint(3字节)，int(4字节)，bigint(8字节)
在32位系统中：int都是4（32/8）字节  
1字节(byte)=8位(bit)  

### 小数类型
float，double，decimal  
单精度浮点型：float，非精确数，通常不设定长度  
双精度浮点：double，非精确数，通常不设定长度  
定点型：decimal，精确数，通常定点型需要设定长度，形式为：decimal(总长, 小数位数)  

### 时间日期类型
date，time，datetime，year，timestamp  
写入数据库时，直接的时间日期数据，应该用单引号引起  
| 日期时间类型 | 占用空间 | 日期格式 | 最小值 | 最大值 | 零值表示 |
| --- | --- | --- | --- | --- | --- |
|  DATETIME |  8 bytes |  YYYY-MM-DD HH:MM:SS |  1000-01-01 00:00:00 | 9999-12-31 23:59:59 | 0000-00-00 00:00:00 |
|  TIMESTAMP |  4 bytes |  YYYY-MM-DD HH:MM:SS |  19700101080001 | 2038 年的某个时刻 | 00000000000000 |
|  DATE |  4 bytes |  YYYY-MM-DD | 1000-01-01 | 9999-12-31 | 0000-00-00 |
|  TIME |  3 bytes |  HH:MM:SS |  -838:59:59 | 838:59:59 | 00:00:00 |
|  YEAR |  1 bytes |  YYYY | 1901 | 2155 | 0000 |
timestamp（时间戳）：其实就是指当前时刻，本质上是一个数字，代表从1970年1月1日0点0分0秒到某个时间之间的秒数数值。该类型的字段值无需赋值，而是会自动取得当前时间值(*1970年以前的日期没法表示，所以生日不能用)  
- TIMESTAMP值显示尺寸

| 列类型　　　　| 显示格式　　　 |
| ------------  | -----------    |
| TIMESTAMP(14) | YYYYMMDDHHMMSS |　
| TIMESTAMP(12) | YYMMDDHHMMSS　 |
| TIMESTAMP(10) | YYMMDDHHMM　　 |
| TIMESTAMP(8)　| YYYYMMDD　　　 |
| TIMESTAMP(6)　| YYMMDD　　　　 |
| TIMESTAMP(4)　| YYMM　　　　　 |
| TIMESTAMP(2)　| YY　　　　　　 |
==虽然你建表时定义了列TIMESTAMP(8)，但在你进行数据插入与更新时TIMESTAMP列实际上保存了14位的数据（包括年月日时分秒），只不过在你进行查询时MySQL返回给你的是8位的年月日数据。如果你使用ALTER TABLE拓宽一个狭窄的TIMESTAMP列，以前被“隐蔽”的信息将被显示。==  
==default可以设置成NOW()或CURRENT\_TIMESTAMP（当前日期时间），但不能是UNIX\_TIMESTAMP()(当前时间戳)==

### 字符串类型
varchar，char  
varchar类型：可变长度字符串类型。最多能存储65532个字节的字符串（还要考虑字符编码）。设定的长度只是最长长度，但可以不存满，则实际长度以数据长度为准。
char类型：定长字符串类型。最多能存储256个字符。如果存储的数据不足设定的长度，则会自动补空格填满。

### 二进制文本类型
binary，varbinary
binary：类似char，只是里面不存“文本”，而是存文本的二进制数据  
varbinary: 类似varchar，同样，不存“文本”，而是存文本的二进制数据  

### 大文本类型
text，blob
text：可以存储超大文本，且其实际的长度并不占用一行的长度。相对char和varchar，效率低。
blob：可以存储超大二进制文本，通常用于存储图片这种二进制数据

### 选项类型
enum，set
enum：专门用于方便存储类似表单中的单选项的值。enum('选项1','选项2','选项3'......)
这些选项的值虽然是字符串，但其数据库内部存储其实是数字（效率高），他们对应的数字值是：1，2，3，4，5，。。。。。最多6万多个
```
CREATE TABLE enum_test(
test ENUM('option1', 'option2', 'option3')
);
INSERT INTO enum_test(test) VALUES('option1');
INSERT INTO enum_test(test) VALUES(3);
SELECT * FROM enum_test;#1,3;
```
set：专门用于方便存储类似表单中的多选项的值。
这些选项的值虽然是字符串，但其数据库内部存储其实是数字（效率高），他们对应的数字值是：1，2，4，8，16，。。。。。最多6万多个
```
CREATE TABLE set_test(
test SET('checkbox1', 'checkbox2', 'checkbox3')
);
INSERT INTO set_test(test) VALUES('checkbox1,checkbox2');#逗号后别加空格。eg：checkbox1, checkbox2会解析成checkbox1和 checkbox2，只插入checkbox1。
INSERT INTO set_test(test) VALUES(6);
SELECT * FROM set_test;#12,23
```

# 三：SQL语句
## 数据定义语句
1. 数据库定义：CREATE DATABASE [IF NOT EXISTS] 数据库名 [CHARSET  字符集]  [COLLATE  字符排序规则]；  
IF NOT EXISTS：用于判断是否存在该数据库名，如果存在则不执行该语句  
字符集： 意图数据存储到本数据库中的时候所使用的字符编码名称，通常utf8，也可以gbk。  
字符排序规则：通常不设置，而是使用所设定的字符集的默认规则（每个字符集都有默认的排序规则）
```
CREATE DATABASE mytest;
show charset;#显示可用字符集  
show collation;#显示可用排序规则  
```
2.修改数据库
ALTER DATABASE 数据库名 CHARSET=新字符集 COLLATE=新校对集;
```
ALTER DATABASE mytest CHARSET=utf8 COLLATE=utf8_bin;
show create database mytest;#查看创建数据的语句
```
3.删除数据库
DROP DATABASE 数据库名
```
DROP DATABASE mytest;
```
## 表定义语句
### 创建表
```
create table [if not exists] 表名(字段列表, [约束或索引列表])[表选项列表];
```
#### 字段属性设置：  
1. not null：不为空，表示该字段不能放null这个值默认是可以为空  
1. auto_increment：设定int类型字段的值可以自增长，即其值无需写入，而会自动获得并增加。此属性必须随同 primary key 或 unique key 一起使用  
1. [primary] key：设定为主键。是唯一键加强：也不能重复并且不能使用null，并且可以作为确定任意一行数据的关键值（一个表只能设定一个主键）  
1. unique [key]：设定为唯一键：表示该字段的所有行的值不可以重复（唯一性）  
1. default：默认值  
1. comment：字段注释  

#### 索引设置：
索引是一个“内置表”，该表的数据是对某个真实表的某个（些）字段的数据做了“排序”之后的存储形式  
索引极大提高表查找数据的速度（其速度可以匹敌二分查找），但会降低增删改的速度  
1. 普通索引：key(字段名1,字段名2,...)：它只具有索引的基本功能-提速
1. 唯一索引：unique key(字段名1,字段名2,... )
1. 主键索引：primary key(字段名1,字段名2,... )
1. 全文索引：fulltext(字段名1,字段名2,... )

show full fields from $table_name后
1. PRI：主键索引
1. UNI：唯一索引
1. MUL：外键索引

#### 约束设置：
约束就是一种限定数据以符合某种要求的形式  
1. 主键约束：primary key(字段名1,字段名2,... )
1. 唯一约束：unique key(字段名1,字段名2,... )
1. 外键约束：foreign key(字段名1,字段名2,... ) references 表名2(字段名1,字段名2,... )  
对某个（些）字段设定外键，则其相对应的其他表的对应字段需要设置为主键。
1. 非空约束：就是要求该字段的值不能为空，其只能在字段上当作字段属性来设定
1. 默认约束：就是要求该字段的值在“空”的时候会自动填充该设定的默认值，也只能字段上设定
1. 检查约束：就是使用一个表达式（逻辑判断）来决定数据是否有效，比如年龄字段，可以使用tinyint
mysql不支持检查约束的语法和功能

#### 表选项：
表选项就是对一个表的有关属性的设定，通常都不需要。如果不设定，则有其默认值。    
1. comment = '表的注释';  	
1. charset = 字符编码名称;  
字符编码设定的范围及继承关系：  
系统级设定：安装时确定了->库级设定：建库时设定->表级设定：就是这里的charset = 字符编码名称->字段级设定：作为字段属性出现。  
他们都只对“字符类型”的字段有效。每一级如果没有设定，就会“继承使用”其上一级的设定。  
1. auto_increment = 起始整数;  
自增长类型值的初值，默认是1  
1. engine = 表的存储引擎名;  
存储引擎就是将数据存入硬盘（或其他媒介）的方式方法。默认是InnoDB  
存储引擎决定一个数据表的各方面的信息：功能和性能  

```
CREATE TABLE IF NOT EXISTS test2_table(
 id INT AUTO_INCREMENT NOT NULL COMMENT 'ID',
 PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS test_table(
 id INT AUTO_INCREMENT NOT NULL COMMENT 'ID',
 field1 FLOAT DEFAULT 22.33,
 field2 VARCHAR(20),
 field3 INT,
 PRIMARY KEY(id),
 UNIQUE KEY(field1),
 KEY(field2),
 FOREIGN KEY(field3) REFERENCES test2_table(id)
)COMMENT = '注释',ENGINE = MyISAM,AUTO_INCREMENT = 1000;
```
### 修改表
alter table 表名 修改语句1, 修改语句2,...
#### 字段
增加：ALTER TABLE 表名 ADD 字段名 字段类型 字段属性  
修改：ALTER TABLE 表名 CHANGE 原字段名 新字段名 新字段类型 新字段属性  
      ALTER TABLE 表名 ALTER 字段名 SET DEFAULT 默认值  
      ALTER TABLE 表名 ALTER 字段名 DROP DEFAULT  
删除：ALTER TABLE 表名 DROP 字段名  
```
CREATE TABLE IF NOT EXISTS test(
 id INT AUTO_INCREMENT NOT NULL COMMENT 'ID',
 PRIMARY KEY(id)
);
ALTER TABLE test ADD COLUMN test FLOAT DEFAULT 22.33;
ALTER TABLE test CHANGE COLUMN test new_test FLOAT DEFAULT 22.33;
ALTER TABLE test DROP COLUMN new_test;
```
#### 索引
增加：ALTER TABLE 表名 ADD INDEX()/PRIMARY KEY()/FOREIGN KEY()/UNIQUE()  
删除：ALTER TABLE 表名 DROP INDEX 索引名/PRIMARY KEY/FOREIGN KEY 外键名  
```
DROP TABLE test;
CREATE TABLE IF NOT EXISTS test(
 id INT AUTO_INCREMENT NOT NULL COMMENT 'ID',
 test INT,
 PRIMARY KEY(id)
);
ALTER TABLE test ADD INDEX test_index(test);
ALTER TABLE test DROP INDEX test_index;
```
#### 表属性
ALTER TABLE 表名 RENAME [TO] 新表名  
ALTER TABLE 表名 选项名1=选项值1, 选项名2=选项值2, 选项名3=选项值3,...  
```
CREATE TABLE IF NOT EXISTS test(
 id INT AUTO_INCREMENT NOT NULL COMMENT 'ID',
 PRIMARY KEY(id)
);
ALTER TABLE test RENAME TO test2;
ALTER TABLE test2 CHARSET=utf8;
```
### 删除表
drop table [if exists] 表名;

### 查询表
#### 查询表属性：  
show table status;（用show tables查询查不到表具体信息）

#### 查询表字段属性：  
show full columns from 表名;
或，show full fields from 表名;（用desc查询查不到权限和字段注释）

#### 查询建立表语句：
show create table 表名;

### 复制表
方法1：这种方法可以比较完整。  
create table tab2 like tab1;//复制结构  
insert into tab2 select * from tab1;//复制数据

方法2：这种方法可能会丢一些结构信息，比如：索引，约束，自增长属性  
create table tab2 select * from tab1; //同时复制结构和数据


## 其他操作语句
显示表的创建语句: show create table 表名  
从已有表复制表结构：create table [if not exists] 新表名 like 原表名  
从已有表复制表结构：create table [if not exists] 新表名 select * from 原表名 where 1<>1（不推荐）  

## 数据操作语言（DML）
### 插入
1. insert into  表名(字段名1,字段名2,... ) values(值a1,值a2,...), (值a1,值a2,...),...;
1. insert into  表名(字段名1,字段名2,... ) select 字段名1,字段名2,... from 表名2;
1. insert  into  表名  set  字段名1=值1, 字段名2=值2,...;  
1. load data infile '文件完整路径' into table 表名;
说明:  
形式1和形式2，可以一次插入多条数据  
形式4的数据必须和表的结构一样  
数字直接写，字符串和时间加单引号，但如果是函数值则不能加引号  
有的字段通常无需插入数据，此时不应该出现该字段名：auto_increment， timestamp  

### 删除
delete from 表名 [where条件] [order排序] [limit限定];
truncate [table] 表名;（删除整个表的数据和结构并重新创建该表，自增列重新计算）
说明: 
删除语句中where条件通常都要写上，如果不写则就删除了所有数据（应用中极少如此）  
order排序子句用于设定删除数据的先后顺序  
limit限定子句用于限定在设定的顺序情况下删除指定的某些行  

### 修改
update 表名 set 字段名1=值表达式1, 字段名2=值表达式2,...[where条件] [order排序] [limit限定];
说明:   
where条件子句在应用中几乎都必须有，没有就修改了所有数据  
order排序子句用于设定删除数据的先后顺序  
limit限定子句用于限定在设定的顺序情况下删除指定的某些行  
字段的值可以是表达式，或直接值，或函数。同样遵循insert语句中字段的值的写法  

## 数据查询语言（DQL）
### 基本查询
select [all | distinct] 字段或表达式列表 [from子句] [where子句] [group by子句] [having子句] [order by子句] [limit子句];
说明: 
作用是从数据源中找出一定的数据，并作为该语句的返回的数据源（数据集）
数据源就是表，但也可以没有数据源，而是使用直接数据或函数执行结果

#### [all | distinct]
用于设定所select出来的数据是否允许出现重复行（完全相同的数据行）  
all：允许出现重复行（默认）  
distinct：不允许出现重复行  

#### from子句
就是指定数据的来源，可以是表，用其他查询语句返回的结果表和多张表

#### where子句
相当于php或js中的if条件语句，其最终结果就是布尔值（true/false）  
where true, where 1; where 1=1;都表示true  
where false, where 0; where 1<>1;都表示false  

where中可用的运算符：  
算术运算符：+，-，*，/，%  
比较运算符：>，>=，<，<=，=，<>，==（mysql扩展），!=（mysql扩展）  
逻辑运算符：and，or，not  

布尔值的判断方式：（实际应用中，布尔值判断很少用，因为可以直接使用数学大小。）  
布尔值：本质上，布尔值只是一位整数的“别名”，0表示false，非0表示true。  
判断为true：XX is true  
判断为fale：XX is false  
XX应该是一个字段名，且其类型应该是一个整数。  

空值的判断方式：  
判断为null：XX is null  
判断为非空：XX is not null  
XX应该是一个字段名  

between语法：  
XX between 值1 and 值2;  
XX应该是一个字段名  

in语法：  
XX in(值1,值2,...);  
XX应该是一个字段名  

like语法（模糊查找）：
XX like '要查找字符';  
XX应该是一个字段名  
%：代表任意个数任意字符（不是字节）  
_：代表一个任意字符（不是字节）  

#### group by子句
group by 字段1 排序方式1, 字段2 排序方式2,...  
通常都只进行一个字段的分组。  
分组就是将数据以某个字段的值为依据，分到不同的组别里。  

分组的结果通常：
1. 数据结果只能是组，没有数据本身的个体  
1. 数据结果就可能丢失很多特性  
1. 结果中通常只剩下组作为整体的信息。（组内成员的个数，某些字段的最大值，最小值，平均值，总和值。其他字段，通常就不能用了。）  
1，2个字段或以上分组，则其实是相当于对前一分组的组内，再进行后一依据的分组。  

在分组查询中，基本都依赖于一下几个函数（聚合函数，统计函数）：  
- count(\*):  统计一组中的数量，默认会统计null（count(1)效率更高，count(字段名)不会统计null）
- max(字段名)：获取该字段中在该组中的最大值。  
- min(字段名)：获取该字段中在该组中的最小值。  
- sum(字段名)：获取该字段中在该组中的总和。  
- avg(字段名)：获取该字段中在该组中的平均值。  
- group_concat(字段名)：该函数返回带有来自一个组的连接的非NULL值的字符串结果。

##### count查询某字段某一条件的的总数： 
1. ```select count(sub_type) from table where table.sub_type='type’;```
最简单的方法，但个查询只能统计一个子类
1. ```select count(if(table.sub_type='type',1,0)) count1 count(if(table.sub_type='type',1,0)) count2 from table;```
使用if判断，可统计多个子类
1. ```select count(table.sub_type='type' or null) count1 count(table.sub_type='type' or null) count2 from table;```
使用or，可统计多个子类（sub\_type='type'的，其余的都返回null,count(列名)时是不会统计null的个数的）


#### having子句
having子句其实概念跟where子句完全一样  
where是针对"表的字段的值"进行条件判断  
having是针对"groupby之后的组数据"进行条件判断  

#### order by子句
order by 排序字段1 [排序方式]， 排序字段2 [排序方式],...  
对数据集按指定按某个字段的大小进行排列（排序），排序只有2种方式：  
ASC：正序（默认值）  
DESC：倒序  
如果指定多个字段排序（虽然不常见），则其含义是，在前一个字段排序中相同的那些数据里，再按后一字段的大小进行指定的排序。  
##### 进阶：
1. 指定排序顺序：ORDER BY FIELD(字段名,值1,值2,值3,...)


#### limit子句
形式：
limit [起始行号start], 要取出的行数num  
取得数据集局部连续的若干条数据  
起始行号：可以省略，为默认行号0（尽量不用，很影响性能）  
要取出的行数：如果结果集中从指定的行号开始到最后没有这么多行，则就只取到最后  

### 连接查询
from 表1 [连接方式] join 表2 [on 连接条件];  
连接就是指两个或2个以上的表（数据源）连接起来成为一个数据源  
==注意：==  
- on条件：连接查询的on条件如果有','，并且没有找到匹配的项。会将逗号前的内容进行匹配查找
eg：连接表有r\_id为2的，主表连接的r\_id为2,1。则on 主表.r\_id = 连接表.r\_id，2,1 = 2会匹配出来。

==连接查询过程：==
1. 对两张表执行笛卡尔积运算形成一个结果集合。
2. ON按条件，对上边的结果集，进行筛选，形成新的结果集。
3. （左右全外连接）会对未匹配到的结果补上null。
4. 如果存在多张表，重复1~3过程。


#### 交叉连接
from 表1 [cross] join 表2;（交叉连接没有on条件）  
cross这个词也可以省略，还可以使用inner这个词代替
#### 内连接
from 表1 [inner] join 表2 on 表1.字段1=表2.字段2;  
找出（过滤）在交叉连接的结果表中的表1的字段1的值等于表2的字段2的值的那些行
#### 左[外]连接
from 表1 left [outer] join 表2 on 表1.字段1=表2.字段2  
在内连接的结果基础上，加上左边表中所有不符合连接条件的数据，相应本应放右边表的字段的位置就自动补为“null”值。
#### 右[外]连接
from 表1 right [outer] join 表2 on 表1.字段1=表2.字段2  
在内连接的结果基础上，加上右边表中所有不符合连接条件的数据，相应本应放左边表的字段的位置就自动补为“null”值。
#### 全[外]连接（mysql中其实不认识全[外]连接语法）
from 表1 full [outer] join 表2 on 表1.字段1=表2.字段2  
内连接的结果，加上左表中不满足条件的所有行（右边对应补null），再加上，右表中不满足条件的所有行（左边对应补null）。


### 子查询
selelct 字段或表达式或(子查询1) [as 别名] from 表名或(子查询2) [as 别名] where 字段或表达式或(子查询3)的条件判断
在一个select查询语句中又出现了select查询语句，此时就称后者为“子查询”，前者就是“主查询”  
==注意：==  
- 子查询中无法访问主查询字段（也就是子查询可以有和主查询相同的表，并且用表.字段时访问的是子查询中的字段）
eg：可以使用（子查询主查询都用了test.id并且不会有歧义）```select test.id from test left join (select test.id id from test) as child_test on test.id = child_test.id;```

#### 子查询按结果分类
- 表子查询 ： 一个子查询返回的结果理论上是“多行多列”的时候。此时可以当做一个“表”来使用，通常是放在from后面
- 行字查询 ： 一个子查询返回的结果理论上是“一行多列”的时候。此时可以当做一个“行”来使用，通常放在“行比较语法”中
- 列子查询 ： 一个子查询返回的结果理论上是“多行一列”的时候。此时可以当做“多个值”使用
- 标量子查询：一个子查询返回的结果理论上是“一行一列”的时候。此时可以当做“一个值”使用

#### 子查询按使用场合分类
- 作为主查询的结果数据：select column1,(select column1 from table2) as tb2_col1 from table1;
这里子查询应该只有一个数据（一行一列，标量子查询）
这种子查询中where条件可是table1中的字段。eg（where t1_id = table1.id）
- 作为主查询的条件数据：select column1 from table1 where column1 in (select column1 from table2);
#这里子查询可以是多个数据（多行一列，列子查询，以及标量子查询）
- 作为主查询的来源数据：select column1 from (select column1, column2 from table2) as tb2;
#这里子查询可以是任意查询结果（表子查询）

#### in子查询
where 操作数 in(列子查询);  
表示该操作数等于该子查询的其中任意一个只，就算满足条件
#### any子查询
where 操作数 比较运算符 any (列子查询);  
表示该操作数的值只要跟列子查询的任意一个值满足给定的比较运算，就算满足了条件
#### all/some子查询
where 操作数 比较运算符 all/some (列子查询);  
该操作数的值必须跟列子查询的所有值都满足给定的比较运算，才算满足了条件
#### exists的子查询（尽量少用）
where exists (子查询);  
如果要查询的字段在子查询中返回true
#### not exists子查询（尽量少用）
where not exists (子查询);  
如果要查询的字段在不子查询中返回true

### 联合查询
联合查询就是将两个select语句的查询结果“层叠”到一起成为一个结果。  
两个查询结果的能够进行“联合”的先觉条件是：结果字段数相等。  
(select语句1) union [ALL | DISTINCT] (select 语句2) [order by排序] [limit限定];

## 数据控制语言（DCL）
mysql中，权限是系统内定的一些名词，大约30个，每个权限表示可以做什么工作。　
分配权限就是相当于让某个用户可以做哪些工作。
创建用户或分配权限后必须刷新权限：```flush privileges;```  

### 创建用户
create user '用户名'@'允许其登录的地址' identified by '密码';
说明：
1. 创建的用户需同时指定该用户可以在哪个地址进行登录。其中'%'代表任何地址。   
（有时%不代表localhost，这时需要对localhsot单独进行创建``` GRANT ALL ON 库.* to '用户'@'localhost' IDENTIFIED BY '密码';```）
2. 用户创建之后，自动在mysql的user表中添加了一条记录，但该用户还没有权限。

### 删除用户
drop user '用户名'@'允许其登录的地址';

### 修改用户密码
- 修改自己密码：set password = password('新密码');
- 修改他人密码（必须有修改权限）：set password for '用户名'@'允许其登录的地址' = password('新密码');

### 权限分配
增加权限：  
grant 权限名1, 权限名2,... on 数据库名.对象名 to '用户名'@'允许其登录的地址' identified by '密码';  
说明：  
1. 权限名就是：select，update，delete等等。其中ALL表示“所有权限”，或all privileges也一样
2. 对象名：就是一个数据库中“装”的东西，表是最常见的，也可以是视图，存储过程，存储函数等。其中：*.*表示所有数据中的所有对象
某数据库名．*表示该数据库中的所有对象——这个商业上常用。
3. identified by '密码'用于给一个用户在此时修改密码，不写也可以，那就不修改密码。
4. 同时该语句也可以创建用户（如果不存在），此时identified by '密码'必须写。

删除权限：  
revoke 权限名1,权限名2,... on 数据库名.对象名 from '用户名'@'允许其登录的地址';  
表示从某个用户身上“取消”某些权限（也许还保留了其他权限）。

### mysql用户表
mysql用户表位于mysql库下，eg：`select host, user from mysql.user;`


## 事务控制语言（DTL）
“事务”是一种可以保证“多条语句一次性执行完成”或“一条都不执行”的机制。
### 事务的特点
1. 原子性：一个事务中的所有语句，应该做到：要么全做，要么一个都不做；
1. 一致性：让数据保持逻辑上的“合理性”，比如：一个商品出库时，既要让商品库中的该商品数量减1，又要让对应用户的购物车中的该商品加1；
1. 隔离性：如果多个事务同时并发执行，但每个事务就像各自独立执行一样。
1. 持久性：一个事务执行成功，则对数据来说应该是一个明确的硬盘数据更改（而不仅仅是内存中的变化）。

### 事务模式
事务模式：让每条执行语句是否当作“一个事务”来看到的设定项。  
mysql默认安装好之后，其事务模式是：一条语句当作一个事务。  
`set autocommit = 0;//false`，关闭自动提交模式，即此时不再是一条语句一个事务了必须使用commit语句才能够生效。  

### 事务的基本实现流程
1. 声明事务开始:START TRANSACTION;
2. 设定多条要执行的具体语句
3. 判断是否需要执行该些语句（COMMIT;或ROLLBACK;）

# 四：mysql自带函数
## 字符串函数
1. 在以','分隔的条件中查找：```FIND_IN_SET(要找的字符串,被寻找的字符串)```
FIND\_IN\_SET函数默认是以符号','为分割符的
2. 替换字符：```REPLACE(要替换的字符串,'被替换的字符','替换的字符')```

## 时间函数
1. FROM_UNIXTIME(time,'%Y年%m月%d')：将时间戳转换为日期时间类型
1. UNIX_TIMESTAMP('2009-08-06')：将日期时间转换为时间戳类型


# 四：mysql编程
## 基本语法形式
在mysql编程中，begin....end;基本代替了原来编程语句中的{...}语法。
但又有所区别：
一个bigin...end;块，可以给定一个“标识符”，并且可以使用leave语句来“退出”该语句块。
## 基本流程控制语句
if语句
case语句
while循环语句

### 变量
有两种环境：  
- 常规mysql命令环境：可以执行增删改查等
- 编程环境：其实就是在特定的语句语法内部：存储过程内，存储函数内，触发器内。

两种变量：  
- 普通变量：不带@符，直接写名字，必须先声明，后使用（赋值之类），只能用于编程环境
普通变量的声明语法：declare 变量名 变量类型 [default 初始值]
- 会话变量：带@符，无需声明，直接使用（先赋值），可以用于命令和编程种环境。

变量的赋值语法：
1. set 变量名 = 表达式;#此语法中的变量必须先使用declare声明
2. set @变量名 = 表达式; #此方式可以无需declare语法声明，而是直接赋值，类似php定义变量并赋值
3. select @变量名 := 表达式;#此语句会给该变量赋值，同时还会作为一个select语句输出“结果集”
4. select 表达式 into @变量名;#此语句虽然看起来是select语句，但其实并不输出“结果集”，而只是给变量赋值

### 存储函数()
CREATE FUNCTION 存储函数名(形参1 类型1, 形参2 类型2,...)
RETURNS 返回类型
BEGIN
要执行的代码
RETURN XX;
END;
### 存储过程
CREATE PROCEDURE 存储过程名([IN|OUT|INOUT]形参1 类型1, ([IN|OUT|INOUT]形参2 类型2,...)
BEGIN
要执行的代码，增加删除修改查询语句。
END;
### 触发器
触发器其实是预先定义好的一段代码。该段代码无需人工调用，而是会在‘预计’好的某个情形下自动执行。
通常就这几个情形：对某个数据表的增（或删或改）之前（或之后）。一共6种
CREATE TRIGGER 触发器名字 BEFORE（或AFTER）INSERT（或UPDATE或DELETE）ON 表名 FOR EACH ROW 
BEGIN
要执行的代码，但这里也不能使用SELECT语句。
END;

# 四：视图
- 创建：create view 视图名[(列名1, 列名2,...)] as select语句;
- 修改：alter view 视图名[(列名1, 列名2,...)] as select语句;
- 删除：drop view [if exists] 视图名;
- 使用：跟用表一样

# 五：数据库（数据表）的设计思想
3范式（3NF）  
第一范式（1NF）原子性：一个字段不存两类数据  
第二范式（2NF）唯一性：非主键字段完全依赖于主键字段（别一张表里两行数据才能确定一个信息）  
第三范式（3NF）独立性：每张表只存一种数据（减少冗余）  
## 字段类型设计
1. IP地址：int unsigned  
IP转数字：inet_aton('127.0.0.1')
数字转IP：inet_ntoa('2130706433')
```
select inet_aton('127.0.0.1');#2130706433
select inet_ntoa('2130706433');#127.0.0.1
```

# 六：技巧
## 设置自增编号
方法1：

```
select (@i:=@i+1) as i,tablename.* from tablename,(select @i:=0) as table1;
```
方法2：

```
set @rownum=0;  
select @rownum:=@rownum+1 as rownum, tablename.* from tablename;
```

# 七：乱码处理
## 是否执行：```mysqli_query($link, 'SET NAMES utf8');```  
执行```SET NAMES utf8```的效果等同于同时设定如下：
```
SET character_set_client='utf8';
SET character_set_connection='utf8';
SET character_set_results='utf8';
```
php执行```mysqli_query($link, 'CHARSET utf8');```还是会乱码（dos下执行CHARSET不会乱码，并且和SET NAMES utf8一样改变了client,connection,results）。

## 主要检查：
1. table编码
1. database编码
1. client编码
1. server编码
1. connection编码

```
mysql> show variables like '%character%';

character_set_client     
character_set_connection
character_set_database
character_set_filesystem
character_set_results
character_set_server
character_set_system
character_sets_dir
```








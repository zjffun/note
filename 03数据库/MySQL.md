# 一：mysql 基础

## 数据库存储的本质是文件存储

1.  mysql 数据库的数据存放在安装目录的 data 目录下（eg：C:\\wamp\\bin\\mysql\\mysql5.6.17\\data）
2.  每个库是一个以库名为文件夹名的文件夹
3.  每个库有 db.opt 文件
4.  每张表有. frm 文件，MyISAM 存储引擎的表还有. MYD 和. MYI 文件

## 关系数据库常见术语

-   数据：data
-   数据库：database
-   数据库管理系统 dbms（就是 oracle，mysql 等产品）：database management system
-   表：table
-   字段：field，列：column
-   记录：record，行：row

## 数据库操作的基本模式

1.  建立连接（认证身份）
2.  客户端向服务器端发送 sql 命令
3.  服务器端执行命令，并返回执行的结果
4.  客户端接收结果（并显示）
5.  断开连接

## 启动 / 停止 mysql 服务

-   window：

    命令行模式：net start/stop mysql
    桌面模式：控制面板 -> 管理工具 -> 服务 ->mysql-> 启动 / 停止
-   linux：

    service mysqld start/stop/restart

## 登录 / 退出 mysql

登录：`mysql [-h 服务器地址] -u 登录名 -P 端口号 -p`或`mysql [--host = 服务器地址] --user = 用户名 --port = 端口 --password`

退出：`quit; 或 exit;`

## 备份 / 恢复数据库

备份：`mysqldump -h 服务器地址 -u 登录名 -p 密码 [--default-character-set=utf8] [--hex-blob] 要备份的数据库名 > 要保存到的文件`

\--default-character-set=utf8：设置默认字符集为 utf8

\--hex-blob：导出 blob 字段时不加这个参数会可能会错。（eg：用 sublime 打开保存一下再进行导入就会报 "Unknown command'\\\\'." 等错）  

恢复：

-   `mysql -h 服务器地址 -u 登录名 -p 密码 [--default-character-set=utf8] 数据库名 < 存有 sql 语句的文件`

    \--default-character-set=utf8：设置默认字符集为 utf8  
-   登录后执行`source 存有 sql 语句的文件路径;`  （window 直接将文件托过去路径是反斜杠分隔，比较深的路径会解释成转义导致无法导入数据库。这时将反斜杠换成正斜杠，或将 sql 文件移动到前路径就行。）

注：MyISAM 存储引擎的库可以直接复制`.MYD`和`.MYI`文件，InnoDB 存储引擎的库不仅要复制`.ibd`还要复制`ibdata`等文件（最好还是用：[4.2.1 Backing Up an Entire MySQL Instance](https://dev.mysql.com/doc/mysql-enterprise-backup/8.0/en/mysqlbackup.backup.html)和[4.2.3 Restoring a Database](https://dev.mysql.com/doc/mysql-enterprise-backup/8.0/en/mysqlbackup.restore.html)）。

## 注释

单行注释： `#注释内容`或`-- 注释内容`（注意，两个 “--” 之后有一个空格）
多行注释： `/* 注释内容 */`

## 语句结束符

默认是 ";", 自定义用 delimiter

    delimiter /
    show databases /

## mysql 数据库命名规则

mysql 本身不区分大小写。
但在某些区分大小写的操作系统中，数据库名和表名会区分大小写。
推荐使用 “下划线命名法” 来对各种标识符命名：单词都用小写字母，单词之间用 “\_” 分开。

# 二：数据类型

### 整数类型

tinyint(1 字节)，smallint(2 字节)，mediumint(3 字节)，int(4 字节)，bigint(8 字节)
在 32 位系统中：int 都是 4（32/8）字节 

1 字节 (byte)=8 位 (bit)  

### 小数类型

float，double，decimal

单精度浮点型：float，非精确数，通常不设定长度 

双精度浮点：double，非精确数，通常不设定长度 

定点型：decimal，精确数，通常定点型需要设定长度，形式为：decimal(总长, 小数位数)  

### 时间日期类型

date，time，datetime，year，timestamp

写入数据库时，直接的时间日期数据，应该用单引号引起  

| 日期时间类型    | 占用空间    | 日期格式                | 最小值                 | 最大值                 | 零值表示                |
| --------- | ------- | ------------------- | ------------------- | ------------------- | ------------------- |
| DATETIME  | 8 bytes | YYYY-MM-DD HH:MM:SS | 1000-01-01 00:00:00 | 9999-12-31 23:59:59 | 0000-00-00 00:00:00 |
| TIMESTAMP | 4 bytes | YYYY-MM-DD HH:MM:SS | 19700101080001      | 2038 年的某个时刻         | 00000000000000      |
| DATE      | 4 bytes | YYYY-MM-DD          | 1000-01-01          | 9999-12-31          | 0000-00-00          |
| TIME      | 3 bytes | HH:MM:SS            | -838:59:59          | 838:59:59           | 00:00:00            |
| YEAR      | 1 bytes | YYYY                | 1901                | 2155                | 0000                |

timestamp（时间戳）：其实就是指当前时刻，本质上是一个数字，代表从 1970 年 1 月 1 日 0 点 0 分 0 秒到某个时间之间的秒数数值。该类型的字段值无需赋值，而是会自动取得当前时间值 (\*1970 年以前的日期没法表示，所以生日不能用)  

-   TIMESTAMP 值显示尺寸

| 列类型　　　　       | 显示格式　　　        |     |
| ------------- | -------------- | --- |
| TIMESTAMP(14) | YYYYMMDDHHMMSS | 　   |
| TIMESTAMP(12) | YYMMDDHHMMSS　  |     |
| TIMESTAMP(10) | YYMMDDHHMM　　   |     |
| TIMESTAMP(8)　 | YYYYMMDD　　　    |     |
| TIMESTAMP(6)　 | YYMMDD　　　　     |     |
| TIMESTAMP(4)　 | YYMM　　　　　      |     |
| TIMESTAMP(2)　 | YY　　　　　　       |     |

== 虽然你建表时定义了列 TIMESTAMP(8)，但在你进行数据插入与更新时 TIMESTAMP 列实际上保存了 14 位的数据（包括年月日时分秒），只不过在你进行查询时 MySQL 返回给你的是 8 位的年月日数据。如果你使用 ALTER TABLE 拓宽一个狭窄的 TIMESTAMP 列，以前被 “隐蔽” 的信息将被显示。==

==default 可以设置成 NOW() 或 CURRENT_TIMESTAMP（当前日期时间），但不能是 UNIX_TIMESTAMP()(当前时间戳)==

### 字符串类型

varchar，char

varchar 类型：可变长度字符串类型。最多能存储 65532 个字节的字符串（还要考虑字符编码）。设定的长度只是最长长度，但可以不存满，则实际长度以数据长度为准。
char 类型：定长字符串类型。最多能存储 256 个字符。如果存储的数据不足设定的长度，则会自动补空格填满。

### 二进制文本类型

binary，varbinary
binary：类似 char，只是里面不存 “文本”，而是存文本的二进制数据 

varbinary: 类似 varchar，同样，不存 “文本”，而是存文本的二进制数据  

### 大文本类型

text，blob
text：可以存储超大文本，且其实际的长度并不占用一行的长度。相对 char 和 varchar，效率低。
blob：可以存储超大二进制文本，通常用于存储图片这种二进制数据

### 选项类型

enum，set
enum：专门用于方便存储类似表单中的单选项的值。enum('选项 1','选项 2','选项 3'......)
这些选项的值虽然是字符串，但其数据库内部存储其实是数字（效率高），他们对应的数字值是：1，2，3，4，5，。。。。。最多 6 万多个

    CREATE TABLE enum_test(
    test ENUM('option1', 'option2', 'option3')
    );
    INSERT INTO enum_test(test) VALUES('option1');
    INSERT INTO enum_test(test) VALUES(3);
    SELECT * FROM enum_test;#1,3;

set：专门用于方便存储类似表单中的多选项的值。
这些选项的值虽然是字符串，但其数据库内部存储其实是数字（效率高），他们对应的数字值是：1，2，4，8，16，。。。。。最多 6 万多个

    CREATE TABLE set_test(
    test SET('checkbox1', 'checkbox2', 'checkbox3')
    );
    INSERT INTO set_test(test) VALUES('checkbox1,checkbox2');#逗号后别加空格。eg：checkbox1, checkbox2会解析成checkbox1和 checkbox2，只插入checkbox1。
    INSERT INTO set_test(test) VALUES(6);
    SELECT * FROM set_test;#12,23

# 三：SQL 语句

## 数据定义语句

1.  数据库定义：`CREATE DATABASE [IF NOT EXISTS] 数据库名 [CHARSET  字符集][COLLATE  字符排序规则]`；

    IF NOT EXISTS：用于判断是否存在该数据库名，如果存在则不执行该语句 

    字符集： 意图数据存储到本数据库中的时候所使用的字符编码名称，通常 utf8，也可以 gbk。

    字符排序规则：通常不设置，而是使用所设定的字符集的默认规则（每个字符集都有默认的排序规则）

<!---->

    CREATE DATABASE mytest;
    show charset;#显示可用字符集  
    show collation;#显示可用排序规则  

1.  修改数据库
    ALTER DATABASE 数据库名 CHARSET = 新字符集 COLLATE = 新校对集;

        ALTER DATABASE mytest CHARSET=utf8 COLLATE=utf8_bin;
        show create database mytest;#查看创建数据的语句

2.  删除数据库
    DROP DATABASE 数据库名

        DROP DATABASE mytest;

## 表定义语句

### 创建表

    create table [if not exists] 表名(字段列表, [约束或索引列表])[表选项列表];

#### 字段属性设置：

1.  `not null`：不为空，表示该字段不能放 null 这个值默认是可以为空  
2.  `auto_increment`：设定 int 类型字段的值可以自增长，即其值无需写入，而会自动获得并增加。此属性必须随同 primary key 或 unique key 一起使用  
3.  `[primary] key`：设定为主键。是唯一键加强：也不能重复并且不能使用 null，并且可以作为确定任意一行数据的关键值（一个表只能设定一个主键）  
4.  `unique [key]`：设定为唯一键：表示该字段的所有行的值不可以重复（唯一性）  
5.  `default`：默认值  
6.  `comment`：字段注释  

#### 索引设置：

索引是一个 “内置表”，该表的数据是对某个真实表的某个（些）字段的数据做了 “排序” 之后的存储形式 

索引极大提高表查找数据的速度（其速度可以匹敌二分查找），但会降低增删改的速度  

1.  普通索引：key(字段名 1, 字段名 2,...)：它只具有索引的基本功能 - 提速
2.  唯一索引：unique key(字段名 1, 字段名 2,...)
3.  主键索引：primary key(字段名 1, 字段名 2,...)
4.  全文索引：fulltext(字段名 1, 字段名 2,...)

show full fields from $table_name 后

1.  PRI：主键索引
2.  UNI：唯一索引
3.  MUL：外键索引

#### 约束设置：

约束就是一种限定数据以符合某种要求的形式  

1.  主键约束：primary key(字段名 1, 字段名 2,...)
2.  唯一约束：unique key(字段名 1, 字段名 2,...)
3.  外键约束：foreign key(字段名 1, 字段名 2,...) references 表名 2(字段名 1, 字段名 2,... )

    对某个（些）字段设定外键，则其相对应的其他表的对应字段需要设置为主键。
4.  非空约束：就是要求该字段的值不能为空，其只能在字段上当作字段属性来设定
5.  默认约束：就是要求该字段的值在 “空” 的时候会自动填充该设定的默认值，也只能字段上设定
6.  检查约束：就是使用一个表达式（逻辑判断）来决定数据是否有效，比如年龄字段，可以使用 tinyint
    mysql 不支持检查约束的语法和功能

#### 表选项：

表选项就是对一个表的有关属性的设定，通常都不需要。如果不设定，则有其默认值。    

1.  comment = '表的注释';  	
2.  charset = 字符编码名称;

    字符编码设定的范围及继承关系：

    系统级设定：安装时确定了 -> 库级设定：建库时设定 -> 表级设定：就是这里的 charset = 字符编码名称 -> 字段级设定：作为字段属性出现。

    他们都只对 “字符类型” 的字段有效。每一级如果没有设定，就会 “继承使用” 其上一级的设定。  
3.  auto_increment = 起始整数;

    自增长类型值的初值，默认是 1  
4.  engine = 表的存储引擎名;

    存储引擎就是将数据存入硬盘（或其他媒介）的方式方法。默认是 InnoDB

    存储引擎决定一个数据表的各方面的信息：功能和性能  

<!---->

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

### 修改表

alter table 表名 修改语句 1, 修改语句 2,...

#### 字段

增加：ALTER TABLE 表名 ADD 字段名 字段类型 字段属性 

修改：ALTER TABLE 表名 CHANGE 原字段名 新字段名 新字段类型 新字段属性 

​      ALTER TABLE 表名 ALTER 字段名 SET DEFAULT 默认值 

​      ALTER TABLE 表名 ALTER 字段名 DROP DEFAULT

删除：ALTER TABLE 表名 DROP 字段名  

    CREATE TABLE IF NOT EXISTS test(
     id INT AUTO_INCREMENT NOT NULL COMMENT 'ID',
     PRIMARY KEY(id)
    );
    ALTER TABLE test ADD COLUMN test FLOAT DEFAULT 22.33;
    ALTER TABLE test CHANGE COLUMN test new_test FLOAT DEFAULT 22.33;
    ALTER TABLE test DROP COLUMN new_test;

#### 索引

增加：ALTER TABLE 表名 ADD INDEX()/PRIMARY KEY()/FOREIGN KEY()/UNIQUE()

删除：ALTER TABLE 表名 DROP INDEX 索引名 / PRIMARY KEY/FOREIGN KEY 外键名  

    DROP TABLE test;
    CREATE TABLE IF NOT EXISTS test(
     id INT AUTO_INCREMENT NOT NULL COMMENT 'ID',
     test INT,
     PRIMARY KEY(id)
    );
    ALTER TABLE test ADD INDEX test_index(test);
    ALTER TABLE test DROP INDEX test_index;

#### 表属性

`ALTER TABLE 表名 RENAME [TO] 新表名`

ALTER TABLE 表名 选项名 1 = 选项值 1, 选项名 2 = 选项值 2, 选项名 3 = 选项值 3,...  

    CREATE TABLE IF NOT EXISTS test(
     id INT AUTO_INCREMENT NOT NULL COMMENT 'ID',
     PRIMARY KEY(id)
    );
    ALTER TABLE test RENAME TO test2;
    ALTER TABLE test2 CHARSET=utf8;

### 删除表

`drop table [if exists] 表名;`

### 查询表

#### 查询表属性：

show table status;（用 show tables 查询查不到表具体信息）

#### 查询表字段属性：

show full columns from 表名;
或，show full fields from 表名;（用 desc 查询查不到权限和字段注释）

#### 查询建立表语句：

show create table 表名;

### 复制表

方法 1：这种方法可以比较完整。

create table tab2 like tab1;// 复制结构 

insert into tab2 select \* from tab1;// 复制数据

方法 2：这种方法可能会丢一些结构信息，比如：索引，约束，自增长属性 

create table tab2 select \* from tab1; // 同时复制结构和数据

## 其他操作语句

显示表的创建语句: show create table 表名 

从已有表复制表结构：`create table [if not exists] 新表名 like 原表名` 

从已有表复制表结构：`create table [if not exists] 新表名 select * from 原表名 where 1<>1`（不推荐）  

## 数据操作语言（DML）

### 插入

1.  insert into  表名 (字段名 1, 字段名 2,...) values(值 a1, 值 a2,...), (值 a1, 值 a2,...),...;
2.  insert into  表名 (字段名 1, 字段名 2,...) select 字段名 1, 字段名 2,... from 表名 2;
3.  insert  into  表名  set  字段名 1 = 值 1, 字段名 2 = 值 2,...;  
4.  load data infile '文件完整路径' into table 表名;
    说明:

    形式 1 和形式 2，可以一次插入多条数据 

    形式 4 的数据必须和表的结构一样 

    数字直接写，字符串和时间加单引号，但如果是函数值则不能加引号 

    有的字段通常无需插入数据，此时不应该出现该字段名：auto_increment， timestamp  

### 删除

`delete from 表名 [where 条件][order 排序] [limit 限定];`
`truncate [table] 表名;`（删除整个表的数据和结构并重新创建该表，自增列重新计算）
说明: 
删除语句中 where 条件通常都要写上，如果不写则就删除了所有数据（应用中极少如此）

order 排序子句用于设定删除数据的先后顺序 

limit 限定子句用于限定在设定的顺序情况下删除指定的某些行  

### 修改

`update 表名 set 字段名 1 = 值表达式 1, 字段名 2 = 值表达式 2,...[where 条件][order 排序] [limit 限定];`
说明:

where 条件子句在应用中几乎都必须有，没有就修改了所有数据 

order 排序子句用于设定删除数据的先后顺序 

limit 限定子句用于限定在设定的顺序情况下删除指定的某些行 

字段的值可以是表达式，或直接值，或函数。同样遵循 insert 语句中字段的值的写法  

## 数据查询语言（DQL）

### 基本查询

`select [all | distinct] 字段或表达式列表 [from 子句][where 子句] [group by 子句][having 子句] [order by 子句][limit 子句];`
说明: 
作用是从数据源中找出一定的数据，并作为该语句的返回的数据源（数据集）
数据源就是表，但也可以没有数据源，而是使用直接数据或函数执行结果

#### `[all | distinct]`

用于设定所 select 出来的数据是否允许出现重复行（完全相同的数据行）

all：允许出现重复行（默认）

distinct：不允许出现重复行  

#### from 子句

就是指定数据的来源，可以是表，用其他查询语句返回的结果表和多张表

#### where 子句

相当于 php 或 js 中的 if 条件语句，其最终结果就是布尔值（true/false）

where true, where 1; where 1=1; 都表示 true

where false, where 0; where 1\\&lt;>1; 都表示 false  

where 中可用的运算符：

算术运算符：+，-，\*，/，%

比较运算符：>，>=，\\&lt;，\\&lt;=，=，\\&lt;>，==（mysql 扩展），!=（mysql 扩展）

逻辑运算符：and，or，not  

布尔值的判断方式：（实际应用中，布尔值判断很少用，因为可以直接使用数学大小。）

布尔值：本质上，布尔值只是一位整数的 “别名”，0 表示 false，非 0 表示 true。

判断为 true：XX is true

判断为 fale：XX is false

XX 应该是一个字段名，且其类型应该是一个整数。  

空值的判断方式：

判断为 null：XX is null

判断为非空：XX is not null

XX 应该是一个字段名  

between 语法：

XX between 值 1 and 值 2;

XX 应该是一个字段名  

in 语法：

XX in(值 1, 值 2,...);

XX 应该是一个字段名  

like 语法（模糊查找）：
XX like '要查找字符';

XX 应该是一个字段名 

%：代表任意个数任意字符（不是字节）

\_：代表一个任意字符（不是字节）  

#### group by 子句

group by 字段 1 排序方式 1, 字段 2 排序方式 2,...

通常都只进行一个字段的分组。

分组就是将数据以某个字段的值为依据，分到不同的组别里。  

分组的结果通常：

1.  数据结果只能是组，没有数据本身的个体  
2.  数据结果就可能丢失很多特性  
3.  结果中通常只剩下组作为整体的信息。（组内成员的个数，某些字段的最大值，最小值，平均值，总和值。其他字段，通常就不能用了。）

    1，2 个字段或以上分组，则其实是相当于对前一分组的组内，再进行后一依据的分组。  

在分组查询中，基本都依赖于一下几个函数（聚合函数，统计函数）：  

-   count(\*):  统计一组中的数量，默认会统计 null（count(1) 效率更高，count(字段名) 不会统计 null）
-   max(字段名)：获取该字段中在该组中的最大值。  
-   min(字段名)：获取该字段中在该组中的最小值。  
-   sum(字段名)：获取该字段中在该组中的总和。  
-   avg(字段名)：获取该字段中在该组中的平均值。  
-   group_concat(字段名)：该函数返回带有来自一个组的连接的非 NULL 值的字符串结果。

##### count 查询某字段某一条件的的总数：

1.  `select count(sub_type) from table where table.sub_type='type’;`
    最简单的方法，但个查询只能统计一个子类
2.  `select count(if(table.sub_type='type',1,0)) count1 count(if(table.sub_type='type',1,0)) count2 from table;`
    使用 if 判断，可统计多个子类
3.  `select count(table.sub_type='type' or null) count1 count(table.sub_type='type' or null) count2 from table;`
    使用 or，可统计多个子类（sub_type='type'的，其余的都返回 null,count(列名) 时是不会统计 null 的个数的）

#### having 子句

having 子句其实概念跟 where 子句完全一样 

where 是针对 "表的字段的值" 进行条件判断 

having 是针对 "groupby 之后的组数据" 进行条件判断  

#### order by 子句

`order by 排序字段 1 [排序方式], 排序字段 2 [排序方式], ...`

对数据集按指定按某个字段的大小进行排列（排序），排序只有 2 种方式：

ASC：正序（默认值）

DESC：倒序 

如果指定多个字段排序（虽然不常见），则其含义是，在前一个字段排序中相同的那些数据里，再按后一字段的大小进行指定的排序。  

##### 进阶：

1.  指定排序顺序：ORDER BY FIELD(字段名, 值 1, 值 2, 值 3,...)

#### limit 子句

形式：
`limit [起始行号 start], 要取出的行数 num`

取得数据集局部连续的若干条数据 

起始行号：可以省略，为默认行号 0（尽量不用，很影响性能）

要取出的行数：如果结果集中从指定的行号开始到最后没有这么多行，则就只取到最后  

### 连接查询

`from 表 1 [连接方式] join 表 2 [on 连接条件]`

连接就是指两个或 2 个以上的表（数据源）连接起来成为一个数据源 

== 注意：==  

-   on 条件：连接查询的 on 条件如果有','，并且没有找到匹配的项。会将逗号前的内容进行匹配查找
    eg：连接表有 r_id 为 2 的，主表连接的 r_id 为 2,1。则 on 主表. r_id = 连接表. r_id，2,1 = 2 会匹配出来。

== 连接查询过程：==

1.  对两张表执行笛卡尔积运算形成一个结果集合。
2.  ON 按条件，对上边的结果集，进行筛选，形成新的结果集。
3.  （左右全外连接）会对未匹配到的结果补上 null。
4.  如果存在多张表，重复 1~3 过程。

#### 交叉连接

`from 表 1 [cross] join 表 2（交叉连接没有 on 条件）`

cross 这个词也可以省略，还可以使用 inner 这个词代替

#### 内连接

`from 表 1 [inner] join 表 2 on 表 1. 字段 1 = 表 2. 字段 2`

找出（过滤）在交叉连接的结果表中的表 1 的字段 1 的值等于表 2 的字段 2 的值的那些行

#### 左\[外] 连接

`from 表 1 left [outer] join 表 2 on 表 1. 字段 1 = 表 2. 字段 2`

在内连接的结果基础上，加上左边表中所有不符合连接条件的数据，相应本应放右边表的字段的位置就自动补为 “null” 值。

#### 右\[外] 连接

`from 表 1 right [outer] join 表 2 on 表 1. 字段 1 = 表 2. 字段 2`

在内连接的结果基础上，加上右边表中所有不符合连接条件的数据，相应本应放左边表的字段的位置就自动补为 “null” 值。

#### 全\[外] 连接（mysql 中其实不认识全\[外] 连接语法）

`from 表 1 full [outer] join 表 2 on 表 1. 字段 1 = 表 2. 字段 2`

内连接的结果，加上左表中不满足条件的所有行（右边对应补 null），再加上，右表中不满足条件的所有行（左边对应补 null）。

### 子查询

`selelct 字段或表达式或 (子查询 1) [as 别名] from 表名或 (子查询 2) [as 别名] where 字段或表达式或 (子查询 3) 的条件判断`
在一个 select 查询语句中又出现了 select 查询语句，此时就称后者为 “子查询”，前者就是 “主查询”

== 注意：==  

-   子查询中无法访问主查询字段（也就是子查询可以有和主查询相同的表，并且用表. 字段时访问的是子查询中的字段）
    eg：可以使用（子查询主查询都用了 test.id 并且不会有歧义）`select test.id from test left join (select test.id id from test) as child_test on test.id = child_test.id;`

#### 子查询按结果分类

-   表子查询 ： 一个子查询返回的结果理论上是 “多行多列” 的时候。此时可以当做一个 “表” 来使用，通常是放在 from 后面
-   行字查询 ： 一个子查询返回的结果理论上是 “一行多列” 的时候。此时可以当做一个 “行” 来使用，通常放在 “行比较语法” 中
-   列子查询 ： 一个子查询返回的结果理论上是 “多行一列” 的时候。此时可以当做 “多个值” 使用
-   标量子查询：一个子查询返回的结果理论上是 “一行一列” 的时候。此时可以当做 “一个值” 使用

#### 子查询按使用场合分类

-   作为主查询的结果数据：select column1,(select column1 from table2) as tb2_col1 from table1;
    这里子查询应该只有一个数据（一行一列，标量子查询）
    这种子查询中 where 条件可是 table1 中的字段。eg（where t1_id = table1.id）
-   作为主查询的条件数据：select column1 from table1 where column1 in (select column1 from table2);
    \# 这里子查询可以是多个数据（多行一列，列子查询，以及标量子查询）
-   作为主查询的来源数据：select column1 from (select column1, column2 from table2) as tb2;
    \# 这里子查询可以是任意查询结果（表子查询）

#### in 子查询

where 操作数 in(列子查询);

表示该操作数等于该子查询的其中任意一个只，就算满足条件

#### any 子查询

where 操作数 比较运算符 any (列子查询);

表示该操作数的值只要跟列子查询的任意一个值满足给定的比较运算，就算满足了条件

#### all/some 子查询

where 操作数 比较运算符 all/some (列子查询);

该操作数的值必须跟列子查询的所有值都满足给定的比较运算，才算满足了条件

#### exists 的子查询（尽量少用）

where exists (子查询);

如果要查询的字段在子查询中返回 true

#### not exists 子查询（尽量少用）

where not exists (子查询);

如果要查询的字段在不子查询中返回 true

### 联合查询

联合查询就是将两个 select 语句的查询结果 “层叠” 到一起成为一个结果。

两个查询结果的能够进行 “联合” 的先觉条件是：结果字段数相等。

`(select 语句 1) union [ALL | DISTINCT] (select 语句 2) [order by 排序][limit 限定];`

## 数据控制语言（DCL）

mysql 中，权限是系统内定的一些名词，大约 30 个，每个权限表示可以做什么工作。　
分配权限就是相当于让某个用户可以做哪些工作。
创建用户或分配权限后必须刷新权限：`flush privileges;`  

### 创建用户

create user '用户名'@'允许其登录的地址' identified by '密码';
说明：

1.  创建的用户需同时指定该用户可以在哪个地址进行登录。其中'%'代表任何地址。

    （有时 % 不代表 localhost，这时需要对 localhsot 单独进行创建`GRANT ALL ON 库.* to '用户'@'localhost' IDENTIFIED BY '密码';`）
2.  用户创建之后，自动在 mysql 的 user 表中添加了一条记录，但该用户还没有权限。

### 删除用户

drop user '用户名'@'允许其登录的地址';

### 修改用户密码

-   修改自己密码：set password = password('新密码');
-   修改他人密码（必须有修改权限）：set password for '用户名'@'允许其登录的地址' = password('新密码');

### 权限分配

增加权限：

grant 权限名 1, 权限名 2,... on 数据库名. 对象名 to '用户名'@'允许其登录的地址' identified by '密码';

说明：  

1.  权限名就是：select，update，delete 等等。其中 ALL 表示 “所有权限”，或 all privileges 也一样
2.  对象名：就是一个数据库中 “装” 的东西，表是最常见的，也可以是视图，存储过程，存储函数等。其中：_._表示所有数据中的所有对象
    某数据库名．\* 表示该数据库中的所有对象——这个商业上常用。
3.  identified by '密码'用于给一个用户在此时修改密码，不写也可以，那就不修改密码。
4.  同时该语句也可以创建用户（如果不存在），此时 identified by '密码'必须写。

删除权限：

revoke 权限名 1, 权限名 2,... on 数据库名. 对象名 from '用户名'@'允许其登录的地址';

表示从某个用户身上 “取消” 某些权限（也许还保留了其他权限）。

### mysql 用户表

mysql 用户表位于 mysql 库下，eg：`select host, user from mysql.user;`

## 事务控制语言（DTL）

“事务” 是一种可以保证 “多条语句一次性执行完成” 或 “一条都不执行” 的机制。

### 事务的特点

1.  原子性：一个事务中的所有语句，应该做到：要么全做，要么一个都不做；
2.  一致性：让数据保持逻辑上的 “合理性”，比如：一个商品出库时，既要让商品库中的该商品数量减 1，又要让对应用户的购物车中的该商品加 1；
3.  隔离性：如果多个事务同时并发执行，但每个事务就像各自独立执行一样。
4.  持久性：一个事务执行成功，则对数据来说应该是一个明确的硬盘数据更改（而不仅仅是内存中的变化）。

### 事务模式

事务模式：让每条执行语句是否当作 “一个事务” 来看到的设定项。

mysql 默认安装好之后，其事务模式是：一条语句当作一个事务。

`set autocommit = 0;//false`，关闭自动提交模式，即此时不再是一条语句一个事务了必须使用 commit 语句才能够生效。  

### 事务的基本实现流程

1.  声明事务开始: START TRANSACTION;
2.  设定多条要执行的具体语句
3.  判断是否需要执行该些语句（COMMIT; 或 ROLLBACK;）

# 四：mysql 自带函数

## 字符串函数

1.  在以','分隔的条件中查找：`FIND_IN_SET(要找的字符串, 被寻找的字符串)`
    FIND_IN_SET 函数默认是以符号','为分割符的
2.  替换字符：`REPLACE(要替换的字符串,'被替换的字符','替换的字符')`

## 时间函数

1.  FROM_UNIXTIME(time,'%Y 年 %m 月 %d')：将时间戳转换为日期时间类型
2.  UNIX_TIMESTAMP('2009-08-06')：将日期时间转换为时间戳类型

# 四：mysql 编程

## 基本语法形式

在 mysql 编程中，begin....end; 基本代替了原来编程语句中的 {...} 语法。
但又有所区别：
一个 bigin...end; 块，可以给定一个 “标识符”，并且可以使用 leave 语句来 “退出” 该语句块。

## 基本流程控制语句

if 语句
case 语句
while 循环语句

### 变量

有两种环境：  

-   常规 mysql 命令环境：可以执行增删改查等
-   编程环境：其实就是在特定的语句语法内部：存储过程内，存储函数内，触发器内。

两种变量：  

-   普通变量：不带 @符，直接写名字，必须先声明，后使用（赋值之类），只能用于编程环境
    普通变量的声明语法：`declare 变量名 变量类型 [default 初始值]`
-   会话变量：带 @符，无需声明，直接使用（先赋值），可以用于命令和编程种环境。

变量的赋值语法：

1.  set 变量名 = 表达式;# 此语法中的变量必须先使用 declare 声明
2.  set @变量名 = 表达式; #此方式可以无需 declare 语法声明，而是直接赋值，类似 php 定义变量并赋值
3.  select @变量名 := 表达式;# 此语句会给该变量赋值，同时还会作为一个 select 语句输出 “结果集”
4.  select 表达式 into @变量名;# 此语句虽然看起来是 select 语句，但其实并不输出 “结果集”，而只是给变量赋值

### 存储函数

和调用的内置函数一样的用法。

    CREATE FUNCTION 存储函数名(形参1 类型1, 形参2 类型2,...)
    RETURNS 返回类型
    BEGIN
    要执行的代码
    RETURN XX;
    END;

### 存储过程

使用`call 存储过程名`调用。

    CREATE PROCEDURE 存储过程名([IN|OUT|INOUT]形参1 类型1, ([IN|OUT|INOUT]形参2 类型2,...)
    BEGIN
    要执行的代码，增加删除修改查询语句。
    END;

### 触发器

触发器其实是预先定义好的一段代码。该段代码无需人工调用，而是会在‘预计’好的某个情形下自动执行。
通常就这几个情形：对某个数据表的增（或删或改）之前（或之后），一共 3\*2=6 种。

    CREATE TRIGGER 触发器名字 BEFORE（或AFTER）INSERT（或UPDATE或DELETE）ON 表名 FOR EACH ROW 
    BEGIN
    要执行的代码，但这里也不能使用SELECT语句。
    END;

### 事件调度器

类似定时任务

# 四：视图

-   创建：`create view 视图名 [(列名 1, 列名 2,...)] as select 语句;`
-   修改：`alter view 视图名 [(列名 1, 列名 2,...)] as select 语句;`
-   删除：`drop view [if exists] 视图名;`
-   使用：跟用表一样

# 五：数据库（数据表）的设计思想

## 3 范式（3NF）

-   第一范式（1NF）原子性：（字段）一个字段不存两类数据  
-   第二范式（2NF）唯一性：（记录）非主键字段完全依赖于主键字段（别一张表里两行数据才能确定一个信息）  
-   第三范式（3NF）独立性：（表）每张表只存一种数据（减少冗余） 

## 字段类型设计

1.  IP 地址：int unsigned

    IP 转数字：inet_aton('127.0.0.1')
    数字转 IP：inet_ntoa('2130706433')

<!---->

    select inet_aton('127.0.0.1');#2130706433
    select inet_ntoa('2130706433');#127.0.0.1

# 六：技巧

## 设置自增编号

方法 1：

    select (@i:=@i+1) as i,tablename.* from tablename,(select @i:=0) as table1;

方法 2：

    set @rownum=0;  
    select @rownum:=@rownum+1 as rownum, tablename.* from tablename;

# 七：乱码处理

## 检查

1.  table 编码
2.  database 编码
3.  client 编码
4.  server 编码
5.  connection 编码

    mysql> show variables like '%character%';

    character_set_client

    character_set_connection
    character_set_database
    character_set_filesystem
    character_set_results
    character_set_server
    character_set_system
    character_sets_dir

## PHP

查看是否执行：`mysqli_query($link, 'SET NAMES utf8');`

执行`SET NAMES utf8`的效果等同于同时设定如下：

    SET character_set_client='utf8';
    SET character_set_connection='utf8';
    SET character_set_results='utf8';

php 执行`mysqli_query($link, 'CHARSET utf8');`还是会乱码（dos 下执行 CHARSET 不会乱码，并且和 SET NAMES utf8 一样改变了 client,connection,results）。

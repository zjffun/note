# 存储过程动态执行sql
```
--存储过程名和参数，参数中in表示传入参数，out标示传出参数，inout表示传入传出参数

create procedure p_procedurecode(in sumdate varchar(10))   
begin
     declare v_sql varchar(500);    --需要执行的SQL语句
     declare sym varchar(6);
     
     declare var1 varchar(20);
     declare var2 varchar(70);
     declare var3 integer;

     --定义游标遍历时，作为判断是否遍历完全部记录的标记
     declare no_more_departments integer DEFAULT 0;     

     --定义游标名字为C_RESULT 
     DECLARE C_RESULT CURSOR FOR
             SELECT barcode,barname,barnum FROM tmp_table;

    --声明当游标遍历完全部记录后将标志变量置成某个值
     DECLARE CONTINUE HANDLER FOR NOT FOUND
             SET no_more_departments=1;

     set sym=substring(sumdate,1,6);     --截取字符串，并将其赋值给一个遍历

     --连接字符串构成完整SQL语句，动态SQL执行后的结果记录集，在MySQL中无法获取，因此需要转变思路将其放置到一个临时表中（注意代码中的写法）。一般写法如下：

     --     'Create TEMPORARY Table   表名（Select的查询语句）;
     set v_sql= concat('Create TEMPORARY Table tmp_table(select aa as aacode,bb as aaname,count(cc) as ccnum from h',sym,' where substring(dd,1,8)=''',sumdate,''' group by aa,bb)');

     set @v_sql=v_sql;   --注意很重要，将连成成的字符串赋值给一个变量（可以之前没有定义，但要以@开头）
     prepare stmt from @v_sql;  --预处理需要执行的动态SQL，其中stmt是一个变量
     EXECUTE stmt;      --执行SQL语句
     deallocate prepare stmt;     --释放掉预处理段

     OPEN C_RESULT;       --打开之前定义的游标
     REPEAT                      --循环语句的关键词
           FETCH C_RESULT INTO VAR1, VAR2, VAR3;   --取出每条记录并赋值给相关变量，注意顺序

          --执行查询语句，并将获得的值付给一个变量 @oldaacode（注意如果以@开头的变量可以不用通过declare语句事先声明）
           select @oldaacode:=vcaaCode from T_sum where vcaaCode=var1 and dtDate=sumdate; 
           if @oldaacode=var1 then    --判断
              update T_sum set iNum=var3 where vcaaCode=var1 and dtDate=sumdate;
           else
               insert into T_sum(vcaaCode,vcaaName,iNum,dtDate) values(var1,var2,var3,sumdate);
           end if;
     UNTIL no_more_departments  END REPEAT;    --循环语句结束
     CLOSE C_RESULT;                            --关闭游标

     DROP TEMPORARY TABLE tmp_table;       --删除临时表
end;
```
# emample
```
drop database if exists wifi_database;
create database wifi_database default character set utf8;
use wifi_database;
create table wifi_table(
  rowid varchar(255),
  id varchar(255),
  NAME varchar(255),
  BSSID varchar(255),
  LEVEL varchar(255),
  SSID varchar(255)
)DEFAULT CHARSET=utf8;
charset utf8;
load data infile 'c:/wifi_data.csv'   
into table wifi_table character set utf8 
fields terminated by ','  optionally enclosed by '"' escaped by '"'   
lines terminated by '\r\n';

-- -- 单条测试
-- select * from (
--  -- union all：不删除重复；union：删除重复
--  select 'NAME','BSSID','LEVEL','SSID' union all
--  -- 外面套一层select * from，不然order by会被union弄失效了
--  select * from (select NAME,BSSID,LEVEL,SSID from wifi_table where NAME = '(1,0)' order by SSID) tbl_order
-- ) tbl_add_title 
-- into outfile 'c:/wifi/1_0.txt' 
-- fields terminated by ',' optionally enclosed by '' escaped by '' 
-- lines terminated by '\r\n';

-- 定义结束符为 $$
delimiter $$ 
-- 删除 已有的 存储过程 
drop procedure if exists wifi_table_to_file; 
-- 创建新的存储过程 
create procedure wifi_table_to_file() 
begin 
-- 变量声明 
declare v_sql varchar(500);-- 需要执行的SQL语句
declare i int;-- 1,2
declare j int;-- 0-79
-- 循环体
set i = 1; 
while i <= 2 do 
  set j = 0; 
  while j <= 79 do 
    set v_sql= concat('select * from (select \'NAME\',\'BSSID\',\'LEVEL\',\'SSID\' union all select * from (select NAME,BSSID,LEVEL,SSID from wifi_table where NAME = \'(',i,',',j,')\' order by SSID) tbl_order) tbl_add_title into outfile \'c:/wifi/',i,'_',j,'.txt\' fields terminated by \',\' optionally enclosed by \'\' escaped by \'\' lines terminated by \'\\r\\n\';'); 
    -- 预处理需要执行的动态SQL，其中stmt是一个变量
    set @v_sql_for_stmt=v_sql; 
    prepare stmt from @v_sql_for_stmt; 
    -- 执行SQL语句
    EXECUTE stmt; 
    -- 释放掉预处理段       
    deallocate prepare stmt; 
    set j = j +1; 
  end while; 
  set i = i +1; 
end while; 
end $$ 
-- 先把结束符 回复为; 
delimiter ; 
call wifi_table_to_file(); 
```
开始 -> 程序 -> 附件 -> 系统工具 -> 计划任务

.bat 文件如下：

```
::数据库+文件备份

@echo off

::日期时间
set yyyymmdd=%date:~0,4%%date:~5,2%%date:~8,2%
set curtime=%time%
IF "%curtime:~2,1%"==" " (set hh=0%curtime:~1,1%) ELSE (set hh=%curtime:~0,2%)

::配置
set SOURCE_IMAGES_FILE_DIR=E:\Web\images_file
set SOURCE_LITERATURES_FILE_DIR=E:\Web\literatures_file

set DB_HOST=127.0.0.1
set DB_USER=root
set DB_PWD=123456
set DB_DB=mydb

set BACK_UP_PATH=F:\back_up\%yyyymmdd%%hh%\
set BACK_UP_IMAGES_FILE_DIR=images_file
set BACK_UP_LITERATURES_FILE_DIR=literatures_file
set BACK_UP_SQL_NAME=back-up.sql


::创建文件夹
mkdir %BACK_UP_PATH%

::数据库备份
mysqldump -h%DB_HOST% -u%DB_USER% -p%DB_PWD% %DB_DB% > %BACK_UP_PATH%%BACK_UP_SQL_NAME%

::文件备份
xcopy %SOURCE_IMAGES_FILE_DIR% %BACK_UP_PATH%%BACK_UP_IMAGES_FILE_DIR% /e/I/d/h/r/y
xcopy %SOURCE_LITERATURES_FILE_DIR% %BACK_UP_PATH%%BACK_UP_LITERATURES_FILE_DIR% /e/I/d/h/r/y 

exit
```

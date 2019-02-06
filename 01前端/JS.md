# 坑

## 判断空数组

空数组为对象强制转换成布尔值为**真**，用`arrr.length === 0`判断。

## 三目运算符（条件运算符）的结合性和优先级

条件运算符的优先级仅高于赋值运算符，且是右结合的。例：

```text
例1：
condition1 ? condition2 ? result1 : result2 : result3;
等于
condition1 ? ( condition2 ? result1 : result2 ) : result3;

           c1
         /     \
     true      false
       |         |
      c2         r3
    /     \
  true   false
   |       |
   r1      r2


例2:
condition1 ? result1 : result2 + condition2 ? result3 : result4;
等于
condition1 ? result1 : (result2 + condition2 ? result3 : result4);

           c1
         /     \
     true      false
       |         |
      r1      (result2 + condition2 ? result3 : result4)
      
      
例3:
(condition1 ? result1 : result2) + condition2 ? result3 : result4;
等于
condition1 ? result1 : result2 + condition2 ? result3 : result4);

          +
    /           \
   c1            c2
/      \       /    \
true false   true false
r1    r2      r3    r4
```

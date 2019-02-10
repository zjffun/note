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

## 数组方法的效率

-   `pop()`，`push()`等在数组尾部操作的方法的时间复杂度为`O(1)`
-   `forEach()`、`map()`、`shift()`、`unshift()`、等需要遍历或者在数组头部操作的方法的时间复杂度为`O(n)`
-   `splice()`、`concat()`、`find()`等方法的时间时间复杂度为`O(n)`，但最优情况可能为`O(1)`，如`splice()`在数组尾部操作、`find()`第一个元素就符合条件。

不是十分确定的解释：因为 JS 数组是用 HashTable 实现的（上网查资料至少 V8 引擎中是），在数组中间进行操作需要将操作的元素后面的元素的 hash 值（key\\index 经过 hash function 计算出来的值）改变，要是在数组头部进行增加和删除就需要将数组全部元素对应的 hash 值（key\\index 经过 hash function 计算出来的值）改变。

测试：

    var array = [];
    for(var i = 0;i< 1000000;i++){
        array.push(i)
    }
    var start = new Date().getTime()
    for(var i = 0; i< 100000; i++){
        array.splice(1000000,0,1);
    }
    var end = new Date().getTime();
    console.log(`Add 10^5 numbers to the head of array: ${end - start} ms`);

    var array = [];
    for(var i = 0;i< 1000000;i++){
        array.push(i)
    }
    var start = new Date().getTime()
    for(var i = 0; i< 100000; i++){
        array.push(1000000,0,1);
    }
    var end = new Date().getTime();
    console.log(`Add 10^5 numbers to the rear of array: ${end - start} ms`);

    // Add 10^5 numbers to the head of array: 4555 ms
    // Add 10^5 numbers to the rear of array: 56 ms

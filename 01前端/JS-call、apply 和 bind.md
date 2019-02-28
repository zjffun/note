# call

`call([thisObj [, arg1[, arg2[, [, argN]]]]])`

-   应用于：Function 对象  
-   作用：调用一个对象的一个方法，以另一个对象替换当前对象。 
-   参数：  
    thisObj  
    可选项。将被用作当前对象的对象。  
    arg1, arg2,... , argN  
    可选项。将被传递给方法的参数序列。   
-   说明：call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。  
    如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。 
-   例子

1.  用 Array.slice 这个方法代替 Object.slice 这个不存在的方法来将 {} 转换成\[]


    console.log([].slice, "---", {}.slice);//function slice() --- undefined
    f1('haha','nihao');
    function f1(){
        //让arguments（Object）调用数组才有的slice方法转换成数组
        console.log(arguments, [].slice.call(arguments));
    }

# apply

和 call 类似，只不过 apply 接受的是一个包含多个参数的数组

`apply([thisObj][, argsArray])`

-   应用于：Function 对象  
-   作用：调用一个对象的一个方法，以另一个对象替换当前对象。 
-   参数：  
    thisObj  
    可选项。将被用作当前对象的对象。  
    argsArray  
    可选项。将被传递给方法的参数数据。   
-   说明：apply 可以用来指定方法的 this。

# bind

bind() 方法创建一个新的函数， 当这个新函数被调用时其 this 置为提供的值，其参数列表前几项置为创建时指定的参数序列。

`bind(thisArg[, arg1[, arg2[, ...]]])` 

-   应用于：Function 对象  
-   作用：调用一个对象的一个方法，以另一个对象替换当前对象。 
-   参数：  
    thisObj  
    可选项。将被用作当前对象的对象。  
    arg1, arg2,...  
    可选项。将被传递给方法的参数序列。   
-   说明：bind 可以用创建一个指定了 this 的方法的副本。

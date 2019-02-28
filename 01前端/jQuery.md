# 类数组

jQuery 下有个概念叫 “类数组”，比如 $("li" )，当取到一个集合的时候，会有数组的一些属性，但是 instancseof Array 仍然是 false。但是 var li_arr=$("li" ).get() 这样处理一下，然后 instancseof Array 就返回 true（js 的 querySelectorAll 这个方法返回查找到的节点的数组）。

# find 和 filter

-   find 在该选择集包含的节点的子节点内找
-   filter 过滤该选择集包含的节点

eg：  

    <font><font attr="1"><div attr="1"></div></font></font>
    $('font font').find('[attr=1]')//<div attr=1></div>
    $('font font').filter('[attr=1]')//<font attr=1><div attr=1></div></font>

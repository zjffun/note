# 类数组
jQuery下有个概念叫“类数组”，比如$("li" )，当取到一个集合的时候，会有数组的一些属性，但是instancseof Array仍然是false。但是var li_arr=$("li" ).get()这样处理一下，然后instancseof Array就返回true（js的querySelectorAll这个方法返回查找到的节点的数组）。

# find和filter
- find在该选择集包含的节点的子节点内找
- filter过滤该选择集包含的节点

eg：  
```
<font><font attr="1"><div attr="1"></div></font></font>
$('font font').find('[attr=1]')//<div attr=1></div>
$('font font').filter('[attr=1]')//<font attr=1><div attr=1></div></font>
```

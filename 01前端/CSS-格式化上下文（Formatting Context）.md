Formatting Context：指页面中的一个渲染区域，并且拥有一套渲染规则，他决定了其子元素如何定位，以及与其他元素的相互关系和作用。 

# BFC
BFC：块级格式化上下文，它是指一个独立的块级渲染区域，只有Block-level BOX参与，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关。  
BFC的生成：  
浮动,绝对定位元素,和display属性为inline-boxs、table-cells、table-captions的不是块盒的块容器(除非这个值已经被传播到视口),以及当overflow不为visible的块盒才会为它的内容创建新的BFC。  
1. float的值不为none
1. position的值为absolute或fixed（div本身形成BFC，但整个块脱离文档流，并且无法被父元素获取高度）
1. display的值为table-cell、table-caption、inline-block、flex 或 inline-flex
1. overflow的值不为visibility

BFC的特性：
1. 在BFC中,盒子都是从它的包含块的顶部一个一个的垂直放置的。两个相邻盒子的垂直间距决定于margin属性。在BFC中,两个相邻块级盒子之间垂直方向上的外边距是会塌陷的。
2. 在BFC中,每个盒子的左外边界挨着包含块的左边界(对于从右到左的格式化,则为右边界互相挨着)。即使是存在浮动元素也是如此(即使一个盒子的行盒是因为浮动而收缩了的),除非这个盒子建立了一个新的BFC(在某些情况下这个盒子自身会因为浮动而变窄)。

举例：
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<p>html根节点默认是一个BFC，&lt;div style="overflow: hidden;"&gt;&lt;/div&gt;生成多个新的BFC</p>
	<hr>

	<p>div1先生成新的BFC，然后div2在根节点的BFC中排列</p>
	<div style="overflow: hidden;">
		<div style="float: left; width: 100px; height: 100px; background: lightgreen;">div1</div>
		<div style="width: 200px; height: 200px; background: pink;">div2</div>
	</div>
	<hr>

	<p>div2先在根节点的BFC中排列，然后div1生成新的BFC</p>
	<div style="overflow: hidden;">
		<div style="width: 200px; height: 200px; background: pink;">div2</div>
		<div style="float: left; width: 100px; height: 100px; background: lightgreen;">div1</div>
	</div>
	<hr>

	<p>div1先生成新的BFC，然后div2生成新的BFC</p>
	<div style="overflow: hidden;"></div>
		<div style="float: left; width: 100px; height: 100px; background: lightgreen;">div1</div>
		<div style="overflow: hidden; width: 200px; height: 200px; background: pink;">div2</div>
	</div>
	<hr>

	<p>不触发BFC，margin重叠</p>
	<div style="overflow: hidden;"></div>
		<div style="margin: 20px; width: 100px; height: 100px; background: lightgreen;">div1</div>
		<div style="margin: 20px; width: 100px; height: 100px; background: pink;">div2</div>
	</div>
	<hr>

	<p>触发BFC，margin不重叠</p>
	<div style="overflow: hidden;"></div>
		<div style="margin: 20px; width: 100px; height: 100px; background: lightgreen;">div1</div>
		<div style="overflow: hidden;">
			<div style="margin: 20px; width: 100px; height: 100px; background: pink;">div2</div>
		</div>
	</div>
	<hr>

	
</body>
</html>	
```
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<!-- body默认是static（没有创建BFC）
    此时body包裹住content
    因为content有margin-top: 200px
    所以虽然body的offsetTop为0但实际距离顶部是200 -->
<body>
	<!-- nav:fixed（创建BFC） -->
	<div style="position: fixed;top: 0;left: 0; width:100%; height:50px; background: rgba(0,0,0,0.5);">nav</div>
	<div style="width: 100%;height: 500px; margin-top: 200px;">content</div>
</body>
</html>
```

# IFC
IFC：行内格式化上下文。
1. 在IFC中，盒子依次水平排列，从它的包含块的最顶端开始。水平方向的margins、borders和paddin体现在这些盒子之间。这些盒子可以在垂直方向可以以不同的方式对齐：底部对齐、顶部对齐或者以内部文字的基线对齐。包含这些盒子的一行矩形区域成为行框。
1. 行框的宽度由包含块和（这行）是否存在float而决定。行框的高度由行高的计算规则决定。
1. 行框的高度永远容得下这一行所有包含的盒子。但是，行框甚至可能比包含的最高的盒子要高（例如，盒子对齐了导致基线排列）（译者注：不是很懂，原文boxes are aligned so that baselines line up）。当盒子B的高度小于包含其的行框的时候，行框内的B的垂直对齐由“vertical-align”属性决定。当一个行框不能装下多个行内框时，它们被打断成二个或多个垂直堆叠的行框。所以，一个段落是读个行框的垂直堆叠。行框在垂直方向没有分隔的堆叠（除了指定的其它地方）并且它们从不重叠。
1. 通常，行框的左边缘紧贴这它的包含块的左边缘，右边缘紧贴这包含块的右边缘。然而，浮动盒子可能出现在包含块的边缘和这个行框的边缘之间。因此，即使说通常情况下同一个包含框内的行框们有一样的宽度，但因为有float元素的存在它们也可能有不同的宽度。同一IFC中的行框通常有不同的高度（例如有一行可能有一个高的图片然而其他行仅有文字）。
1. 当所有内联盒子的宽度总和超过了包含它们的行框的宽度，它们的水平排布由“text-align”属性决定个。如果该属性值为“justify”，用户代理则会拉伸内联框中的空格和单词（出去inline-table喝inline-block的盒子）。
1. 当一个行内框超出了行框的宽度，它会被分割成多个盒子，这些盒子分布在多个行框中。如果这个行内框不能被分割（例如，这个行内框包含一个单字符或者有特定的语言分割规则不允许在行内框中出现分割，再或者说这个行内框被值是nowrap或pre的white-space所影响），因此这个行内框会移除行框。
1. 当一个行内框被分割，margins、borders和paddings并不会在分割处体现出来。
1. 行内框可能会在同一行行框内被分割成多个因为双向文本处理。

注意：
- inline,inline-block没有width属性。宽度由包裹的block决定，换行由word-wrap属性决定

# GFC
GFC(GridLayout Formatting Contexts)：网格布局格式化上下文
 
# FFC
FFC(Flex Formatting Contexts)：自适应格式化上下文

# inline-block和float
共性：
1. inline-block: 是把一个元素的display设置为块状内联元素，意思就是说，让一个元素的容器inline展示，并且里面的内容block展示；inline属性使元素内联展示，内联元素设置宽度无效，相邻的inline元素会在一行显示不换行，直到本行排满为止。block的元素始终会独占一行，呈块状显示，可设置宽高。所以inline-block的元素就是宽高可设置，相邻的元素会在一行显示，直到本行排满，也就是让元素的容器属性为block，内容为inline。
1. float： 设置元素的浮动为左或者右浮动，当设置元素浮动时，相邻元素会根据自身大小，排满一行，如果父容器宽度不够则会换行。当我们设置了元素的浮动时，这个元素就脱离了文档流，相邻元素会呈环绕装排列。  
两者共同点是都可以实现元素在一行显示，并且可以自由设置元素大小。

区别：
1. inline-block: 水平排列一行，即使元素高度不一，也会以高度最大的元素高度为行高，即使高度小的元素周围留空，也不回有第二行元素上浮补位。可以设置默认的垂直对齐基线。
1. float: 让元素脱离当前文档流，呈环绕装排列，如遇上行有空白，而当前元素大小可以挤进去，这个元素会在上行补位排列。默认是顶部对齐。

使用场景：
1. inline-block： 当我们要设置某些元素在一行显示，并且排列方向一致的情况下，我们尽可能去用inline-block。因为inline-block的元素仍然在当前文档流里面，这样就减少了程序对DOM的更改操作，因为DOM的每一次更改，浏览器会重绘DOM树。理论上会增加性能消耗。这样也不用像flaot那样麻烦，需要清除flaot.
1. float： 即使inline-block为布局首选，但是也有inline-block所不能涉及的一些业务需求，比如：有两个元素，我们需要一个向左，一个向右排列，这时候我们就只能用float来实现，对于新手来说，会纠结float不好调，比较麻烦，想到达到预期效果，需要多次调整，有时候我们给元素设置了浮动，元素显示的顺序却变了，一时搞不清楚就改变HTML中元素的前后顺序等等。因为浏览器的解析顺序是逐行解析，当设置两个元素的右浮动时，顺序在前面的元素会先被解析，他是右浮动，那么在前边的元素就先往右浮动占位置，后边的元素依次被解析到以后，才往右排列，这样我们看到的顺序就是反的，当弄明白原因之后，调试就方便多了。
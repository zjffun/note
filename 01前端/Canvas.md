> https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API

# <canvas> 元素
注意: 如果你绘制出来的图像是扭曲的, 尝试用width和height属性为<canvas>明确规定宽高，而不是使用CSS。

<canvas> 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。我们将会将注意力放在2D渲染上下文中。其他种类的上下文也许提供了不同种类的渲染方式；比如， WebGL 使用了基于OpenGL ES的3D上下文 ("experimental-webgl") 。

一个简单的例子：

```
<html>
    <head>
        <script type="application/javascript">
        function draw() {
            var canvas = document.getElementById("canvas");
            if (canvas.getContext) {
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "rgb(200,0,0)";
                ctx.fillRect (10, 10, 55, 50);

                ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
                ctx.fillRect (30, 30, 55, 50);
            }
        }
        </script>
    </head>
    <body onload="draw();">
        <canvas id="canvas" width="150" height="150"></canvas>
    </body>
</html>
```

# 绘制图形
## 矩形
不同于SVG，HTML中的元素canvas只支持一种原生的图形绘制：矩形。

canvas提供了三种方法绘制矩形：

### fillRect(x, y, width, height)  
绘制一个填充的矩形
### strokeRect(x, y, width, height)  
绘制一个矩形的边框
### clearRect(x, y, width, height)  
清除指定矩形区域，让清除部分完全透明。 
```
<html>
    <head>
        <script type="application/javascript">
        function draw() {
            var canvas = document.getElementById("canvas");
            if (canvas.getContext) {
                var ctx = canvas.getContext("2d");
                ctx.fillRect(25,25,100,100);//矩形填充
                ctx.clearRect(45,45,60,60);//矩形透明
                ctx.strokeRect(50,50,50,50);//矩形边框
            }
        }
        </script>
    </head>
    <body onload="draw();">
        <canvas id="canvas" width="150" height="150"></canvas>
    </body>
</html>
```
## 路径
图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

1. 首先，你需要创建路径起始点。
1. 然后你使用画图命令去画出路径。
1. 之后你把路径封闭。
1. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

要用到的函数：
### beginPath()  
新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
### closePath()  
闭合路径之后图形绘制命令又重新指向到上下文中。
### stroke()  
通过线条来绘制图形轮廓。
### fill()  
通过填充路径的内容区域生成实心的图形。 


### moveTo(x, y)  
将笔触移动到指定的坐标x以及y上。 
### lineTo(x, y)  
绘制一条从当前位置到指定x以及y位置的直线。 
### arc(x, y, radius, startAngle, endAngle, anticlockwise)  
画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
### arcTo(x1, y1, x2, y2, radius)  
根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。 
### quadraticCurveTo(cp1x, cp1y, x, y)  
绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
### bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)  
绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。 
### rect(x, y, width, height)  
绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。 


示例:
```
<html>
    <head>
        <script type="application/javascript">
        function draw() {
            var canvas = document.getElementById('canvas');
            if (canvas.getContext){
                var ctx = canvas.getContext('2d');

                roundedRect(ctx,12,12,150,150,15);
                roundedRect(ctx,19,19,150,150,9);
                roundedRect(ctx,53,53,49,33,10);
                roundedRect(ctx,53,119,49,16,6);
                roundedRect(ctx,135,53,49,33,10);
                roundedRect(ctx,135,119,25,49,10);

                ctx.beginPath();
                ctx.arc(37,37,13,Math.PI/7,-Math.PI/7,false);
                ctx.lineTo(31,37);
                ctx.fillStyle = "black";
                ctx.fill();

                for(var i=0;i<8;i++){
                    ctx.fillRect(51+i*16,35,4,4);
                }

                for(i=0;i<6;i++){
                    ctx.fillRect(115,51+i*16,4,4);
                }

                for(i=0;i<8;i++){
                    ctx.fillRect(51+i*16,99,4,4);
                }

                ctx.beginPath();
                ctx.moveTo(83,116);
                ctx.lineTo(83,102);
                ctx.bezierCurveTo(83,94,89,88,97,88);
                ctx.bezierCurveTo(105,88,111,94,111,102);
                ctx.lineTo(111,116);
                ctx.lineTo(106.333,111.333);
                ctx.lineTo(101.666,116);
                ctx.lineTo(97,111.333);
                ctx.lineTo(92.333,116);
                ctx.lineTo(87.666,111.333);
                ctx.lineTo(83,116);
                ctx.fill();

                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.moveTo(91,96);
                ctx.bezierCurveTo(88,96,87,99,87,101);
                ctx.bezierCurveTo(87,103,88,106,91,106);
                ctx.bezierCurveTo(94,106,95,103,95,101);
                ctx.bezierCurveTo(95,99,94,96,91,96);
                ctx.moveTo(103,96);
                ctx.bezierCurveTo(100,96,99,99,99,101);
                ctx.bezierCurveTo(99,103,100,106,103,106);
                ctx.bezierCurveTo(106,106,107,103,107,101);
                ctx.bezierCurveTo(107,99,106,96,103,96);
                ctx.fill();

                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc(101,102,2,0,Math.PI*2,true);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(89,102,2,0,Math.PI*2,true);
                ctx.fill();
            }
        }

        // 封装的一个用于绘制圆角矩形的函数.
        function roundedRect(ctx,x,y,width,height,radius){
            ctx.beginPath();
            ctx.moveTo(x,y+radius);
            ctx.lineTo(x,y+height-radius);

            // 左下的圆角
            // 起点
            ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
            ctx.fillRect (x,y+height-radius,5,5);
            ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
            // 控制点
            ctx.fillStyle = "rgba(0, 200, 0, 0.5)";
            ctx.fillRect (x,y+height,5,5);
            // 结束点
            ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            ctx.fillRect (x+radius,y+height,5,5);

            ctx.lineTo(x+width-radius,y+height);
            ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
            ctx.lineTo(x+width,y+radius);
            ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
            ctx.lineTo(x+radius,y);
            ctx.quadraticCurveTo(x,y,x,y+radius);
            ctx.stroke();
        }
        </script>
    </head>
    <body onload="draw();">
        <canvas id="canvas" width="300" height="300"></canvas>
    </body>
</html>
```

## Path2D 对象

# 样式和颜色
## 色彩 Colors

### fillStyle = color  
设置图形的填充颜色。
### strokeStyle = color  
设置图形轮廓的颜色。

## 透明度 Transparency

- globalAlpha = transparencyValue
这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。 

## 线型 Line styles
### lineWidth = value  
设置线条宽度。
### lineCap = type  
设置线条末端样式。
### lineJoin = type  
设定线条与线条间接合处的样式。
### miterLimit = value  
限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。

### getLineDash()  
返回一个包含当前虚线样式，长度为非负偶数的数组。
### setLineDash(segments)  
设置当前虚线样式。
### lineDashOffset = value  
设置虚线样式的起始偏移量。

## 渐变 Gradients

### createLinearGradient(x1, y1, x2, y2)  
createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。
### createRadialGradient(x1, y1, r1, x2, y2, r2)  
createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。 

### gradient.addColorStop(position, color)
addColorStop 方法接受 2 个参数，position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）。 

```
<html>
    <head>
        <script type="application/javascript">
        function draw() {
            var ctx = document.getElementById('canvas').getContext('2d');

            // 创建渐变
            var radgrad = ctx.createRadialGradient(45,45,10,52,50,30);
            radgrad.addColorStop(0, '#A7D30C');
            radgrad.addColorStop(0.9, '#019F62');
            radgrad.addColorStop(1, 'rgba(1,159,98,0)');

            var radgrad2 = ctx.createRadialGradient(105,105,20,112,120,50);
            radgrad2.addColorStop(0, '#FF5F98');
            radgrad2.addColorStop(0.75, '#FF0188');
            radgrad2.addColorStop(1, 'rgba(255,1,136,0)');

            var radgrad3 = ctx.createRadialGradient(95,15,15,102,20,40);
            radgrad3.addColorStop(0, '#00C9FF');
            radgrad3.addColorStop(0.8, '#00B5E2');
            radgrad3.addColorStop(1, 'rgba(0,201,255,0)');

            var radgrad4 = ctx.createRadialGradient(0,150,50,0,140,90);
            radgrad4.addColorStop(0, '#F4F201');
            radgrad4.addColorStop(0.8, '#E4C700');
            radgrad4.addColorStop(1, 'rgba(228,199,0,0)');

            // 画图形
            ctx.fillStyle = radgrad4;
            ctx.fillRect(0,0,150,150);
            ctx.fillStyle = radgrad3;
            ctx.fillRect(0,0,150,150);
            ctx.fillStyle = radgrad2;
            ctx.fillRect(0,0,150,150);
            ctx.fillStyle = radgrad;
            ctx.fillRect(0,0,150,150);
        }
        </script>
    </head>
    <body onload="draw();">
        <canvas id="canvas" width="300" height="300"></canvas>
    </body>
</html>
```

## 图案样式 Patterns

### createPattern(image, type)  
该方法接受两个参数。Image 可以是一个 Image 对象的引用，或者另一个 canvas 对象。Type 必须是下面的字符串值之一：repeat，repeat-x，repeat-y 和 no-repeat。   
注意：与 drawImage 有点不同，你需要确认 image 对象已经装载完毕，否则图案可能效果不对的。

```
<html>
    <head>
        <script type="application/javascript">
        function draw() {
            var ctx = document.getElementById('canvas').getContext('2d');

            // 创建新 image 对象，用作图案
            var img = new Image();
            img.src = 'https://developer.mozilla.org/static/img/web-docs-sprite.22a6a085cf14.svg';
            img.onload = function(){

                // 创建图案
                var ptrn = ctx.createPattern(img,'repeat');
                ctx.fillStyle = ptrn;
                ctx.fillRect(0,0,150,150);

            }
        }
        </script>
    </head>
    <body onload="draw();">
        <canvas id="canvas" width="300" height="300"></canvas>
    </body>
</html>
```

## 阴影 Shadows

### shadowOffsetX = float  
shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
### shadowOffsetY = float  
shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
### shadowBlur = float  
shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
### shadowColor = color  
shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

## Canvas 填充规则
当我们用到 fill（或者 clip和isPointinPath ）你可以选择一个填充规则，该填充规则根据某处在路径的外面或者里面来决定该处是否被填充，这对于自己与自己路径相交或者路径被嵌套的时候是有用的。

两个可能的值：

- "nonzero": non-zero winding rule, 默认值.
- "evenodd":  even-odd winding rule.


## 绘制文本

### fillText(text, x, y [, maxWidth])  
在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.
### strokeText(text, x, y [, maxWidth])  
在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的. 


## 有样式的文本

### font = value  
当前我们用来绘制文本的样式. 这个字符串使用和 CSS font 属性相同的语法. 默认的字体是 10px sans-serif。
### textAlign = value  
文本对齐选项. 可选的值包括：start, end, left, right or center. 默认值是 start。
### textBaseline = value  
基线对齐选项. 可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。
### direction = value  
文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。 

## 预测量文本宽度

### measureText()  
将返回一个 TextMetrics对象的宽度、所在像素，这些体现文本特性的属性。  

# 图像

## 获得需要绘制的图片

canvas的API可以使用下面这些类型中的一种作为图片的源：

- HTMLImageElement  
这些图片是由Image()函数构造出来的，或者任何的<img>元素
- HTMLVideoElement  
用一个HTML的 \<video\>元素作为你的图片源，可以从视频中抓取当前帧作为一个图像
- HTMLCanvasElement  
可以使用另一个 <canvas> 元素作为你的图片源。
- ImageBitmap  
这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成。

这些源统一由 CanvasImageSource类型来引用。

## 绘制图片

一旦获得了源图对象，我们就可以使用 drawImage 方法将它渲染到 canvas 里。drawImage 方法有三种形态，下面是最基础的一种。

### drawImage(image, x, y)  
其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。 

## 缩放

drawImage 方法的又一变种是增加了两个用于控制图像在 canvas 中缩放的参数。

### drawImage(image, x, y, width, height)  
这个方法多了2个参数：width 和 height，这两个参数用来控制 当向canvas画入时应该缩放的大小 

## 切片

drawImage 方法的第三个也是最后一个变种有8个新参数，用于控制做切片显示的。

### drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)  
第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。其它8个参数最好是参照右边的图解，前4个是定义图像源的切片位置和大小，后4个则是定义切片的目标显示位置和大小。 

# 变形

## 状态的保存和恢复

### save() 和 restore()  
保存和恢复 canvas 状态的，都没有参数。

Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。

Canvas状态存储在栈中，每当save()方法被调用后，当前的状态就被推送到栈中保存。一个绘画状态包括：
- 当前应用的变形（即移动，旋转和缩放）
- strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, - globalCompositeOperation 的值
- 当前的裁切路径（clipping path）

你可以调用任意多次 save 方法。

每一次调用 restore 方法，上一个保存的状态就从栈中弹出，所有设定都恢复。


## 移动

移动 canvas 和它的原点到一个不同的位置。

### translate(x, y)  
translate 方法接受两个参数。x 是左右偏移量，y 是上下偏移量，如右图所示。

在做变形之前先保存状态是一个良好的习惯。大多数情况下，调用 restore 方法比手动恢复原先的状态要简单得多。又，如果你是在一个循环中做位移但没有保存和恢复 canvas 的状态，很可能到最后会发现怎么有些东西不见了，那是因为它很可能已经超出 canvas 范围以外了。

## 旋转

用于以原点为中心旋转 canvas。

### rotate(angle)  
这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。

旋转的中心点始终是 canvas 的原点，如果要改变它，我们需要用到 translate 方法。


## 缩放

增减图形在 canvas 中的像素数目，对形状，位图进行缩小或者放大。

### scale(x, y)  
scale 方法接受两个参数。x,y 分别是横轴和纵轴的缩放因子，它们都必须是正值。值比 1.0 小表示缩小，比 1.0 大则表示放大，值为 1.0 时什么效果都没有。 


## 变形

对变形矩阵直接修改。

### transform(m11, m12, m21, m22, dx, dy)  
这个方法是将当前的变形矩阵乘上一个基于自身参数的矩阵，在这里我们用下面的矩阵：
```
m11 m21 dx
m12 m22 dy
0   0   1
```

如果任意一个参数是无限大，变形矩阵也必须被标记为无限大，否则会抛出异常。

这个函数的参数各自代表如下：
- m11：水平方向的缩放
- m12：水平方向的倾斜偏移
- m21：竖直方向的倾斜偏移
- m22：竖直方向的缩放
- dx：水平方向的移动
- dy：竖直方向的移动

### setTransform(m11, m12, m21, m22, dx, dy)  
这个方法会将当前的变形矩阵重置为单位矩阵，然后用相同的参数调用 transform 方法。如果任意一个参数是无限大，那么变形矩阵也必须被标记为无限大，否则会抛出异常。从根本上来说，该方法是取消了当前变形,然后设置为指定的变形,一步完成。

### resetTransform()  
重置当前变形为单位矩阵，它和调用以下语句是一样的：ctx.setTransform(1, 0, 0, 1, 0, 0);

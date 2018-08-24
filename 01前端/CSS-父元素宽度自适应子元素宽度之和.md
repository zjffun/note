最近碰见这样一个需求，要让图片横向排列设置x方向的滚动条滚动查看，原本当直接创建一个IFC（inline，float什么的）就解决了，搞了半天发现搞不定（IFC也是不能父元素宽度自适应子元素宽度之和的，因为会换行。。），最后用flex解决了（然后又发现使用table也是可以的），然后学了两个新名词GFC和FFC。。这里就说一下我的解决方法，给大家抛个砖。

# flex
```
<style>
    /*1. 最外层容器
        width: 200px;
        overflow-x: scroll;
    */
    .img-view{
        width: 200px;
        overflow-x: scroll;
    }
    /*2. 次外层容器 display: flex;*/
    .container{
        display: flex;
    }
    .container > div{
        border-top: 1px solid #000;
    }
    .container > div:nth-child(1){
        background: pink;
    }
    .container > div:nth-child(2){
        background: yellow;
    }
    .container > div:nth-child(3){
        background: red;
    }
    /*3. 外层容器 flex-shrink: 0;
        外层容器和图片 width: 100px;
    */
    .box{
        width: 100px;
        flex-shrink: 0;/*默认是1 (经测试iniline-flex的flex-item应该默认是0)*/
    }
    .box > img{
        width: 100px;
    }
</style>
<div class="img-view">
    <div class="container">
        <div class="box">
            <img src="https://via.placeholder.com/110x120" alt="">
        </div>  
        <div class="box">
            <img src="https://via.placeholder.com/140x110" alt="">
        </div>
        <div class="box">
            <img src="https://via.placeholder.com/130x130" alt="">
        </div> 
        <div class="box">
            <img src="https://via.placeholder.com/90x150" alt="">
        </div> 
    </div>
    <div class="container">
        <div class="box">
            <p>img1 110*120</p>
        </div>  
        <div class="box">
            <p>img2 140*110</p>
        </div>
        <div class="box">
            <p>img3 130*130</p>
        </div> 
        <div class="box">
            <p>img4 90*150</p>
        </div> 
    </div>
</div>

```

# table
```
<style>
    /*1. 最外层容器
        width: 200px;
        overflow-x: scroll;
    */
    .img-view{
        width: 200px;
        overflow-x: scroll;
    }
    /*2. 次外层容器 display: table;*/
    .container{
        display: table;
    }
    .container > div{
        border-top: 1px solid #000;
    }
    .container > div:nth-child(1){
        background: pink;
    }
    .container > div:nth-child(2){
        background: yellow;
    }
    .container > div:nth-child(3){
        background: red;
    }
    /*3. 外层容器 display: table-cell;
        外层容器，图片和段落 width: 100px;
    */
    .box{
        display: table-cell;
        width: 100px;
        vertical-align: top;/*默认bottom*/
    }
    .box > img, p{
        width: 100px;
    }
</style>
<div class="img-view">
    <div class="container">
        <div class="box">
            <img src="https://via.placeholder.com/110x120" alt="">
        </div>  
        <div class="box">
            <img src="https://via.placeholder.com/140x110" alt="">
        </div>
        <div class="box">
            <img src="https://via.placeholder.com/130x130" alt="">
        </div> 
        <div class="box">
            <img src="https://via.placeholder.com/90x150" alt="">
        </div> 
    </div>
    <div class="container">
        <div class="box">
            <p>img1 110*120</p>
        </div>  
        <div class="box">
            <p>img2 140*110</p>
        </div>
        <div class="box">
            <p>img3 130*130</p>
        </div> 
        <div class="box">
            <p>img4 90*150</p>
        </div> 
    </div>
</div>
```

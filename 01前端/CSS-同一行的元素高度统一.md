# 一：flex大法

## 步骤
1. 设置外部容器 `display: flex;`
2. 设置内部容器 `align-items: stretch;`

## 原理
> https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout

## 示例
```
<style>
    /*1. 设置外部容器 display: flex;*/
    .container{
        display: flex;
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
    /*2. 设置内部容器 align-items: stretch;*/
    .box{
        align-items: stretch;
        width: 100px;
        margin-left: 20px;
    }
</style>
<div class="container">
    <div class="box">
        <img src="https://via.placeholder.com/120x200" width="100px" alt="">
        <p>img1 120*200</p>
    </div>  
    <div class="box">
        <img src="https://via.placeholder.com/120x300" width="100px" alt="">
        <p>img2 120*300</p>
    </div>
    <div class="box">
        <img src="https://via.placeholder.com/120x150" width="100px" alt="">
        <p>img3 120*150</p>
    </div> 
</div>
<script>
    // 点击拓展高度的区域也可触发事件
    document.querySelectorAll('.box').forEach((d) => {
        d.onclick = function(e){
            alert(e.target.innerText);
        }   
    })
</script>
```


# 二：padding补偿法
网上搜了一下发现这种方法居然有这种这个高大上的名词。。

## 步骤
1. 设置外部容器超出隐藏：`overflow: hidden;`
2. 设置内部容器一个很大的padding-bottom和负margin-bottom：`margin-bottom:-10000px; padding-bottom:10000px;`

## 原理
> https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-bottom  
CSS的 margin-bottom 属性用于设置元素的底部外边距，允许设置负数值。一个正数值将让它相对于正常流与邻近块更远，而负数值将使得更近。

我的理解是用padding-bottom把外部容器撑开（外部容器设置了overflow: hidden;已经创建BFC），然后负的margin-bottom并不会将元素实际高度改变，只会改变这个容器计算时的高度，这样外部容器的高度计算时就为最高内部容器高度了。

## 示例
```
<style>
    /*1. 设置外部容器overflow: hidden;*/
    .container{
        overflow: hidden;
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
    /*2. 设置内部容器
        margin-bottom:-10000px;
        padding-bottom:10000px;
    */
    .box{
        margin-bottom:-10000px;
        padding-bottom:10000px;
        width: 100px;
        float: left;
        margin-left: 20px;
    }
</style>
<div class="container">
    <div class="box">
        <img src="https://via.placeholder.com/120x200" width="100px" alt="">
        <p>img1 120*200</p>
    </div>  
    <div class="box">
        <img src="https://via.placeholder.com/120x300" width="100px" alt="">
        <p>img2 120*300</p>
    </div>
    <div class="box">
        <img src="https://via.placeholder.com/120x150" width="100px" alt="">
        <p>img3 120*150</p>
    </div> 
</div>
<script>
    // 点击补偿的的区域也可触发事件
    document.querySelectorAll('.box').forEach((d) => {
        d.onclick = function(e){
            alert(e.target.innerText);
        }   
    })
</script>
```



# 三：table布局
相当于用\<table\>

## 步骤
1. 设置外部容器 `display: table;`
2. 设置内部容器 `display: table-cell;`

## 原理
> https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout

## 示例
```
<style>
    /*1. 设置外部容器 display: table;*/
    .container{
        display: table;
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
    /*2. 设置内部容器 display: table-cell;*/
    .box{
        display: table-cell;
        /*vertical-align: top; 默认是bottom*/
        width: 100px;
        /*margin-left: 20px; table布局下会失效*/
    }
</style>
<div class="container">
    <div class="box">
        <img src="https://via.placeholder.com/120x200" width="100px" alt="">
        <p>img1 120*200</p>
    </div>  
    <div class="box">
        <img src="https://via.placeholder.com/120x300" width="100px" alt="">
        <p>img2 120*300</p>
    </div>
    <div class="box">
        <img src="https://via.placeholder.com/120x150" width="100px" alt="">
        <p>img3 120*150</p>
    </div> 
</div>
<script>
    // 点击拓展高度的区域也可触发事件
    document.querySelectorAll('.box').forEach((d) => {
        d.onclick = function(e){
            alert(e.target.innerText);
        }   
    })
</script>
```

# 垂直居中
## 1. 已知外部高度：
- 高度和行高相等（内联）
```
<!DOCTYPE html>
<style>
*{
  font-size: 6px;
}
div.demo{
  background: green;
  border: 1px solid #000;
  margin: 5px;
}
.demo{
  height: 30px;
  /*line-height百分比是根据自身高度计算的*/
  line-height: 30px;
  /*防止内容超出容器或者产生自动换行*/
  overflow: hidden;
}
</style>
<div class="demo">
  test-text
</div>
<div class="demo">
  <div style="height: 10px;background: pink;">test-div</div>
</div>
```
- 使用table布局（内联，块级）
```
<!DOCTYPE html>
<style>
*{
  font-size: 6px;
}
div.demo{
  background: green;
  border: 1px solid #000;
  margin: 5px;
}
.demo{
  display: table-cell;
  /*height百分比无效*/
  height: 30px;
  vertical-align: middle;
}
/*
防止溢出（table-cell的高度会随着内容增加）：内部放个div
div.vc-table{
  height: 150px;
  display: table-cell;
  vertical-align: middle;
}
div.vc-table-overflow{
  max-height: 150px;
  overflow: hidden;
}
*/
</style>
<div class="demo">
  test-text
</div>
<div class="demo">
  <div style="height: 10px;background: pink;">test-div</div>
</div>
```
## 2. 任意外部高度：
- padding-top，padding-bottom相等
```
.demo{
    padding-top: 30px;
    padding-bottom: 30px;
} 
```
# 将表格边框合并
通过对table的border-collapse和border-spacing进行设置
```
table{
  /*合并边框*/
  border-collapse: collapse;
  /*设置相邻单元格的边框间的距离*/
  border-spacing: 0;
}
th, td{
  border:1px solid #000; 
}
```

# css3动画注意
dom上的样式要和动画的起始样式相同  
eg：.animate-div和MyAnimateScript里from的样式都是red
```
html:
<div class="animate-div">要动画的div</div>

css:
.animate-div{
  color:red;
}
.animate {
  animation: MyAnimateScript 3s;
}
@keyframes MyAnimateScript {
  from {color:red;}
  to {color:green;}
}

jq:
$('.animate-div').click(function(){
  $(this).addClass("animate");
});
```
# outline注意
outline会被其他元素遮挡。
解决：将遮挡的元素不设置背景色（设置背景色透明）。
```html
<!DOCTYPE html>
<style>
.k-captcha{
  //这里设置背景色
  height: 70px;
  background: #fff;
}
.k-captcha:after{
  clear: both;
}
.k-captcha .k-captcha-part{
  //这里设置背景色会遮挡.k-captcha-part > input:checked + div的outline
  height: 100%;
  width: 20%;
  float: left;
}
.k-captcha-part > div{
  //这里设置背景色也会遮挡.k-captcha-part > input:checked + div的outline
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-right: 1px solid #f5f8f9;
  text-align: center;
  cursor: pointer;
}
.k-captcha-part > input:checked + div{
  background-color: #e8f3db;
  outline: #8ac249 2px solid;
}
</style>
<div class="k-captcha">
  <div class="k-captcha-part">
    <input id="k-captcha-1" type="radio" name="captcha" style="display: none">
    <div onclick="var preNode = document.getElementById('k-captcha-1');preNode.checked ? preNode.checked = false : preNode.checked = true;"><img src="" alt="">php</div>
  </div>
  <div class="k-captcha-part">
    <input id="k-captcha-2" type="radio" name="captcha" style="display: none">
    <div onclick="var preNode = document.getElementById('k-captcha-2');preNode.checked ? preNode.checked = false : preNode.checked = true;"><img src="" alt="">php</div>
  </div>
</div>
```

# float多行排版乱了
==注意每个float元素的高度==，高度一样不会乱



# 伪元素
伪元素都是在容器内渲染的，input、button、textarea、br等内部不能插入元素的无法使用伪元素。

# 像素
像素和厘米不能直接转换，只有分辩率（dpi）下才能转换  
平时经常使用72和300dpi，电脑显示器用72dpi，照片用300dpi  
72dpi     1厘米=28.346像素  
300dpi    1厘米=118.11像素  

# 库
- 重置CSS：`npm install minireset.css`
- 标准化CSS：`npm install normalize.css`


https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scaleX

# 镜像
```
transform: scaleX(-1);/*左右翻转*/
```



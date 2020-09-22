让每列高度自适应父元素高度，如果父元素高度固定直接用百分比就行，但父元素高度是 auto（通过子元素计算）的话就得用下面的方法了。

```html
<!DOCTYPE html>
<style>
  .left {
    height: 200px;
    width: 200px;
    background: aqua;
  }

  .right {
    border-radius: 16px;
    width: 200px;
    background: violet;
  }
</style>

<h1>flex</h1>
<div style="display: flex;">
  <div class="left">200px</div>
  <div class="right" style="align-self: stretch;">adaptive</div>
</div>

<h1>table</h1>
<div style="display: table;">
  <div class="left" style="display: table-cell;">200px</div>
  <div class="right" style="display: table-cell;">adaptive</div>
</div>

<h1>position</h1>
<div
  style="
    position: relative;
    width: 400px;"
>
  <div class="left">200px</div>
  <div
    class="right"
    style="
      position: absolute; 
      top: 0; 
      right: 0; 
      height: 100%;"
  >
    adaptive
  </div>
</div>

<h1>float + padding + margin</h1>
<p>这种方式只能让背景色延伸到父元素边界</p>
<div style="overflow: hidden;">
  <div class="left" style="float: left">200px</div>
  <div
    class="right"
    style="
      float: left; 
      padding-bottom: 9999px; 
      margin-bottom: -9999px;"
  >
    adaptive
  </div>
</div>
```

-   参见：[html - CSS - Expand float child DIV height to parent's height - Stack Overflow](https://stackoverflow.com/questions/4804581/css-expand-float-child-div-height-to-parents-height)

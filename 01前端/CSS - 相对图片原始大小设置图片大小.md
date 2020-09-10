使用 `inline-block` 的对内表现为块级盒子，盒子大小会根据内容计算的特性可以实现。（盒子大小还会与包裹它的容器的大小有关）

```html
<!DOCTYPE html>

<style>
  .relative-self-img {
    display: inline-block;
  }

  .relative-self-img img {
    width: 10%;
  }

  .box {
    width: 1000px;
    height: 420px;
    border: 3px solid aqua;
  }
</style>

<div class="box">
  <p>外部盒子 1000*420， 图片 600*600 缩放 10%</p>
  <span class="relative-self-img">
    <img
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599750913019&di=bf357ea2036cddb93626ae5645bdcb5c&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%3A8080%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F42e0f0df-c653-4357-86f3-df20ee8692b0.png"
      alt=""
    />
  </span>
</div>
```

参见：<https://stackoverflow.com/a/25026615/11949765>

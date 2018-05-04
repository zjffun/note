VueJS 使用 ES5 提供的 Object.defineProperty() 方法实现数据绑定。  
感觉实现时主要是在defineProperty的set和get上做了很多文章，在get中确定了data和view的依赖关系，这样在data改调用set时就可以根据依赖修改view。   
[Object.defineProperty() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

# 确定data和view控件（watcher）的依赖关系（dep）：get

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.js"></script>
  </head>
<body>
  输入值：<input id="val" type="text"><br>
  文本值：<span id="text"></span><br>
  <script>
    var data = {};
    var input = 'default';
    var dep = [];
    var watcher = null;
    // 对data的input进行绑定
    Object.defineProperty(data, 'input', {
      // 获取obj.input时调用，获取到的obj.input的值为get函数return的值
      get: function(){
        // 如果有watcher就添加到dep中（与data的input绑定）
        if (watcher) {
          dep.push(watcher);
        }
        return input;
      }
    });

    // 找到view中与data.input绑定的控件进行绑定
    // 第一个观察者
    watcher = {jq: $('#val'), type: 'val'};
    watcher.jq.val(data.input);
    watcher.jq.keyup(function(){    
      data.input = $(this).val();
    });
    watcher = null;
    
    // 第二个观察者
    watcher =  {jq: $('#text'), type: 'text'};
    watcher.jq.text(data.input);
    watcher = null;
    console.log(dep);

    /*
    //用jQuery实现：
    var data = {};
    var input = 'default';
    var dep = [];
    var watcher = null;
    
    // 第一个观察者
    watcher = {jq: $('#val'), type: 'val'};
    dep.push(watcher);
    watcher.jq.val(input);
    watcher.jq.keyup(function(){    
      data.input = $(this).val();
    });

    // 第二个观察者
    watcher =  {jq: $('#text'), type: 'text'};
    dep.push(watcher);
    watcher.jq.text(input);
    console.log(dep);
    */
  </script>
</body>
</html>
```


# 监听data的改变，更新依赖于（depend on）data的view控件（watcher）：set

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.js"></script>
  </head>
<body>
  输入值：<input id="val" type="text"><br>
  文本值：<span id="text"></span><br>
  <button id="get">假设从后台请求数据了</button>
  <script>
    var data = {};
    var input = 'default';
    var dep = [];
    var watcher = null;
    // 对data的input进行绑定
    Object.defineProperty(data, 'input', {
      // 获取obj.input时调用，获取到的obj.input的值为get函数return的值
      get: function(){
        // 如果有watcher就添加到dep中（与data的input绑定）
        if (watcher) {
          dep.push(watcher);
        }
        return input;
      },
      /* 
      对obj.input赋值时调用，val是准备赋值的值
      获取obj.input时会调用get，没有get会返回undefined
      （如果只想obj的input《本身》赋值可以设置writable: true,value: 默认值，
      但这时再设置get和set就会产生异常）
      */
      set: function(val){
        if (val != input) {
          input = val;
          $(dep).each(function(){
            if (this.type = 'val') {
              this.jq.val(input);
            }
            if (this.type = 'text') {
              this.jq.text(input);
            }
          });
        }
      }
    });

    // 找到view中与data.input绑定的控件进行绑定
    // 第一个观察者
    watcher = {jq: $('#val'), type: 'val'};
    watcher.jq.val(data.input);
    watcher.jq.keyup(function(){    
      data.input = $(this).val();
    });
    watcher = null;

    // 第二个观察者
    watcher =  {jq: $('#text'), type: 'text'};
    watcher.jq.text(data.input);
    watcher = null;
    console.log(dep);

    $('#get').click(function(){
      data.input = '后台的数据';
    });

    /*
    //用jQuery实现：
    var data = {};
    var input = 'default';
    var dep = [];
    var watcher = null;
    
    // 第一个观察者
    watcher = {jq: $('#val'), type: 'val'};
    dep.push(watcher);
    watcher.jq.val(input);
    watcher.jq.keyup(function(){
      var input = $(this).val();
      $(dep).each(function(){
        if (this.type = 'val') {
          this.jq.val(input);
        }
        if (this.type = 'text') {
          this.jq.text(input);
        }
      });    
    });

    // 第二个观察者
    watcher =  {jq: $('#text'), type: 'text'};
    dep.push(watcher);
    watcher.jq.text(input);
    console.log(dep);

    $('#get').click(function(){
      var input = '后台的数据'
      $(dep).each(function(){
        if (this.type = 'val') {
          this.jq.val(input);
        }
        if (this.type = 'text') {
          this.jq.text(input);
        }
      });
    });
    */
  </script>
</body>
</html>
```


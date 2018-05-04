
## 下面是进行测试和研究怎么实现的用的

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.js"></script>
  </head>
<body>
  改变页面大小试试<br>
  <script>
    /**
    * Resize function without multiple trigger
    * 
    * Usage:
    * $(window).smartresize(function(){  
    *     // code here
    * });
    */
    (function($,sr){
      // debouncing function from John Hann
      // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
      /*
      func：执行的函数
      threshold：执行相隔的时间
      execAsap：exec As Soon As Possible不管执行相隔的时间，直接执行函数
      */
      var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
            if (!execAsap)
              // 让调用smartresize的对象执行
              func.apply(obj, args);
            /*
            timeout = null;：这个语句只是单纯将timeout指向null，
            而timeout指向的定时器还存在，
            要想清除定时器（让setTimeout调用的函数不执行）要用clearTimeout(timeout)。
            eg：
            var timeout = setTimeout(function(){
              alert('timeout = null');// 执行
            },1000);
            timeout = null;
            var timeout = setTimeout(function(){
              alert('clearTimeout(timeout)');// 不执行
            },1000);
            clearTimeout(timeout);
            var timeout = setTimeout(function(){
              clearTimeout(timeout);
              alert('clearTimeout(timeout)');// 执行（已经开始执行匿名函数了）
            },1000);
            */ 
            timeout = null; 
          }

          if (timeout)
            // 如果有timeout正在倒计时，则清除当前timeout
            clearTimeout(timeout);
          else if (execAsap)
            // 如果定义了execAsap就立即执行
            func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100); 
        };
      };

      // smartresize 
      /*
      $(window).smartresize()调用：$(window).trigger('smartresize')
      $(window).smartresize(xxxfunction)调用：$(window).bind('resize', debounce(xxxfunction))*/
      jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
    })(jQuery,'smartresize');
    $(window).smartresize(function(){
      document.body.innerHTML += 'smartresize<br>';
    });
  </script>
</body>
</html>
```

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.js"></script>
  </head>
<body>
  <div style="height: 3000px"></div>
  <div id="msg" style="position: fixed;top: 0;left: 0">滚动滚动条试试<br></div>
  <script>
    (function($,ss){
      // debouncing function from John Hann
      // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
      /*
      func：执行的函数
      threshold：执行相隔的时间
      execAsap：exec As Soon As Possible不管执行相隔的时间，直接执行函数
      */
      var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
            if (!execAsap)
              // 让调用smartresize的对象执行
              func.apply(obj, args);
            /*
            timeout = null;：这个语句只是单纯将timeout指向null，
            而timeout指向的定时器还存在，
            要想清除定时器（让setTimeout调用的函数不执行）要用clearTimeout(timeout)。
            eg：
            var timeout = setTimeout(function(){
              alert('timeout = null');// 执行
            },1000);
            timeout = null;
            var timeout = setTimeout(function(){
              alert('clearTimeout(timeout)');// 不执行
            },1000);
            clearTimeout(timeout);
            var timeout = setTimeout(function(){
              clearTimeout(timeout);
              alert('clearTimeout(timeout)');// 执行（已经开始执行匿名函数了）
            },1000);
            */ 
            timeout = null; 
          }

          if (timeout)
            // 如果有timeout正在倒计时，则清除当前timeout
            clearTimeout(timeout);
          else if (execAsap)
            // 如果定义了execAsap就立即执行
            func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100); 
        };
      };

      jQuery.fn[ss] = function(fn){  return fn ? this.bind('scroll', debounce(fn)) : this.trigger(ss); };
    })(jQuery,'smartscroll');
    $(window).smartscroll(function(){
      document.querySelector('#msg').innerHTML += 'smartscroll<br>';
    });
  </script>
</body>
</html>
```

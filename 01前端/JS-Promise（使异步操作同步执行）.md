> [Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)  
> [Promise - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000)

使用Promise使异步操作同步执行非常方便，我在遇到了使不确定个数个异步操作同步执行时学习了很久这个Promise的使用（当时因为没有理解透彻也纠结了好久），并进行总结，希望可以帮到大家（reject和catch没写在这里）

# 单个异步操作同步
```
<div id="box"></div>
<script>
  var box = document.querySelector('#box')
  var p = new Promise(function(resolve, reject){
    setTimeout(function(){
      box.innerHTML += '网络请求<br>';
      resolve()
    }, 1000)
  })
  p.then(function(resolve){
    box.innerHTML += '结束<br><hr>';
  })
</script>
```

# 确定个数异步操作同步
```
<div id="box"></div>
<script>
  var p = new Promise(function(resolve, reject){
    setTimeout(function(){
      box.innerHTML += '建立连接<br>';
      resolve('ok')
    }, 1000)
  })
  function post_sth(data){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        box.innerHTML += 'post网络请求,此时data='+data+' <br>';
        resolve(data+'|post')
      }, 1000)
    })
  }
  function get_sth(data){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        box.innerHTML += 'get网络请求,此时data='+data+' <br>';
        resolve(data+'|get')
      }, 1000)
    })
  }
  
  p.then(post_sth).then(get_sth).then(post_sth).then(function(data){
    box.innerHTML += '最后data='+data+'<br><hr>';
  });
</script>
```

# 不定个数异步操作同步
```
<div id="box"></div>
<script>
  var p = new Promise(function(resolve, reject){resolve()})
  /**
    function
      返回function（供本then用）
        返回Promise（供下一个then用）
  */
  function get_request_sth_func(i){
    return function request_sth(){
      return new Promise(function(resolve, reject){
        setTimeout(function(){
          box.innerHTML += '请求'+i+'<br>';
          resolve()
        }, Math.round(Math.random()*1000))
      })
    }
  }
  for (var i = 0; i < 20; ++i) {
    p = p.then(get_request_sth_func(i))
  }
  p.then(function(){
    box.innerHTML += '完成<br><hr>';
  })
</script>
```
# async function
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function
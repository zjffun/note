# 单个异步操作同步

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

# 确定个数异步操作同步

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

# 不定个数异步操作同步

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

# 处理异常

-   使用`obj.catch(onRejected)`或`obj.then(undefined, onRejected)`处理。

-   Promise 内的异常无法抛出到`Promise`外部，只能在上述的回调函数中处理（和`setTimeout()` `process.nextTick()`类似，`Promise`也会生成新的调用栈）。

# `async function`

> <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function>

# 原理

```js
function Promise(fn) {
  var state = "pending",
    value = null,
    callbacks = [];

  /**
   * promise 的 then 方法
   * @returns {Promise}
   */
  this.then = function(onFulfilled, onRejected) {
    return new Promise(function(resolve, reject) {
      handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve: resolve,
        reject: reject
      });
    });
  };

  /**
   * 根据 promise 的 state 处理 callback
   * @param {Object} callback
   */
  function handle(callback) {
    if (state === "pending") {
      callbacks.push(callback);
      return;
    }

    var cb = state === "fulfilled" ? callback.onFulfilled : callback.onRejected,
      ret;
    if (cb === null) {
      cb = state === "fulfilled" ? callback.resolve : callback.reject;
      cb(value);
      return;
    }
    try {
      ret = cb(value);
      callback.resolve(ret);
    } catch (e) {
      callback.reject(e);
    }
  }

  /**
   * 执行 promise 的 resolve
   * @param {*} newValue
   */
  function resolve(newValue) {
    if (
      newValue &&
      (typeof newValue === "object" || typeof newValue === "function")
    ) {
      var then = newValue.then;
      if (typeof then === "function") {
        then.call(newValue, resolve, reject);
        return;
      }
    }
    state = "fulfilled";
    value = newValue;
    execute();
  }

  /**
   * 执行 promise 的 reject
   * @param {*} reason
   */
  function reject(reason) {
    state = "rejected";
    value = reason;
    execute();
  }

  /**
   * 执行 promise 的全部回调函数
   */
  function execute() {
    setTimeout(function() {
      callbacks.forEach(function(callback) {
        handle(callback);
      });
    }, 0);
  }

  // 调用 new Promise 时传入的函数
  fn(resolve, reject);
}

/**
 * promise -> promise2 -> promise3
 *        \
 *         -> promise4
 */

// new Promise 调用传入的函数，参数为 Promise 内部的的 reslove 和 reject 函数
let promise = new Promise(res => setTimeout(() => res("t1"), 1000));

promise
  // 调用 then 方法返回一个新的 Promise（promise2），这个 Promise 的参数为 handle 函数
  // promise2
  .then(d => {
    console.log(d); // t1
    return "t2";
  })
  // promise3
  .then(d => {
    console.log(d);
    return "t3"; // t2
  });

promise
  // promise4
  .then(d => {
    console.log(d); // t1
  });
```

# 参考

> -   [Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
> -   [Promise - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000)
> -   [Promise.prototype.catch() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
> -   [Promise 原理解析 - 简书](https://www.jianshu.com/p/9637fcc2e39d)

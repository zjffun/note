# 让 catch 只捕获上一个 then 的回调的异常

使用 then 的 rejected 回调（第二个参数）可以处理上一个 Promise 发生的异常，让后面的 catch 只捕获 then 的回调的异常。

注：后面的 catch 处理的是这个 then 生成的 Promise 状态为 rejected 的情况。\\
当 then 之前的 Promise 状态为 rejected 时，
如果 then 的 rejected 回调未抛出异常就不会进入后面 catch。

```js
// then 的 fulfilled 回调处理 Promise 的异常，不进入后面的catch
Promise.reject(Error("err"))
  .then(
    function(res) {
      console.log(res);
      throw Error("err in then");
    },
    function(err) {
      // handle err
      console.log(err);
    }
  )
  .catch(e => {
    // only handle err in then
    console.log(e);
  });

// catch 处理 then 的 fulfilled 回调的异常
Promise.resolve("res")
  .then(
    function(res) {
      console.log(res);
      throw Error("err in then");
    },
    function(err) {
      // handle err
      console.log(err);
    }
  )
  .catch(e => {
    // only handle err in then
    console.log(e);
  });
```

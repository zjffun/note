# 背景

最近需要改点 neo4j-browser 的代码做个 demo，分析初始化时运行命令的代码时花了很多时间，记录一下。

# 目的

找出 dispatch  `SINGLE_COMMAND_QUEUED` action 的地方。

PS: 要是会 [redux-observable](https://redux-observable.js.org/), [Redux](http://github.com/reactjs/redux), [RxJS](http://github.com/ReactiveX/RxJS) 这哥三的话应该一下就能找到了。。

# 分析

首先通过读 neo4j-browser 的源码知道了发出命令都是通过：

1.  Reaux dispatch action
2.  redux-observable 将 action 流入 RxJS
3.  RxJS 处理
4.  redux-observable 处理 RxJS 流出的 action(s)

实现的。

所以我们可以在`SINGLE_COMMAND_QUEUED`的`mergeMap`里截胡一下看看，发现调用栈只有两个地方有自己的代码（其余的都是 node_modules 中的）。

-   `src/shared/modules/commands/commandsDuck.js:214`

```js
export const handleSingleCommandEpic = (action$, store) =>
  action$
    .ofType(SINGLE_COMMAND_QUEUED)
    .merge(action$.ofType(SYSTEM_COMMAND_QUEUED))
    .map(action =>
      buildCommandObject(action, helper.interpret, getCmdChar(store.getState()))
    )
    .mergeMap(({ action, interpreted, cmdchar }) => {
      // 这里截胡
      /*
        调用栈：
        (anonymous) (commandsDuck.js:214)
        ...别人的代码
        ./src/browser/AppInit.jsx 
      */
      debugger;
      return new Promise((resolve, reject) => {
        const noop = { type: 'NOOP' }
        if (!(action.cmd || '').trim().length) {
          resolve(noop)
          return
        }
        if (interpreted.name !== 'cypher') {
          action.cmd = cleanCommand(action.cmd)
        }
        const res = interpreted.exec(action, cmdchar, store.dispatch, store)
        if (!res || !res.then) {
          resolve(noop)
        } else {
          res
            .then(r => {
              store.dispatch(fetchMetaData())
              resolve(noop)
            })
            .catch(e => resolve(noop))
        }
      })
    })
```

可惜`AppInit.js`这里并没有直接 dispatch  `SINGLE_COMMAND_QUEUED` 这个 action。 

-   `src/browser/AppInit.js:87`

```js
// Signal app upstart (for epics)
store.dispatch({ type: APP_START, url: window.location.href, env })
```

继续找找发现在`STARTUP_CONNECTION_SUCCESS`这个 action dispatch 后会有一系列列操作，`SINGLE_COMMAND_QUEUED` 这个 action **在程序初始化时就作为 RxJS 的 mapTo 操作符的参数保存起来了**，然后在`STARTUP_CONNECTION_SUCCESS` dispatch 后由 RxJS 流出，然后经过 redux-observable 进行 dispatch 的。这些操作都是通过调用 node_modules 中的函数（redux-observable、RxJS）完成的。

-   `src/shared/modules/connections/connectionsDuck.js:398`

```js
export const startupConnectionSuccessEpic = (action$, store) => {
  return action$
    .ofType(STARTUP_CONNECTION_SUCCESS)
    .do(() =>
      store.dispatch(
        executeSystemCommand(getCmdChar(store.getState()) + 'server status')
      )
    )
    .mapTo(
      // 这行在创建 epic 就执行了，创建出的 action 已经通过 redux-observable 保存在 rxjs 的 Subscribe 中。
      // 所以截胡的结果除了src/browser/AppInit.js:87，别的全是调用的 rxjs 等模块的函数
      executeSystemCommand(getInitCmd(store.getState()))
    ) // execute initCmd from settings
}
```

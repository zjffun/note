> [Redux 中文文档](https://www.redux.org.cn/)

# 基本使用

## 步骤

1.  创建 action
2.  创建执行 action 的 reducer
3.  根据 reducer 创建 store

## 流程

actions（一个 oject） `--- 通过调用 dispatch 传给 --->` reducers（接收 state 和 action，返回新的 state） `--- 使用其返回值 --->` 改变 store 中的 state

## 代码

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <script src="https://unpkg.com/redux@4.0.1/dist/redux.min.js"></script>
    <script>
        // 1.创建action
        function add(content) {
            return {
                type: "ADD",
                content
            }
        }

        function del(content) {
            return {
                type: "DEL",
                content
            }
        }
        
        // 2. 创建执行action的reducer
        function list(state = [], action) {
            switch (action.type) {
                case "ADD":
                    return [...state, action.content];
                case "DEL":
                    let i = state.findIndex(d => d == action.content);
                    if (i > -1) {
                        var t = [...state];
                        t.splice(i, 1);
                        return t;
                    } else {
                        return state
                    }

                default:
                    return state
            }
        }

        const testApp = Redux.combineReducers({
            list
        })
        
        // 3. 根据reducer创建store
        let store = Redux.createStore(testApp);
        
        // 测试
        console.log(store.getState());

        store.dispatch(add('123'));
        store.dispatch(add('456'));
        store.dispatch(add('789'));
        console.log(store.getState());

        store.dispatch(del('456'));
        console.log(store.getState());
    </script>
</body>

</html>
```

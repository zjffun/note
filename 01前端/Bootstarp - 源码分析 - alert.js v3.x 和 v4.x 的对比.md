# 预备知识

## 1. 什么是使用 data-api 调用

就是给所有带有`data-dismiss="alert"`的元素绑定点击事件

```js
// v3.x：
$(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close);

// v4.x：
$(document).on(
  Event.CLICK_DATA_API,
  Selector.DISMISS,
  Alert._handleDismiss(new Alert())
);
```

## 2. 去冲突

调用`$.fn.alert.noConflict()`函数，将`$.fn.alert`还原为 “旧”`$.fn.alert`，并返回 “新”`$.fn.alert`（类似：[\\$.noConflict()](https://www.jquery123.com/jQuery.noConflict/)）

## 3. function 模拟类

[JS-prototype](https://www.cnblogs.com/jffun-blog/p/9110269.html)

## 4. jQuery 事件命名空间

> <https://www.jquery123.com/on/>
>
> 事件名称可以添加指定的 event namespaces（命名空间） 来简化删除或触发事件。例如，"click.myPlugin.simple" 为 click 事件同时定义了两个命名空间 myPlugin 和 simple。通过上述方法绑定的 click 事件处理，可以用 `.off("click.myPlugin")` 或 `.off("click.simple")` 删除绑定到相应元素的 Click 事件处理程序，而不会干扰其他绑定在该元素上的 “click（点击）” 事件。命名空间类似 CSS 类，因为它们是不分层次的；只需要有一个名字相匹配即可。以下划线开头的名字空间是供 jQuery 使用的。

# 对比

| 比较项       | v3.x         | v4.x       |
| --------- | ------------ | ---------- |
| 总体结构      | 闭包           | ES6 Module |
| Alert “类” | function 模拟类 | ES6 Class  |

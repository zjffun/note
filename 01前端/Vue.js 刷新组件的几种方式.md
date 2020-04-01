# key

```html
<span :key="text">{{ text }}</span>
```

-   参见：[API — Vue.js](https://cn.vuejs.org/v2/api/#key)

# `$forceUpdate`

它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

```js
this.$forceUpdate();
```

-   参见：[API — Vue.js](https://cn.vuejs.org/v2/api/#vm-forceUpdate)

# `v-if`

并不是什么好方法。

```text
<span v-if="refreshTag">{{ text }}</span>

this.refreshTag = false;
this.$nextTick(() => {
  this.refreshTag = true;
});
```

使用 [provide-inject — Vue.js](https://cn.vuejs.org/v2/api/#provide-inject)

```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: "bar",
  },
  // ...
};

// 子组件注入 'foo'
var Child = {
  inject: ["foo"],
  created() {
    console.log(this.foo); // => "bar"
  },
  // ...
};
```

***

Vue3: [Provide / inject | Vue.js](https://v3.vuejs.org/guide/component-provide-inject.html#working-with-reactivity)

```js
const app = Vue.createApp({});

app.component("todo-list", {
  data() {
    return {
      todos: ["Feed a cat", "Buy tickets"],
    };
  },
  provide: {
    user: "John Doe",
  },
  template: `
    <div>
      {{ todos.length }}
      <!-- rest of the template -->
    </div>
  `,
});

app.component("todo-list-statistics", {
  inject: ["user"],
  created() {
    console.log(`Injected property: ${this.user}`); // > Injected property: John Doe
  },
});
```

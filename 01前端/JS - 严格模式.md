---
updated: 'Sat, 09 May 2020 11:53:16 GMT'
date: 'Sat, 09 May 2020 11:53:16 GMT'
---

# `class` 中的代码总是在严格模式下执行。

```js
class C4 {
  constructor() {
    //Uncaught TypeError: Cannot set property foo of #<C4> which has only a getter
    this.foo = "test";
  }
  get foo() {}
}

let obj3 = new C4();
```

```js
class C1 {
  constructor() {
    // Uncaught TypeError: Cannot set property foo of #<C2> which has only a getter
    this.foo = "test";
  }
}

class C2 extends C1 {
  get foo() {}
}

let obj = new C2();
```

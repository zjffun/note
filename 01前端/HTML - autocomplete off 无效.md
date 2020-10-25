---
updated: 'Thu, 04 Jun 2020 12:53:37 GMT'
date: 'Mon, 25 May 2020 11:33:14 GMT'
---

Chrome 上即使设置了[`autocomplete="off"`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) 也会自动填账号密码，可以通过让账号密码填到隐藏的输入框中解决。

```html
<div
  style="overflow: hidden; height: 0px;background: transparent;"
  data-description="dummyPanel for Chrome auto-fill issue"
>
  <input
    type="text"
    style="height:0;background: transparent; color: transparent;border: none;"
    data-description="dummyUsername"
  />
  <input
    type="password"
    style="height:0;background: transparent; color: transparent;border: none;"
    data-description="dummyPassword"
  />
</div>
```

Chrome 上即使设置了`autocomplete="off"`也会自动填账号密码，可以通过让他填到隐藏的输入框中解决。

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

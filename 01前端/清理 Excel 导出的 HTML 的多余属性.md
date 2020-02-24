```js
var whiteList = ["rowspan", "colspan"];

[...document.querySelectorAll("table")].forEach(table => {
  rmAttr(table);
  [...table.querySelectorAll("tr")].forEach(tr => {
    rmAttr(tr);
    [...tr.querySelectorAll("td")].forEach(td => {
      rmAttr(td);
    });
  });
  console.log(table.outerHTML);
});

function rmAttr(dom) {
  [...dom.attributes].forEach(attr => {
    if (!~whiteList.indexOf(attr.name)) {
      dom.removeAttribute(attr.name);
    }
  });
}
```

---
updated: 'Sun, 15 Mar 2020 04:39:46 GMT'
date: 'Sun, 15 Mar 2020 04:39:46 GMT'
---

有时候检查元素是否可见不能单纯检查当前元素的样式，需要考虑具体情况，下面是一些检测方法：

# [:visible Selector | jQuery API Documentation](https://api.jquery.com/visible-selector/)

相关源码：

[code.jquery.com/jquery-1.11.1.js](http://code.jquery.com/jquery-1.11.1.js)

```js
jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};
```

# [HTMLElement.offsetParent](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent)

元素的`position`不是`fixed`，并且元素不是`<body>` or `<html>`，可以有一个非常巧妙的方法检查元素及其父元素的`display`是否是`none`。参见：[javascript - Check if element is visible in DOM - Stack Overflow](https://stackoverflow.com/a/21696585/11949765)

```js
// Where el is the DOM element you'd like to test for visibility
function isHidden(el) {
    return (el.offsetParent === null)
}
```

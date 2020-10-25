就是[autoResize](https://developers.arcgis.com/javascript/3/jsapi/map-amd.html#autoresize)这个属性，本来当用了什么黑科技，结果只是 setTimeout 轮询。。

```js
_execResize: function() {
    clearTimeout(this._resizeTimerHandle);
    this._resizeTimerHandle = null;
    this.reposition();
    this._resize();
    // 这里
    this.autoResize && this._startResizeTimer()
},

_startResizeTimer: function() {
    clearTimeout(this._persistentTimer);
    this._persistentTimer = setTimeout(this._timedResize, 2 * this.resizeDelay)
},
```

***

监听容器尺寸变化现在可以用 [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

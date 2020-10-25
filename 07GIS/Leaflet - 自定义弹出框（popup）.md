---
updated: 'Sat, 27 Jul 2019 06:23:27 GMT'
date: 'Sat, 27 Jul 2019 06:23:27 GMT'
---

有两种方法，一种直接改 CSS，一种是通过继承拓展 popup。

# 方法一：改 CSS

下面是一个将原有样式清空的设置（可能清的不全，只是提供个思路）

```scss
.l-popup {
  &--no-style {
    /* 用不了 &#{&} 这种写法*/
    .leaflet-popup-close-button.leaflet-popup-close-button {
      display: none;
    }
    .leaflet-popup-tip-container.leaflet-popup-tip-container {
      display: none;
    }
    .leaflet-popup-content-wrapper.leaflet-popup-content-wrapper {
      background: transparent;
      border-radius: 0;
      padding: 0;
      .leaflet-popup-content.leaflet-popup-content {
        margin: 0;
      }
    }
  }
}
```

# 方法二：拓展 popup

这种方式可以让 leaflet 在生成 popup 的创建 DOM 的时期就进行控制，但拓展的 popup 默认不会在 bindPopup 时使用，还应该拓展一个 bindPopup。

例如：[Leaflet custom popup](https://codepen.io/1010543618/pen/KOgXLp)

-   `_initLayout`
    [Leaflet/Popup.js at 863cf744616cba2d3cf4e8b28c825bcea1edd2e4 · Leaflet/Leaflet](https://github.com/Leaflet/Leaflet/blob/863cf744616cba2d3cf4e8b28c825bcea1edd2e4/src/layer/Popup.js#L158)

-   `bindPopup`
    [Leaflet/Popup.js at 863cf744616cba2d3cf4e8b28c825bcea1edd2e4 · Leaflet/Leaflet](https://github.com/Leaflet/Leaflet/blob/863cf744616cba2d3cf4e8b28c825bcea1edd2e4/src/layer/Popup.js#L366)

```js
// create custom popup
L.CustomPopup = L.Popup.extend({
    _initLayout: function () {
        var prefix = 'leaflet-popup',
            container = this._container = L.DomUtil.create('div',
                prefix + ' ' + (this.options.className || '') +
                ' leaflet-zoom-animated');

        var wrapper = container;
        this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

        L.DomEvent
            .disableClickPropagation(wrapper)
            .disableScrollPropagation(this._contentNode)
            .on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);
    },
});

// add bindCustomPopup
L.Layer.include({

    // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
    // Binds a popup to the layer with the passed `content` and sets up the
    // neccessary event listeners. If a `Function` is passed it will receive
    // the layer as the first argument and should return a `String` or `HTMLElement`.
    bindCustomPopup: function (content, options) {

        if (content instanceof L.Popup) {
            L.setOptions(content, options);
            this._popup = content;
            content._source = this;
        } else {
            if (!this._popup || options) {
                this._popup = new L.CustomPopup(options, this);
            }
            this._popup.setContent(content);
        }

        if (!this._popupHandlersAdded) {
            this.on({
                click: this._openPopup,
                remove: this.closePopup,
                move: this._movePopup
            });
            this._popupHandlersAdded = true;
        }

        return this;
    }
});

// using
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);
marker.bindCustomPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var popup = (new L.CustomPopup({ className: 'custom-popup' }))
    .setLatLng([51.51, -0.09])
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    .openOn(mymap);
```

---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

这几天学习 leaflet 在加载天地图时将以前的接口拿来用结果偏差了特别大（差不多是 90 度），中国纬度到了 100 多，试了改变投影和 y 轴翻转的配置都不好使，最后上网搜索到了[Leaflet.ChineseTmsProviders](https://github.com/htoooth/Leaflet.ChineseTmsProviders.git)（MapGIS 的示例也是用的它）查看他的用法发现我用的天地图接口和它不一样，改成它的接口就不会出现纬度偏移特别大的问题了（到现在也没有搜到 cva_w 和 vec_c 这两个接口的区别，CGCS200 和 WGS48 么？那也差不了那么多啊！以后找到区别再写上来吧）

正常的：

```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
  integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
  crossorigin=""/>
  <style>
   #mapid { height: 500px; }
  </style>
</head>
<body>
  <div id="mapid"></div>
  <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
   integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
   crossorigin=""></script>
  <script>
    var normalm = L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}', {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    });
    stamenLabels = L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}', {
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    });

    var map = L.map("mapid", {
      center: [31.59, 120.29],
      zoom: 12,
      layers: [normalm],
      zoomControl: false
    });
    stamenLabels.addTo(map);
  </script>
</body>
</html>
```

异常的：

```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
  integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
  crossorigin=""/>
  <style>
   #mapid { height: 500px; }
  </style>
</head>
<body>
  <div id="mapid"></div>
  <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
   integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
   crossorigin=""></script>
  <script>
    var normalm = L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=vec_c&X={x}&Y={y}&L={z}', {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    });
    stamenLabels = L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cva_c&X={x}&Y={y}&L={z}', {
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    });

    var map = L.map("mapid", {
      center: [31.59, 120.29],
      zoom: 12,
      layers: [normalm],
      zoomControl: false
    });
    stamenLabels.addTo(map);
  </script>
</body>
</html>
```

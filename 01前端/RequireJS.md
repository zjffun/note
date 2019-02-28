```html
<script src="require.js位置" data-main="main.js位置"></script>
```

```js
//main.js
requirejs.config({
    //禁止缓存（调试时用，发布版中应该注释掉）
    urlArgs: "bust=" +  (new Date()).getTime(),

    //By default load any module IDs from js/lib
    baseUrl: BASE_URL+'views',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        'jquery':'third/jquery/dist/jquery',
        'jquery.easyui':'third/jquery-easyui-1.5.2/jquery.easyui.min',
        'jquery.easyui.ribbon':'third/jquery-easyui-ribbon/jquery.ribbon',
        'jquery.smartresize':'js/jquery.smartresize',
        'jquery.browser':'third/mapgis/jquery.browser',
        'OpenLayers':'third/mapgis/openlayers',
        'openlayers.magnifyingglass':'third/mapgis/openlayers-magnifyingglass',
        'openlayers.NestFramedCloud':'third/mapgis/NestFramedCloud',
        'zdclient':'third/mapgis/zdclient',
        'zdclient.zdcontrol':'third/mapgis/zdcontrol',
        'iziModal':'third/iziModal/js/iziModal.min',
        'om_init':'js/om_init',
        'om_func':'js/om_func'
    },
    shim: {
        'jquery.smartresize' : ['jquery'],
        'jquery.browser' :['jquery'],
        'jquery.easyui' : ['jquery'],
        'jquery.easyui.ribbon' : ['jquery','jquery.easyui'],
        'openlayers.magnifyingglass' : ['OpenLayers'],
        'openlayers.NestFramedCloud' : ['OpenLayers'],
        'zdclient' : ['jquery.browser','OpenLayers'],
        'zdclient.zdcontrol' : ['zdclient'],
        'om_init' : [
          'jquery',
          'jquery.easyui',
          'jquery.easyui.ribbon',
          'jquery.smartresize',
          'jquery.browser',
          'OpenLayers',
          'openlayers.magnifyingglass',
          'openlayers.NestFramedCloud',
          'zdclient',
          'zdclient.zdcontrol',
          'iziModal'
          ],
        'om_func' : [
          'jquery',
          'jquery.browser',
          'OpenLayers',
          'openlayers.magnifyingglass',
          'openlayers.NestFramedCloud',
          'zdclient',
          'zdclient.zdcontrol'
          ],
    }
});

// Start the main app logic.
requirejs([
    'om_init',
    'om_func',
    ],
function () {
    var OM_MAP = document.getElementById('om_map');
    mapSqlName = "gxgl";//数据库名称
    OM_CONFIG = {
        ip:"127.0.0.1",//ip地址
        port:"6163",//端口号
        mapName: "gxgl",//地图服务名称
        resolution:7.8,//分辨率
        mapBound: new OpenLayers.Bounds(428993.7136, 4350000, 431500, 4352002.484),//范围
        pathAnalysisUrl: "gdbp://MapGisLocal/" + mapSqlName + "/ds/gxgl_set/ncls/道路网",//路径分析Url
        pathAnalysisAddr: "gdbp://MapGisLocal/" + mapSqlName + "/ds/gxgl_set/sfcls/地址点", //路径分析地址点
        bufferSourceSet: "gdbp://MapGisLocal/" + mapSqlName + "/ds/buffer/sfcls/", //缓冲区分析分析Url
        overlaySourceSet: "gdbp://MapGisLocal/" + mapSqlName + "/ds/overlay/sfcls/",//叠加分析Url
        SrcLayer: "gdbp://MapGisLocal/" + mapSqlName + "/ds/gxgl_set/sfcls/", //空间分析Url
        clipSourceSet: "gdbp://MapGisLocal/" + mapSqlName + "/ds/clip/sfcls/"//裁剪分析Url
        }
    om_init.init_ribbon();
    om_init.init_map();
    om_init.init_navbar();
    om_init.init_login();
    om_init.init_iziModal();
    
});
```

    define([/*引用的模块*/], function(){
      var test_model = new Object;
      test_model.test_func = function() {
        
      }
      return (window.test_model = test_model);
    });

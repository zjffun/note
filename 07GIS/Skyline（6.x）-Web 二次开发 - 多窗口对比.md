# [GitHub 上获取源码](https://github.com/1010543618/Skyline-3DWindowSync)

# 1. 打开个 3D 窗口

一个页面加载多个 TerraExplorer3DWindow 和 SGWorld 等只有第一个能用（即使用 iframe 也是一样）  
所以我决定打开两个新页面实现多窗口对比，然后我在《主页面》使用 window.open 打开了两个《新页面》，但这两个新页面使用 SGWorld 时居然在主页面（使用 window.open 的页面）产生了效果，感觉和以前的一个页面加载多个 TerraExplorer3DWindow 和 SGWorld 效果一样了！！！  

然后经过测试发现关闭主页面新页面就正常加载三维地图了。可以看出使用 window.open 时主页面和新页面是有关联的，我一开始试了很多方法都断不开这个关联，最后决定打开新页面时多打开一个主页面，然后关掉主页面这种笨方法。  

当使用 window.close 当前关闭窗口，居然没有关上，我一搜发现了关闭前有这一行代码`window.opener=null`

> opener 属性是一个可读可写的属性，可返回对创建该窗口的 Window 对象的引用。  
> opener 属性非常有用，创建的窗口可以引用创建它的窗口所定义的属性和函数。

断开主页面和新页面关联的方法找到了！！！

总结：
使用 window.open 打开两个窗口，然后设置 window.opener 为 null，这样就可以在不同窗口中打开三维场景了。

修正：
今天又测试一下设置 window.opener 为 null 不好使，还是使用将主页面关闭这种方法吧 =\_=

# 2. 多个 3D 窗口同步

经测试使用 HTTP 协议通过 web 服务器进行多窗口联动（在页面摄像机参数改变时修改服务器的浏览器位置数据，所有页面每隔一定时间获取摄像机参数，当获取到的摄像机参数与当前三维场景摄像机参数的改变量大于阈值就更新当前三维场景摄像机参数），在每 500ms 同步一次的条件下不到一分钟 IE 浏览器就接收或发送 HTTP 请求就出现问题。然后经过调查资料使用长连接（WebSocket）技术可以处理这种高频访问并且多客户端通信的请求。使用 WebSocket 完成此功能只需三步即可：

1.  客户端摄像机参数的改变发送给服务器，
2.  服务器接收到请求后发送当前坐标给其他客户端，
3.  客户端接收到消息后更新摄像机参数。

Node.js 后端代码

    var express = require('express');
    var http = require('http');
    var WebSocket = require('ws');
    var fs = require('fs');

    var app = express();
    var server = http.createServer(app);
    var wss = new WebSocket.Server({server});
    wss.on('connection', function connection(ws) {// 创建连接
      console.log('链接成功！');
      ws.on('message', function incoming(data) {// 接收消息
        wss.clients.forEach(function each(client) {
          /*
            给全部客户端（创建连接的客户端）中
            除了发送者客户端（本次发送给服务器消息的客户端）的其他客户端发送消息
          */
          if (client != ws) {client.send(data)}
        });
      });
    });
    // 启动WebSocket
    server.listen(18848, function listening() {
      console.log('服务器启动成功！');
    });

前端主要 js 代码：

    import update_pos from './update_pos'
    export default function(){
      // ws
      this.wsServer = new WebSocket(this.ws_url);
      this.wsServer.onopen = function (e) {
        (typeof e == 'string') && this.send(e);//向后台发送数据
      };
      this.wsServer.onclose = function (e) {//当链接关闭的时候触发

      };
      this.wsServer.onmessage = function (e) {//后台返回消息的时候触发
        // console.log('get_sync_info')
        // console.log(data)
        var sync_info = JSON.parse(e.data).sync_info
        var pos_arr = sync_info.pos
        var pos = SGWorld.Creator.CreatePosition(pos_arr[0], pos_arr[1], pos_arr[2], pos_arr[3], pos_arr[4], pos_arr[5]);
        SGWorld.Navigate.SetPosition(pos);
      };
      this.wsServer.onerror = function (e) {//错误情况触发

      }

      // 定时更新位置
      this.last_pos = {};
      this.sync_interval = setInterval(update_pos.bind(this), this.interval)
    }

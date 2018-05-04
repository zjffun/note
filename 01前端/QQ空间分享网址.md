现在大部分网站都在每个界面设计了分享这个功能，但还是有的网页没有（比如B站只能分享具体的视频）。在原来的QQ空间分享的地方已经找不到法自己创建分享。上网一搜有分享的接口，可这个接口是给开发者用的，我就稍微写了一下访问这里写上想分享的网址什么的就能进行分享

https://1010543618.github.io/jffun_share/

具体细节：在github上发布如下网页，具体参见
https://connect.qq.com/intro/share/

```
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
<h3>创建QQ空间分享</h3>
<form name="form1">
	链接地址：<input type="text" name="url" style="width: 300px"><br>
	是否显示分享总数：是<input type="radio" name="showcount" value="1" checked>   否<input type="radio" name="showcount" value="0"><br>
	分享理由(可选)：<textarea name="desc" style="width: 300px"></textarea><br>
	分享摘要(可选)：<textarea name="summary" style="width: 300px"></textarea><br>
	分享标题(可选)：<input type="text" name="title" style="width: 300px"><br>
	分享来源(可选)：<input type="text" name="site" style="width: 300px"><br>
	分享图片的路径(可选)：<input type="text" name="pics" style="width: 300px"><br>
</form>
<button onclick="create_share_btn()">创建</button>
<script type="text/javascript">
function create_share_btn(){
	var form1 = document.form1;
	var p = {
	url:form1.url.value,
	showcount:form1.showcount.value,/*是否显示分享总数,显示：'1'，不显示：'0' */
	desc:form1.desc.value,/*默认分享理由(可选)*/
	summary:form1.summary.value,/*分享摘要(可选)*/
	title:form1.title.value,/*分享标题(可选)*/
	site:form1.site.value,/*分享来源 如：腾讯网(可选)*/
	pics:form1.pics.value, /*分享图片的路径(可选)*/
	style:'101',
	width:400,
	height:60
	};
	var s = [];
	for(var i in p){
	s.push(i + '=' + encodeURIComponent(p[i]||''));
	}
	document.write(['<a version="1.0" class="qzOpenerDiv" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',s.join('&'),'" target="_blank">分享</a>'].join(''));
};
</script>
<script src="http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201" charset="utf-8"></script>
</body>
</html>
```
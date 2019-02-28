# 方法一：告诉浏览器不要缓存（不一定好使）

    <meta http-equiv="Pragma" content="no-cache"> 
    <meta http-equiv="Cache-Control" content="no-cache"> 
    <meta http-equiv="Expires" content="-1">

# 方法二：动态 script 创建

    <script>document.write('<script src="build/js/script.min.js?' + Math.rendom() + '">\x3C/script>')</script>

或者

    var s = document.createElement('script');
    s.setAttribute('src', '<script src="build/js/script.min.js?' + Math.rendom());
    s.setAttribute('type', 'text/javascript');
    document.getElementsByTagName('head')[0].appendChild(s);

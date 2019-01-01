# cookie、sessionstorage、localstorage

sessionStorage 和 localStorage 是 HTML5 Web Storage API 提供的，可以方便的在 web 请求之间保存数据。有了本地数据，就可以避免数据在浏览器和服务器间不必要地来回传递。  

sessionStorage、localStorage、cookie 都是在浏览器端存储的数据，其中 sessionStorage 的概念很特别，引入了一个 “浏览器窗口” 的概念。sessionStorage 是在同源的同窗口（或 tab）中，始终存在的数据。也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。关闭窗口后，sessionStorage 即被销毁。同时 “独立” 打开的不同窗口，即使是同一页面，sessionStorage 对象也是不同的。

Web Storage 带来的好处：

1.  减少网络流量：一旦数据保存在本地后，就可以避免再向服务器请求数据，因此减少不必要的数据请求，减少数据在浏览器和服务器间不必要地来回传递。
2.  快速显示数据：性能好，从本地读数据比通过网络从服务器获得数据快得多，本地数据可以即时获得。再加上网页本身也可以有缓存，因此整个页面和数据都在本地的话，可以立即显示。
3.  临时存储：很多时候数据只需要在用户浏览一组页面期间使用，关闭窗口后数据就可以丢弃了，这种情况使用 sessionStorage 非常方便。

## 共同点

都是保存在浏览器端，且同源的。

## 区别

-   是否在 http 请求携带
    cookie：数据始终在同源的 http 请求中携带（即使不需要），即 cookie 在浏览器和服务器间来回传递。\
    Web Storage：不会自动把数据发给服务器，仅在本地保存。  
-   访问限制
    cookie：数据还有路径（path）的概念，可以限制 cookie 只属于某个路径下。  
-   存储大小
    cookie：数据不能超过 4k，同时因为每次 http 请求都会携带 cookie，所以 cookie 只适合保存很小的数据，如会话标识。\
    Web Storage：虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。  
-   数据有效期
    cookie：只在设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。\
    sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持。\
    localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据。   
-   作用域
    cookie，localStorage：在所有同源窗口中都是共享的。\
    sessionStorage：不在不同的浏览器窗口中共享，即使是同一个页面。  
-   对事件通知机制的支持
    Web Storage：支持事件通知机制，可以将数据更新的通知发送给监听者。
-   方便程度
    Web Storage：的 api 接口使用更方便。
-   [注]：sessionStorage 与页面 js 数据对象的区别\
    页面中一般的 js 对象或数据的生存期是仅在当前页面有效，因此刷新页面或转到另一页面这样的重新加载页面的情况，数据就不存在了。\
    而 sessionStorage 只要同源的同窗口（或 tab）中，刷新页面或进入同源的不同页面，数据始终存在。也就是说只要这个浏览器窗口没有关闭，加载新页面或重新加载，数据仍然存在。  

## 参考

> <http://blog.csdn.net/you23hai45/article/details/49052251>

分辨率

-   屏幕分辨率：指屏幕可显示的像素的个数
-   图像分辨率：位图图像包含的像素的个数

对于 Retina 屏它的分辨率是传统屏的两倍，而屏幕大小没有变化，所以它需要的图片的分辨率应该是传统屏幕的两倍（甚至多倍），显示时按传统屏的大小显示，不然就会因为图像分辨率不够造成显示模糊。

像素

-   CSS 像素：px(css pixel)
-   设备无关像素：DIPs(Device-independent pixel)

一个 CSS 像素对应一个设备无关像素。但对于 Retina 屏它的一个设备无关像素会包含两倍（甚至多倍）的物理像素，也就是一个 CSS 像素将对应更多的 “点”。

参考

[前端二倍图的思考（涉及 Retina） - 王逍遥 - 博客园](https://www.cnblogs.com/wangxiaoyao77/p/5691607.html)

[分辨率\_百度百科](https://baike.baidu.com/item/%E5%88%86%E8%BE%A8%E7%8E%87)

[DIP（设备独立像素）\_百度百科](https://baike.baidu.com/item/DIP/443947)

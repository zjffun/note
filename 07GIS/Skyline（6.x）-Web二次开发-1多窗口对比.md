一个页面加载多个TerraExplorer3DWindow和SGWorld等只有第一个能用（即使用iframe也是一样）  


所以我决定打开两个新页面实现多窗口对比，然后我在《主页面》使用window.open打开了两个《新页面》，但这两个新页面使用SGWorld时居然在主页面（使用window.open的页面）产生了效果，感觉和以前的一个页面加载多个TerraExplorer3DWindow 和 SGWorld效果一样了！！！  


然后经过测试发现关闭主页面新页面就正常加载三维地图了。可以看出使用window.open时主页面和新页面是有关联的，我一开始试了很多方法都断不开这个关联，最后决定打开新页面时多打开一个主页面，然后关掉主页面这种笨方法。  


当使用window.close当前关闭窗口，居然没有关上，我一搜发现了关闭前有这一行代码`window.opener=null`
> opener 属性是一个可读可写的属性，可返回对创建该窗口的 Window 对象的引用。  
opener 属性非常有用，创建的窗口可以引用创建它的窗口所定义的属性和函数。

断开主页面和新页面关联的方法找到了！！！

总结：
使用window.open打开两个窗口，然后设置window.opener为null，这样就可以在不同窗口中打开三维场景了。

修正：
今天又测试一下设置window.opener为null不好使，还是使用将主页面关闭这种方法吧=_=



```
//遍历工程树，将所有的layer图层、图层名都存放在数组中
var players=new Array();
var playersName=new Array();
function BuildTreeRecursive(current) {
    try{
        while (current > 0) {
            itemName = SGWorld.ProjectTree.GetItemName(current);
            if (itemName != "地形修改" && itemName != "位置" && itemName != "PresentationRoute") {
                if (SGWorld.ProjectTree.IsGroup(current)) {
                    if (SGWorld.ProjectTree.IsLayer(current)) {
                        var name = SGWorld.ProjectTree.GetItemName(current);
                        var layer = SGWorld.ProjectTree.GetLayer(current);
                        playersName[playersName.length] = name;
                        players[players.length] = layer;
                    }
                    else {
                        var childItem = SGWorld.ProjectTree.GetNextItem(current, 11);//CHILD – 11,The first child item of ItemID.
                        BuildTreeRecursive(childItem);
                    }
                }        
            }
            current = SGWorld.ProjectTree.GetNextItem(current, 13);
        }
    }
    catch (e) { alert(e)}
}

//下面是根据工程树中layer图层的名字获取layer
function GetLayerByLayerGroupName(layerGroupName) {
    if (playersName.length>0) {
        for (i = 0; i < playersName.length; i++) {
            if (playersName[i] == layerGroupName)
                return players[i];
        }
    }
    else { alert("图层名数组为空，请检查TR.BuildTreeRecursive()方法是否执行"); }
};
```
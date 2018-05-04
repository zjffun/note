关闭全部tab
```js
function euCloseAllTabs(tabs_dom){
    console.log(tabs_dom,tabs);
    //删除tab后tabs.length的长度会变
    var titles = new Array();  
    var tabs = $(tabs_dom).tabs('tabs');
    for(var i=0;i<tabs.length;i++){
        titles.push(tabs[i].panel('options').title);
    }
    for (var i = 0; i < titles.length; i++) {
      $(tabs_dom).tabs('close', titles[i]); 
    }
}
```

本地分页
```html
<!DOCTYPE html> 
<html> 
<head> 
  <meta charset="utf-8"/> 
  <title></title> 
  <link href="js/jquery-easyui-1.3.6/themes/default/easyui.css" rel="stylesheet"/>
  <link href="js/jquery-easyui-1.3.6/themes/icon.css" rel="stylesheet"/> 
  <script type="text/javascript" src="js/jquery-easyui-1.3.6/jquery.min.js"></script>
  <script type="text/javascript" src="js/jquery-easyui-1.3.6/jquery.easyui.min.js"></script>
  <script type="text/javascript"> 
    // 表格数据源 
    var data = []; 
    // 用代码造30条数据 
    for (var i = 1; i < 31; ++i) { 
      data.push({ 
        "id":i, 
        "name":"Student" + i 
      }) 
    } 
    $(function () { 
      $("#dd").datagrid({ 
        title:"测试本地分页", 
        rownumbers:true, 
        fitColumns:true, 
        pagination:true, 
        data:data.slice(0,10), 
        columns:[ 
          [ 
            {field:'id', align:"center", title:"编号",width:100},
            {field:'name', align:"center", title:"姓名",width:100}
          ] 
        ] 
      }); 
      var pager = $("#dd").datagrid("getPager"); 
      pager.pagination({ 
        total:data.length, 
        onSelectPage:function (pageNo, pageSize) { 
          var start = (pageNo - 1) * pageSize; 
          var end = start + pageSize; 
          $("#dd").datagrid("loadData", data.slice(start, end)); 
          pager.pagination('refresh', { 
            total:data.length, 
            pageNumber:pageNo 
          }); 
        } 
      }); 
    }); 
  </script> 
</head> 
<body> 
<div id="dd"></div> 
</body> 
</html>
```

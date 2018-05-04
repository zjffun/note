```js
function init_table(){
  window.DEP_TABLE = $('#responsived-atatable').DataTable({
    "ordering": false,
    "searching": false,
    //ajax加载数据
    "serverSide": true,
    "ajax": "<?=site_url('back/database1/selectPage')?>",
    //每一列填充
    "columns": [
      {"data":"file_name" },
      {"data":"file_path" },
      //修改（"data": null,获取这一列ajax得到的全部数据）
      { 
        "data": null,
        "render": function(data) {
          data = JSON.stringify(data);
          data = data.replace(/"/g, '&quot;');
          var editdiv = '<a class="edit green" onClick="edit_dialog(\''+data+'\')"><i class="fa fa-pencil bigger-130"></i>修改</a>';
          return '<div class="action-buttons">'+ editdiv +'</div>';
        }
      },
      //删除
      { 
        "data": "qat_id",
        "render": function(data) {
          var deldiv = '<a class="del red" onClick="del_confirm('+data+')"><i class="fa fa-trash bigger-130"></i>删除</a>';
          return '<div class="action-buttons">'+ deldiv +'</div>';
        }
      }
    ],
  
  
    "language": {
        "processing": "处理中...",
        "lengthMenu": "显示 _MENU_ 项结果",
        "zeroRecords": "没有匹配结果",
        "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
        "infoFiltered": "(由 _MAX_ 项结果过滤)",
        "infoPostFix": "",
        "search": "搜索:",
        "searchPlaceholder": "搜索...",
        "url": "",
        "emptyTable": "表中数据为空",
        "loadingRecords": "载入中...",
        "infoThousands": ",",
        "paginate": {
            "first": "首页",
            "previous": "上页",
            "next": "下页",
            "last": "末页"
        },
        "aria": {
            "paginate": {
                first: '首页',
                previous: '上页',
                next: '下页',
                last: '末页'
            },
            "sortAscending": ": 以升序排列此列",
            "sortDescending": ": 以降序排列此列"
        },
        "decimal": "-",
        "thousands": "."
    },
    //设置第一列自增长
    "fnDrawCallback" : function(){
        console.log(this);
    　　this.api().column(0).nodes().each(function(cell, i) {
    　　　　cell.innerHTML =  i + 1;
    　　});
    },
  });
}
// 刷新表格数据，分页信息不会重置
DEP_TABLE.ajax.reload( null, false );
```


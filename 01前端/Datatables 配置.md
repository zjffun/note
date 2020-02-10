全部配置：<http://www.datatables.club/reference/option/>

```js
var datatables_i18n_cn = {
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
};


window.DEP_TABLE = $('#responsived-atatable')
.on('xhr.dt', function( e, settings, json, xhr ){
    console.log(json, xhr)
    json.draw = window.DATATABLESDROW;
    json.recordsTotal = json.total;
    json.recordsFiltered = json.total;
    //json.error = "null"
})
.on('init.dt' function(e)){
    $(e.currentTarget).find("tbody").on("click", ".action-buttons", function(e){
        var btn = e.currentTarget.dataset.turn_status,
            rowData = table.row($(e.currentTarget).parents("tr").get()).data();
        console.log(btn, rowData);
    })
}
.DataTable({
    "ordering": false,
    "searching": false,
    /*
        ajax加载数据
        1.后端接收的是page和rows两个参数来分页的，所以要添加附加的上传的信息
        2.后端返回的结果在result里，所以要设置dataSrc
        3.后端返回的总记录数在total里，所以要处理返回的json（上面的on xhr.dt）
        http://www.datatables.club/reference/option/ajax.data.html
    */
    "serverSide": true,
    "ajax":{
            url: "<?=site_url('back/database1/selectPage')?>",
            type:"POST",
            // 添加附加的上传的信息
            data: function(d){
                window.DATATABLESDROW = d.draw;
                d.rows = d.length;
                d.page = d.start;
            },
            dataSrc: "result"
    },
    //每一列填充
    "columns": [
        {"data":"file_name" },
        {"data":"file_path" },
        //修改（"data": null,获取这一列"ajax"得到的全部数据）
        { 
            "data": null,
            "render": function(data) {
                var data = encodeURI(JSON.stringify(data));
                var editdiv = '<a class="edit green"><i class="fa fa-pencil bigger-130"></i>修改</a>';
                return '<div class="action-buttons">'+ editdiv +'</div>';
            }
        },
        //删除
        { 
            "data": "qat_id",
            "render": function(data) {
                var deldiv = '<a class="del red"><i class="fa fa-trash bigger-130"></i>删除</a>';
                return '<div class="action-buttons">'+ deldiv +'</div>';
            }
        }
    ],

    "language": datatables_i18n_cn,
    //设置第一列自增长
    "fnDrawCallback" : function(){
        console.log(this);
        this.api().column(0).nodes().each(function(cell, i) {
            cell.innerHTML =  i + 1;
        });
    },
});


// 刷新表格数据，分页信息不会重置
DEP_TABLE.ajax.reload( null, false );
```

# fileuploaded 事件

fileuploaded 事件是异步方法，如果在模态框中使用没上传完就释放模态框的内容会无法触发。

    $fileinput.on("fileuploaded", function (event, data, previewId, index){
        console.log(data);
    })
    // 1.这样（用了post，然后接释放了原来模态框的内容：）失效
    $.post("<?=site_url('back/user/insert')?>", post_data, function(data){
        if (data['status'] == true) {
          DEP_TABLE.ajax.reload( null, false );
          add_dialog.setContent('添加成功');
        }else{
          add_dialog.setContent(data['message']);
        }
    })
    // 2.或这样（没用post，直接释放了原来模态框的内容：）失效
    add_dialog.setContent('添加成功');


    //只用post（不释放模态框的内容）：不失效
    $.post("<?=site_url('back/user/insert')?>", post_data, function(data){
        if (data['status'] == true) {
          DEP_TABLE.ajax.reload( null, false );
        }else{
        }
    })

## fileuploaded 事件回调函数参数 data

    echo json_encode(array('error'=>'upload error','add_data'=>'123'));die();

1.  服务器返回的 error 这个 array 如果有值会显示上传错误，并且 fileuploaded 不执行。
2.  服务器可以返回其他数据直接配置在 json 里就行，egadd_data

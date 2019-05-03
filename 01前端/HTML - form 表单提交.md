# form 表单提交

## 数据发送

-   disabled：不发送  
-   display_none：发送  
-   type_hidden：发送  
-   readonly：发送  

测试 html：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<body>
<form action="http://127.0.0.1" method="get">
    <p>disabled: <input name="disabled" disabled="disabled" value="disabled" type="text"></p>
    <p>display_none: <input name="display_none" style="display:none" value="display_none" type="text"></p>
    <p>type_hidden: <input name="type_hidden" type="hidden" value="type_hidden" type="text"></p>
    <p>readonly: <input name="readonly" readonly="readonly" value="readonly" type="text"></p>
    <p><button>submit</button></p>
</form>
</body>
</html>
```

结果： 

```text
http://127.0.0.1/  
?display_none=display_none  
&type_hidden=type_hidden  
&readonly=readonly  
```

## 文件发送

1.  设置 form 发送文件：`<form action=""method="post"enctype="multipart/form-data">`
2.  form 不是 post 发送文件不会发送（php 的 $\_FILES 为 empty）：`<form action=""method="post"enctype="multipart/form-data">`
3.  file 没有 name 属性文件不会发送（php 的 $\_FILES 为 empty）：`<input type="file" name="file[]">`

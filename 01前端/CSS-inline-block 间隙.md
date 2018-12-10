间隙产生的原因是`inline-block`对外是`inline`，对内是`block`。`inline`会将连续的空白符解析为一个空格（如：下面示例的两个`li`之间的后面的换行空格）。取消间隙的方法如下：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        ul:last-child{
            font-size: 0px;
        }
        li{
            border: 1px solid #999;
            padding: 2px;
            min-width: 16px;
            display: inline-block;
            font-size: 14px;
            line-height: 16px;
            text-align: center;
        }
    </style>
</head>
<body>
    <h3>有间隙</h3>
    <ul>
        <li>首页</li>
        <li>上一页</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>下一页</li>
        <li>尾页</li>
    </ul>
    <h3>无间隙：删除空格</h3>
    <ul>
        <li>首页</li><li>上一页</li><li>1</li><li>2</li><li>3</li><li>下一页</li><li>尾页</li>
    </ul>
    <h3>无间隙：父元素font-size: 0px;</h3>
    <ul>
        <li>首页</li>
        <li>上一页</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>下一页</li>
        <li>尾页</li>
    </ul>
</body>
</html>
```

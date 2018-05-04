根据参数生成返回结果（正在完善）

```
<?php
function generateResult(...$para){
  $result = null;
  // $para[0]是数组返回成功结果
  if (is_array($para[0])) {
    return array('status' => true, 'data' => $para[0]);
  }
  // $para[0]是字符串返回失败结果
  if (is_string($para[0])) {
    return (isset($para[1])) ? array('status' => false, 'msg' => $para[0], 'data' => $para[1]) : array('status' => false, 'msg' => $para[0]);
  }
  return array('status' => false, 'msg' => '生成结果是参数错误');
}

var_dump(generateResult(array('name' => 'admin', 'bio' => 'homo sapien'), 'xxx', 0));
var_dump(generateResult('出错了', array('没写用户名', '密码太简单')));
```
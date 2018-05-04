# 参数处理
JS:  

```
function plugin_mian_func(options){
  var defaluts = {
    opt1: 'opt1',
    opt2: 'opt2',
    opt3: {
      opt3_1: 'opt3_1',
      opt3_2: 'opt3_2',
    }
  };

  // 覆盖插件默认参数
  var options = (function(){
    // IE不支持Object.assign
    return Object.hasOwnProperty('assign') ? Object.assign({},defaluts,options) : (function(){
      for(var name in options){
        defaluts[name] = options[name];
      }
      return defaluts;
    })(defaluts, options)
  })(defaluts, options);
  
  console.log(options);
}
// 测试
plugin_mian_func({opt1:'user_opt1',opt3: {opt3_1: 'user_opt3_1', opt3_3: 'user_opt3_1'}});
```

jQuery:  

```
function plugin_mian_func(options){
  var defaluts = {
    opt1: 'opt1',
    opt2: 'opt2',
    opt3: {
      opt3_1: 'opt3_1',
      opt3_2: 'opt3_2',
    }
  };

  // 使用jQuery.extend 覆盖插件默认参数
  var options = $.extend({}, defaluts, options);
  console.log(options);
}
// 测试
plugin_mian_func({opt1:'user_opt1',opt3: {opt3_1: 'user_opt3_1', opt3_3: 'user_opt3_1'}});
```



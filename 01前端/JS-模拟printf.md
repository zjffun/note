```
function printf(){
    var args = [].slice.call(arguments),
        fmt = args.shift(),
        args_index = 0;
    ///%(填充的字符)?(多一共少位)?(什么格式的)/ig
    return fmt.replace(/%(\w)?(\d)?([dfsx])/ig, function(_,char,num,form){
        var str = num ? char.repeat(num) : '';
        if(form == 'd') str += parseInt(args[args_index++]);
        return num ? str.slice(num*-1) : str;
    });
}
String.prototype.repeat = function(num){
    // num可能是字符串，先用num-0将num变成数字，再+1
    return new Array(num-0+1).join(this[0] || '');
}
```
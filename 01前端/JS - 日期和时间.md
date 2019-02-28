# 格式化日期和时间

扩展 Date：

    Date.prototype.format = function(format){
    	var o = {
    		"M+" : this.getMonth()+1, //month
    		"d+" : this.getDate(), //day
    		"h+" : this.getHours(), //hour
    		"m+" : this.getMinutes(), //minute
    		"s+" : this.getSeconds(), //second
    		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
    		"S" : this.getMilliseconds() //millisecond
    	}

    	if(/(y+)/.test(format)) {
    		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    	}

    	for(var k in o) {
    		if(new RegExp("("+ k +")").test(format)) {
    			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    		}
    	}
    	return format;
    }

测试：

    var testDate = new Date();

    //yyyy-MM-dd hh:mm:ss
    var testDateStr = now.format("yyyy-MM-dd hh:mm:ss");
    console.log(testDateStr);

    //YYYY年MM月dd日hh小时mm分ss秒
    var testDateStr = testDate.format("YYYY年MM月dd日hh小时mm分ss秒");
    console.log(testDateStr);

    console.log(new Date().Format("yyyy年MM月dd日"));
    console.log(new Date().Format("MM/dd/yyyy"));
    console.log(new Date().Format("yyyyMMdd"));
    console.log(new Date().Format("yyyy-MM-dd hh:mm:ss"));

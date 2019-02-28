    var optionSet1 = {
    	startDate: moment().subtract(29, 'days'),
    	endDate: moment(),
    	minDate: '12/21/2012',
    	maxDate: moment().subtract(1, 'days'),
    	dateLimit: {
    		days: 60
    	},
    	showDropdowns: true,
    	showWeekNumbers: true,
    	timePicker: false,
    	timePickerIncrement: 1,
    	timePicker12Hour: true,
    	ranges: {
    		'今天': [moment(), moment()],
    		'昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    		'前7天': [moment().subtract(6, 'days'), moment()],
    		'前30天': [moment().subtract(29, 'days'), moment()],
    		'本月': [moment().startOf('month'), moment().endOf('month')],
    		'上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    	},
    	opens: 'left',
    	buttonClasses: ['btn btn-default'],
    	applyClass: 'btn-small btn-primary',
    	cancelClass: 'btn-small',
    	format: 'MM/DD/YYYY',
    	separator: ' 到 ',
    	locale: {
    		applyLabel: '提交',
    		cancelLabel: '清除',
    		fromLabel: '从',
    		toLabel: '到',
    		customRangeLabel: '选择日期',
    		daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    		firstDay: 1
    	}
    };

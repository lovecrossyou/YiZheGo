Date.prototype.format = function(fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}


const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const remainTime = totalSecond => {

	// '210000'
	// 秒数  
	var second = totalSecond;

	// 天数位  
	var day = Math.floor(second / 3600 / 24);
	var dayStr = day.toString();
	if (dayStr.length == 1) dayStr = '0' + dayStr;

	// 小时位  
	var hr = Math.floor((second - day * 3600 * 24) / 3600);
	var hrStr = hr.toString();
	if (hrStr.length == 1) hrStr = '0' + hrStr;

	// 分钟位  
	var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
	var minStr = min.toString();
	if (minStr.length == 1) minStr = '0' + minStr;

	// 秒位  
	var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
	var secStr = sec.toString();
	if (secStr.length == 1) secStr = '0' + secStr;
	return {
		hrStr,
		minStr,
		secStr
	}
}

const getNowFormatDate = () => {
	let date = new Date();
	let seperator = "-";
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	let currentdate = year + seperator + month + seperator + strDate;
	return currentdate;
}

//初始时间处理（210000）【21:00】
const parserDate = endDateStr => {
	if (endDateStr && endDateStr.length == 6) {
		let seperator = ":";
		let h = endDateStr.substring(0, 2);
		let m = endDateStr.substring(2, 4);
		let s = endDateStr.substring(4, 6);
		let date = getNowFormatDate() + " " + h + seperator + m + seperator + s;
		return date;
	} else {
		return "";
	}
}

const lastTimeString = (diff) => {
	if (diff <= 0) {
		diff = 24 * 60 * 60 + diff
	}

	const timeLeft = {
		day: 0,
		hour: 0,
		minute: 0,
		sec: 0,
	};
	let d = 60 * 60 * 24;
	if (diff >= d) {
		timeLeft.day = Math.floor(diff / d);
		diff -= timeLeft.day * d;
	}
	if (diff >= 3600) {
		timeLeft.hour = Math.floor(diff / 3600);
		diff -= timeLeft.hour * 3600;
	}
	if (diff >= 60) {
		timeLeft.minute = Math.floor(diff / 60);
		diff -= timeLeft.minute * 60;
	}
	timeLeft.sec = Math.floor(diff);
	return timeLeft;
}

const showTickTime = endDateStr => {
	if (endDateStr == null) return endDateStr
	var end = new Date(endDateStr.replace(/-/g, '/')).getTime();
	let now = new Date().getTime();

	let diff = (end - now) / 1000;
	if (diff < 0) {
		return null;
	}
	return lastTimeString(diff);
}

const timeCompareNow = (timeString) => {
	var timestamp1 = new Date(timeString);
	var diff = timestamp1.getTime() - new Date();
	var date = lastTimeString(diff);
	return date.day + ' 天' + date.hour + ' 小时' + date.minute + ' 分钟' + date.minute + ' 秒';
}


// 日期返回  今天 昨天  或者 不变
const todayFormat = mydate => {
	if (mydate == '') return '待揭晓'
	var d = mydate.replace(/-/g, '/');
	// 格式化时间为 y-m-d 00:00:00
	const formatZero = d => {
		d.setHours(0);
		d.setMinutes(0);
		d.setSeconds(0);
		return d;
	}

	var now = new Date();
	var openResultTime = new Date(d);
	var delta = (formatZero(now) - formatZero(openResultTime)) / 1000;
	var deltaHour = Math.abs(delta / 60 / 60);
	if (0 <= deltaHour && deltaHour <= 24) {
		return '今天'
	} else if (24 < deltaHour && deltaHour <= 48) {
		return '昨天'
	}
	return openResultTime.format('MM月dd日')
}


// 人民币保留两位 字符串处理
const priceFix2 = price => {
	if (parseFloat(price) == 0) {
		return '0.00'
	} else {
		var priceString = parseFloat(price / 100.0).toFixed(2) + '';
		var priceArray = priceString.split('.');
		return priceArray.join('.');
	}
}

// 解析分享链接参数
const parseUrlParam = options => {
	if (options.q == undefined) return options;
	var decodeUrl = decodeURIComponent(options.q);
	var str = decodeUrl.split('?')[1];
	var items = str.split('&');

	var paramObj = {};
	for (var p of items) {
		var array = p.split('=');
		var name = array[0];
		var value = array[1];
		paramObj[name] = value;
	}
	return paramObj;
}



const nextOpenTime = () => {
	var time = new Date().getHours();
	var week = new Date().getDay();

	var str = ''
	if (week == 0) {
		str = "周日";
		if (time > 22) {
			str = "周二";
		}
	} else if (week == 1) {
		str = "周二";
	} else if (week == 2) {
		str = "周二";
		if (time > 22) {
			str = "周四";
		}
	} else if (week == 3) {
		str = "周四";
	} else if (week == 4) {
		str = "周四";
		if (time > 22) {
			str = "周日";
		}
	} else if (week == 5) {
		str = "周日";
	} else if (week == 6) {
		str = "周日";
	}

	return str;
}



module.exports = {
	formatTime: formatTime,
	remainTime: remainTime,
	showTickTime: showTickTime,
	timeCompareNow: timeCompareNow,
	priceFix2: priceFix2,
	todayFormat: todayFormat,
	parseUrlParam: parseUrlParam,
	nextOpenTime: nextOpenTime
}

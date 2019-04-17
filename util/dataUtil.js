const dataUtil = {
	// 人民币保留两位 字符串处理
	priceFix2 : price => {
		if (parseFloat(price) == 0) {
			return '0.00'
		} else {
			var priceString = parseFloat(price / 100.0).toFixed(2) + '';
			var priceArray = priceString.split('.');
			return priceArray.join('.');
		}
	}
}

export default dataUtil;
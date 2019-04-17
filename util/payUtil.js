const pay = function(param, callBack) {
	console.log("三方支付----------" + param.provider + '-------' + param.orderInfo);
	const {
		payChannel,
		provider,
		orderInfo
	} = param;
	if (provider === 'wxpay') {
		//微信小程序 微信app
		// #ifdef APP-PLUS
		uni.requestPayment({
			provider: param.provider,
			orderInfo: JSON.stringify(param.orderInfo), //微信、支付宝订单数据
			success: function(res) {
				console.log('success:' + JSON.stringify(res));
				callBack(res)
			},
			fail: function(err) {
				console.log('fail:' + JSON.stringify(err));
				callBack(err)
			}
		});
		// #endif

		// #ifdef MP-WEIXIN
		const wexinSpec = orderInfo.wexinSpec;
		wexinSpec.packageValue = 'prepay_id=' + wexinSpec.prepay_id;
		let that = this;
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: wexinSpec.timestamp,
			nonceStr: wexinSpec.noncestr,
			package: wexinSpec.packageValue,
			signType: 'MD5',
			paySign: wexinSpec.sign,
			success: function(res) {
				callBack(res)
			},
			fail: function(err) {
				callBack(res)
			}
		});
		// #endif
	} else if (provider === 'alipay') {

	} else if (provider === 'Wallet') {

	}
}

export default {
	pay
}

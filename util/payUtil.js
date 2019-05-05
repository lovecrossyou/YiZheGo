const pay = function(param, callBack) {
    console.log("三方支付----------" + param.provider + '-------' + JSON.stringify(param.orderInfo));
    const {
        payChannel,
        provider,
        orderInfo
    } = param;
    if (provider === 'wxpay' || provider === 'alipay') {
        //微信小程序 微信app
        // #ifdef APP-PLUS
        const orderInfo = param.orderInfo.wexinSpec || param.orderInfo.paras;
        
        let params = {};
        if (param.orderInfo.wexinSpec) {
            params = {
                appid: orderInfo.appid,
                noncestr: orderInfo.noncestr,
                package: orderInfo.packageValue,
                partnerid: orderInfo.partnerid,
                prepayid: orderInfo.prepay_id,
                sign: orderInfo.sign,
                timestamp: orderInfo.timestamp,
            }
            params = JSON.stringify(params);
        }
        else{
            params = orderInfo.info;
        }
        // console.log('params ', JSON.stringify(params));
        uni.requestPayment({
            provider,
            orderInfo: params, //微信、支付宝订单数据
            success: function(res) {
                console.log('success:' + JSON.stringify(res));
                callBack(true)
                uni.hideLoading();
            },
            fail: function(err) {
                console.log('fail:' + JSON.stringify(err));
                callBack(false)
                uni.hideLoading();
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
                callBack(true)
            },
            fail: function(err) {
                callBack(false)
            }
        });
        // #endif
    }
}

export default {
    pay
}
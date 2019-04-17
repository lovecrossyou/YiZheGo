import request from './request'
const uploadBaseUrl = "http://www.xiteng.com/xitenggamenode/";

const api = {
	// 新人福利
	newsBenefitList: params => request.post('/discountGameList/byCommonUser', params),
	// 热销榜单
	byTimeLimitChoiceList: params => request.post('/discountGameList/byTimeLimitChoice', params),
	// 全部抢购活动
	byTimeLimitList: params => request.post('/discountGameList/byTimeLimit', params),
	// 详情
	productDetails: params => request.post('/discountGame/detail', params),

	searchNearby: (params) => request.post("map/search", params),
	//推荐列表
	discusRecommendList:params => request.post('/discountGame/discusRecommendList',params),
	//讨论列表
	discusCommentList:params => request.post('/discountGame/discusCommentList',params),
	//晒单列表
	showWinOrderList:params => request.post('/discountGame/showWinOrderList',params),
	//晒单讨论详情
	showWinOrderDetail:params => request.post('/discountGame/showWinOrderDetail',params),


	discusRecommendList:params => request.post(' /discountGame/discusRecommendList',params),
	//我
	userInfo:(params) => request.post("/user/info",params),
	//中签列表
	luckyList:(params) => request.post('/discountGame/winGameListByStage', params),

    //确认订单
	confirmOrderInfo:params => request.post("/discountGameOrder/immediateBuy",params),
	
	//提交订单
	commitOrder:params => request.post("/discountGameOrder/commit",params),
	
	//支付
	commitPay:params => request.post("/client/discountGamePay/confirm",params),
	
	//收货地址
	addressList:params => request.post("/deliveryAddress/list",params),
	//支付结果查询
	queryResult:params => request.post("/client/discountGamePay/queryResult",params),
	//订单详情
	clientOrderDetail:params => request.post("/discountGameOrder/clientOrderDetail",params),
	
	//判断是否设置支付密码
	checkSetPayPassword:params => request.post("/client/bankCard/checkSetPayPassword",params),
    
	//账户信息
	accountInfo:params => request.post("/account/info",params),
	//上传
	uploader: (file, callback) => {
		uni.uploadFile({
			url: uploadBaseUrl + '/upload',
			filePath: file,
			name: 'file',
			success: (result) => {
				const data = JSON.parse(result.data);
				if (parseInt(data.status) === 0) {
					callback(data.data);
				}
			}
		});
	},
	//微信授权登录
	wxlogin: params => request.post('/login/weChatMiniPrograms', params)
}
export default api

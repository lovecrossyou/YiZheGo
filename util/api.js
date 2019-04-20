import request from './request'

// const uploadBaseUrl = "http://www.xiteng.com/xitenggamenode/";
const uploadBaseUrl = "http://123.57.161.212:9939/xitenggamenode/";

const api = {
	// 喜腾好物
	newsBenefitList: params => request.post('/discountGameList/goodProduct', params),
	// 热销榜单
	byTimeLimitChoiceList: params => request.post('/discountGameList/byTimeLimitChoice', params),
	// 全部抢购活动
	byTimeLimitList: params => request.post('/discountGameList/byTimeLimit', params),
	// 详情
	productDetails: params => request.post('/discountGame/detail', params),
	// 收藏
	collectProduct:params=>request.post('/discountProduct/collect',params),
	vipProductDetail: params => request.post('/discountGame/vipProductDetail', params),
	buyVipProduct: params => request.post('/discountGame/vipProductPurchaseInfo', params),
	updateToVipUser: params => request.post('/vip/updateToVipUser', params),

	searchNearby: (params) => request.post("map/search", params),
	//推荐列表
	discusRecommendList: params => request.post('/discountGame/discusRecommendList', params),
	//讨论列表
	discusCommentList: params => request.post('/discountGame/discusCommentList', params),
	//晒单列表
	showWinOrderList: params => request.post('/discountGame/showWinOrderList', params),
	//晒单讨论详情
	showWinOrderDetail: params => request.post('/discountGame/showWinOrderDetail', params),
	//点赞或取消
	praiseShowWinOrder: params => request.post('/discountGame/praiseShowWinOrder', params),
	//评论晒单
	commentShowWinOrder: params => request.post('/discountGame/commentShowWinOrder', params),
	
	// 邀请用户
	inviteUser:params=>request.post('/discountGame/inviteUser',params),
	// 用户所有好友信息
	userProfitAllFriendInfo:params=>request.post('/profit/userProfitAllFriendInfo',params),
	// 用户返利信息
	userProfitInfo:params=>request.post('/profit/userProfitInfo',params),

	discusRecommendList: params => request.post(' /discountGame/discusRecommendList', params),
	//我
	userInfo:(params) => request.post("/user/info",params),
	//会员信息
	vipInfo:(params) => request.post('/vip/userVipInfo', params),
	//中签列表
	luckyList:(params) => request.post('/discountGame/winGameListByStage', params),
	//中签详情
	luckyDetail:(params) => request.post('/discountGame/winGameListByStageDetail', params),

	//确认订单
	confirmOrderInfo: params => request.post("/discountGameOrder/immediateBuy", params),

	//提交订单
	commitOrder: params => request.post("/discountGameOrder/commit", params),

	//支付
	commitPay: params => request.post("/client/discountGamePay/confirm", params),

	//收货地址
	addressList: params => request.post("/deliveryAddress/list", params),
	//支付结果查询
	queryResult: params => request.post("/client/discountGamePay/queryResult", params),
	//订单详情
	clientOrderDetail:params => request.post("/discountGameOrder/clientOrderDetail",params),
	
	//判断是否设置支付密码
	checkSetPayPassword:params => request.post("/client/bankCard/checkSetPayPassword",params),
    
	//账户信息
	accountInfo:params => request.post("/account/info",params),
	
	//获取验证码
	getVerificationCode:params => request.post("/reqcheckCode/getCode",params),
	
	checkCodeLogin:params => request.post("/checkCodeLogin",params),

	//用户订单列表    
	getMyOrder: params => request.post("/discountGame/clientOrder", params),

	//设置支付密码
	setPayPassword:params => request.post("/client/bankCard/setPayPassword", params),
	
	acceptInvite : params =>request.post("/discountGame/acceptInvite",params),
	
	//红包弹窗
	redPacket:params =>request.post("/discountGame/getRewardRecord",params),
	//领取红包
	getRedPacket:params => request.post("/discountGame/readRewardRecord",params),
	//领取会员弹窗
	vipModal:params =>request.post("/vip/pushPresentVipInfo",params),
	// 领取会员
	getPresentVip:params =>request.post("/vip/getPresentVip",params),
	
	//取消订单
	cancelClientOrder:params => request.post("/discountGameOrder/cancelClientOrder",params),

	//退款详情
	getRefundDetail:params => request.post("/discountGame/refundDetail",params),


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
	wxlogin: params => request.post('/login/weChatMiniPrograms', params),

	vipProducts: params => request.post('/discountGame/vipProduct', params),
	
	bindPhone:params =>request.post('/bindPhone',params),
	findPayPassword: params=>request.post('/client/bankCard/findPayPassword',params)
}
export default api


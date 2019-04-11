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

	discusRecommendList:params => request.post(' /discountGame/discusRecommendList',params),
	//我
	userInfo:(params) => request.post("/user/info",params),


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

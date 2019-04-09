import request from './request'
const uploadBaseUrl = "";

const api = {
	//获取茶商城首页分类
	homeDiscountGameList:params => request.post('/discountGameList/all',params),
	searchNearby: (params) => request.post("map/search", params),
	discusRecommendList:params => request.post(' /discountGame/discusRecommendList',params),
	
	//上传
	uploader: (file, callback) => {
		uni.uploadFile({
			url: uploadBaseUrl + '/manage/qiniu/upload',
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
	wxlogin: params => request.post('/login/weChatMiniPrograms',params)
}
export default api

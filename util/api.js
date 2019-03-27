import request from './request'
const uploadBaseUrl = "";

const api = {
	//获取茶商城首页分类
	homeCategoryList: params => request.post("productService/teaMall/home/category",params),
	searchNearby: (params) => request.post("map/search", params),
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
	}
}
export default api

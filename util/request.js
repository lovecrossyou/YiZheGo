import Fly from 'flyio/dist/npm/wx'
const request = new Fly()
const baseURL = 'http://123.57.161.212:9939/xitenggamejar/'
//http://123.57.161.212:9939/xitenggamejar/swagger-ui.html
request.config.baseURL = baseURL
// request.config.headers = {
// 	"content-type": "application/json",
// 	"accessToken": service.getToken()
// }
	
const errorPrompt = (err) => {
	uni.showToast({
		title: err.data.message || 'fetch data error.',
		icon: 'none'
	})
}

request.interceptors.request.use((request) => {
	uni.showLoading();
	return request
})

request.interceptors.response.use((response, promise) => {
	uni.hideLoading()
	if (!(response.data.status === "ok")) {
		errorPrompt(response)
	}
	return promise.resolve(response.data)
}, (err, promise) => {
	uni.hideLoading()
	errorPrompt(err)
	return promise.reject(err)
})

export default request

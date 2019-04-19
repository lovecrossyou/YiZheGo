import Fly from 'flyio/dist/npm/wx'
import hex_md5 from "../util/md.js"
import service from "../service.js"

const request = new Fly()
export const baseURL = 'http://123.57.161.212:9939/xitenggamejar/'
// export const baseURL = 'https://www.xiteng.com/xitenggamejar/'

const APP_SECRET = '71838ae252714085bc0fb2fc3f420110'
const APP_KEY = 'b5958b665e0b4d8cae77d28e1ad3f521'


// 生成accessinfo信息
export const createAccessInfo = () => {
	var access_token = "";
	var phone_num = '';
	var signature = hex_md5(APP_SECRET);
	const token = service.getToken();
	if (token) {
		access_token = token.access_token;
		phone_num = token.phone_num;
		signature = hex_md5(APP_SECRET + '&' + token.access_token_secret);
	}
	var accessInfo = {
		app_key: APP_KEY,
		signature: signature,
		access_token: access_token,
		phone_num: phone_num,
	}
	return accessInfo;
}

request.config.baseURL = baseURL

const errorPrompt = (err) => {
	if (err.data.message === '用户不存在') {
		uni.navigateTo({
			url: "/pages/login/WeChatLogin/WeChatLogin"
		})
		return;
	}

	var message = err.data.message;
	if (message && message.indexOf('升级会员') != -1) {
		uni.showModal({
			cancelText: '暂不升级',
			confirmText: '立即升级',
			cancelColor: '#999999',
			confirmColor: '#cc2636',
			title: '升级会员',
			content: '您当前还不是会员，每月仅可参与一期，升级会员可参与每期的抽签抢活动',
			success(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: '/pages/me/vip/vip-center',
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
		return;
	}

	uni.showToast({
		title: err.data.message || 'fetch data error.',
		icon: 'none'
	})
}

request.interceptors.request.use((request) => {
	let body = request.body;
	if (body) {
		body = Object.assign({}, { ...body
		}, {
			accessInfo: createAccessInfo()
		});
	} else {
		body = {
			accessInfo: createAccessInfo()
		}
	}
	request.body = body;
	uni.showLoading();
	return request
})

request.interceptors.response.use((response, promise) => {
	uni.hideLoading()
	if (!(response.status === 200)) {
		errorPrompt(response)
	}
	return promise.resolve(response.data)
}, (err, promise) => {
	uni.hideLoading()
	errorPrompt(err.response)
	return promise.reject(err)
})

export default request

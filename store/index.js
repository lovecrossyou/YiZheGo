<<<<<<< HEAD
import Fly from 'flyio/dist/npm/wx'
import hex_md5 from "../util/md.js"
import service from "../service.js"

const request = new Fly()
const baseURL = 'http://123.57.161.212:9939/xitenggamejar/'

const APP_SECRET = '71838ae252714085bc0fb2fc3f420110'
const APP_KEY = 'b5958b665e0b4d8cae77d28e1ad3f521'


// 生成accessinfo信息
const createAccessInfo = () => {
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
	let body = request.body;
	if (body) {
		body = Object.assign({}, { ...body
		}, {
			accessInfo: createAccessInfo()
		});
	} else {
		body = {
			accessInfo: createAccessInfo()
=======
import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home.js'
import api from '../util/api.js';
import service from "../service.js";
import moments from './modules/moments.js'
import chooseCode from './modules/chooseCode.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		home,
		chooseCode,
		moments
	},
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userInfo: null,
		token: null,
		openid: null
	},
	mutations: {
		login(state, userInfo) {
			state.userInfo = userInfo;
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		saveToken(state, token) {
			state.token = token;
		},
		saveUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		saveOpenId(state, openid) {
			state.openid = openid;
		}
	},
	actions: {
		checkLoginStatus({
			commit,
			state
		}) {
			const token = service.getToken();
			if (token) {
				commit('saveToken', token);
			}
		},
		async wxlogin({
			commit,
			state
		}, params) {
			const {
				token,
				userInfo,
				openid
			} = await api.wxlogin(params);
			commit('saveToken', token);
			commit('saveUserInfo', userInfo);
			commit('saveOpenId', openid);
			service.addToken(token);
			uni.navigateBack();
>>>>>>> b0df0a256e4f6ffcae6dbdf2ae7261f146f2132d
		}
	}
	request.body = body;
	uni.showLoading();
	return request
})

request.interceptors.response.use((response, promise) => {
	uni.hideLoading()
	console.log('response ', JSON.stringify(response));
	if (!(response.status === 200)) {
		errorPrompt(response)
	}
	return promise.resolve(response.data)
}, (err, promise) => {
	uni.hideLoading()
	errorPrompt(err)
	return promise.reject(err)
})

export default request
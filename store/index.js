import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home.js';
import productDetail from './modules/productDetails.js';
import api from '../util/api.js';
import service from "../service.js";
import confirmPay from './modules/confirmPay.js';
import payResult from './modules/payResult.js';
import chooseCode from './modules/chooseCode.js'

const urlParams = () => {
	const accessInfo = createAccessInfo();
	const urlParams = '?app_key=' + accessInfo.app_key + '&signature=' + accessInfo.signature + '&access_token=' +
		accessInfo.access_token + '&wechat_redirect';
	return urlParams;
}

import {
	baseURL,
	createAccessInfo
} from "@/util/request.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		home,
		chooseCode,
		productDetail,
		confirmPay,
		payResult,
	},

	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: true,
		userInfo: null,
		token: null,
		openid: null,
		urlParams: '',
		h5BaseUrl: 'https://www.xiteng.com/xitenggamenode/#/'
	},
	getters: {
		h5Page: (state) => (page) => {
			return state.h5BaseUrl + page + state.urlParams
		}
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
		},
		setH5Url(state, data) {
			state.urlParams = data;
		}
	},
	actions: {
		checkLoginStatus({
			commit,
			state
		}) {
			const token = service.getToken();
			const openid = service.getOpenId();
			if (token) {
				commit('saveToken', token);
				commit('saveOpenId', openid);
				//拼接h5参数
				const accessInfo = createAccessInfo();
				commit('setH5Url', urlParams());
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
			service.addOpenId(openid);

			commit('setH5Url', urlParams());

			uni.navigateBack();
		},
		async checkCodeLogin({
			commit,
			state
		}, params) {
			const token = await api.checkCodeLogin(params);
			commit('saveToken', token);
// 			commit('saveUserInfo', userInfo);
// 			commit('saveOpenId', openid);
			console.log('token ', token);
			service.addToken(token);
			// service.addOpenId(openid);
			uni.navigateBack();
		}
	}
})
export default store

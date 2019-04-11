import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home.js';
import productDetail from './modules/productDetails.js';
import api from '../util/api.js';
import service from "../service.js";
import confirmPay from './modules/confirmPay.js';

import chooseCode from './modules/chooseCode.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		home,
		chooseCode,
		productDetail,
		confirmPay
	},

	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: true,
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
			console.log('token ',token);
			service.addToken(token);
			uni.navigateBack();
		}
	}
})
export default store
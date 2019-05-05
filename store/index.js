import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home.js';
import productDetail from './modules/productDetails.js';
import api from '../util/api.js';
import service from "../service.js";
import confirmPay from './modules/confirmPay.js';
import payResult from './modules/payResult.js';
import chooseCode from './modules/chooseCode.js'
import myOrder from './modules/myOrder.js'
import inviteFriend from './modules/inviteFriend.js'
import recommend from './modules/recommend.js'
import comment from './modules/comment.js'
import showWinOrder from './modules/showWinOrder.js'


const urlParams = () => {
	const accessInfo = createAccessInfo();

	let urlParams = '';
	
	// #ifdef MP-WEIXIN
	urlParams = 'app_key=' + accessInfo.app_key + '&signature=' + accessInfo.signature + '&access_token=' +
		accessInfo.access_token + '&wechat_redirect';
	// #endif
	
	// #ifdef APP-PLUS
	urlParams = 'app_key=' + accessInfo.app_key + '&signature=' + accessInfo.signature + '&access_token=' +
		accessInfo.access_token;
	// #endif
	
	return urlParams;
}

/**
 * 接受邀请
 */
const acceptInvite = async () => {
	const inviteId = service.getInviteId();
	if (inviteId) {
		const res = await api.acceptInvite({
			inviteUserId: inviteId
		});
	}
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
		myOrder,
		inviteFriend,
		recommend,
		comment,
		showWinOrder
	},

	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userInfo: null,
		token: null,
		openid: null,
		urlParams: '',
		// h5BaseUrl: 'http://192.168.1.235:8000/#/'
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
		},

		setAuthAppLogin(state, data) {

		}
	},
	actions: {
		checkLoginStatus({
			commit,
			state
		}) {
			const token = service.getToken();
			const openid = service.getOpenId();
			const userInfo = service.getInfo();
			if (token) {
				commit('saveToken', token);
				commit('saveOpenId', openid);
				commit('saveUserInfo', userInfo);
				if (userInfo) {
					commit('login', userInfo);
				}
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

			commit('login', userInfo);

			service.addToken(token);
			service.addOpenId(openid);
			service.addInfo(userInfo);
			commit('setH5Url', urlParams());

			acceptInvite();
		
			// 检测是否绑定过手机号
			if (userInfo.phoneNumber == null || userInfo.phoneNumber.length == 0) {
				// 继续绑定手机号
				wx.redirectTo({
					url: '/pages/login/WeChatLogin/inputTelNumber',
				})
			} else {
				uni.navigateBack();
			}
		},

		async checkCodeLogin({
			commit,
			state
		}, params) {
			const res = await api.checkCodeLogin(params);
			const {
				token,
				userInfo,
			} = res;
			commit('saveToken', token);
			commit('saveUserInfo', userInfo);
			// commit('saveOpenId', openid);
			commit('login', userInfo);
			service.addToken(token);
			// service.addOpenId(openid);
			service.addInfo(userInfo);

			commit('saveToken', token);
			service.addToken(token);
			acceptInvite();
			uni.navigateBack();
		},

		async authwxappLogin({
			state,
			commit
		}, nativeParams) {
			const token = await api.loginForApp(nativeParams);
			commit('saveUserInfo', userInfo);
			service.addToken(token);
			let userInfo = await api.userInfo({});

			service.addInfo(userInfo);
			commit('login', userInfo);
			
			console.log('userInfo## ',JSON.stringify(userInfo));

			// 检测是否绑定过手机号
			if (userInfo.phoneNumber == null || userInfo.phoneNumber.length == 0) {
				// 继续绑定手机号
				wx.redirectTo({
					url: '/pages/login/WeChatLogin/inputTelNumber',
				})
			} else {
				uni.navigateBack();
			}
		}
	}
})
export default store

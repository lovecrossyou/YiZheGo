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
import inviteFriend from './modules/inviteFriend.js';


const urlParams = () => {
	const accessInfo = createAccessInfo();
	const urlParams = '?app_key=' + accessInfo.app_key + '&signature=' + accessInfo.signature + '&access_token=' +
		accessInfo.access_token + '&wechat_redirect';
	return urlParams;
}

/**
 * 接受邀请
 */
const acceptInvite = async () => {
	const inviteId = service.getInviteId();
	if (inviteId) {
		const res = await api.acceptInvite({
			inviteId
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
			const userInfo = service.getInfo();
			if (token) {
				commit('saveToken', token);
				commit('saveOpenId', openid);
				commit('saveUserInfo', userInfo);

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
			service.addInfo(userInfo);
			commit('setH5Url', urlParams());

			// 检测是否绑定过手机号
			if (userInfo.phoneNumber == null || userInfo.phoneNumber.length == 0) {
				// 继续绑定手机号
				wx.redirectTo({
					url: '/pages/login/WeChatLogin/inputTelNumber',
				})
			}


			acceptInvite();
			uni.navigateBack();
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

			service.addToken(token);
			// service.addOpenId(openid);
			service.addInfo(userInfo);


			commit('saveToken', token);
			service.addToken(token);
			acceptInvite();
			uni.navigateBack();
		}
	}
})
export default store

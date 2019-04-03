import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home.js'
import api from '../util/api.js';
import service from "../service.js";

import chooseCode from './modules/chooseCode.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		home,
		chooseCode
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
		}
	},
	actions: {
		async wxlogin({
			cimmit,
			state
		}, params) {
			const res = await api.wxlogin(params);
			const {
				token,
				userInfo,
				openid
			} = res;
			state.token = token;
			state.userInfo = userInfo;
			state.openid = openid;
			
			service.addToken(token);
		}
	}
})
export default store

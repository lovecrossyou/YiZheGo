import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home.js'
<<<<<<< HEAD
import api from '../util/api.js';
import service from "../service.js";
=======
<<<<<<< HEAD
import moments from './modules/moments.js'
=======
import api from '../util/api.js';
import service from "../service.js";
>>>>>>> 60f1398302fbebd6a48ada286e1617617688b608

>>>>>>> b64a9257e82cc24124c69a449c22c64051fda7cd
import chooseCode from './modules/chooseCode.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		home,
<<<<<<< HEAD
		chooseCode,
		moments
	},
	
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: true,
        userName: ""
    },
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        }
    }
})
=======
		chooseCode
	},
>>>>>>> b64a9257e82cc24124c69a449c22c64051fda7cd

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
		}
	}
})
export default store

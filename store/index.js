import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home.js'
<<<<<<< HEAD
import moments from './modules/moments.js'
=======
import api from '../util/api.js';
import service from "../service.js";

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

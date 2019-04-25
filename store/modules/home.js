import api from '@/util/api.js';

const state = {
	timeLimitList: [],
	timeLimitChoiceList: null,
	newsBenefitList: null,
	homeBannerLists:[]
}

const getters = {
	timeLimit3(state, getters) {
		if (state.timeLimitChoiceList == null) return [];
		return state.timeLimitChoiceList.slice(0, 3)
	},
	newsBenefitList3(state, getters) {
		if (state.newsBenefitList == null) return [];
		return state.newsBenefitList.slice(0, 3)
	},
	loading(state, getters) {
		return state.timeLimitChoiceList == null || state.newsBenefitList == null;
	}
}

const actions = {
	async fetchNewsBenefitList({
		commit,
	}) {
		const res = await api.newsBenefitList();
		commit('setNewsBenefitList', res);
	},
	async fetchTimeLimitChoiceList({
		commit
	}, cb) {
		const res = await api.byTimeLimitChoiceList();
		console.log('fetchTimeLimitChoiceList ### ', res);
		commit('setTimeLimitChoiceList', res)
		cb && cb();
	},
	async fetchBannerLists({commit}){
		const res = await api.bannerList()
		commit('setHomeBannerLists',res)
	}
}

const mutations = {
	setHomeBannerLists(state,data){
		console.log('data==',data)
		state.homeBannerLists = data
	},
	setByTimeLimitList(state, data) {
		state.timeLimitList = data
	},
	setTimeLimitChoiceList(state, data) {
		state.timeLimitChoiceList = data
	},
	setNewsBenefitList(state, data) {
		state.newsBenefitList = data
	},
	setSelectedInd(state, data) {
		function compare(prop){
			return function(obj1,obj2){
				var val1 = obj1[prop]
				var val2 = obj2[prop]
				return val1-val2
			}
		}
		state.timeLimitList.sort(compare(data))
		console.log(state.timeLimitList)
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}

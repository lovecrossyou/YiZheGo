import api from '@/util/api.js';

const state = {
	timeLimitList: [],
	timeLimitChoiceList: [],
	newsBenefitList: [],
}

const getters = {
	timeLimit3(state, getters) {
		return state.timeLimitChoiceList.slice(0, 3)
	},
	newsBenefitList3(state,getters) {
		return state.newsBenefitList.slice(0,3)
	}
}

const actions = {
	async fetchNewsBenefitList({
		commit,
	}) {
		const res = await api.newsBenefitList();
		commit('setNewsBenefitList', res);
	},
	async fetchTimeLimitChoiceList({commit}){
		const res = await api.byTimeLimitChoiceList();
		commit('setTimeLimitChoiceList',res)
	}
}

const mutations = {
	setByTimeLimitList(state, data) {
		state.timeLimitList = data
	},
	setTimeLimitChoiceList(state, data) {
		state.timeLimitChoiceList = data
	},
	setNewsBenefitList(state, data) {
		state.newsBenefitList = data
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}

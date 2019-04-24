import api from '@/util/api.js';

const state = {
	timeLimitList: [],
	timeLimitChoiceList: null,
	newsBenefitList: null
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

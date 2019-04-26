import api from '@/util/api.js';

const state = {
	timeLimitList: [],
	timeLimitChoiceList: null,
	newsBenefitList: null,
	homeBannerLists: []
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
		// console.log('fetchTimeLimitChoiceList ### ', res);
		commit('setTimeLimitChoiceList', res)
		cb && cb();
	},
	async fetchBannerLists({
		commit
	}) {
		const res = await api.bannerList()
		commit('setHomeBannerLists', res)
	}
}

const mutations = {
	setHomeBannerLists(state, data) {
		console.log('data==', data)
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
		function compare(prop, rev) {
			if (rev == undefined) {
				rev = 1
			} else {
				rev = (rev) ? 1 : -1
			}
			return function(obj1, obj2) {
				var val1 = obj1[prop]
				var val2 = obj2[prop]
				if (val1 < val2) {
					return val1-val2
				} else if (val1 > val2) {
					return val2-val1
				}
				// return 0
			}
		}
		state.timeLimitList.sort(compare(data.filt, data.rev))
		state.newsBenefitList.sort(compare(data.filt, data.rev))
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}

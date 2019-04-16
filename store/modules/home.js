const state = {
	timeLimitList: [],
	timeLimitChoiceList: [],
	newsBenefitList: [],
}

const getters = {
	timeLimit3(state, getters){
		return state.timeLimitChoiceList.slice(0, 3)
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
	getters
}

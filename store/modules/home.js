const state = {
	timeLimitList: [],
	timeLimitChoiceList: [],
	newsBenefitList: [],
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
	mutations
}

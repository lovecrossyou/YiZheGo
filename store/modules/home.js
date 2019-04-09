const state = {
	hotSaleList:[],
	timeLimitChoiceList:[],
}
const mutations = {
	setHotSaleList(state,data){
		state.hotSaleList=data
	},
	setTimeLimitChoiceList(state,data){
		state.timeLimitChoiceList=data
	}
}
export default {
	namespaced:true,
	state,
	mutations
}

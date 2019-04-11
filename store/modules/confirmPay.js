const state={
	orderInfo:null,
	buyType:null
}

const mutations={
	setOrderInfo(state,data){
		state.orderInfo = data;
	},
	setBuyType(state,data){
		state.buyType = data;
	}
}

export default {
	namespaced: true,
	state,
	mutations
}
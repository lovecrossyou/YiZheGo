const state={
	result:{},
	orderDetails:{}
}

const mutations={
	setPayResult(state,data){
		state.result = data;
	},
	setOrderDetails(state,data){
		state.orderDetails = data;
	}
}

export default {
	namespaced: true,
	state,
	mutations
}
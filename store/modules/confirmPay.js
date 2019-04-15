const state={
	orderInfo:null,
	buyType:null,
	address:null,
}

const mutations={
	setOrderInfo(state,data){
		state.orderInfo = data;
	},
	setBuyType(state,data){
		state.buyType = data;
	},
	setAddressList(state,data){
		if(data!=null&data.length>0){
			state.address = data[0];
		}
	}
}

export default {
	namespaced: true,
	state,
	mutations
}
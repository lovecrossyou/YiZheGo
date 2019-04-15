const state = {
	orderInfo: null,
	buyType: null,
	address: {},
	addr_id: null
}

const mutations = {
	setOrderInfo(state, data) {
		state.orderInfo = data;
	},
	setBuyType(state, data) {
		state.buyType = data;
	},
	setAddressList(state, data) {
		if (data != null & data.length > 0) {
			state.address = data[0];
		}
	},
	setAddrId(state, data) {
		state.addr_id = data;
	}
}

export default {
	namespaced: true,
	state,
	mutations
}

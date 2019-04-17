const state = {
	orderInfo: {"discountGameId": 0,
  "relatedProductName": "0",
  "originalPrice": 0,
  "relatedProductImageUrl": "http://123.57.161.212:8080/group1/M00/00/50/ezmh1FsgxniADKDvAADsY6Jg_mM780.jpg",
  "totalPrice": 0,
  "totalPayRmbPrice": 0,
  "useXtbAmount": 0,
  "deductionRmb": 0,
  "freight": 0},
	buyType: null,
	address: null,
	addr_id: 0
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

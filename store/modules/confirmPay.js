import dataUtil from '../../util/dataUtil.js';
const state = {
	orderInfo: {"discountGameId": 0,
  "relatedProductName": "0",
  "originalPrice": 0,
  "oneDiscountPrice":0,
  "relatedProductImageUrl": "http://123.57.161.212:8080/group1/M00/00/50/ezmh1FsgxniADKDvAADsY6Jg_mM780.jpg",
  "totalPrice": 0,
  "totalPayRmbPrice": 0,
  "useXtbAmount": 0,
  "deductionRmb": 0,
  "freight": 0},
	buyType: null,
	address: null,
	addr_id: 0,
	refundWay:{title:'喜币钱包',refundWay:'account'}
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
	},
	setRefundWay(state, data){
		state.refundWay = data;
	}
}
const getters = {
	originalPrice(state){
		return dataUtil.priceFix2(state.orderInfo.originalPrice)
	},
	fix2Price(state){
		return {
			originalPrice:dataUtil.priceFix2(state.orderInfo.originalPrice),
			oneDiscountPrice:dataUtil.priceFix2(state.orderInfo.oneDiscountPrice),
			totalPrice:dataUtil.priceFix2(state.orderInfo.totalPrice),
			totalPayRmbPrice:dataUtil.priceFix2(state.orderInfo.totalPayRmbPrice),
			freight:dataUtil.priceFix2(state.orderInfo.freight),
		}
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	getters
}

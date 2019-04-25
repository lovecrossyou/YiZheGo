import api from '@/util/api.js';

const state = {
	productDetail: null
}

const mutations = {
	setProductDetails(state, data) {
		state.productDetail = data;
	},
	resetProductDetail(state, data) {
		state.productDetail = null;
	}

}
export default {
	namespaced: true,
	state,
	mutations
}

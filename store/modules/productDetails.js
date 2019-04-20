import api from '@/util/api.js';

 const state = {
	productDetail: null
}

const mutations = {
	setProductDetails(state, data) {
		state.productDetail = data;
	},
	
}
export default {
	namespaced: true,
	state,
	mutations
}

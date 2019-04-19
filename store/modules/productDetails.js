import api from '@/util/api.js';

 const state = {
	productDetail: null
}

const actions = {
	async fetchCollectProduct() {
		const res = await api.collectProduct({})
	}
	
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

import api from '@/util/api.js';
import timeUtil from '../../util/timeUtil.js';
 const state = {
	productDetail: null
}

const mutations = {
	setProductDetails(state, data) {
		state.productDetail = data;
	},
	
}

const getters = {
	lastTimer(state){ 
		if(state.productDetail!=null){
			const openResultTime = state.productDetail.openResultTime
			const lastTime = timeUtil.showTickTime(openResultTime);
			console.log('开奖时间------'+openResultTime+'----剩余时间----'+JSON.stringify(lastTime));
			return lastTime;
		}
		return null;
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	getters
}

import api from '../../util/api'
export default{
	namespaced:true,
	state:{
		orderData:[],
	},
	mutations:{
		setOrderData(state,data){
			state.orderData = data;
		},
	},
	actions:{
		getOrderData({commit}){
			//let orderTypes = ['allClientOrder','waitPayClientOrder','waitOpenResultClientOrder','waitCommentClientOrder','refundClientOrder','waitReceiveOrder'];
			let orderTypes = ['allClientOrder','waitPayClientOrder','waitOpenResultClientOrder','waitCommentClientOrder','refundClientOrder'];

			let taskGroup = [];
			for(let i=0;i<orderTypes.length;i++){
			let promise	= api.getMyOrder({clientOrderType:orderTypes[i],pageNo:0,size:2});
			taskGroup.push(promise);
			}
			Promise.all(taskGroup).then((res)=>{
			let formatData = 	res.map((cur,index)=>{
					let order = JSON.parse(JSON.stringify(cur));
					order.loadingType = 0;
					return order;
				})
				commit('setOrderData', formatData);
				console.log(formatData);
			})
		},
		addData({commit},data){
			console.log(data);
		}
		
	}
	
}
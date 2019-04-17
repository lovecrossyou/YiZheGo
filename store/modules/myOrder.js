import api from '../../util/api'
export default{
	namespaced:true,
	state:{
		orderData:[],
	},
	mutations:{
		
	},
	actions:{
		getOrderData({commit}){
			api.getMyOrder({clientOrderType:'allClientOrder',pageNo:0,size:10}).then((res)=>{
				console.log(res);
			})
		}
	}
	
}
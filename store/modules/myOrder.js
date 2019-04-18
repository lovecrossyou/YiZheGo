import api from '../../util/api'
const orderTypes = ['allClientOrder', 'waitPayClientOrder', 'waitOpenResultClientOrder', 'waitCommentClientOrder',
	'refundClientOrder'
];

const hasShowed = 'waitingShowOrder';
const waitShow = '';
const waitPay = '';
export default {
	namespaced: true,
	state: {
		orderData: [],
		orderDetail:{},
	},
	getters:{
		// 待付款：0，待揭晓：1,已揭晓：2
		orderDealState(state){
				let status = state.orderDetail.orderRealStatus;
				if(waitPay.indexOf(status)>-1){
					return 0;
				}
				if(waitShow.indexOf(status)>-1){
					return 1;
				}
				if(hasShowed.indexOf(status)>-1){
					return 2;
				}
		}
	},
	mutations: {
		setOrderData(state, data) {
			state.orderData = data;
		},
		addOrderData(state, payload) {
			let {
				pageNo,
				orderData
			} = payload;
			//console.log(state.orderData[pageNo]);
			//console.log(newOrder);

			state.orderData[pageNo].list = state.orderData[pageNo].list.concat(orderData.list);
			state.orderData[pageNo].pageNo = orderData.pageNo;
			console.log(state.orderData);
			state.orderData[pageNo].loadingType = 0;

		},
		changeBottomLoading(state, payload) {
			let {
				pageNo,
				loadingType
			} = payload;
			state.orderData[pageNo].loadingType = loadingType;
		},
		setOrderDetail(state,data){
			state.orderDetail = data;
		}
	},
	actions: {
		getOrderData({
			commit
		}) {
			//let orderTypes = ['allClientOrder','waitPayClientOrder','waitOpenResultClientOrder','waitCommentClientOrder','refundClientOrder','waitReceiveOrder'];
			//let orderTypes = ['allClientOrder','waitPayClientOrder','waitOpenResultClientOrder','waitCommentClientOrder','refundClientOrder'];

			let taskGroup = [];
			for (let i = 0; i < orderTypes.length; i++) {
				let promise = api.getMyOrder({
					clientOrderType: orderTypes[i],
					pageNo: 0,
					size: 10
				});
				taskGroup.push(promise);
			}
			Promise.all(taskGroup).then((res) => {
				let formatData = res.map((cur, index) => {
					let order = JSON.parse(JSON.stringify(cur));
					order.loadingType = 0;

					return order;
				})
				commit('setOrderData', formatData);

			})
		},
		addData({
			commit,
			state
		}, pageNo) {
			commit('changeBottomLoading', {
				pageNo: pageNo,
				loadingType: 1
			});
			
			
			
			
			if(state.orderData[pageNo].pageNo*10 >= state.orderData[pageNo].totalCount){
				commit('changeBottomLoading', {
					pageNo: pageNo,
					loadingType: 2
				});
				return;
			}
			api.getMyOrder({
				clientOrderType: orderTypes[pageNo],
				pageNo: ++state.orderData[pageNo].pageNo,
				size: 10
			}).then((res) => {

				//console.log(res);
				commit('addOrderData', {
					pageNo: pageNo,
					orderData: res
				});

			})
		},
		getOrderDetail({commit},orderNo){
			api.clientOrderDetail({platformOrderNo:orderNo}).then(res=>{
				commit('setOrderDetail',res)
			})
		}

	}

}

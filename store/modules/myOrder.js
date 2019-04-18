import api from '../../util/api'
const orderTypes = ['allClientOrder', 'waitPayClientOrder', 'waitOpenResultClientOrder', 'waitCommentClientOrder',
	'refundClientOrder'
];
export default {
	namespaced: true,
	state: {
		orderData: [],
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
		}

	}

}

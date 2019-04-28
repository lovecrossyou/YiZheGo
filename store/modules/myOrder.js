import api from '../../util/api'
const orderTypes = ['allClientOrder', 'waitPayClientOrder', 'waitOpenResultClientOrder', 'waitCommentClientOrder',
	'refundClientOrder'
];

const hasShowed =
	'waitingShowOrder,waitingRefund,waitingReceiveAndWaitingRefund,waitingReceiveAndHasRefund,waitingShowOrder,hasReceiveAndWaitingRefund,finished';
const waitShow = 'waitingOpenResult';
const waitPay = 'waitingPay';
const hasCancel = 'cancelOrder';


export default {
	namespaced: true,
	state: {
		orderData: [],
		orderDetail: {},
		refundDetail: {},
		loading:false,

	},
	getters: {
		// 待付款：0，待揭晓：1,已揭晓：2,已取消：3
		orderDealState(state) {
			let status = state.orderDetail.orderRealStatus;
			if (waitPay.indexOf(status) > -1) {
				return 0;
			}
			if (waitShow.indexOf(status) > -1) {
				return 1;
			}
			if (hasShowed.indexOf(status) > -1) {
				return 2;
			}
			if (hasCancel.indexOf(status) > -1) {
				return 3;
			}
		},
		todayCode(state) {
			let lotteryCode = state.orderDetail.lotteryCode;
			if (lotteryCode == null || lotteryCode == undefined) {
				lotteryCode = '-1,-1,-1';
			}
			return lotteryCode.split(',');

		},
		myCodeList(state) {
			if (state.orderDetail.purchaseCode == null || state.orderDetail.purchaseCode == undefined) {
				return ['0', '0', '0']
			}
			let length = state.orderDetail.purchaseCode.length;
			length = length > 3 ? 3 : length;
			let codeList = state.orderDetail.purchaseCode.slice(0, length);
			return codeList.map((cur, index) => {
				return cur.split(',');
			});

		},

		allCodeList(state) {
			if (state.orderDetail.purchaseCode == null || state.orderDetail.purchaseCode == undefined) {
				return ['0', '0', '0']
			}




			return state.orderDetail.purchaseCode.map((cur, index) => {
				return cur.split(',');
			});
		},
		allCodeListFormat(state) {
			if (state.orderDetail.purchaseCode == null || state.orderDetail.purchaseCode == undefined) {
				return [
					['0', '0', '0'],
					['0', '0', '0'],
					['0', '0', '0']
				]
			}

			let allCodeListFormat = state.orderDetail.purchaseCode.slice(0);

			let rowCount = Math.ceil(allCodeListFormat.length / 3);
			let EmptySize = rowCount * 3 - allCodeListFormat.length;
			for (let i = 0; i < EmptySize; i++) {
				allCodeListFormat.push('-1,-1,-1');
			}
			let result = [];
			for (let j = 0; j < rowCount; j++) {

				let origin = allCodeListFormat.slice(j * 3, (j + 1) * 3);
				let rowArr = origin.map((cur, index) => {
					return cur.split(',');
				});
				result.push(rowArr);

			}
			return result;
		},
		groupListData(state) {

			if (state.orderDetail == undefined || state.orderDetail == null || state.orderDetail.discountGameGroupModel ==
				undefined || state.orderDetail.discountGameGroupModel == null) {
				return [{
					group: [{
						iconUrl: ''
					}, {
						iconUrl: ''
					}, {
						iconUrl: ''
					}],
					state: 'ing'
				}]
			}




			let emptyMember = (state.orderDetail.discountGameGroupModel.groupUserModelList.length - 1) % 2;
			let groupCount = Math.ceil((state.orderDetail.discountGameGroupModel.groupUserModelList.length - 1) / 2);

			if (emptyMember < 1) {
				groupCount++;
				emptyMember = 2;
			}

			//groupCount = 4 ;
			//emptyMember = 2;


			let memberList = state.orderDetail.discountGameGroupModel.groupUserModelList.slice(0, state.orderDetail.discountGameGroupModel
				.groupUserModelList.length);

			/* for(let aaa =0;aaa<8;aaa++){
				memberList.push(memberList[0])
			} */

			for (let m = 0; m < emptyMember; m++) {
				memberList.push({
					iconUrl: ''
				})
			}
			let groupListData = [];
			for (let i = 0; i < groupCount; i++) {
				let group = memberList.slice(2 * i + 1, 2 * i + 3);
				group.unshift(memberList[0]);
				let groupData = {
					group: group,
					state: 'done'
				}
				if (i === groupCount - 1) {
					groupData.state = 'ing'
				}
				groupListData.push(groupData);
			}

			if (groupListData.length > 1) {
				let temp = groupListData[0];
				groupListData[0] = groupListData[groupListData.length - 1];
				groupListData[groupListData.length - 1] = temp;
			}


			return groupListData;
		}


	},
	mutations: {
		setOrderData(state, data) {
			state.orderData = data;
			state.loading = false;
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
		setOrderDetail(state, data) {

			state.orderDetail = data;
		},
		setRefundDetail(state, data) {

			state.refundDetail = data;
		},
		changeLoadingState(state) {
		
			state.loading = !state.loading;
		},
	},
	actions: {
		getOrderData({
			commit
		}) {
			//let orderTypes = ['allClientOrder','waitPayClientOrder','waitOpenResultClientOrder','waitCommentClientOrder','refundClientOrder','waitReceiveOrder'];
			//let orderTypes = ['allClientOrder','waitPayClientOrder','waitOpenResultClientOrder','waitCommentClientOrder','refundClientOrder'];
			commit('changeLoadingState');
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




			if (state.orderData[pageNo].pageNo * 10 >= state.orderData[pageNo].totalCount) {
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
		getOrderDetail({
			commit
		}, orderNo) {
			api.clientOrderDetail({
				platformOrderNo: orderNo
			}).then(res => {
				commit('setOrderDetail', res)
			})
		},
		getRefundDetail({
			commit
		}, payOrderNo) {
			api.getRefundDetail({
				payOrderNo: payOrderNo
			}).then(res => {
				commit('setRefundDetail', res)
			})
		},


	}

}

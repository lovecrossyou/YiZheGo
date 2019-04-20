<template>
	<view class="page-content">
		<view class="info-content">
			<!-- 订单状态 -->
			<view class="state-content">
				<view class="state-text">
					<text class="state">{{ orderDealState === 0 ? '待付款' : orderDealState === 1 ? '待揭晓' : orderDealState === 2 ? '已揭晓' : '已取消' }}</text>
					<text class="time">
						{{
							orderDealState === 0
								? '剩' + downTimeShow[0] + ':' + downTimeShow[1] + ':' + downTimeShow[2]  + '自动关闭'
								: orderDealState === 1
								? '距揭晓还剩'+ downTimeShow[0] + ':' + downTimeShow[1] + ':' + downTimeShow[2]
								: '中签立享1折，未中签全额退款'
						}}
					</text>
				</view>
				<view class="state-icon" v-if="orderDealState === 2">
					<text class="count">中签{{ orderDetail.winCodeCount }}件</text>
					<image class="state-img" :src="orderDetail.winCodeCount > 0 ? stateIconGold:stateIcon"></image>
				</view>
			</view>

			<!-- 收货信息 -->
			<view class="item-content line-content" v-if="orderDealState === 0 || orderDealState === 3">
				<view class="person">
					<text class="name phone">收&#8194;货&#8194;人：{{ orderDetail.deliveryAddressModel.recievName }}</text>
					<text class="phone">{{ orderDetail.deliveryAddressModel.phoneNum }}</text>
				</view>
				<view class="address-content">
					<image :src="positionIcon" class="position-icon"></image>
					<text class="address-title">收货地址：</text>
					<view class="default">默认</view>
					<text class="address">
						{{ '&#8195;&#8195;' }}{{ orderDetail.deliveryAddressModel.districtAddress }} {{ '&#8194;' }}{{ orderDetail.deliveryAddressModel.detailAddress }}
					</text>
				</view>
			</view>
			<image :src="lineIcon" class="line-icon" v-if="orderDealState === 0"></image>
			<!-- 商品信息 -->
			<view class="item-content">
				<productInfo
					:productImg="orderDetail.productImageUrl"
					:productName="orderDetail.productName"
					:currentPrice="(orderDetail.oneDiscountPrice / 100).toFixed(2)"
					:originPrice="(orderDetail.originalPrice / 100).toFixed(2)"
				></productInfo>
				<view class="title-content price-content">
					<text class="item-title">商品</text>
					<view class="item-title">
						￥
						<priceText :price="(orderDetail.totalPrice / 100).toFixed(2)"></priceText>
					</view>
				</view>
				<view class="title-content">
					<text class="item-title">运费</text>
					<view class="item-title">
						￥
						<priceText :price="(orderDetail.freight / 100).toFixed(2)"></priceText>
					</view>
				</view>
				<view class="zongji">
					共
					<text class="color">{{ orderDetail.purchaseCount }}</text>
					件 实付款：

					<view class="color">
						￥
						<priceText :price="(orderDetail.totalPayPrice / 100).toFixed(2)"></priceText>
					</view>
				</view>
			</view>
			<!-- 本期中签号码 -->
			<view class="item-content">
				<view class="title-content">
					<text class="item-title">本期中签号码(第{{ orderDetail.discountGameStage }}期)</text>
				</view>

				<view class="code-list">
					<view class="ball" v-for="(code, index) in todayCode" :key="index">{{ code == -1 ? (index == 0 ? '待' : index == 1 ? '揭' : '晓') : code }}</view>
				</view>
			</view>
			<!-- 我的幸运号码 -->
			<view class="item-content">
				<view class="title-content">
					<text class="item-title">我的幸运号码（{{ orderDetail.purchaseCount }}组）</text>
					<uni-icon type="arrowright" color="#bbb" size="20" v-if="orderDetail.purchaseCount > 3"></uni-icon>
				</view>
				<view class="code-content">
					<view class="code-array" v-for="(codeArray, index) in myCodeList" :key="index">
						<view class="code" v-for="(code, index1) in codeArray" :key="index1">{{ code }}</view>
					</view>
				</view>
			</view>
			<!-- 退款路径 -->
			<view class="item-content" v-if="orderDealState === 0 || orderDealState === 3">
				<view class="title-content">
					<text class="item-title">退款路径</text>
					<text class="item-title">{{ orderDetail.refundWay === 'account' ? '喜币钱包' : '原路返还' }}</text>
				</view>
			</view>
			<!-- 邀请拼团 -->
			<view class="item-content" v-else>
				<view class="title-content">
					<view class="invite-title">
						<image :src="inviteIcon" class="invite-img"></image>
						<text class="item-title">邀请拼团</text>
					</view>
				</view>

				<view class="group-detail" v-for="(memberList,memberListIndex) in groupListData" :key="memberListIndex">
					<view class="member" v-for="(member, index) in memberList.group" :key="index">
						<image :src="member.iconUrl !== '' ? member.iconUrl : emptyMember" class="member-icon"></image>
						<view class="tuan-zhang" v-if="member.identity === 'originator'">团长</view>
					</view>
					
					<view class="group-right"><view class="group-button" @click="inviteMember(memberList.state)">{{memberList.state === 'done' ? '领取红包':'立即邀请'}}</view></view>
				</view>
			</view>
			<!-- 订单信息 -->

			<view class="order-more-info" v-if="showMoreInfo">
				<view class="item-content buttom-address" v-if="orderDealState !== 0">
					<view class="order-info">收&#8194;货&#8194;人：{{ orderDetail.deliveryAddressModel.recievName }}{{ '&#8195;' }}{{ orderDetail.deliveryAddressModel.phoneNum }}</view>
					<view class="order-info">
						地&#8195;&#8195;址：

						<view class="order-info long-text">
							{{ orderDetail.deliveryAddressModel.districtAddress }} {{ '&#8194;' }}{{ orderDetail.deliveryAddressModel.detailAddress }}
						</view>
					</view>
					<view class="line-gray"></view>
				</view>

				<view class="item-content">
					<view class="order-info">下单时间：{{ orderDetail.clientOrderTime }}</view>
					<view class="order-info">订&#8194;单&#8194;号：{{ orderDetail.platformOrderNo }}</view>
					<view class="order-info">期&#8195;&#8195;数：{{ orderDetail.discountGameStage }}</view>
					<view class="order-info">商品代码：{{ orderDetail.productNo }}</view>
					<view class="order-info">
						实付金额：￥
						<priceText :price="(orderDetail.totalPayPrice / 100).toFixed(2)"></priceText>
					</view>

					<view v-if="orderDealState !== 0">
						<view class="order-info">支付方式：{{ orderDetail.payChannel }}</view>
						<view class="order-info">支付时间：{{ orderDetail.clientOrderTime }}</view>
						<view class="order-info">退款路径：{{ orderDetail.refundWay === 'account' ? '喜币钱包' : '原路返还' }}</view>
					</view>

					<view class="more-info-content close-content" @click="changeMoreInfoState">
						<text class="more-info-tips">收起</text>
						<image :src="closeArrow" class="arrow-icon"></image>
					</view>
				</view>
			</view>

			<view class="more-info-content" @click="changeMoreInfoState" v-else>
				<text class="more-info-tips">更多订单信息</text>
				<image :src="openArrow" class="arrow-icon"></image>
			</view>
		</view>
		<!-- 底部支付  《》：：：￥￥￥-->
		<view class="pay-content">
			<view class="button cancel-order" v-if="orderDetail.win" @click="enterRefundDetail(orderDetail.payOrderNo,false)">查看发货</view>
			<view class="button cancel-order" v-if="orderDetail.refundDetailModel !== null" @click="enterRefundDetail(orderDetail.payOrderNo,true)">查看退款</view>
			<view class="button cancel-order" v-if="orderDealState === 0" @click="cancelOrder(orderDetail.clientOrderId)">取消订单</view>
			<view class="button pay-now" v-if="orderDealState === 0" @click="enterPay(orderDetail)">立即支付</view>
			<view class="button pay-now" v-if="orderDealState !== 0" @click="enterProduct(orderDetail.productId)">再抢一次</view>
			<view class="button pay-now" v-if="orderDealState === 2">去晒单</view>
		</view>
	</view>
</template>

<script>
import uniIcon from '@/pages/components/uni-icon/uni-icon.vue';
import productInfo from '../components/productInfo.vue';
import priceText from '../components/priceText.vue';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import api from '@/util/api';
export default {
	components: {
		uniIcon,
		productInfo,
		priceText
	},
	data() {
		return {
			codeList: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
			positionIcon: '../../../static/me/position.png',
			lineIcon: '../../../static/pay/img_cai@2x.png',
			stateIcon: '../../../static/me/image_gray.png',
			stateIconGold: '../../../static/me/image_orange.png',
			inviteIcon: '../../../static/me/invite_icon.png',
			openArrow: '../../../static/me/open_arrow.png',
			closeArrow: '../../../static/me/close_arrow.png',
			emptyMember: '../../../static/me/empty_member.png',
			showMoreInfo: false,
			downTimeShow: [0, 0, 0],
			lastPayTimer: {},
			
			
		};
	},
	onLoad(params) {
		let { platformOrderNo } = params;
		this.getOrderDetail(platformOrderNo);
	},
	onUnload() {
		this.lastPayTimer && clearInterval(this.lastPayTimer);
	},
	methods: {
		...mapActions({
			//getOrderDetail: 'myOrder/getOrderDetail'
		}),
		changeMoreInfoState() {
			this.showMoreInfo = !this.showMoreInfo;
		},
		...mapMutations({
			setOrderDetail: 'myOrder/setOrderDetail'
		}),
		getOrderDetail(platformOrderNo) {
			api.clientOrderDetail({ platformOrderNo: platformOrderNo }).then(res => {
				this.setOrderDetail(res);
				if (res.lastPayTime !== '') {
					let endTime = new Date(res.lastPayTime).getTime();

					this.lastPayTimer = setInterval(() => {
						let startTime = new Date().getTime();
						let cha = endTime - startTime;

						if (cha < 1000) {
							this.lastPayTimer && clearInterval(this.lastPayTimer);

							this.downTimeShow = ['00', '00', '00'];
							uni.navigateBack();
						}
						let hour = Math.floor(cha / 1000 / 60 / 60);
						cha = cha - hour * 60 * 60 * 1000;
						let min = Math.floor(cha / 1000 / 60);
						cha = cha - min * 60 * 1000;
						let second = Math.floor(cha / 1000);
						if (hour < 10) {
							hour = '0' + hour;
						}
						if (min < 10) {
							min = '0' + min;
						}
						if (second < 10) {
							second = '0' + second;
						}
						this.downTimeShow = [hour, min, second];
					}, 1000);
				}else if(res.orderRealStatus === 'waitingOpenResult'){
					let endTime = new Date(res.openResultTime).getTime();
					
					this.lastPayTimer = setInterval(() => {
						let startTime = new Date().getTime();
						let cha = endTime - startTime;
					
						if (cha < 1000) {
							this.lastPayTimer && clearInterval(this.lastPayTimer);
					
							this.downTimeShow = ['00', '00', '00'];
							uni.navigateBack();
						}
						let hour = Math.floor(cha / 1000 / 60 / 60);
						cha = cha - hour * 60 * 60 * 1000;
						let min = Math.floor(cha / 1000 / 60);
						cha = cha - min * 60 * 1000;
						let second = Math.floor(cha / 1000);
						if (hour < 10) {
							hour = '0' + hour;
						}
						if (min < 10) {
							min = '0' + min;
						}
						if (second < 10) {
							second = '0' + second;
						}
						this.downTimeShow = [hour, min, second];
					}, 1000);
				}
			});
		},
		cancelOrder(clientOrderId) {
			uni.showModal({
				title: '确定取消订单？',
				//content: '这是一个模态弹窗',
				success: function(res) {
					if (res.confirm) {
						
						api.cancelClientOrder({clientOrderId:clientOrderId}).then(res=>{
							uni.navigateBack();
						})
					} else if (res.cancel) {
						//console.log('用户点击取消');
					}
				}
			});
		},
		enterPay(orderDetail){
			uni.redirectTo({
				url: '../../chooseCode/pay?payOrderNo=' + orderDetail.payOrderNo + '&totalPayRmb=' + orderDetail.totalPrice + '&productType='+'normalProduct'
			});
		},
		inviteMember(groupState){
			if(groupState==='ing'){
				console.log('邀请拼团')
			}else if(groupState === 'done'){
				console.log('领取红包')
			}
		},
		enterProduct(productId){
			
			//console.log('啦all：：：：'+productId)
			
			uni.redirectTo({
				url: '../../details/productDetails?productId=' + productId
			});
		},
		enterRefundDetail(payOrderNo,isRefund){
			uni.navigateTo({
				url: './refundDetail?payOrderNo=' + payOrderNo+'&isRefund='+isRefund
			});
		}
		
	},
	computed: {
		...mapGetters({
			orderDealState: 'myOrder/orderDealState',
			todayCode: 'myOrder/todayCode',
			myCodeList: 'myOrder/myCodeList',
			groupListData: 'myOrder/groupListData',
			
			//myCodeListLength: 'myOrder/myCodeListLength'
		}),
		...mapState({
			orderDetail: state => state.myOrder.orderDetail
		})
	}
};
</script>

<style lang="less">
.page-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #efeff4;
	.info-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 110upx;

		.state-content {
			background-color: #cc2636;
			display: flex;
			flex-direction: row;
			padding-top: 22upx;
			padding-bottom: 22upx;
			padding-right: 43upx;
			padding-left: 30upx;
			align-items: center;
			height: 198upx;
			.state-text {
				flex: 1;
				display: flex;
				flex-direction: column;

				.state {
					font-size: 42upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
				.time {
					font-size: 28upx;
					margin-top: 20upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
			}
			.state-img {
				width: 196upx;
				height: 154upx;
			}
			.count {
				width: 196upx;
				font-size: 26upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(255, 254, 254, 1);
				text-align: center;
				position: absolute;
				left: 511upx;
				top: 156upx;
			}
		}

		.order-more-info {
			.buttom-address {
				margin-bottom: 0;
				padding-bottom: 0upx;
			}

			.line-gray {
				width: 100%;
				height: 2upx;
				background-color: #efeff4;
				margin-top: 20upx;
			}
		}

		.more-info-content {
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: 22upx;
			padding-bottom: 22upx;
			background-color: white;
			margin-bottom: 20upx;
			.more-info-tips {
				font-size: 26upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(119, 119, 119, 1);
				line-height: 37upx;
			}

			.arrow-icon {
				width: 26upx;
				height: 26upx;
			}
		}

		.close-content {
			margin-bottom: 0upx;
			margin-top: 60upx;
			padding-top: 0upx;
			padding-bottom: 0upx;
		}

		.item-content {
			padding-left: 30upx;
			padding-right: 30upx;
			padding-top: 34upx;
			padding-bottom: 34upx;
			display: flex;
			flex-direction: column;
			margin-bottom: 20upx;
			background-color: white;
			.person {
				margin-left: 40upx;
				flex: 1;
				display: flex;
				.name {
					flex: 1;
				}
				.phone {
					font-size: 30upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 46upx;
				}
			}
			.address-content {
				display: flex;

				.position-icon {
					width: 26upx;
					height: 31upx;
					margin-right: 14upx;
				}
				.address-title {
					font-size: 30upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 46upx;
				}
				.default {
					border: 1upx solid rgba(255, 0, 0, 1);
					border-radius: 4px;
					font-size: 20upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(255, 41, 41, 1);
					position: absolute;
					left: 220upx;
					line-height: 36upx;
					padding-left: 6upx;
					padding-right: 6upx;
				}
				.address {
					font-size: 30upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					flex: 1;
					line-height: 46upx;
				}
			}
			.price-content {
				margin-top: 80upx;
			}
			.title-content {
				display: flex;
				justify-content: space-between;
				.invite-title {
					display: flex;
					align-items: center;
					.invite-img {
						width: 32upx;
						height: 32upx;
					}
				}
				.item-title {
					font-size: 30upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 46upx;
					display: flex;
				}
			}
			.zongji {
				display: flex;
				justify-content: flex-end;
				margin-top: 60upx;
				font-size: 26upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: black;
				.color {
					font-size: 26upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #cc2636;
					display: flex;
				}
			}
			.code-content {
				display: flex;
				margin-top: 40upx;
				justify-content: space-around;
				width: 100%;
				.code-array {
					display: flex;
					.code {
						width: 50upx;
						height: 50upx;
						border-radius: 50%;
						font-size: 29upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(204, 38, 54, 1);
						background-color: #f5cccc;
						margin-left: 5upx;
						margin-right: 5upx;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
			.code-list {
				display: flex;
				margin-top: 40upx;
				justify-content: center;
				width: 100%;
				.ball {
					width: 60upx;
					height: 60upx;
					border-radius: 50%;
					margin-left: 8upx;
					margin-right: 8upx;
					background-color: #f40a0a;
					color: white;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30upx;
				}
			}
			.order-info {
				font-size: 26upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(119, 119, 119, 1);
				line-height: 38upx;
				display: flex;
			}
			.long-text {
				flex: 1;
			}
			.group-detail {
				display: flex;
				align-items: center;
				padding-left: 40upx;
				margin-top: 50upx;
				.member {
					display: flex;
					margin-right: 36upx;
					flex-direction: column;
					.member-icon {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
					}

					.tuan-zhang {
						
						align-self: center;
						padding-left: 4upx;
						padding-right: 4upx;
						padding-top: 4upx;
						padding-bottom: 4upx;
						background: rgba(204, 38, 54, 1);
						border-radius: 2upx;
						font-size: 18upx;
						font-family: MicrosoftYaHei;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
						margin-top: -30upx;
					}
				}
				.group-right {
					flex: 1;
					display: flex;
					justify-content: flex-end;

					.group-button {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 135upx;
						height: 54upx;
						border: 1upx solid #cc2636;
						border-radius: 6upx;
						font-size: 28upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(204, 38, 54, 1);
					}
				}
			}
		}
		.line-content {
			margin-bottom: 0;
		}
		.line-icon {
			width: 100%;
			height: 4upx;
			margin-bottom: 20upx;
		}
	}

	.pay-content {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 110upx;
		display: flex;
		justify-content: flex-end;
		padding-right: 10upx;
		align-items: center;
		background-color: white;
		.button {
			width: 150upx;
			height: 60upx;
			border-radius: 6px;
			font-size: 28upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			margin-right: 24upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.cancel-order {
			border: 1px solid rgba(209, 209, 209, 1);
			color: rgba(119, 119, 119, 1);
		}
		.pay-now {
			border: 1px solid #cc2636;
			color: rgba(204, 38, 54, 1);
		}
	}
}
</style>

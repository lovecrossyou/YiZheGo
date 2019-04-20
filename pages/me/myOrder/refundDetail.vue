<template>
	<view class="page-content">
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
		<view class="item-content">
			<view class="title-content">
				<text class="item-title">中签商品</text>
				<view class="item-title">
					-￥
					<priceText :price="(orderDetail.oneDiscountPrice*orderDetail.winCodeCount / 100).toFixed(2)"></priceText>
				</view>
			</view>
			<view class="title-content">
				<text class="item-title">运费</text>
				<view class="item-title">
					-￥
					<priceText :price="orderDetail.winCodeCount > 0 ?(orderDetail.freight / 100).toFixed(2) :'0.00'"></priceText>
				</view>
			</view>
			<view class="zongji">
				中签
				<text class="color">{{ orderDetail.winCodeCount }}</text>
				件 退款金额：
		
				<view class="color">
					￥
					<priceText :price="(refundDetail.refundTotalRmb / 100).toFixed(2)"></priceText>
				</view>
			</view>
		</view>
		<view class="item-content">
			<view class="refund-title">{{stepTitle}}</view>

			<view class="refund-step" v-for="(step, index) in stepList" :key="index">
				<view class="left-line">
					<view class="point"></view>
					<view class="line" v-if="index < 4"></view>
				</view>
				<view class="step-content">
					<view class="content-title">T日22：00 揭晓中签</view>
					<view class="content-desc">已揭晓中签，未中签全额退款</view>
				</view>
				<view class="step-time">2019-4-23 22:00</view>
			</view>
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
			stepList: [1, 2, 3, 4, 5],
			stepTitle:'',
		};
	},
	onLoad(params) {
		console.log(params);
		let { payOrderNo,isRefund } = params;
		this.getRefundDetail(payOrderNo);
		if(isRefund === 'true'){
			uni.setNavigationBarTitle({
				title:'退款状态'
			})
			this.stepTitle = '退款流程'
		}else{
			uni.setNavigationBarTitle({
				title:'发货状态'
			});
			this.stepTitle = '发货流程';
		}
	},

	methods: {
		...mapActions({
			getRefundDetail: 'myOrder/getRefundDetail'
		})
	},
	computed: {
		...mapState({
			orderDetail: state => state.myOrder.orderDetail,
			refundDetail: state => state.myOrder.refundDetail,
			
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
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	.item-content {
		margin-top: 6upx;
		padding-left: 30upx;
		padding-right: 30upx;
		padding-top: 34upx;
		padding-bottom: 34upx;
		display: flex;
		flex-direction: column;
		margin-bottom: 20upx;
		background-color: white;

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
		.refund-title {
			font-size: 28upx;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			color: rgba(54, 189, 60, 1);
			margin-bottom: 37upx;
		}
		.refund-step {
			display: flex;
			flex-direction: row;
			.left-line {
				display: flex;
				flex-direction: column;
				align-items: center;
				.point {
					width: 19upx;
					height: 19upx;
					background: rgba(54, 189, 60, 1);
					border-radius: 50%;
				}
				.line {
					width: 2upx;
					flex: 1;
					background: rgba(185, 185, 185, 1);
				}
			}

			.step-content {
				display: flex;
				flex-direction: column;
				margin-bottom: 69upx;
				margin-left: 30upx;
				flex: 1;
				.content-title {
					font-size: 28upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(54, 189, 60, 1);
				}
				.content-desc {
					font-size: 24upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(119, 119, 119, 1);
				}
			}
			.step-time {
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(119, 119, 119, 1);
			}
		}
	}
}
</style>

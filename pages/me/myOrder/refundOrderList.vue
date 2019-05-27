<template>
	<view class="uni-tab-bar">
		<block v-if="loading"><LoadingTurn></LoadingTurn></block>
		<block v-else>
			<view class="swiper-box">
				<scroll-view class="list" scroll-y @scrolltolower="getMoreOrder" v-if="refundOrder.list !== undefined && refundOrder.list.length > 0">
					<block v-for="(orderItem, index) in refundOrder.list" :key="index">
						<view class="order-item" v-if="orderItem.canApplyAutoRefund">
							<view @click="goDetail(orderItem.platformOrderNo)">
								<view class="top">
									<text class="time">下单时间：{{ orderItem.orderTime }}</text>
									<text class="state">{{ orderItem.orderStatus }}</text>
								</view>
								<productInfo
									:productImg="orderItem.productImageUrl"
									:productName="orderItem.productName"
									:currentPrice="(orderItem.oneDiscountPrice / 100).toFixed(2)"
									:originPrice="(orderItem.originalPrice / 100).toFixed(2)"
								></productInfo>

								<view class="bottom">
									<view class="count">
										共{{ orderItem.purchaseCount }}件{{ '&#8195;' }}实付款：￥
										<priceText :price="(orderItem.totalPayPrice / 100).toFixed(2)"></priceText>
									</view>
								</view>
							</view>

							<view class="reply-refund" @click="replyRefund(orderItem.payOrderNo)">申请退款</view>
						</view>
					</block>

					<view class="uni-tab-bar-loading"><uni-load-more :loadingType="refundOrder.loadingType" :contentText="loadingText"></uni-load-more></view>
				</scroll-view>
				<view class="empty-content" v-else>
					<image class="empty-img" :src="emptyIcon"></image>
					<text class="empty-tips">您还没有相关的订单</text>
				</view>
			</view>
			<view class="refund-ok-content" @click="closeWindow" v-if="windowIsShown">
				<view class="refund-window">
					<view class="refund-content">
						<image class="refund-ok" :src="refundOkIcon"></image>
						<text class="refund-title">退款申请成功</text>
						<text class="refund-des">工作人员审核确认后订单金额会原路返还至您的账户，请注意查收！</text>
					</view>
					<image class="refund-close" :src="refundCloseIcon"></image>
				</view>
			</view>
		</block>
	</view>
</template>
<script>
//import mediaList from '../components/mediaList.vue';
import uniLoadMore from '../components/uni-load-more.vue';
import productInfo from '../components/productInfo.vue';
import priceText from '../components/priceText.vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import LoadingTurn from '@/pages/components/LoadingTurn.vue';
export default {
	components: {
		//mediaList,
		uniLoadMore,
		productInfo,
		priceText,
		LoadingTurn
	},

	computed: {
		...mapState({
			refundOrder: state => state.myOrder.refundOrder,
			loading: state => state.myOrder.loading
		})
	},

	data() {
		return {
			loadingText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			icon: '../../../static/me/yaoqing.png',
			emptyIcon: '../../../static/me/icon_order.png',
			refundOkIcon: '../../../static/me/refund_ok.png',
			refundCloseIcon: '../../../static/me/refund_close.png',
			windowIsShown:false,
		};
	},
	onLoad: function() {
		this.getRefundOrder();
	},
	methods: {
		...mapActions({
			getRefundOrder: 'myOrder/getRefundOrder',
			getMoreOrder: 'myOrder/addRefundData',
			applyRefund: 'myOrder/applyRefund',
		}),

		goDetail(platformOrderNo) {
			uni.navigateTo({
				url: './orderDetail?platformOrderNo=' + platformOrderNo
			});
		},
		replyRefund(payOrderNo) {
			uni.showModal({
				title: '确认退款',
				content: '点击退款按钮，此订单金额会原路返还至您的账户，是否确认退款',
				confirmText: '确认',
				confirmColor: '#D01717',
				success: res => {
					if (res.confirm) {
						//console.log('用户点击确定');
						
						
						this.applyRefund({payOrderNo:payOrderNo,callback:()=>{
							this.windowIsShown = true;
						}})
						
						
						
					} else if (res.cancel) {
						//console.log('用户点击取消');
					}
				}
			});
		},
		closeWindow(){
			this.windowIsShown = false;
		}
	}
};
</script>

<style lang="less">
.uni-tab-bar {
	width: 100%;
	display: flex;
	flex: 1;
	flex-direction: column;
	height: 100%;
	.swiper-box {
		flex: 1;
		display: flex;
		width: 100%;
		position: fixed;
		height: 100%;
		.list {
			width: 100%;
			height: 100%;
			background-color: #efeff4;
			.order-item {
				width: 100%;
				background-color: white;
				display: flex;
				margin-top: 25upx;
				padding-left: 28upx;
				padding-right: 28upx;
				padding-top: 30upx;
				padding-bottom: 30upx;
				flex-direction: column;
				.top {
					display: flex;
					flex-direction: row;
					.time {
						flex: 1;
						font-size: 26upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(119, 119, 119, 1);
					}
					.state {
						font-size: 28upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(204, 38, 55, 1);
					}
				}

				.bottom {
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					margin-top: 57upx;
					.count {
						display: flex;
						flex-direction: row;
						font-size: 26upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: #333333;
					}
				}
				.reply-refund {
					display: flex;
					align-items: center;
					justify-content: center;
					align-self: center;
					margin-top: 40upx;
					height: 54upx;
					padding-left: 18upx;
					padding-right: 18upx;
					border: 1upx solid rgba(204, 38, 55, 1);
					border-radius: 6px;
					font-size: 28upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(204, 38, 55, 1);
				}
			}

			.uni-tab-bar-loading {
				padding: 20upx 0;
			}
		}
		.empty-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #efeff4;
			flex: 1;
			width: 100%;
			height: 100%;
			.empty-img {
				width: 134upx;
				height: 148upx;
				margin-top: 357upx;
			}
			.empty-tips {
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(119, 119, 119, 1);
				margin-top: 29upx;
			}
		}
	}

	.refund-ok-content {
		width: 100%;
		height: 100%;
		padding-left: 96upx;
		padding-right: 96upx;
		flex-direction: row;
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		z-index: 10;
		
		display: flex;
		align-items: center;
		.refund-window {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			
			.refund-content {
				border-radius:10upx;
				background-color: white;
				padding-top: 78upx;
				padding-left: 52upx;
				padding-right: 52upx;
				padding-bottom: 82upx;
				display: flex;
				align-items: center;
				flex-direction: column;
				
				.refund-ok {
					width: 92upx;
					height: 92upx;
				}
				.refund-title {
					font-size: 36upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					margin-top: 28upx;
					margin-bottom: 64upx;
					text-align: center;
				}
				.refund-des {
					font-size: 28upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(119, 119, 119, 1);
					text-align: center;
				}
			}
			.refund-close {
				width: 54upx;
				height: 54upx;
				margin-top: 48upx;
			}
		}
	}
}
</style>

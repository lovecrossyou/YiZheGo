<template>
	<view v-if="orderInfo" class="container">
		<view class="delivery-info" @click="addressList" v-if="address">
			<view class="delivery-userinfo">
				<view class="delivery-userinfo-name">收货人:{{address.recievName}}</view>
				<view class="delivery-userinfo-name">{{address.phoneNum}}</view>
			</view>
			<view class="delivery-userinfo-addInfo">
				<image v-bind:src="addIcon" class="delivery-userinfo-addInfo-icon"></image>
				<view class="delivery-userinfo-addInfo-add">收货地址:{{address.fullAddress}}</view>
			</view>
			<image v-bind:src="rightArrow" class="delivery-userinfo-arrow"></image>
		</view>
		<view class="delivery-no-info" @click="addressList" v-else>
			<image v-bind:src="addIcon" class="delivery-no-info-icon"></image>
			<view class="delivery-no-info-msg">选择收货地址</view>
		</view>
		<image v-bind:src="lineCai" class="delivery-userinfo-line"></image>
		<view class="product-info">
			<view class="product-info-pro">
				<image v-bind:src="orderInfo.imageUrl" class="product-info-pro-img"></image>
				<view class="product-info-pro-name">
					<view class="product-info-pro-name-text">{{orderInfo.productName}}</view>
					<view class="product-info-pro-name-price" v-if="directBuy">¥{{orderInfo.price/100}}</view>
					<view class="product-info-pro-name-price" v-else>¥{{orderInfo.price/100}}</view>
				</view>
			</view>
			<view class="product-info-pro-amount">
				<view class="product-info-pro-amount-text">抢购数量</view>
				<uni-number-box @changes="onCountChanged"></uni-number-box>
			</view>
		</view>
		<view class="price-info">
			<view class="price-info-product">
				<view class="price-info-product-text">商品</view>
				<view class="price-info-product-price" v-if="directBuy">¥{{orderInfo.price*buyCount/100}}</view>
				<view class="price-info-product-price" v-else>¥{{orderInfo.price*buyCount/100}}</view>
			</view>
			<view class="price-info-product">
				<view class="price-info-product-text">运费</view>
				<view class="price-info-product-price">+¥0</view>
			</view>
		</view>

		<view class="confirm-footer">
			<view class="confirm-footer-price-info">
				<view class="confirm-footer-price-amount">共{{buyCount}}件</view>
				<view class="confirm-footer-price-pay-info">
					<view class="confirm-footer-price-pay-text">实付款:</view>
					<view class="confirm-footer-price-pay">¥{{totalPayRmb/100}}</view>
				</view>
			</view>
			<view class="confirm-footer-commit" @click="commitOrder">提交订单</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	import api from '@/util/api.js';
	import pay from '@/util/payUtil.js';

	export default {
		onLoad: async function(option) {
			this.productId=option.productId;
			this.vipProductDetail();
		},
		onShow() {
			this.getAddressList();
		},
		data() {
			return {
				orderInfo: null,
				addIcon: '@/static/pay/icon_location.png',
				rightArrow: '@/static/pay/icon_arrow_right@2x.png',
				buyCount: 1,
				productId:0,
			}
		},
		components: {
			uniNumberBox
		},
		computed: {
			...mapState(['openid']),
			...mapState({
				address: state => state.confirmPay.address,
			}),
			totalPayRmb() {
				if (!this.orderInfo) return 0;
				return this.buyCount * this.orderInfo.price;
			}
		},
		methods: {
			async vipProductDetail(){
				const res = await api.vipProductDetail({
					vipProductId: this.productId
				})
				this.orderInfo = res;
			},
			async getAddressList() {
				const res = await api.addressList({
					size: 10,
					pageNo: 0
				});
				this.$store.commit('confirmPay/setAddressList', res.content)
			},
			async getConfirmOrderInfo(discountGameId) {
				const res = await api.confirmOrderInfo({
					discountGameId: discountGameId,
					purchaseAmount: this.buyCount
				});
				
				this.$store.commit('confirmPay/setOrderInfo', res)
			},

			async getOrder() {
				return api.updateToVipUser({
					deliverAddressId: this.address.id,
					vipProductId: this.orderInfo.vipProductId,
					purchaseCount: this.buyCount,
				})
			},
			async commitOrder() {
				const order = await this.getOrder();
				uni.redirectTo({
					url: '/pages/chooseCode/pay?payOrderNo=' + order.payOrderNo + '&totalPayRmb=' + order.totalPayRmb + '&productType='+'vipProduct'
				})
// 				return;
// 				console.log("提交订单-----------" + JSON.stringify(order));
// 				// #ifdef APP-PLUS
// 				uni.navigateTo({
// 					url: './pay?payOrderNo=' + order.payOrderNo + '&totalPayRmb=' + order.totalPayRmb
// 				})
// 				// #endif
// 
// 				// #ifdef MP-WEIXIN
// 				this.wxminiPay(order);
// 				// #endif

			},
			...mapMutations({
				changeCodeCount: 'chooseCode/changeCodeCount'
			}),
			// 小程序支付
			async wxminiPay(order) {
				const orderInfo = await api.commitPay({
					openId: this.openid,
					payChannel: 'WeixinMiniProgramPay',
					payOrderNo: order.payOrderNo
				});
				const wexinSpec = orderInfo.wexinSpec;
				wexinSpec.packageValue = 'prepay_id=' + wexinSpec.prepay_id;
				let that = this;
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: wexinSpec.timestamp,
					nonceStr: wexinSpec.noncestr,
					package: wexinSpec.packageValue,
					signType: 'MD5',
					paySign: wexinSpec.sign,
					success: function(res) {

					},
					fail: function(err) {

					}
				});
			},
			chooseCode() {
				uni.navigateTo({
					url: './chooseCode'
				})
			},
			onCountChanged(event) {
				this.buyCount = event;
				this.vipProductDetail();
			},
			addressList() {
				uni.navigateTo({
					url: '/pages/me/address/address'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		background: #F7F7F7;
		display: flex;
		flex-direction: column;

		.delivery-info {
			display: flex;
			flex-direction: column;
			background: #FFFFFF;
			height: 182upx;
			padding: 20upx;
			justify-content: center;

			.delivery-userinfo {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-left: 30upx;
				margin-right: 20upx;

				.delivery-userinfo-name {
					font-size: 30upx;
					font-family: PingFangSC-Regular;
					color: rgba(51, 51, 51, 1);
				}
			}

			.delivery-userinfo-addInfo {
				display: flex;
				flex-direction: row;
				margin-top: 20upx;
				margin-right: 20upx;
				align-items: flex-end;

				.delivery-userinfo-addInfo-icon {
					width: 27upx;
					height: 31upx;
				}

				.delivery-userinfo-addInfo-add {
					font-size: 30upx;
					font-family: PingFangSC-Regular;
					color: rgba(51, 51, 51, 1);
					margin-left: 7upx;
				}
			}

			.delivery-userinfo-arrow {
				position: fixed;
				width: 17upx;
				height: 30upx;
				right: 10upx;
			}
		}

		.delivery-no-info {
			display: flex;
			flex-direction: row;
			background: #FFFFFF;
			height: 90upx;
			align-items: center;
			margin-left: 20upx;

			.delivery-no-info-icon {
				width: 27upx;
				height: 31upx;
			}

			.delivery-no-info-msg {
				font-size: 30upx;
				font-family: PingFangSC-Regular;
				color: rgba(51, 51, 51, 1);
				margin-left: 10upx;
			}
		}

		.product-info {
			display: flex;
			flex-direction: column;
			height: 170upx+108upx;
			background: #FFFFFF;
			margin-top: 20upx;
			padding: 20upx;

			.product-info-pro {
				display: flex;
				flex-direction: row;
				height: 170upx;
				align-items: center;

				.product-info-pro-img {
					width: 100upx;
					height: 100upx;
				}

				.product-info-pro-name {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin-left: 20upx;

					.product-info-pro-name-text {
						font-size: 30upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.product-info-pro-name-price {
						font-size: 26upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(204, 38, 54, 1);
						margin-top: 10upx;
					}
				}

			}

			.product-info-pro-amount {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.product-info-pro-amount-text {
					font-size: 30upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		.choose-code {
			display: flex;
			flex-direction: column;
			height: 178upx;
			background: #FFFFFF;
			margin-top: 20upx;
			padding: 20upx;
			justify-content: center;

			.choose-code-msg {
				display: flex;
				flex-direction: row;
				align-items: center;

				.choose-code-msg-red {
					font-size: 30upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}

				.choose-code-msg-time {
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(204, 38, 54, 1);
					margin-left: 10upx;
				}
			}

			.choose-code-select {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 20upx;

				.choose-code-button {
					display: flex;
					align-items: center;

					.code {
						width: 26upx;
						height: 57upx;
						background-color: #d22222;
						border-radius: 40upx;
						margin-right: 10upx;

						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 25upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
					}
				}
			}

		}

		.price-info {
			width: 100%;
			height: 152upx;
			display: flex;
			flex-direction: column;
			background: #FFFFFF;
			margin-top: 2upx;

			.price-info-product {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 20upx;

				.price-info-product-text {
					font-size: 30upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.price-info-product-price {
					font-size: 30upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: #CC2636;
				}
			}
		}

		.refound-info {
			height: 79upx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			background: #FFFFFF;
			margin-top: 20upx;
			padding: 20upx;

			.refound-info-text {
				font-size: 30upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}

			.refound-info-select-info {
				display: flex;
				flex-direction: row;
				align-items: center;

				.refound-info-select-msg {
					font-size: 25upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					margin-right: 4upx;
				}

				.refound-info-select-arrow {
					width: 17upx;
					height: 30upx;
				}
			}
		}

		.confirm-footer {
			height: 98upx;
			position: fixed;
			bottom: 0;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;

			.confirm-footer-price-info {
				height: 98upx;
				flex: 3;
				background: #FFFFFF;
				display: flex;
				flex-direction: row;
				align-items: center;

				.confirm-footer-price-amount {
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: #333333;
					margin-left: 20upx;
				}

				.confirm-footer-price-pay-info {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-left: 20upx;

					.confirm-footer-price-pay-text {
						font-size: 26upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: #333333;
						margin-right: 10upx;
					}

					.confirm-footer-price-pay {
						font-size: 32upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: #d22222;
					}
				}
			}

			.confirm-footer-commit {
				height: 98upx;
				flex: 1;
				background: #d22222;
				text-align: center;
				font-size: 34upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				align-items: center;
				line-height: 98upx;
			}
		}

		.delivery-userinfo-line {
			width: 100%;
			height: 4upx;
		}

		.title {
			flex: 1;
		}

		.reduce {}

		.input-num {

			display: flex;
			justify-content: center;
			text-align: center;
		}
	}
</style>

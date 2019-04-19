<template>
	<view class="container">
		<view class="delivery-info" @click="addressList" v-if="address">
			<view class="delivery-userinfo">
				<view class="delivery-userinfo-name">收货人:{{ address.recievName }}</view>
				<view class="delivery-userinfo-name">{{ address.phoneNum }}</view>
			</view>
			<view class="delivery-userinfo-addInfo">
				<image v-bind:src="addIcon" class="delivery-userinfo-addInfo-icon"></image>
				<view class="delivery-userinfo-addInfo-add">收货地址:{{ address.fullAddress }}</view>
			</view>
			<image v-bind:src="rightArrow" class="delivery-userinfo-arrow"></image>
		</view>
		<view class="delivery-no-info" @click="addressList" v-else>
			<image v-bind:src="addIcon" class="delivery-no-info-icon"></image>
			<view class="delivery-no-info-msg">选择收货地址</view>
		</view>
		<image v-bind:src="lineCai" class="delivery-userinfo-line"></image>
		<view v-if="orderInfo" class="product-info">
			<view class="product-info-pro">
				<image v-bind:src="orderInfo.relatedProductImageUrl" class="product-info-pro-img"></image>
				<view class="product-info-pro-name">
					<view class="product-info-pro-name-text">{{ orderInfo.relatedProductName }}</view>
					<view class="product-info-pro-price-info">
						<view class="product-info-pro-name-price">¥{{ fix2Price.oneDiscountPrice }}</view>

						<view class="product-info-pro-name-price-discount">市场价:{{ fix2Price.originalPrice }}</view>
					</view>
				</view>
			</view>
			<view class="product-info-pro-amount">
				<view class="product-info-pro-amount-text">抢购数量</view>
				<uni-number-box @changes="onCountChanged"></uni-number-box>
			</view>
		</view>
		<view v-if="orderInfo" class="price-info">
			<view class="price-info-product">
				<view class="price-info-product-text">商品</view>
				<view class="price-info-product-price" v-if="directBuy == true">¥{{ fix2Price.originalPrice*purchaseAmount }}</view>
				<view class="price-info-product-price" v-else>¥{{ fix2Price.oneDiscountPrice*purchaseAmount}}</view>
			</view>
			<view class="price-info-product">
				<view class="price-info-product-text">运费</view>
				<view class="price-info-product-price">+¥{{ fix2Price.freight }}</view>
			</view>
		</view>
		<view class="choose-code" @click="chooseCode" v-if="directBuy">
			<view class="choose-code-msg" v-if="allFinished">
				<view class="choose-code-msg-red">我的幸运号码（{{ buyCount }}组）</view>
			</view>
			<view class="choose-code-msg" v-else>
				<view class="choose-code-msg-red">选择幸运号码</view>
				<view class="choose-code-msg-time">0~9选3个号码 选中立享1折 不中全额退款</view>
			</view>
			<view class="choose-code-select" v-if="allFinished">
				<view class="choose-code-button">
					<view class="code-show-array" v-for="(codeArray,index) in codeListForShow" :key="index">

						<view class="code" v-for="(code, arrayIndex) in codeArray" :key="arrayIndex">{{ code }}</view>

					</view>
				</view>

				<text class="choose-tips">查看/重选</text>
				<uni-icon type="arrowright" color="#bbb" size="20"></uni-icon>
			</view>
			<view class="choose-code-select" v-else>
				<view class="choose-code-button">
					<view class="code" v-for="(code, arrayIndex) in codes" :key="arrayIndex">{{ code }}</view>
				</view>
				<text class="choose-tips">去选号</text>
				<uni-icon type="arrowright" color="#bbb" size="20"></uni-icon>
			</view>
		</view>
		<view class="refound-info" @click="refundRoute">
			<view class="refound-info-text">退款路径</view>
			<view class="refound-info-select-info">
				<view class="refound-info-select-msg">{{ refundWay.title }}</view>
				<image v-bind:src="rightArrow" class="refound-info-select-arrow"></image>
			</view>
		</view>
		<view v-if="orderInfo" class="confirm-footer">
			<view class="confirm-footer-price-info">
				<view class="confirm-footer-price-amount">共{{purchaseAmount}}件</view>
				<view class="confirm-footer-price-pay-info">
					<view class="confirm-footer-price-pay-text">实付款:</view>
					<view class="confirm-footer-price-pay">¥{{ fix2Price.totalPayRmbPrice }}</view>
				</view>
			</view>
			<view class="confirm-footer-commit" @click="commitOrder">提交订单</view>
		</view>
		<!-- <view class="choose-code" @click="chooseCode">
		选择号码
	</view> -->

		<view class="showUpgradeModal" v-if="showUpgradeModal">
			<!-- xx -->
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '../components/uni-number-box/uni-number-box.vue';
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	import api from '../../util/api.js';
	import pay from '../../util/payUtil.js';
	import uniIcon from '@/pages/components/uni-icon/uni-icon.vue';
	export default {
		onLoad: function(option) {
			console.log('确认订单商品-----------' + option.directBuy + '------------' + option.discountGameId);

			this.groupId = option.groupId;
			this.discountGameId = option.discountGameId;
			this.$store.commit('confirmPay/setBuyType', option.directBuy);
			this.getConfirmOrderInfo(option.discountGameId);
			this.initCode();
		},
		onShow() {
			this.getAddressList();
		},
		onUnload() {
			this.$store.commit('confirmPay/resetPurchaseAmount');
		},
		data() {
			return {
				showUpgradeModal: false,
				groupId: null,
				discountGameId: 0,
				addIcon: '../../static/pay/icon_location.png',
				rightArrow: '../../static/pay/icon_arrow_right@2x.png',
				lineCai: '../../static/pay/img_cai@2x.png',
				codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
			};
		},
		components: {
			uniNumberBox,
			uniIcon
		},
		computed: {
			...mapState({
				buyCount: state => state.chooseCode.codeCount,
				orderInfo: state => state.confirmPay.orderInfo,
				directBuy: state => state.confirmPay.buyType,
				openid: state => state.openid,
				address: state => state.confirmPay.address,
				refundWay: state => state.confirmPay.refundWay,
				purchaseAmount: state => state.confirmPay.purchaseAmount
			}),
			...mapGetters({
				allCode: 'chooseCode/allCode',
				allFinished: 'chooseCode/allFinished',
				originalPrice: 'confirmPay/originalPrice',
				fix2Price: 'confirmPay/fix2Price',
				codeListForShow: 'chooseCode/codeListForShow',
			})
		},
		methods: {
			async getAddressList() {
				const res = await api.addressList({
					size: 10,
					pageNo: 0
				});
				console.log('收货地址-----------' + JSON.stringify(res));
				this.$store.commit('confirmPay/setAddressList', res.content);
			},
			async getConfirmOrderInfo(discountGameId) {
				const res = await api.confirmOrderInfo({
					discountGameId: discountGameId,
					purchaseAmount: this.purchaseAmount
				});
				console.log('确认订单信息-----------' + JSON.stringify(res));
				this.$store.commit('confirmPay/setOrderInfo', res);
			},
			async getOrder() {
				let groupId = this.groupId;
				console.log('this.groupId ', this.groupId);
				if (groupId === 'undefined') {
					groupId = null;
				}
				return api.commitOrder({
					codeList: this.allCode,
					deliverAddressId: this.address.id,
					directBuy: this.directBuy,
					discountGameId: this.orderInfo.discountGameId,
					purchaseCount: this.buyCount,
					refundWay: this.refundWay.refundWay,
					groupCount: 3,
					groupId: groupId
				});
			},
			async commitOrder() {
				if (!this.allFinished) {
					console.log('allCode ', this.allCode);
					uni.showToast({
						title: '请完成选号!',
						mask: false,
						duration: 1500
					});
					return;
				}


				const order = await this.getOrder();
				console.log("提交订单-----------" + JSON.stringify(order));


				uni.redirectTo({
					url: './pay?payOrderNo=' + order.payOrderNo + '&totalPayRmb=' + order.totalPayRmb + '&productType='+'normalProduct'
				});

			},
			...mapMutations({
				changeCodeCount: 'chooseCode/changeCodeCount',
				initCode: 'chooseCode/initCode',
			}),
			 
			chooseCode() {
				uni.navigateTo({
					url: './chooseCode'
				});
			},
			onCountChanged(event) {
				console.log('修改数量-----------' + event);
				this.changeCodeCount(event);
				this.$store.commit('confirmPay/setPurchaseAmount', event);
				this.getConfirmOrderInfo(this.discountGameId);
			},
			addressList() {
				uni.navigateTo({
					url: '../me/address/address'
				});
			},
			refundRoute() {
				uni.navigateTo({
					url: './refundRoute'
				});
			}
		}
	};
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		background: #f7f7f7;
		display: flex;
		flex-direction: column;

		.delivery-info {
			display: flex;
			flex-direction: column;
			background: #ffffff;
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
			background: #ffffff;
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
			background: #ffffff;
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

					.product-info-pro-price-info {
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-top: 10upx;

						.product-info-pro-name-price {
							font-size: 26upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(204, 38, 54, 1);
							margin-right: 10upx;
						}

						.product-info-pro-name-price-discount {
							font-size: 22upx;
							font-family: PingFangSC-Light;
							font-weight: 300;
							text-decoration: line-through;
							color: rgba(119, 119, 119, 1);
							line-height: 42upx;
						}
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
			background: #ffffff;
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
					color: #333333;
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
					flex: 1;

					.code-show-array {
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-right: 16upx;

					}

					.code {
						width: 46upx;
						height: 46upx;
						background-color: #f5cccc;
						border-radius: 50%;
						margin-right: 10upx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 25upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: #cc2636;
					}
				}

				.choose-tips {
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(119, 119, 119, 1);
					line-height: 30upx;
				}
			}
		}

		.price-info {
			width: 100%;
			height: 152upx;
			display: flex;
			flex-direction: column;
			background: #ffffff;
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
					color: #cc2636;
				}
			}
		}

		.refound-info {
			height: 79upx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			background: #ffffff;
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
				background: #ffffff;
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

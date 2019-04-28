<template>
	<view class="container">
		<view class="order_content">
			<view class="order_pay_top">
				<view class="order_pay_top_amount">¥{{fix2TotalPayRmb}}</view>
				<view class="order_pay_top_msg">支付金额</view>
				<view class="order_pay_top_refundWay" @click="refundRoute" v-if="productType=='normalProduct'">不中签全额退款></view>
			</view>
		</view>
		<view class="p_option_info">
			<view class="p_text">请选择支付方式</view>
			<block v-for="(channel,index) in mapPaychannels" :key="index">
				<view class="p_option" @click="changePaychanel(index)">
					<view class="p_option_left">
						<image v-bind:src="channel.icon" class="pay_icon">
						</image>
						<view class="p_option_title">{{channel.title}}</view>
					</view>
					<image v-if="selectIndex==index" v-bind:src="channel.selIcon" class="pay_icon_right"></image>
					<image v-else v-bind:src="channel.unselIcon" class="pay_icon_right"></image>
				</view>
			</block>
		</view>
		<view class="confirm_footer">
			<view class="confirm_footer_pay" @click="toPay(payResult)">立即支付</view>
		</view>
		<pay-dialog title="请输入支付密码" ref="xyDialog" @confirmButton="clickConfirm" @showKeyboard="showKeyboard" :payOrderNo="payOrderNo"
		 :totalPayRmb="totalPayRmb">

		</pay-dialog>
	</view>
</template>

<script>
	import api from '../../util/api.js';
	import pay from '../../util/payUtil.js';
	import payDialog from '../components/walletDialog.vue';
	import dataUtil from '../../util/dataUtil.js';
	import {
		mapState,
	} from 'vuex';
	export default {
		onLoad(option) {
			console.log("订单号----------" + option.payOrderNo + '-----金额-------' + option.totalPayRmb + '-----类型-----' + option.productType);
			this.payOrderNo = option.payOrderNo;
			this.totalPayRmb = option.totalPayRmb;
			this.productType = option.productType;
		},
		computed: {
			...mapState({
				openid: state => state.openid,
				directBuy: state => state.confirmPay.buyType,
				refundWay: state => state.confirmPay.refundWay,
			}),
			fix2TotalPayRmb: function() {
				return dataUtil.priceFix2(this.totalPayRmb)
			},
			mapPaychannels: function() {
				if (this.productType === 'vipProduct') {
					this.paychannels.pop();
					return this.paychannels;
				}
				return this.paychannels;
			}
		},
		components: {
			payDialog
		},
		methods: {
			async toPay(callback) {
				if (this.paychannels[this.selectIndex].payChannel == 'Wallet') {
					this.checkSetPayPassword();
					return;
				}

				let orderInfo;
				let payChannel = this.paychannels[this.selectIndex].payChannel;
				// #ifdef MP-WEIXIN
				uni.showLoading({
					mask: true
				});
				payChannel = 'WeixinMiniProgramPay';
				orderInfo = await api.commitPay({
					openId: this.openid,
					payChannel: payChannel,
					payOrderNo: this.payOrderNo,
					refundWay: this.refundWay.refundWay,
				});
				// #endif

				// #ifdef APP-PLUS
				// payChannel = 'WeixinPay';
				orderInfo = await api.commitPay({
					// openId: this.openid,
					payChannel: payChannel,
					payOrderNo: this.payOrderNo,
					refundWay: this.refundWay.refundWay,
				});
				// #endif

				console.log("开始支付----------" + JSON.stringify(orderInfo));
				pay.pay({
					payChannel: payChannel,
					provider: this.paychannels[this.selectIndex].provider,
					orderInfo: orderInfo
				}, callback)

			},
			payResult(payStatus) {
// 				console.log('this.directBuy############## ', this.directBuy);
// 				console.log('this.payStatus############## ', payStatus);
				
				uni.hideLoading();
				if (this.productType === 'vipProduct') {
					//会员商品
					uni.redirectTo({
						url: "./payResult?payOrderNo=" + this.payOrderNo + "&totalPayRmb=" + this.totalPayRmb + "&payChannel=" +
							this.paychannels[this.selectIndex].payChannel + "&openId=" + this.openid + '&productType=' + this.productType
					})
				} else {
					if (payStatus) {
						//支付成功
						if (this.directBuy !== 'false') {
							uni.redirectTo({
								url: "./payResult?payOrderNo=" + this.payOrderNo + "&totalPayRmb=" + this.totalPayRmb + "&payChannel=" +
									this.paychannels[this.selectIndex].payChannel + "&openId=" + this.openid + '&productType=' + this.productType
							})
						} else {
							uni.redirectTo({
								url: "/pages/gameGroup?payOrderNo=" + this.payOrderNo
							})
						}

					} else {
						//支付失败
						uni.redirectTo({
							url: "./payResult?payOrderNo=" + this.payOrderNo + "&totalPayRmb=" + this.totalPayRmb + "&payChannel=" +
								this.paychannels[this.selectIndex].payChannel + "&openId=" + this.openid + '&productType=' + this.productType
						})
					}
				}
			},
			changePaychanel(index) {
				this.selectIndex = index
			},
			async checkSetPayPassword() {
				const res = await api.checkSetPayPassword({});
				console.log("是否设置支付密码----------" + JSON.stringify(res));
				if (res) {
					this.handleActionShow();
				} else {
					this.toSetPsw();
				}
			},
			toSetPsw() {
				uni.navigateTo({
					url: "./payPsw"
				});
			},
			handleActionShow() {
				this.$refs.xyDialog.show()
			},
            refundRoute() {
				uni.navigateTo({
					url: './refundRoute'
				});
			}
		},
		// #ifdef APP-PLUS
		data() {
			return {
				productType: null,
				payOrderNo: 0,
				totalPayRmb: 0,
				selectIndex: 0,
				paychannels: [{
						icon: '../../static/pay/pay_icon_weixin@2x.png',
						selIcon: '../../static/pay/pay_choose@2x.png',
						title: "微信支付",
						unselIcon: '../../static/pay/pay_btn@2x.png',
						payChannel: "WeixinPay",
						provider: 'wxpay'
					},
					{
						icon: '../../static/pay/pay_icon_zhifubao@2x.png',
						selIcon: '../../static/pay/pay_choose@2x.png',
						title: "支付宝付款",
						unselIcon: '../../static/pay/pay_btn@2x.png',
						payChannel: "AlipayClient",
						provider: 'alipay'
					}, {
						icon: '../../static/login/logo@2x.png',
						selIcon: '../../static/pay/pay_choose@2x.png',
						title: "钱包",
						unselIcon: '../../static/pay/pay_btn@2x.png',
						payChannel: "Wallet",
						provider: ''
					}
				]
			}
		},
		// #endif

		// #ifdef MP-WEIXIN
		data() {
			return {
				productType: null,
				payOrderNo: 0,
				totalPayRmb: 0,
				selectIndex: 0,
				paychannels: [{
						icon: '../../static/pay/pay_icon_weixin@2x.png',
						selIcon: '../../static/pay/pay_choose@2x.png',
						title: "微信支付",
						unselIcon: '../../static/pay/pay_btn@2x.png',
						payChannel: "WeixinMiniProgramPay",
						provider: 'wxpay'
					},
					{
						icon: '../../static/login/logo@2x.png',
						selIcon: '../../static/pay/pay_choose@2x.png',
						title: "钱包",
						unselIcon: '../../static/pay/pay_btn@2x.png',
						payChannel: "Wallet",
						provider: ''
					}
				]
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	.container {
		background: #F7F7F7;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	    flex: 1;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		.order_content {
			height: 250upx;
			width: 100%;
			background: #ffffff;

			.order_pay_top {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.order_pay_top_amount {
					margin-top: 39upx;
					font-size: 50upx;
					font-family: PingFang-SC-Bold;
					color: rgba(204, 38, 54, 1);
					line-height: 73upx;
				}

				.order_pay_top_msg {
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(153, 153, 153, 1);
					margin-top: 5upx;
				}
				.order_pay_top_refundWay{
					color: #FFB540;
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					margin-top: 40upx;
				}
			}
		}

		.p_option_info {
			margin-top: 20upx;
			width: 100%;
			height: 120upx;

			.p_text {
				font-size: 30upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				background: #ffffff;
				padding: 20upx;
				border-bottom: 1px solid rgba(227,227,227,1);
			}

			.p_option {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				background: #ffffff;
				.p_option_left {
					display: flex;
					flex-direction: row;
					align-items: center;
					height: 117upx;
					margin-left: 20upx;

					.pay_icon {
						width: 38upx;
						height: 38upx;
					}

					.p_option_title {
						height: 97upx;
						font-size: 28upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(31, 31, 31, 1);
						line-height: 97upx;
						margin-left: 20upx;
					}
				}

				.pay_icon_right {
					width: 44upx;
					height: 44upx;
					margin-right: 20upx;

				}
			}
		}

		.confirm_footer {
			width: 100%;
			position: fixed;
			bottom: 50upx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			.confirm_footer_pay{
				width: 690upx;
				height: 80upx;
				background: rgba(204, 38, 54, 1);
				font-size: 30upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 80upx;
				text-align: center;
			}
		}
	}
</style>

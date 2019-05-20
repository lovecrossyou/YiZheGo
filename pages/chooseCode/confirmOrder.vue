<template>
	<view class="container">
		<view class="delivery-info" @click="addressList" v-if="address">
			<view class="delivery-userinfo">
				<view class="delivery-userinfo-name">
					收货人:
					<span class="ml10">{{ address.recievName }}</span>
				</view>
				<view class="delivery-userinfo-name">{{ address.phoneNum }}</view>
			</view>
			<view class="delivery-userinfo-addInfo">
				<image v-bind:src="addIcon" class="delivery-userinfo-addInfo-icon"></image>
				<view class="address-name">地址：</view>
				<view class="address">{{ address.fullAddress }}</view>
			</view>
			<image v-bind:src="rightArrow" class="delivery-userinfo-arrow"></image>
		</view>
		<view class="delivery-no-info" @click="addressList" v-else>
			<image v-bind:src="addIcon" class="delivery-no-info-icon"></image>
			<view class="delivery-no-info-msg">选择地址</view>
			<image v-bind:src="rightArrow" class="delivery-no-info-arrow"></image>
		</view>
		<image v-bind:src="lineCai" class="delivery-userinfo-line"></image>
		<view v-if="orderInfo" class="product-info">
			<view class="product-info-pro">
				<image v-bind:src="orderInfo.relatedProductImageUrl" class="product-info-pro-img" mode="aspectFit"></image>
				<view class="product-info-pro-name">
					<view class="product-info-pro-name-text">{{ orderInfo.relatedProductName }}</view>
					<view class="product-info-pro-price-info" v-if="directBuy == 'false'">
						<view class="product-info-pro-name-price">¥{{ fix2Price.oneDiscountPrice }}</view>

						<view class="product-info-pro-name-price-discount">市场价:{{ fix2Price.originalPrice }}</view>
					</view>
					<view class="product-info-price-original" v-else>¥{{ fix2Price.originalPrice }}</view>
				</view>
			</view>
			<view class="all-code-content">
				<view class="all-code-title">连号包中</view>
				<image v-bind:src="fireIcon" class="all-code-icon"></image>
				<view class="all-code-tips">(1000件连号)</view>
				<switch @change="changeAllCode" />
			</view>
			<view class="product-info-pro-amount">
				<view class="product-info-pro-amount-text">抢购数量</view>
				<uni-number-box @changes="onCountChanged" :value="inputValue" :disabled="isAllCode"></uni-number-box>
			</view>
		</view>
		<view v-if="orderInfo" class="price-info">
			<view class="price-info-product">
				<view class="price-info-product-text">商品</view>
				<view class="price-info-product-price" v-if="directBuy == 'true'">¥{{ fix2Price.originalTotlePrice }}</view>
				<view class="price-info-product-price" v-else>¥{{ fix2Price.oneDiscountTotlePrice }}</view>
			</view>
			<view class="price-info-product">
				<view class="price-info-product-text">运费</view>
				<view class="price-info-product-price">+¥{{ fix2Price.freight }}</view>
			</view>
		</view>
		<view class="choose-code" @click="chooseCode" v-if="directBuy == 'false'">
			<view class="choose-code-msg" v-if="allFinished">
				<view class="choose-code-msg-red">我的幸运号码（{{ buyCount }}组）</view>
			</view>
			<view class="choose-code-msg" v-else>
				<view class="choose-code-msg-red">选择幸运号码</view>
				<view class="choose-code-msg-time">0~9选3个号码 选中立享1折 不中全额退款</view>
			</view>
			<view class="choose-code-select" v-if="allFinished">
				<view class="choose-code-button">
					<view class="code-show-array" v-for="(codeArray, index) in codeListForShow" :key="index">
						<view class="code" v-for="(code, arrayIndex) in codeArray" :key="arrayIndex">{{ code }}</view>
					</view>
				</view>

				<text class="choose-tips">去查看</text>
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
		<view v-if="orderInfo" class="confirm-footer">
			<view class="confirm-footer-price-info">
				<view class="confirm-footer-price-amount">共{{ purchaseAmount }}件</view>
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

		<view class="news_welfare_wrapper" v-if="showUpgradeModal">
			<!-- xx -->
			<image class="card" :src="xinren_upgrade_icon" @click="goUpgradeVIP"></image>
			<view><image class="cancelBtn" :src="cancelBtn" @click="cancelUpgradeModal"></image></view>
		</view>
		<view v-if="isShow" class="news_welfare_wrapper">
			<image class="card" :src="xinren_icon_fuli" @click="goUpgradeVIP"></image>
			<view><image class="cancelBtn" :src="cancelBtn" @click="cancelToast"></image></view>
		</view>
		<!--选号弹出框-->
		<view v-if="showChooseCodeModal" class="news_welfare_wrapper">
			<image class="card" :src="chooseCodeIcon" @click="chooseCode" mode="aspectFit"></image>
			<view><image class="cancelBtn" :src="cancelBtn" @click="cancelChooseCode"></image></view>
		</view>
	</view>
</template>

<script>
import uniNumberBox from '../components/uni-number-box/uni-number-box.vue';
import { mapState, mapMutations, mapGetters } from 'vuex';
import api from '../../util/api.js';
import pay from '../../util/payUtil.js';
import uniIcon from '@/pages/components/uni-icon/uni-icon.vue';
export default {
	onLoad: function(option) {
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
			gradeModal: false,
			groupId: null,
			discountGameId: 0,
			addIcon: '../../static/pay/icon_location.png',
			rightArrow: '../../static/pay/icon_arrow_right@2x.png',
			lineCai: '../../static/pay/img_cai@2x.png',
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
			isShow: false,
			xinren_icon_fuli: 'http://qnimage.xiteng.com/1@2x.png',
			cancelBtn: '../../static/pay/cancel.png',
			showUpgradeModal: false,
			xinren_upgrade_icon: '../../static/pay/xinren_icon_fuli@2x.png',
			showChooseCodeModal: false,
			chooseCodeIcon: '../../static/pay/choseCode@2x.png',
			fireIcon: '../../static/pay/fire_icon.png',
			inputValue:1,
			isAllCode:false,
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
			codeListForShow: 'chooseCode/codeListForShow'
		})
	},
	methods: {
		async getAddressList() {
			const res = await api.addressList({
				size: 10,
				pageNo: 0
			});
			this.$store.commit('confirmPay/setAddressList', res.content);
		},
		async getConfirmOrderInfo(discountGameId) {
			const res = await api.confirmOrderInfo({
				discountGameId: discountGameId,
				purchaseAmount: this.purchaseAmount,
				originalPriceBuy: this.directBuy
			});

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
				originalPriceBuy: this.directBuy,
				discountGameId: this.orderInfo.discountGameId,
				purchaseCount: this.buyCount,
				refundWay: this.refundWay.refundWay,
				groupCount: 3,
				groupId: groupId
			});
		},
		cancelToast() {
			this.isShow = false;
		},
		showToast() {
			this.isShow = true;
		},
		goUpgradeVIP() {
			uni.redirectTo({
				url: '/pages/me/vip/vip-center'
			});
			this.cancelToast();
		},
		async commitOrder() {
			if (!this.allFinished && this.directBuy == 'false') {
				this.showChooseCode();
				return;
			}
			if (this.directBuy == 'false') {
				const vip = await this.vipInfo();
				console.log('会员信息--------' + JSON.stringify(vip));
				if (!vip.userIsVip && vip.restPresentCount == 0) {
					this.startUpgradeModal();
					return;
				}
			}
			const data = await this.getOrder();
			console.log('提交订单-----------' + JSON.stringify(data));
			if (data === '请您升级会员！') {
				//升级
				this.showToast();
			} else {
				let order = data;
				uni.redirectTo({
					url: './pay?payOrderNo=' + order.payOrderNo + '&totalPayRmb=' + order.totalPayRmb + '&productType=' + 'normalProduct'
				});
			}
		},
		...mapMutations({
			changeCodeCount: 'chooseCode/changeCodeCount',
			initCode: 'chooseCode/initCode',
			randomAllCode: 'chooseCode/randomAllCode',
		}),

		chooseCode() {
			this.cancelChooseCode();
			uni.navigateTo({
				url: './chooseCode?isAllCode='+this.isAllCode
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
		},
		cancelUpgradeModal() {
			this.showUpgradeModal = false;
		},
		startUpgradeModal() {
			this.showUpgradeModal = true;
		},
		async vipInfo() {
			return api.vipInfo({});
		},
		showChooseCode() {
			this.showChooseCodeModal = true;
		},
		cancelChooseCode() {
			this.showChooseCodeModal = false;
		},
		changeAllCode(e) {
			this.isAllCode = e.target.value;
			if(e.target.value){
				this.inputValue = 1000;
				this.onCountChanged(1000);
				this.randomAllCode(1000);
			}else{
				this.onCountChanged(1);
				this.inputValue = 1;
				
			}
			
		}
	}
};
</script>

<style lang="scss">
.ml10 {
	margin-left: 10upx;
}
.container {
	width: 100%;
	height: 100%;
	background: #f7f7f7;
	display: flex;
	flex-direction: column;
	flex: 1;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	.news_welfare_wrapper {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		position: fixed;
		left: 0;
		top: 0;
		text-align: center;

		.card {
			width: 540upx;
			height: 640upx;
			margin-top: 300upx;
		}

		.cancelBtn {
			width: 60upx;
			height: 60upx;
			margin-top: 48upx;
		}
	}

	.delivery-info {
		width: 100%;
		background: #ffffff;
		padding: 34upx 0;
		box-sizing: border-box;
		font-size: 30upx;
		font-family: PingFangSC-Regular;
		color: rgba(51, 51, 51, 1);
		position: relative;
		.delivery-userinfo {
			width: 100%;
			padding-left: 64upx;
			padding-right: 92upx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.delivery-userinfo-addInfo {
			width: 100%;
			padding-left: 64upx;
			padding-right: 92upx;
			box-sizing: border-box;
			display: flex;
			margin-top: 20upx;
			position: relative;
			font-size: 30upx;
			font-family: PingFangSC-Regular;
			color: rgba(51, 51, 51, 1);
			margin-left: 7upx;

			.delivery-userinfo-addInfo-icon {
				position: absolute;
				left: 24upx;
				top: 6upx;
				width: 27upx;
				height: 31upx;
			}
			.address-name {
				width: 120upx;
			}
			.address {
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
		}

		.delivery-userinfo-arrow {
			position: absolute;
			width: 17upx;
			height: 30upx;
			right: 10upx;
			top: 76upx;
		}
	}

	.delivery-no-info {
		display: flex;
		flex-direction: row;
		background: #ffffff;
		height: 90upx;
		align-items: center;
		padding: 0 20upx;
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
		.delivery-no-info-arrow {
			position: absolute;
			width: 17upx;
			height: 30upx;
			right: 10upx;
			top: 35upx;
		}
	}

	.product-info {
		display: flex;
		flex-direction: column;
		//height: 170upx+108upx;
		background: #ffffff;
		margin-top: 20upx;
		padding: 20upx;

		.product-info-pro {
			display: flex;
			flex-direction: row;
			height: 170upx;
			align-items: center;

			.product-info-pro-img {
				width: 140upx;
				height: 140upx;
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
					// height: 67upx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
					-webkit-line-clamp: 2;
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

				.product-info-price-original {
					font-size: 26upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(204, 38, 54, 1);
					margin-right: 10upx;
					margin-top: 10upx;
				}
			}
		}
		.all-code-content {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-left: 27upx;
			padding-right: 38upx;
			margin-bottom: 40upx;
			margin-top: 20upx;
			.all-code-title {
				padding-left: 20upx;
				padding-right: 20upx;
				padding-top: 8upx;
				padding-bottom: 8upx;
				background: rgba(226, 37, 55, 1);
				border-radius: 10upx;
				font-size: 26upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.all-code-icon {
				margin-left: 20upx;
				width: 16upx;
				height: 25upx;
				margin-right: 8upx;
			}
			.all-code-tips {
				font-size: 22upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(153, 153, 153, 1);
				flex: 1;
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
				color: rgba(51, 51, 51, 1);
				line-height: 30upx;
			}

			.choose-code-msg-time {
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 30upx;
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
				color: #cc2636;
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

	.reduce {
	}

	.input-num {
		display: flex;
		justify-content: center;
		text-align: center;
	}
}
</style>

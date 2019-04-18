<template>
	<view class="page-content">
		<view class="info-content">
			<!-- 订单状态 -->
			<view class="state-content">
				<view class="state-text">
					<text class="state">{{ orderDealState === 0 ? '待付款' : orderDealState === 1 ? '待揭晓' : '已揭晓' }}</text>
					<text class="time">剩23：59：35自动关闭</text>
				</view>
				<view class="state-img">中签0件</view>
			</view>

			<!-- 收货信息 -->
			<view class="item-content line-content">
				<view class="person">
					<text class="name phone">收&#8194;货&#8194;人：乐一</text>
					<text class="phone">1589712668</text>
				</view>
				<view class="address-content">
					<image :src="positionIcon" class="position-icon"></image>
					<text class="address-title">收货地址：</text>
					<view class="default">默认</view>
					<text class="address">{{ '&#8195;&#8195;北京市西城区 百万庄大街11号粮科大厦三层华瑞富达' }}</text>
				</view>
			</view>
			<image :src="lineIcon" class="line-icon"></image>
			<!-- 商品信息 -->
			<view class="item-content">
				<productIno></productIno>
				<view class="title-content price-content">
					<text class="item-title">商品</text>
					<text class="item-title">￥2999.00</text>
				</view>
				<view class="title-content">
					<text class="item-title">运费</text>
					<text class="item-title">￥6.00</text>
				</view>
				<view class="zongji">
					共
					<text class="color">10</text>
					件 实付款：
					<text class="color">￥3005.00</text>
				</view>
			</view>
			<!-- 本期中签号码 -->
			<view class="item-content">
				<view class="title-content"><text class="item-title">本期中签号码(第2019114期)</text></view>

				<view class="code-list">
					<view class="ball">待</view>
					<view class="ball">揭</view>
					<view class="ball">晓</view>
				</view>
			</view>
			<!-- 我的幸运号码 -->
			<view class="item-content">
				<view class="title-content">
					<text class="item-title">我的幸运号码（10组）</text>
					<uni-icon type="arrowright" color="#bbb" size="20"></uni-icon>
				</view>
				<view class="code-content">
					<view class="code-array" v-for="(codeArray, index) in codeList" :key="index">
						<view class="code" v-for="(code, index1) in codeArray" :key="index1">{{ code }}</view>
					</view>
				</view>
			</view>
			<!-- 退款路径 -->
			<view class="item-content">
				<view class="title-content">
					<text class="item-title">退款路径</text>
					<text class="item-title">喜腾钱包</text>
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="item-content">
				<text class="order-info">下单时间:2018-04-18 16:40</text>
				<text class="order-info">订单号:2018-04-18 16:40</text>
				<text class="order-info">期数:2018-04-18 16:40</text>
				<text class="order-info">商品代码:2018-04-18 16:40</text>
				<text class="order-info">支付金额:2018-04-18 16:40</text>
			</view>
		</view>
		<!-- 底部支付 -->
		<view class="pay-content">
			<view class="button cancel-order">取消订单</view>
			<view class="button pay-now">立即支付</view>
		</view>
	</view>
</template>

<script>
import uniIcon from '@/pages/components/uni-icon/uni-icon.vue';
import productIno from '../components/productInfo.vue';
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
	components: {
		uniIcon,
		productIno
	},
	data() {
		return {
			codeList: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
			positionIcon: '../../../static/me/position.png',
			lineIcon: '../../../static/pay/img_cai@2x.png'
		};
	},
	onLoad(params) {
		let { platformOrderNo } = params;
		this.getOrderDetail(platformOrderNo);
	},
	methods: {
		...mapActions({
			getOrderDetail: 'myOrder/getOrderDetail'
		})
	},
	computed: {
		...mapGetters({
			orderDealState: 'myOrder/orderDealState'
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
			.state-text {
				background-color: #cc2636;
				padding-top: 48upx;
				padding-bottom: 40upx;
				padding-left: 30upx;
				padding-right: 30upx;
				display: flex;
				flex-direction: column;

				.state {
					font-size: 32upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
				.time {
					font-size: 32upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
			}
			.state-img {
				 background-image: url('~@/static/me/state_img.png');
			}
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
				.item-title {
					font-size: 30upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 46upx;
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

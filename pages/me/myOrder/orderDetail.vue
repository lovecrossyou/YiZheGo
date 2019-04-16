<template>
	<view class="page-content">
		<!-- 订单状态 -->
		<view class="state-content">
			<text class="state">待付款</text>
			<text class="time">剩23：59：35自动关闭</text>
		</view>
		<!-- 收货信息 -->
		<view class="item-content line-content">
			<view class="person">
				<text class="name phone">收货人：乐一</text>
				<text class="phone">1589712668</text>
			</view>
			<view class="address-content">
				<image :src="positionIcon" class="position-icon"></image>
				<text class="address-title">收货地址：</text>
				<view class="default">默认</view>
				<text class="address">北京市西城区 百万庄大街11号粮科大厦三层华瑞富达</text>
			</view>
			
		</view>
		<image :src="lineIcon" class="line-icon"></image>
		<!-- 商品信息 -->
		<view class="item-content">
			<view>公共内容</view>
			<view class="title-content">
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
		<!-- 底部支付 -->
		<view class="pay-content">
			<view class="cancel-order">取消订单</view>
			<view class="pay-now">立即支付</view>
		</view>
	</view>
</template>

<script>
import uniIcon from '@/pages/components/uni-icon/uni-icon.vue';
export default {
	components: {
		uniIcon
	},
	data() {
		return {
			codeList: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [4, 3, 1]],
			positionIcon: '../../../static/me/position.png',
			lineIcon: '../../../static/pay/img_cai@2x.png'
		};
	}
};
</script>

<style lang="less">
.page-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #efeff4;
	.state-content {
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
			}
		}
		.address-content {
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
			}
			.default {
				border: 1upx solid rgba(255, 0, 0, 1);
				border-radius: 4px;
				font-size: 20upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 41, 41, 1);
			}
			.address {
				font-size: 30upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
		}

		.title-content {
			display: flex;
			justify-content: space-between;
			.item-title {
				font-size: 30upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
		}
		.zongji {
			display: flex;
			justify-content: flex-end;

			font-size: 26upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: black;
			.color {
				font-size: 26upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #CC2636;
			}
		}
		
	}
	.line-content{
		margin-bottom: 0;
	}
	.line-icon {
		width: 100%;
		height: 4upx;
		margin-bottom: 20upx;
	}
	
}
</style>

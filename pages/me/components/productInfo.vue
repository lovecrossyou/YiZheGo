<template>
	<view class="product">
		<image v-bind:src="productImg" mode="widthFix" class="product-image"></image>
		<view class="product-info">
			<view class="one-tips">一折购</view>
			<text class="product-name">{{ '&#8195;&#8195;&#8195;' }}{{ productName }}</text>
			<view class="product-prices">
				<text class="current-price">￥{{currentPrice}}</text>
				<text class="origin-price">市场价￥{{originPrice}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	import numberUtil from '@/util/numberUtil.js';
export default {
	props: {
		productImg: {
			type: String,
			default: ''
		},
		productName: {
			type: String,
			default: ''
		},
		currentPrice: {
			type: Number,
			default: 0
		},
		originPrice: {
			type: Number,
			default: 0
		}
	}
};
</script>

<style lang="less">
.product {
	display: flex;
	flex-direction: row;
	margin-top: 34upx;
	.product-image {
		height: 140upx;
		width: 240upx;
		display: flex;
		border: 1upx solid #efeff4;
	}
	.product-info {
		display: flex;
		margin-left: 26upx;
		flex-direction: column;
		.one-tips {
			background: rgba(204, 38, 55, 1);
			border-radius: 5upx;
			font-size: 22upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			position: absolute;
			line-height: 38upx;
			padding-left: 10upx;
			padding-right: 10upx;
		}
		.product-name {
			font-size: 30upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}
		.product-prices {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 24upx;

			.current-price {
				font-size: 34upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(204, 38, 55, 1);
			}
			.origin-price {
				font-size: 24upx;
				font-family: PingFangSC-Light;
				font-weight: 300;
				text-decoration: line-through;
				color: rgba(119, 119, 119, 1);
				margin-left: 24upx;
			}
		}
	}
}
</style>

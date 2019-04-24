<template>
	<view class="vip-item">
		
		<view v-if="!item.isVipPro" class="invite-img"></view>
		<image v-if="item.isVipPro" class="item-img" :src="item.imageUrl"></image>
		<view class="item-content">
			<view class="title">
				<view class="main-title">{{item.productName}}</view>
				<view class="sub-title">
					<view class="tag"></view>
					<view class="text">
						{{item.subtitle}}
					</view>
				</view>
			</view>
				
			<view class="price-action" @click="inviteFriend">
				<view class="price">¥{{item.price/100}}</view>
				<view v-if="!item.isVipPro" class="action" :class="{
					'action-unusable': hasPresentMonthVip,
					'action-usable': !hasPresentMonthVip
				}"
				 @click="action(item)">立即邀请</view>
				 <view v-if="item.isVipPro" class="action" @click="action(item)">立即购买</view>
			</view>
		</view>
		<view v-if="!item.isVipPro&&hasPresentMonthVip" class="free-exp-img"></view>
	</view>
</template>

<script>
	export default {
		props: {
			hasPresentMonthVip: false,
			item: {},
			action:{type:Function},
		}
	}
</script>

<style lang="scss">
	.vip-item {
		display: flex;
		flex: 1;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 280upx;
	
		.item-img {
			width: 190upx;
			height: 190upx;
			margin-left: 30upx;
			background-size: 100% 100%;
			border-style: solid;
			border-radius: 4upx;
			border-width: 1upx;
			border-color: #e5e5e5;
		}
		.invite-img {
			width: 190upx;
			height: 190upx;
			margin-left: 30upx;
			background: url("http://qnimage.xiteng.com/vip_exp.png") no-repeat;
			background-size: 100% 100%;
		}
		
		.free-exp-img {
			z-index: 10;
			width: 157upx;
			height: 124upx;
			margin-left: -190upx;
			margin-right: 30upx;
			background: url("http://qnimage.xiteng.com/vip_free_exped.png") no-repeat;
			background-size: 100% 100%;
		}
	
		.item-content {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			width: 100%;
			height: 190upx;
			margin-left: 35upx;
	
			.title {
				flex-direction: column;
				justify-content: space-between;
				height: 76upx;
	
				.main-title {
					font-size: 32upx;
					color: #333333;
				}
	
				.sub-title {
					display: flex;
					flex-direction: row;
					align-items: center;
	
					.tag {
						width: 33upx;
						height: 23upx;
						background: url("http://qnimage.xiteng.com/vip_tag.png") no-repeat;
						background-size: 100% 100%;
					}
	
					.text {
						margin-left: 14upx;
						font-size: 26upx;
						color: #C9AE7D;
					}
				}
	
			}
	
			.price-action {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-end;
	
				.price {
					font-size: 28upx;
					color: #DE3031;
				}
	
				.action {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 140upx;
					height: 45upx;
					margin-right: 34upx;
					border-radius: 23upx;
					background-color: #E1CA9C;
					font-size: 26upx;
					color: white;
				}
				.action-unusable {
					background-color: #D9D9D9;
				}
				.action-usable {
					background-color: #E1CA9C;
				}
			}
	
		}
	}
</style>

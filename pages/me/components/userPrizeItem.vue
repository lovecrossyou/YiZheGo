<template>
	<view class="lucky-user-prize" :style="{background: backColor}">
		<view class="lucky-user">
			<view class="img-name">
				<image class="user-img" :src="item.winUserIconUrl"></image>
				<view class="user-name">{{item.winUserName}}</view>
			</view>
			<view class="add-phone-text">{{item.province}}</view>
			<view class="add-phone-text">{{item.phoneNum}}</view>
		</view>

		<view class="prize">
			<image class="prize-img" :src="item.productImageUrl"></image>
			<view class="prize-content">
				<view class="title">{{item.productName}}</view>
				<view class="price">
					<view class="title">￥{{item.oneDiscountPrice/100}}</view>
					<view class="market-price">市场价:￥{{item.originalPrice/100}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			
		},
		props: {
			backColor: '',
			item: {},
			
		},
		onLoad() {
			console.log(this.item);
		}
	}
</script>

<style lang="scss">
	.lucky-user-prize {
		// height: 243upx;
		margin: 22upx 24upx;
		border-radius: 10upx;

		// background-color: cadetblue;
		.lucky-user {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 58upx;
			padding: 25upx 38upx 0upx 28upx;

			.img-name {
				display: flex;
				flex-direction: row;
				align-items: center;

				.user-img {
					width: 58upx;
					height: 58upx;
					border-radius: 29upx;
					background-color: #E73746;
				}

				.user-name {
					font-size: 26upx;
					color: #333333;
					margin-left: 20upx;
				}
			}

			.add-phone-text {
				font-size: 26upx;
				color: #333333;
			}
		}

		.prize {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 100upx;
			// margin-top: 30upx;
			padding-top: 30upx;
			padding-bottom: 30upx;

			.prize-img {
				width: 100upx;
				height: 100upx;
				margin-left: 28upx;
				// background-color: #E73746;
			}

			.prize-content {
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: space-between;
				width: 100%;
				height: 100upx;
				// margin-left: 17upx;

				.title {
					padding-left: 17upx;
					padding-right: 17upx;
					font-size: 30upx;
					color: #FFFFFF;
					overflow: hidden;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}

				.price {
					margin-left: 17upx;
					display: flex;
					flex-direction: row;
					align-items: center;
				}

				.market-price {
					font-size: 24upx;
					color: #FFFFFF;
					margin-left: 25upx;
					text-decoration: line-through;
				}
			}
		}
	}
</style>

<template>
	<view class="main">
		
		<view class="header">
			<view class="ordinal-date">
				<view class="ordinal">第 2019186 期中签号码</view>
				<view class="date">2019-03-25</view>
			</view>
			
			<view class="lucky-No">
				<view class="no-ball">6</view>
				<view class="no-ball">7</view>
				<view class="no-ball">0</view>
			</view>
			
			<view class="numbers-count">
				<view class="item">中签人数：3人</view>
				<view class="sep-line"></view>
				<view class="item">中签注数：6注</view>
			</view>
		</view>
		
		<view class="numbers-list">
			
			<view class="numbers-item">
				<view class="lucky-user">
					<view class="img-name">
						<view class="user-img"></view>
						<view class="user-name">贝贝北</view>
					</view>
					<view class="add-phone-text">河北</view>
					<view class="add-phone-text">136****7898</view>
				</view>
				
				<view class="prize">
					<view class="prize-img"></view>
					<view class="prize-content">
						<view class="title">三只松鼠零食大礼包 1100g ...</view>
						<view class="price">
							<view class="title">￥5.90</view>
							<view class="market-price">市场价:￥59.00</view>
						</view>
					</view>
				</view>	
			</view>
			
			
			
			<view class="numbers-item">
				<view class="lucky-user">
					<view class="img-name">
						<view class="user-img"></view>
						<view class="user-name">贝贝北</view>
					</view>
					<view class="add-phone-text">河北</view>
					<view class="add-phone-text">136****7898</view>
				</view>
				
				<view class="prize">
					<view class="prize-img"></view>
					<view class="prize-content">
						<view class="title">三只松鼠零食大礼包 1100g ...</view>
						<view class="price">
							<view class="title">￥5.90</view>
							<view class="market-price">市场价:￥59.00</view>
						</view>
					</view>
				</view>	
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
</script>

<style lang="scss">
	.main {
		width: 100%;
		background-color: seagreen;
		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			.ordinal-date {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				height: 80upx;
				margin: 49upx 0upx 25upx 0upx;
				.ordinal {
					font-size: 34upx;
					color: #FFFFFF;
				}

				.date {
					font-size: 24upx;
					color: #FFFFFF;
				}
			}

			.lucky-No {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				width: 318upx;
				height: 78upx;

				.no-ball {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 78upx;
					height: 78upx;
					border-radius: 39upx;
					background-color: #E73746;
					font-size: 40upx;
					color: #FFFFFF;
				}
			}

			.numbers-count {
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 100%;
				margin: 44upx 0upx;
				.sep-line {
					width: 1upx;
					height: 37upx;
					background-color: #FFFFFF;
				}

				.item {
					display: flex;
					width: 50%;
					justify-content: center;
					align-items: center;
					font-size: 32upx;
					color: #333333;
				}
			}
		}

		.numbers-list {
			padding: 10upx 30upx 10upx 30upx;
			.numbers-item {
				height: 243upx;
				margin-bottom: 20upx;
				background-color: cadetblue;
				border-radius: 10upx;

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
					margin-top: 30upx;

					.prize-img {
						width: 100upx;
						height: 100upx;
						margin-left: 28upx;
						background-color: #E73746;
					}

					.prize-content {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						height: 100upx;
						margin-left: 17upx;

						.title {
							font-size: 30upx;
							color: #FFFFFF;
						}

						.price {
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
		}
	}
</style>

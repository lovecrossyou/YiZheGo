<template>
	<view class="main">
		<view class="lucky-list">
			<view class="lucky-item">
				<view class="top-tag">
					<view class="date">今天</view>
					<view class="day-time">星期二 22:00</view>
				</view>
				<view class="lucky">
					<view class="caty-No">
						
						<view class="catygory-tag">
							<view class="tag-img"></view>
							<view class="tag-title">每日22:00揭晓</view>
						</view>
						
						<view class="lucky-No">
							<view class="count-tag">第 2019186 期 中签号码</view>
							<view class="no-ball-all">
								<view class="no-ball">6</view>
								<view class="no-ball">7</view>
								<view class="no-ball">0</view>
							</view>
						</view>
						
						<view class="lucky-count-all">
							<view class="title">本期中签(10)</view>
							<view class="show-all-tag">
								<view class="tag-text" @click="turnToLuckyDetail">查看全部</view>
								<view class="right-row-img"></view>
							</view>
						</view>
						
					</view>
					
					<view class="lucky-user-prize">
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
					
					<view class="sep-line"></view>
					
					<view class="attention">
						注：本期中签号码与福彩3D第2019186期一等奖号码相同，即选 中3个红球，详情请查询“中国福利彩票开奖公告”。
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods:{
			turnToLuckyDetail(){
				uni.navigateTo({
					url:'./lucky-detail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100%;
		.lucky-list {
			.lucky-item {
				background-color: #f4f8fb;
				.top-tag {
					display: flex;
					flex: 1;
					flex-direction: row;
					align-items: center;
					height: 96upx;
					padding-top: 60upx;
					padding-left: 43upx;
					.date {
						font-size: 60upx;
						color: #333333;
					}
					.day-time {
						font-size: 34upx;
						color: #666666;
					}
				}
				.lucky {
					margin: 20upx 40upx 40upx 40upx;
					border-radius: 20upx;
					background-color: seagreen;
					.caty-No {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						height: 313upx;
						padding-top: 35upx;
						.catygory-tag {
							display: flex;
							flex-direction: row;
							align-items: center;
							height: 40upx;
							.tag-img {
								width: 152upx;
								height: 40upx;
								margin-left: 25upx;
								background-color: #CC2636;
							}
							.tag-title {
								margin-left: 22upx;
								font-size: 24upx;
								color: #CC2636;
							}
						}
						.lucky-No {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							align-items: center;
							width: 100%;
							height: 143upx;
							.count-tag {
								font-size: 34upx;
								color: #FFFFFF;
							}
							.no-ball-all {
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
						}
						.lucky-count-all {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;
							margin: 0upx 36upx 0upx 36upx;
							.title {
								font-size: 26upx;
								color: #FFFFFF;
							}
							.show-all-tag {
								display: flex;
								flex-direction: row;
								align-items: center;
								
								.tag-text {
									font-size: 24upx;
									color: #FFFFFF;
								}
								.right-row-img {
									width: 12upx;
									height: 22upx;
									margin-left: 12upx;
									background-color: #666666;
								}
							}
						}
					}
					.lucky-user-prize {
						height: 243upx;
						margin: 22upx 24upx;
						border-radius: 10upx;
						background-color: cadetblue;
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
					.sep-line {
						width: 100%;
						height: 1upx;
						margin-top: 36upx;
						background-color: #FFFFFF;
					}
					.attention {
						font-size: 22upx;
						color: #FFFFFF;
						padding: 24upx 24upx 24upx 24upx;
					}
				}
			}
		}
	}
</style>

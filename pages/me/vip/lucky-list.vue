<template>
	<view class="main">
		<view class="lucky-list">

			<block v-for="(item,index) in luckyListA" :key="index">

				<view class="lucky-item">
					<view class="top-tag">
						<view class="date">今天</view>
						<view class="day-time"> {{item.week}} 22:00</view>
					</view>
					<!-- <view class="lucky"  :style="{ background: 'linear-gradient(backColorA[index].color1,backColorA[index].color2)' }"> -->
					<view class="lucky" :style='{background: backColorA[index%4].background}'>
						<view class="caty-No">
							<view class="catygory-tag">
								<view class="tag-img"></view>
								<view class="tag-title">每日22:00揭晓</view>
							</view>

							<view class="lucky-No">
								<view class="count-tag">第 {{item.welfareStage}} 期 中签号码</view>
								<luckyBallItem></luckyBallItem>
							</view>

							<view class="lucky-count-all">
								<view class="title">本期中签(10)</view>
								<view class="show-all-tag">
									<view class="tag-text" @click="turnToLuckyDetail(item.welfareStage)">查看全部</view>
									<view class="right-row-img"></view>
								</view>
							</view>

						</view>

						<userPrizeItem :item="item" :backColor="backColorA[index%4].userPrizeColor"></userPrizeItem>

						<view class="sep-line"></view>

						<view class="attention">
							注：本期中签号码与福彩3D第2019186期一等奖号码相同，即选 中3个红球，详情请查询“中国福利彩票开奖公告”。
						</view>

					</view>
				</view>
			</block>

		</view>
	</view>
</template>

<script>
	import api from "@/util/api.js"
	import luckyBallItem from '../components/luckyBallItem.vue'
	import userPrizeItem from '../components/userPrizeItem.vue'
	export default {
		components: {
			luckyBallItem,
			userPrizeItem
		},
		data() {
			return {
				luckyListA: [],
				backColorA: [{
						background:'linear-gradient(#60ECFF, #9890FF)',
						userPrizeColor : 'rgba(74,81,227,0.1)',
					},
					{
						background: 'linear-gradient(#FDD34A, #FF5C58)',
						userPrizeColor : 'rgba(255,133,74,0.1)',
					},
					{
						background: 'linear-gradient(#FFB4AE, #FF5581)',
						userPrizeColor: 'rgba(255,61,86,0.1)',
					},
					{
						background: 'linear-gradient(#FFD443, #FF9144)',
						userPrizeColor: 'rgba(245,86,61,0.1)',
					},
				],
			};
		},
		methods: {
			async getLuckyList() {
				let res = await api.luckyList({})
				this.luckyListA = res.list;
				console.log(res)
			},
			turnToLuckyDetail(lotteryStage) {
				uni.navigateTo({
					url: './lucky-detail'
				})
			}
		},
		onLoad() {
			this.getLuckyList()
		}
	}
</script>

<style lang="scss">
	.main {
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: #f4f8fb;

		.lucky-list {
			width: 100%;
			height: 100%;
			background-color: #f4f8fb;

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
						margin-left: 23upx;
						font-size: 34upx;
						color: #666666;
					}
				}

				.lucky {
					margin: 20upx 40upx 40upx 40upx;
					border-radius: 20upx;
					// background: linear-gradient(#60ECFF, #9890FF);
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
								background: url("http://qnimage.xiteng.com/lucky_yizhe.png") no-repeat;
								background-size: 100% 100%;
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
									background: url("http://qnimage.xiteng.com/lucky_nav_right.png") no-repeat;
									background-size: 100% 100%;
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

<template>
	<section class="main">
		<PullUpReload :isLoading="loading" :on-infinite-load="onInfiniteLoad" :parent-pull-up-state="infiniteLoadData.pullUpState" backgroudcolor="#f7f7f7">
			<div class="lucky-list">
				<block v-for="(item,index) in luckyListA" :key="index">
					<view class="lucky-item">
						<view class="top-tag">
							<view class="date">{{item.openResultTime}}</view>
							<view class="day-time">{{item.week}}</view>
						</view>
						<view class="lucky" :style='{background: backColorA[index%4].background}'>
							<view class="caty-No">
								<view class="catygory-tag">
									<view class="tag-img"></view>
									<view class="tag-title">每日22:00揭晓</view>
								</view>

								<view class="lucky-No">
									<view class="count-tag">第 {{item.welfareStage}} 期 中签号码</view>
									<luckyBallItem :numbers="item.winCode"></luckyBallItem>
								</view>

								<view class="lucky-count-all">
									<view class="title">本期中签({{item.winUserInfoModelList===null?0:item.winUserInfoModelList.length}})</view>
									<view class="show-all-tag">
										<view class="tag-text" @click="turnToLuckyDetail(item,index)">查看全部</view>
										<view class="right-row-img"></view>
									</view>
								</view>

							</view>

							<userPrizeItem v-if="item.winUserInfoModelList!==null&&item.winUserInfoModelList.length!==0" :item="item.winUserInfoModelList[0]"
							 :backColor="backColorA[index%4].userPrizeColor"></userPrizeItem>

							<view class="sep-line"></view>

							<view class="attention">
								注：本期中签号码与福彩3D第{{item.welfareStage}}期一等奖号码相同，即选 中3个红球，详情请查询“中国福利彩票开奖公告”。
							</view>

						</view>
					</view>
				</block>

			</div>
		</PullUpReload>
	</section>
</template>

<script>
	import api from "@/util/api.js"
	import luckyBallItem from '../components/luckyBallItem.vue'
	import userPrizeItem from '../components/userPrizeItem.vue'
	import PullUpReload from '../components/PullUpReload.vue'
	export default {
		components: {
			luckyBallItem,
			userPrizeItem,
			PullUpReload
		},
		data() {
			return {
				loading: true,
				luckyListA: [],
				totalCount: 0,
				pageNo: 0,
				infiniteLoadData: {
					initial: 10, // 初始显示多少条
					size: 10, // 每次加载的个数
					pageNo: 0, //页数
					pullUpState: 2, // 子组件的pullUpState状态
					pullUpList: [], // 上拉加载更多数据的数组
					showPullUpListLength: this.initial // 上拉加载后所展示的个数
				},
				backColorA: [{
						background: 'linear-gradient(to right, #60ECFF, #9890FF)',
						userPrizeColor: 'rgba(74,81,227,0.1)',
					},
					{
						background: 'linear-gradient(to right, #FDD34A, #FF5C58)',
						userPrizeColor: 'rgba(255,133,74,0.1)',
					},
					{
						background: 'linear-gradient(to right, #FFB4AE, #FF5581)',
						userPrizeColor: 'rgba(255,61,86,0.1)',
					},
					{
						background: 'linear-gradient(to right, #FFD443, #FF9144)',
						userPrizeColor: 'rgba(245,86,61,0.1)',
					},
				],
			};
		},
		methods: {
			onInfiniteLoad(done) {
				console.log('正在加载'+this.infiniteLoadData.pullUpState)
				if (this.infiniteLoadData.pullUpState === 2) {
					this.getLuckyList();
				}
				done()
			},

			async getLuckyList() {
				let params = {
					pageNo: this.pageNo,
					size: 10
				}
				this.loading=true;
				// if (this.pageNo>0) return;
				api.luckyList(params).then((res)=>{
					console.log(res);
					res.list.forEach(lucky=>{
						lucky.week = lucky.week+' '+lucky.openResultTime.substring(11,19)
						lucky.openResultTime = this.judgeTime(lucky.openResultTime);
					})
					if (res.pageNo === 0) {
						this.luckyListA = res.list;
					} else {
						this.luckyListA = this.luckyListA.concat(res.list);
					}
					this.pageNo = res.pageNo + 1;
					this.totalCount = res.totalCount;
					this.loading=false;
					if (this.luckyListA.length === this.totalCount) {
						this.infiniteLoadData.pullUpState = 3;
					} else {
						this.infiniteLoadData.pullUpState = 2;
					}
					console.log('this.infiniteLoadData.pullUpState');
				})
			},
			turnToLuckyDetail(item, index) {
				let colorParam = this.backColorA[index % 4];
				uni.navigateTo({
					url: './lucky-detail?lotteryStage=' + item.welfareStage + '&lotteryType=' + item.lotteryName + '&winCode=' +
						item.winCode + '&backColor=' + colorParam.background + '&itemColor=' + colorParam.userPrizeColor,
				})
			},
			judgeTime(date) {
				console.log(date)
				// 2019-03-14 09:11:18
				let dateStr = new Date(date)
				let today = new Date()
				let hour = today.getHours()
				let minute = today.getMinutes()
				let second = today.getSeconds()
				today.setHours(0)
				today.setMinutes(0)
				today.setSeconds(0)
				today.setMilliseconds(0)
				let otime = today.getTime()
				// 给出时间 - 今天0点
				let offset = dateStr.getTime() - otime
				let isToday = offset / 1000 / 60 / 60
				if (isToday > 0 && isToday <= 24) {
					return '今天';
				} else if (isToday < 0 && isToday >= -24) {
					return '昨天' 
				} else {
					return date.substring(5,10);
				}
			}
		},
		onLoad() {
			console.log('中签榜');
			this.getLuckyList();
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
		position: absolute;
		background-color: #f7f7f7;

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

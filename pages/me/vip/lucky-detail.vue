<template>
	<view class="main" :style='{background:backColor}'>

		<view class="header">
			<view class="ordinal-date">
				<view class="ordinal">第 {{detailParam.lotteryStage}} 期中签号码</view>
				<view class="date">2019-03-25</view>
			</view>

			<luckyBallItem :numbers="winCode"></luckyBallItem>

			<view class="numbers-count">
				<view class="item">中签人数：{{detailParam.winUserCount}}人</view>
				<view class="sep-line"></view>
				<view class="item">中签注数：{{detailParam.winCodeCount}}注</view>
			</view>
		</view>

		<view class="numbers-list" v-if="winUserA!==null&&winUserA.length!==0">
			<block v-for="(user,index) in winUserA" :key="index">
				<userPrizeItem :item="user" :backColor="itemColor"></userPrizeItem>
			</block>
		</view>
		
		<view class="empty-list" :style="{background:itemColor}" v-if="winUserA===null||winUserA.length===0">
			<view class="empty-text" style="margin-top: -50">本期没有中奖用户</view>
			<view class="empty-text">参与越多中奖几率越高</view>
			<view class="empty-text">快去参与新一期吧~</view>
		</view>

	</view>
</template>

<script>
	import api from "@/util/api.js"
	import luckyBallItem from '../components/luckyBallItem.vue'
	import userPrizeItem from '../components/userPrizeItem.vue'

	export default {
		data() {
			return {
				backColor: '',
				itemColor: '',
				winCode:'',
				detailParam: {
					lotteryStage: 0,
					winCodeCount: 0,//中签注数
					winUserCount: 0,//中签人数
				},
				winUserA: [],
			}
		},
		components: {
			luckyBallItem,
			userPrizeItem
		},
		methods: {
			async getLuckyDetail(params) {
				console.log(params);
				let res = await api.luckyDetail(params)
				this.detailParam = res;
				this.winUserA = res.winUserInfoModelList;
				console.log(res)
			},
		},
		onLoad: function(option) {
			this.backColor = option.backColor;
			this.itemColor = option.itemColor;
			this.winCode = option.winCode;
			let params = {
				lotteryStage: option.lotteryStage,
				lotteryType: 'FC3D'
			}
			// console.log(params);option.lotteryType
			this.getLuckyDetail(params);

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
			display: flex;
			flex: 1;
			flex-direction: column;
			width: 100%;
			padding-bottom: 20upx;
		}
		.empty-list {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			// width: 100%;
			// height: 100%;
			margin: 30upx 40upx;
			border-radius: 10upx;
			.empty-text {
				font-size: 28upx;
				color: #FFFFFF;
			}
		}
	}
</style>

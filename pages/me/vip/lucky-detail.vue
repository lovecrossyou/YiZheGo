<template>
	<view class="main">

		<view class="header">
			<view class="ordinal-date">
				<view class="ordinal">第 2019186 期中签号码</view>
				<view class="date">2019-03-25</view>
			</view>

			<luckyBallItem></luckyBallItem>

			<view class="numbers-count">
				<view class="item">中签人数：3人</view>
				<view class="sep-line"></view>
				<view class="item">中签注数：6注</view>
			</view>
		</view>

		<view class="numbers-list">

			<userPrizeItem></userPrizeItem>

			<userPrizeItem></userPrizeItem>




		</view>

	</view>
</template>

<script>
	import luckyBallItem from '../components/luckyBallItem.vue'
	import userPrizeItem from '../components/userPrizeItem.vue'

	export default {
		components: {
			luckyBallItem,
			userPrizeItem
		},
	}
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
			padding-bottom: 20upx;
		}
	}
</style>

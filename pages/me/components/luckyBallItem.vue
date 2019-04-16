<template>
	<view class="no-ball-all">
		<block v-for="(num,index) in numberA" :key="index">
			<view :class="{
				'no-ball-back':numberA.length>5,
				'no-ball-back-less5':numberA.length<=5,
			}">
				<view :class="{
				'no-ball':numberA.length>5,
				'no-ball-less5':numberA.length<=5,
			}">{{num}}</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			numbers: '',
		},
		computed: {
			numberA: function() {
				return this.numbers.split(',')
			}

		}
	}
</script>

<style lang="scss">
	.no-ball-all {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 78upx;

		.no-ball-back-less5 {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 122upx;
			height: 78upx;

			// padding: 0upx 15upx;
			.no-ball-less5 {
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
		.no-ball-back {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 64upx;
			height: 78upx;
		
			// padding: 0upx 15upx;
			.no-ball {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 44upx;
				height: 44upx;
				border-radius: 22upx;
				background-color: #E73746;
				font-size: 30upx;
				color: #FFFFFF;
			}
		}
	}
</style>

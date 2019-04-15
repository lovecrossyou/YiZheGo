<template>
	<view class="no-ball-all">
		<view class="no-ball">6</view>
		<view class="no-ball">7</view>
		<view class="no-ball">0</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
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
</style>

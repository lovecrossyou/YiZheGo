<template>
	<view class="main">
		<view class="title">
			<image class="icon" source="item.icon"></image>
			<view class="title-text">{{item.title}}</view>
		</view>
		<view class="content">{{item.content}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {}
		}
	}
</script>

<style scoped>
	.main {
		padding: 25upx 36upx 25upx 36upx;
	}
	.title {
		display: flex;
		align-items: center;
	}
	.icon {
		width: 46upx;
		height: 46upx;
	}
	.title-text {
		font-size: 36upx;
		font-weight: bold;
		color: #F7EACB;
	}
	.content {
		font-size: 28upx;
		color: #F7EACB;
	}
</style>

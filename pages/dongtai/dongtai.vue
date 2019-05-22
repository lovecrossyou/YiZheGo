<template>
	<view class="main">
		<view class="header">
			<view class="topbg">
			</view>
			<view class="tab">

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.main {
		width: 100%;
	}
	.header{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	.topbg {
		height: 120upx;
		border-radius: 100% 100% 100% 100% / 0% 0% 150% 150%;
		background-color: #feb1bb;
	}

	.tab {
		width: 686upx;
		height: 128upx;
		background: #fff;
		box-shadow: 0upx 5upx 18upx 0upx rgba(0, 0, 0, 0.05);
		border-radius: 8upx;
		margin: -80upx auto 0 auto;
	}
</style>

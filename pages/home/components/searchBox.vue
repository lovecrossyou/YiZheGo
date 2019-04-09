<template>
	<view class="search_wrapper">
		<view class="search_wrapper_item">
			<image :src="fenlei" alt="" />
		</view>
		<view class="search_wrapper_center">
			<view class="search_wrapper_center_input">
				<image :src="home_search" alt="" />
				<view>ËÑË÷ÉÌÆ·</view>
			</view>
		</view>
		<view class="search_wrapper_item">
			<image :src="fenxiang" alt="" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fenlei: "../../static/home/fenlei.png",
				fenxiang: "../../static/home/fenxiang.png",
				home_search: "../../static/home/home_search.png",
			}
		},
		methods: {

		}
	}
</script>


<style lang="less">
	.search_wrapper {
		width: 100%;
		height: 66upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		left:0;
		top:100upx;
		z-index: 999;
		.search_wrapper_item {
			flex:1;
			text-align: center;
			image {
				width: 38upx;
				height: 32upx;
			}
		}

		.search_wrapper_center {
			flex:8;
			.search_wrapper_center_input {
				width: 100%;
				height: 64upx;
				line-height: 64upx;
				border-radius: 10upx;
				font-size: 28upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: #FFFFFF;
				padding-left: 28upx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				background:rgba(255,255,255,1);
				opacity:0.4;
				image {
					width: 24upx;
					height: 24upx;
					margin-right: 10upx;
					box-sizing: border-box;
				}
			}
		}
	}
</style>

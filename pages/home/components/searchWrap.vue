<template>
	<view class="search_wrapper">
		<view class="search_wrapper_center">
			<view class="search_wrapper_center_input">
				<image :src="home_search" alt="" />
				<view>搜索商品</view>
			</view>
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
		position:absolute;
		left:0;
		top:10upx;
		z-index: 999;
		.search_wrapper_item {
			// flex:1;
			text-align: center;
			image {
				width: 38upx;
				height: 32upx;
			}
		}

		.search_wrapper_center {
			// flex:8;
			width:90%;
			.search_wrapper_center_input {
				width: 100%;
				height: 64upx;
				background:rgba(255,255,255,0.4);
				padding-left: 28upx;
				box-sizing: border-box;
				line-height: 64upx;
				border-radius: 10upx;
				font-size: 28upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				align-items: center;
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

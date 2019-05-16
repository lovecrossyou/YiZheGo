<template>
	<view class="search_wrapper">
		<view class="search_wrapper_center">
			<view class="search_wrapper_center_input">
				<view>搜索商品</view>
			</view>
			<button class="share-img-button" plain="true" open-type="contact" hover-class="none"></button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
		position: absolute;
		left: 0;
		top: 10upx;
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
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;

			button::after {
				border: none;
			}

			.share-img-button {
				border: none;
				background-image: url('http://qnimage.xiteng.com/home_xiaoxi_icon@2x.png');
				width: 45upx;
				height: 44upx;
				margin-right: 10upx;
				box-sizing: border-box;
				position: absolute;
				right: 20upx;
				top: 40rpx;
				background-repeat: no-repeat;
				background-size: 45upx 44upx;
			}

			.share-img-button::after {
				border: none
			}


			.search_wrapper_center_input {
				margin-left: 30upx;
				margin-top: 32upx;
				width: 80%;
				height: 64upx;
				background: rgba(255, 255, 255, 0.4);
				padding-left: 28upx;
				box-sizing: border-box;
				line-height: 64upx;
				border-radius: 10upx;
				font-size: 28upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				flex-direction: row;
				align-items: center;

				image {
					width: 24upx;
					height: 24upx;
					margin-right: 10upx;
					margin-top: 32upx;
					box-sizing: border-box;
				}


			}
		}
	}
</style>

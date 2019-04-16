<template>
	<view class="share_friend">
		<shareRedPacket></shareRedPacket>
		<view class="share_btn" @click="savePic">保存图片</view>
		<view class="pop_up_warpper" v-if="isShow">
			<view class="pop_up_box">
				<view class="tit">图片已保存到相册了</view>
				<view class="info">请到朋友圈上传图片分享</view>
				<view class="cancel_btn" @click="cancelBtn">我知道了</view>
			</view>
		</view>
	</view>
</template>

<script>
	import shareRedPacket from './shareRedPacket'
	export default {
		data() {
			return {
				isShow: false,
			}
		},
		methods: {
			savePic() {
				this.isShow = true
			},
			cancelBtn() {
				this.isShow = false
			}
		},
		components:{
			shareRedPacket
		}
	}
</script>

<style lang="less">
	.share_friend {
		width: 100%;
		height: 100%;
		padding: 30upx 40upx 100upx;
		box-sizing: border-box;
		background: #EDEDED;

		.share_btn {
			width: 100%;
			height: 88upx;
			margin-top: 50upx;
			line-height: 88upx;
			text-align: center;
			background: rgba(185, 36, 39, 1);
			border-radius: 6upx;
			font-size: 36upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}

		.pop_up_warpper {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			width: 100%;
			height: 100%;
			background: rgba(18, 18, 18, 0.6);

			.pop_up_box {
				width: 579upx;
				height: 327upx;
				background: rgba(255, 255, 255, 1);
				border-radius: 10upx;
				margin: 500upx auto;
				text-align: center;

				.tit {
					font-size: 32upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(24, 23, 23, 1);
					padding-top: 60upx;
					margin-bottom: 30upx;
				}

				.info {
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(153, 153, 153, 1);
				}

				.cancel_btn {
					width: 100%;
					height: 102upx;
					border-top: 1px solid #E1E1E4;
					line-height: 102upx;
					font-size: 32upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(235, 3, 3, 1);
					margin-top: 60upx;
				}
			}
		}

	}
</style>

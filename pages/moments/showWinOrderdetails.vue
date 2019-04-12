<template>
	<view class="momentdetailwrapper">
		<view class="user">
			<image class="user_icon" :src="showWinOrderCommentModel.userIconUrl"></image>
			<view class="user_icon_right">
				<view class="user_wrapper">
					<view class="user_name">{{showWinOrderCommentModel.userName}}</view>
					<image class="user_sex" v-if="showWinOrderCommentModel.userSex==='男'" src="/static/moments/icon_man.png"></image>
					<image class="user_sex" v-else src="/static/moments/icon_woman.png"></image>
				</view>
				<view class="time">{{showWinOrderCommentModel.createTime}}</view>
			</view>
		</view>
		<view class="moment_text">{{showWinOrderCommentModel.commentContent}}</view>
		<view class="moment_image_wrapper" v-if="showWinOrderCommentModel.imageOrVideoUrl.length!==0">
			<image class="moment_image_big" :src="showWinOrderCommentModel.imageOrVideoUrl[0]"></image>
			<view class="moment_image_small_list" v-if="showWinOrderCommentModel.imageOrVideoUrl.length>1">
				<block v-for="(item,index) in image_small_list" :key="index">
					<image class="moment_image_small" :src="item"></image>
				</block>
			</view>
		</view>
		<view class="product" v-if="showWinOrderCommentModel.discountGameStage">
			<image class="product_icon" :src="showWinOrderCommentModel.productImageUrl"></image>
			<view class="product_icon_right">
				<view class="product_name">{{showWinOrderCommentModel.productName}}</view>
				<view class="gameStage">期数: {{showWinOrderCommentModel.discountGameStage}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "@/util/api.js"
	export default {
		data() {
			return {
				commentShowWinOrderModelList: {},
				praiseDetailModelList: [],
				showWinOrderCommentModel: {
					imageOrVideoUrl: []
				}
			}
		},
		computed: {
			image_small_list() {
				return this.showWinOrderCommentModel.imageOrVideoUrl.slice(1)
			}
		},
		async onLoad(options) {
			const res = await api.showWinOrderDetail({
				showOrderCommentId: 96
			});
			this.commentShowWinOrderModelList = res.commentShowWinOrderModelList;
			this.praiseDetailModelList = res.praiseDetailModelList;
			this.showWinOrderCommentModel = res.showWinOrderCommentModel;
		}
	}
</script>

<style lang="less">
	.momentdetailwrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-top: solid 1upx rgba(234, 234, 234, 1);

		.user {
			width: 100%;
			height: 99upx;
			display: flex;
			flex-direction: row;

			.user_icon {
				width: 70upx;
				height: 70upx;
				margin-left: 31upx;
				margin-top: 29upx;
				float: left;
			}

			.user_icon_right {
				margin-left: 18upx;
				margin-top: 31upx;

				.user_wrapper {
					display: flex;
					flex-direction: row;

					.user_name {
						font-size: 30upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}

					.user_sex {
						width: 27upx;
						height: 27upx;
						margin-left: 9upx;
						margin-top: 8upx;
					}
				}

				.time {
					font-size: 24upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					line-height: 40upx;
					margin-bottom: 3upx;
				}
			}

		}

		.moment_text {
			font-size: 28upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 36upx;
			padding: 31upx 31upx 18upx 31upx;
			box-sizing: border-box;
		}

		.moment_image_wrapper {
			width: 100%;
			padding: 19upx 30upx 0upx 30upx;
			box-sizing: border-box;

			.moment_image_big {
				width: 100%;
				height: 400upx;
			}

			.moment_image_small_list {
				width: 100%;
				height: 177upx;
				white-space: nowrap;
				background: white;
				padding: 14upx 30upx 36upx 30upx;
				box-sizing: border-box;

				.moment_image_small {
					display: inline-block;
					width: 127upx;
					height: 127upx;
					margin-right: 15upx;
				}
			}

		}

		.product {
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 124upx;
			padding: 22upx 30upx;
			box-sizing: border-box;

			.product_icon {
				width: 80upx;
				height: 80upx;
			}

			.product_icon_right {
				display: flex;
				flex: 1;
				flex-direction: column;
				width: 100%;

				.product_name {
					overflow: hidden;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					font-size: 26upx;
					font-family: PingFangSC-Medium;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					padding: 9upx 18upx 0upx 18upx;
					box-sizing: border-box;
				}

				.gameStage {
					font-size: 24upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					padding: 15upx 18upx 8upx 18upx;
					box-sizing: border-box;
				}
			}
		}
	}
</style>

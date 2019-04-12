<template>
	<view class="momentdetailwrapper">
		<view class="user">
			<image class="user_icon" :src="momentitem.userIconUrl"></image>
			<view class="user_icon_right">
				<view class="user_wrapper">
					<view class="user_name">{{momentitem.userName}}</view>
					<image class="user_sex" v-if="momentitem.userSex==='男'" src="/static/moments/icon_man.png"></image>
					<image class="user_sex" v-else src="/static/moments/icon_woman.png"></image>
				</view>
				<view class="time">{{momentitem.createTime}}</view>
			</view>
		</view>
		<view class="moment_text">{{momentitem.commentContent}}</view>
		<view class="moment_image_wrapper" v-if="momentitem.imageOrVideoUrl.length!==0">
			<image class="moment_image_big" :src="momentitem.imageOrVideoUrl[0]"></image>
			<view class="moment_image_small_list">
				<block v-for="(item,index) in momentitem.imageOrVideoUrl" :key="index">
					<image class="moment_image_small" src="item"></image>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "@/util/api.js"
	export default{
		data(){
			return{
				list:[]
			}
		},
		async onLoad() {
			const res = await api.showWinOrderDetail({});
			discussCommentId:0;
			this.list = res;
		}
	}
</script>

<style lang="less">
	.momentdetailwrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: rgba(255, 255, 255, 1);

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
			margin: 31upx 32upx 18upx 32upx;
			box-sizing: border-box;
		}

		.moment_image_wrapper {
			width: 100%;
			height: 400upx;

			.moment_image_big {
				width: 630upx;
				height: 100%;
				margin-left: 30upx;
				position: absolute;

			}

			.moment_image_small {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				width: 66upx;
				height: 33upx;
				background: rgba(0, 0, 0, 1);
				opacity: 0.3;
				border-radius: 10px;
				margin-top: 349upx;
				margin-left: 544upx;
				position: absolute;

			}

		}
	}
</style>

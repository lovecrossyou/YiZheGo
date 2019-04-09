<template>
	<view class="momentwrapper">
		<view class="user">
			<image class="user_icon" src="/static/moments/user_icon.jpg"></image>
			<view class="user_icon_right">
				<view class="user_wrapper">
					<view class="user_name">{{momentitem.userName}}</view>
					<image class="user_sex" src="/static/moments/icon_man.png"></image>
				</view>
				<view class="time">2018-05-10 14:16</view>
			</view>
		</view>
		<view class="moment_text">中签了，太棒了，手气相当不错，平台有保障，没问题，看图说话。</view>
		<view class="moment_image_wrapper">
			<image class="moment_image" src="/static/moments/banner_1.png"></image>
			<view class="moment_image_num_wrapper">
				<image class="moment_num_icon" src="/static/moments/shaidan_icon_tupian.png"></image>
				<view class="moment_image_num">5</view>
			</view>
		</view>
		<view class="moment_data">
			<view class="gamestage">期数: 201607260002</view>
			<view class="moment_num">
				<view class="praise">
					<image class="praise_img" src="/static/moments/icon_illume.png"></image>
					<view class="praise_num">999</view>
				</view>
				<view class="comment">
					<image class="comment_img" src="/static/moments/icon_comment.png"></image>
					<view class="comment_num">99</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			momentitem:{}
		}
	}
</script>

<style lang="less">
	.momentwrapper {
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
			margin: 31upx 46upx 18upx 32upx;
			box-sizing: border-box;
		}

		.moment_image_wrapper {
			width: 100%;
			position: relative;

			.moment_image {
				width: 630upx;
				height: 400upx;
				margin-left: 30upx;
				position: absolute;

			}

			.moment_image_num_wrapper {
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

				.moment_num_icon {
					width: 18upx;
					height: 16upx;
				}

				.moment_image_num {
					font-size: 22upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					margin-left: 5upx;
				}
			}

		}

		.moment_data {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
			margin-top: 459upx;

			.gamestage {
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				margin-left: 37upx;

			}
			
			.moment_num{
				display: flex;
				flex-direction: row;
				margin-right: 31upx;
				
				.praise {
					display: flex;
					flex-direction: row;
					height: 26upx;
				
					.praise_img {
						width: 29upx;
						height: 26upx;
					}
				
					.praise_num {
						font-size: 24upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						margin-left: 10upx;
						margin-top: -5upx;
					}
				}
				
				.comment {
					display: flex;
					flex-direction: row;
					margin-left: 36upx;
				
					.comment_img {
						width: 28upx;
						height: 28upx;
					}
				
					.comment_num {
						font-size: 24upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						margin-left: 10upx;
						margin-top: -5upx;
					}
				}
			}
		}
	}
</style>

<template>
	<view class="praisedetailWrapper">
		<block v-for="(item,index) in praiseDetailModelList" :key="index">
			<view class="user">
					<image class="user_icon" :src="item.userIconUrl"></image>
					<view class="user_icon_right">
						<view class="user_wrapper">
							<view class="user_name">{{item.userName}}</view>
							<image class="user_sex" v-if="item.userSex==='男'" src="/static/moments/icon_man.png"></image>
							<image class="user_sex" v-else src="/static/moments/icon_woman.png"></image>
						</view>
					</view>
			</view>
		</block>
	</view>
</template>

<script>
	import api from "@/util/api.js"
	export default {
		data() {
			return {
				praiseDetailModelList: []
			}
		},
		async onLoad(options) {
			const res = await api.showWinOrderDetail({
				showOrderCommentId: options.id
			});
			this.praiseDetailModelList = res.praiseDetailModelList;
		},
	}
</script>

<style lang="less">
	.praisedetailWrapper {
		width: 100%;

		.user {
			width: 100%;
			height: 120upx;
			display: flex;
			flex-direction: row;
			align-items: center;

			.user_icon {
				width: 70upx;
				height: 70upx;
				margin-left: 29upx;
			}

			.user_icon_right {
				display: flex;
				flex-direction: row;
				height: 120upx;
				flex: 1;
				margin-left: 18upx;
				border-bottom:solid 1upx rgba(234, 234, 234, 1);

				.user_wrapper {
					display: flex;
					flex-direction: row;
					align-items: center;

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
					}
				}
			}

		}
	}
</style>

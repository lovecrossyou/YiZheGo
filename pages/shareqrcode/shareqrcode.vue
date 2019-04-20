<template>
	<view>
		<image class="qrcode-image" :src="imageUrl" mode="widthFix"></image>
		<button class="save" type="primary" @click="downloadAndSaveImage">保存</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';

	export default {
		computed: {
			...mapState(['userInfo']),
			...mapGetters(['h5Page']),
			url() {
				return this.h5Page('buyDetail/page?')
			}
		},
		onLoad() {
			const inviteId = this.userInfo.userId;
			const userName = this.userInfo.userName || this.userInfo.cnName;
			const icon = this.userInfo.icon;
			const qrCodeTips = '亲，送你2个红包，一起来玩1折抢购吧!从0~9选3个号码,选中立享1折。全场1折、正品保证、公开透明!'
			const imageUrl = 'https://www.xiteng.com/xitenggamenode/createShareImg?inviteId=' + inviteId + '&userName=' +
				userName + '&logo=' + icon + '&des=' + qrCodeTips;
			this.imageUrl = imageUrl;
		},
		data() {
			return {
				imageUrl: ''
			}
		},
		methods: {
			downloadAndSaveImage() {
				uni.showLoading({
					mask: true
				});
				uni.downloadFile({
					url: this.imageUrl,
					success: (res) => {
						if (res.statusCode === 200) {
							const tempFilePath = res.tempFilePath;
							uni.saveImageToPhotosAlbum({
								filePath: tempFilePath,
								success: function(res) {
									uni.showToast({
										title: '保存成功',
										mask: false,
										duration: 1500
									});
								}
							});
						}
						uni.hideLoading();
					},
					fail: () => {
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style>
	.qrcode-image {
		width: 100%;
	}

	.save {
		width: 90%;
		height: 88upx;
		line-height: 88upx;
		text-align: center;
		background: #B92427 !important;
		border-radius: 6upx;
		font-size: 36upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
</style>

<template>
	<view class="personal_wrapper">
		<view class="header_img_wrapper">
			<view class="header_img_text">头像</view>
			<view class="right_header_img" @click="changeIcon">
				<image :src="personalInfoList.userInfo.icon" class="header_img"></image>
				<image src="http://qnimage.xiteng.com/next_go_icon.png" alt="" class="next_icon"></image>
			</view>
		</view>
		<selectItemList title="名字" :leftText="personalInfoList.userInfo.cnName"></selectItemList>
		<view class="xt_num_area">
			<view class="header_img_text">喜腾号</view>
			<view class="num_text">{{personalInfoList.userInfo.xtNumber}}</view>
		</view>
		<view class="wx_code_wrapper">
			<view class="header_img_text">我的二维码</view>
			<view class="right_header_img">
				<image src="../../static/me/wx_code.png" class="xw_code_icon"></image>
				<image src="http://qnimage.xiteng.com/next_go_icon.png" alt="" class="next_icon"></image>
			</view>
		</view>
		<view class="bottom_item_list">
			<selectItemList title="性别" :leftText="personalInfoList.userInfo.sex==1?'男':'女'"></selectItemList>
			<selectItemList title="星座" :leftText="personalInfoList.userInfo.constellation"></selectItemList>
			<selectItemList page="/pages/me/address/address" title="送货地址"></selectItemList>
		</view>
	</view>
</template>

<script>
	import api from '../../util/api.js';
	import selectItemList from './components/selectItemList.vue';
	export default {
		data() {
			return {
				personalInfoList: {}
			};
		},
		components: {
			selectItemList
		},
		computed: {},
		methods: {
			changeIcon() {
				// 
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						const imagePath = res.tempFilePaths[0];
						api.uploader(imagePath, res => {
							console.log(JSON.stringify(res));
						})
					}
				});
			},
			async personalInfo() {
				let res = await api.userInfo({});
				this.personalInfoList = res;
				console.log(this.personalInfoList);
			}
		},
		onLoad() {
			this.personalInfo();
		}
	};
</script>

<style scoped>
	.personal_wrapper {
		width: 100%;
		background-color: #f5f5f5;
	}

	.header_img_wrapper {
		width: 100%;
		height: 140upx;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-top: solid 1upx rgba(229, 229, 229, 1);
		border-bottom: solid 1upx rgba(229, 229, 229, 1);
		padding: 26upx;
		box-sizing: border-box;
		margin-top: 30upx;
	}

	.header_img_text {
		color: #333;
		font-size: 30upx;
	}

	.right_header_img {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.header_img {
		width: 100upx;
		height: 100upx;
		border-radius: 5upx;
		margin-right: 22upx;
	}

	.next_icon {
		width: 20upx;
		height: 34upx;
	}

	.xt_num_area {
		width: 100%;
		height: 100upx;
		background-color: #fff;
		padding: 0 26upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.num_text {
		color: #999;
		font-size: 24upx;
	}

	.wx_code_wrapper {
		width: 100%;
		height: 100upx;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-top: solid 1upx rgba(229, 229, 229, 1);
		border-bottom: solid 1upx rgba(229, 229, 229, 1);
		padding: 26upx;
		box-sizing: border-box;
	}

	.xw_code_icon {
		width: 33upx;
		height: 33upx;
		margin-right: 11upx;
	}

	.bottom_item_list {
		margin-top: 27upx;
		border-top: solid 1upx rgba(229, 229, 229, 1);
	}
</style>

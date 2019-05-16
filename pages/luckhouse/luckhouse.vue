<template>
	<view class="wrapper">
		<!-- 美梦成真 -->
		<view class="dream_header">
			<view class="dream_bg">
				<view class="top_img"><image src="http://qnimage.xiteng.com/dream_banner@2x.png" mode=""></image></view>
				<view class="dream_true_area">
					<view class="left_img"><image src="http://qnimage.xiteng.com/dream_chengzhen%20@2x.png" mode=""></image></view>
					<view class="dream_true_right_area">
						<view class="dream_true_top_text">美梦成真</view>
						<view class="dream_true_botm_text">星星是穷人的钻石，幸福是很简单的事，永远相信美好的事情即将发生</view>
						<view class="go_dream_true">
							<view class="go_dream_true_text">近期有四个幸运儿实现梦想</view>
							<image src="http://qnimage.xiteng.com/dream_qianwang@2x.png" mode="" style="width: 36upx;height: 36upx;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 我有一个梦想 -->
		<view class="dream_content">
			<view class="title_text">
				<view class="balck_text">我有一个梦想</view>
				<view class="gray_text">梦想还是要有的，万一实现了呢</view>
			</view>
			<block v-for="(item, index) in publishList" :key="index">
				<view class="dream_content_details">
					<view class="user_info">
						<image :src="item.img" class="user_img" mode=""></image>
						<view class="user_name">{{ item.name }}</view>
					</view>
					<view class="publish_time">{{ item.publishTime }}个小时之前</view>
				</view>
				<image src="http://qnimage.xiteng.com/dream_pic@2x.png" class="publish_img" mode="aspectFit"></image>
				<view class="publish_content">希望有一个P30手机，记录生活的点点滴滴，希望平台早日用户过万</view>
				<!-- 点赞 & 转发 & 评论 -->
				<view class="operation_list">
					<view class="bottom_operation" @click="givePraise(index)">
						<view class="operation_icon">
							<image v-if="item.isPraise" src="http://qnimage.xiteng.com/dream_xin_dianji@2x.png"></image>
							<image v-else src="http://qnimage.xiteng.com/dream_xin@2x.png" mode=""></image>
						</view>
						<view class="operation_num">1.5W</view>
					</view>
					<view class="bottom_operation">
						<view class="operation_icon"><image src="http://qnimage.xiteng.com/Teafight_icon_share@2x.png"></image></view>
						<view class="operation_num">1.5W</view>
					</view>
					<view class="bottom_operation">
						<view class="operation_icon"><image src="http://qnimage.xiteng.com/Teafight_icon_comment@2x.png"></image></view>
						<view class="operation_num">1520</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 发布 -->
		<image @click="gocreatdiscuss" src="http://qnimage.xiteng.com/dream_jia@2x.png" mode="" class="publish_content_area"></image>

		<view class="top_notice">
			<image src="http://img0.imgtn.bdimg.com/it/u=785035511,1243398691&fm=26&gp=0.jpg" class="header_img"></image>
			<view class="notice_content">
				<view>王明浩小朋友实现</view>
				<view>获得一个山地车的梦想</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			publishList: [
				{
					isPraise: false,
					name: '张韶涵',
					publishTime: 9,
					img: 'http://img4.imgtn.bdimg.com/it/u=1671816861,451680427&fm=26&gp=0.jpg'
				},
				{
					isPraise: false,
					name: '朱理哲',
					publishTime: 1,
					img: 'http://img2.imgtn.bdimg.com/it/u=350479878,4015742982&fm=26&gp=0.jpg'
				}
			]
		};
	},
	methods: {
		givePraise(index) {
			this.publishList[index].isPraise = !this.publishList[index].isPraise;
		},
		gocreatdiscuss() {
			uni.showActionSheet({
				itemList: ['拍摄', '从手机相册选择', '直接发布'],
				success: function(res) {
					// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					if(res.tapIndex == 2){
						uni.navigateTo({
							url: '/pages/moments/creatdiscuss'
						});
					}
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			});
		}
	}
};
</script>

<style>
.wrapper {
	width: 100%;
	position: relative;
}
.dream_header {
	width: 100%;
	height: 600upx;
	border-bottom: 20upx solid #f9f9f9;
}
.dream_bg {
	height: 470upx;
	width: 100%;
	padding: 0 33upx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	background: url('http://qnimage.xiteng.com/dearm_top_bk@2x.png') no-repeat center center;
	background-size: 100%;
}
.top_img image {
	width: 684upx;
	height: 198upx;
	margin-top: 67upx;
}
.dream_true_area {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 40upx;
}
.left_img image {
	width: 264upx;
	height: 248upx;
}
.dream_true_right_area {
	display: flex;
	flex-direction: column;
	margin-left: 25upx;
	flex: 1;
}
.dream_true_top_text {
	color: #1d1e1e;
	font-size: 36upx;
	font-weight: bold;
	margin-top: 10upx;
}
.dream_true_botm_text {
	color: #999899;
	font-size: 22upx;
	margin-top: 18upx;
	line-height: 35upx;
}
.go_dream_true {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 60upx;
}
.go_dream_true_text {
	color: #1d1e1e;
	font-size: 24upx;
	font-weight: bold;
	margin-right: 70upx;
}
.dream_content {
	width: 100%;
	padding: 50upx 33upx;
	box-sizing: border-box;
}
.title_text {
	width: 100%;
	display: flex;
	flex-direction: row;
}
.balck_text {
	color: #1d1e1e;
	font-size: 36upx;
	font-weight: bold;
}
.gray_text {
	color: #999899;
	font-size: 24upx;
	margin: 15upx 0 0 5upx;
}
.dream_content_details {
	width: 100%;
	height: 53upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 50upx;
}
.user_info {
	display: flex;
	flex-direction: row;
	align-items: center;
	font-weight: bold;
}
.user_img {
	width: 53upx;
	height: 53upx;
	border-radius: 50%;
}
.user_name {
	color: #1f1f1f;
	font-size: 26upx;
	margin-left: 19upx;
}
.publish_time {
	color: #999999;
	font-size: 20upx;
}
.publish_img {
	width: 684upx;
	height: 339upx;
	border-radius: 15upx;
	margin-top: 23upx;
}
.publish_content {
	color: #1f1f1f;
	font-size: 28upx;
	margin-top: 20upx;
	font-weight: bold;
	line-height: 35upx;
}
.operation_list {
	width: 50%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 10upx;
}
.bottom_operation {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.operation_num {
	font-size: 24upx;
	color: #666;
	margin-left: 10upx;
}
.operation_icon image {
	width: 29upx;
	height: 24upx;
}
.publish_content_area {
	width: 106upx;
	height: 106upx;
	position: fixed;
	right: 38upx;
	bottom: 235upx;
}
.top_notice {
	width: 300upx;
	height: 72upx;
	background: rgba(19, 29, 59, 0.3);
	border-radius: 35upx;
	position: fixed;
	top: 50upx;
	left: 20upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10upx;
	box-sizing: border-box;
}
.header_img {
	width: 50upx;
	height: 50upx;
	border: 1upx solid #fff;
	border-radius: 50%;
}
.notice_content {
	color: #fff;
	font-size: 20upx;
	flex: 1;
	margin-left: 10upx;
	display: flex;
	flex-direction: column;
}
</style>

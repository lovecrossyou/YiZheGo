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
			<block v-for="(publish, index) in publishList" :key="index">
				<view class="dream_content_details">
					<view class="user_info">
						<image src="http://img4.imgtn.bdimg.com/it/u=3693921363,2905296887&fm=26&gp=0.jpg" class="user_img" mode=""></image>
						<view class="user_name">张韶涵</view>
					</view>
					<view class="publish_time">9个小时之前</view>
				</view>
				<image src="http://qnimage.xiteng.com/dream_pic@2x.png" class="publish_img" mode="aspectFit"></image>
				<view class="publish_content">希望有一个P30手机，记录生活的点点滴滴，希望平台早日用户过万</view>
				<!-- 点赞 & 转发 & 评论 -->
				<view class="operation_list">
					<view class="bottom_operation">
						<view class="operation_icon" @click="givePraise(index)">
							<image v-if="isPraise" src="http://qnimage.xiteng.com/dream_xin_dianji@2x.png"></image>
							<image  v-else src="http://qnimage.xiteng.com/dream_xin@2x.png" mode=""></image>
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
	</view>
</template>

<script>
export default {
	data() {
		return {
			publishList: [1, 2],
			isPraise:false,
		};
	},
	methods: {
		givePraise(index){
			this.isPraise = !this.isPraise
		}
	}
};
</script>

<style>
.wrapper {
	width: 100%;
}
.dream_header {
	width: 100%;
	height: 600upx;
	border-bottom: 20upx solid #f9f9f9;
}
.dream_bg {
	/* background: linear-gradient(#FCCBDB, 50%, #FEFCFC); */
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
</style>

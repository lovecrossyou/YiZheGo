<template>
	<view class="wrapper">
		<view class="top_bg">
			<view class="person_info">
				<image src="http://img4.imgtn.bdimg.com/it/u=3751776317,2926402611&fm=26&gp=0.jpg" mode="" class="user_img"></image>
				<view class="right_details">
					<view class="top_info">
						<view class="user_name">橄榄枝</view>
						<image src="http://qnimage.xiteng.com/zhongxin_vip@2x.png" class="vip_img"></image>
					</view>
					<view class="luck_num">幸福号：3413541564165</view>
				</view>
			</view>
			<!-- 关注 & 积分 & 动态 -->
			<view class="">
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style scoped>
.wrapper {
	width: 100%;
}
.top_bg {
	width: 749upx;
	height: 341upx;
	background: url('http://qnimage.xiteng.com/zhongxin_top_bk@2x.png') no-repeat center center;
	background-size: 100%;
}
.person_info {
	width: 100%;
	padding: 40upx 33upx;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	display: inline-block;
}
.user_img {
	width: 130upx;
	height: 130upx;
	border-radius: 50%;
	border: 5upx solid #fff;
}
.right_details {
	flex: 1;
	flex-direction: column;
	margin-left: 30upx;
}
.top_info {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 20upx;
}
.vip_img {
	width: 68upx;
	height: 32upx;
}
.user_name {
	font-size: 36upx;
	font-weight: bold;
	color: rgba(255, 255, 255, 1);
	margin-right: 10upx;
}
.luck_num{
	color: #fff;
	font-size: 26upx;
	margin-top: 20upx;
}
</style>

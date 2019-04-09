<template>
	<view class="user_wrapper">
		<view class="user_info">
			<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2330852463,1127692662&fm=27&gp=0.jpg" class="header_img"></image>
			<view class="user_content">
				<view class="user_name">你的名字</view>
				<view class="xt_num">喜腾号：20165874</view>
			</view>
			<image src="http://qnimage.xiteng.com/right_icon@2x.png" alt="" class="next_icon"></image>
		</view>
		<view class="order_area_wrapper"><view class="all_order"></view></view>
		<view><itemList img="../../static/me/me_icon%20_invite@2x.png" title="订单" all="全部"></itemList></view>
	</view>
</template>

<script>
import itemList from './components/itemList.vue';

export default {
	data() {
		return {};
	},

	methods: {
		
	}
};
</script>

<style scoped>
.user_wrapper {
	width: 100%;
	background-color: #f3f3f3;
}
.user_info {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-top: 1upx solid #ddd;
	border-bottom: 1upx solid #ddd;
	padding: 20upx;
	box-sizing: border-box;
	background-color: #fff;
}
.header_img {
	width: 120upx;
	height: 120upx;
}
.user_content {
	flex: 1;
	display: flex;
	flex-direction: column;
	margin-left: 25upx;
	justify-content: space-around;
}
.user_name {
	color: #333;
	font-size: 30upx;
}
.xt_num {
	color: #777777;
	font-size: 24upx;
	margin-top: 13upx;
}
.next_icon {
	width: 17upx;
	height: 30upx;
	margin-right: 13upx;
}
.aa {
	width: 100%;
	height: 300upx;
	background-color: #fff;
	margin-top: 40upx;
}
.order_area_wrapper {
	width: 100%;
	margin-top: 20upx;
}
</style>

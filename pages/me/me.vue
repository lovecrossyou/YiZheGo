<template>
	<view class="user_wrapper">
		<view class="user_info" @click="goPersonalData">
			<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2330852463,1127692662&fm=27&gp=0.jpg" class="header_img"></image>
			<view class="user_content">
				<view class="user_vip">
					<view class="user_name">你的名字</view>
					<image src="../../static/me/vip.png" mode="" class="vip_icon"></image>
				</view>
				<view class="xt_num">喜腾号：20165874</view>
			</view>
			<image src="http://qnimage.xiteng.com/next_go_icon.png" alt="" class="next_icon"></image>
		</view>
		<!-- 订单 -->
		<view class="order_area_wrapper">
			<itemList img="../../static/me/me_icon%20_invite@2x.png" title="订单" all="全部"></itemList>
			<view class="order_status">
				<orderStatus img="../../static/me/me_order_btn_obligation@2x.png" statusText="待付款"></orderStatus>
				<orderStatus img="../../static/me/me_order_btn_announce_tobe@2x.png" statusText="待揭晓"></orderStatus>
				<orderStatus img="../../static/me/me_order_btn_announce_hasbeen@2x.png" statusText="已揭晓"></orderStatus>
				<orderStatus img="../../static/me/me_order_btn_refund@2x.png" statusText="3D退款"></orderStatus>
			</view>
		</view>
		<view class="other_unctions">
			<itemList img="../../static/me/me_icon_wallet@2x.png" title="钱包"></itemList>
		</view>
		<view class="other_unctions">
			<itemList img="../../static/me/me_icon_collect@2x.png" title="我的关注"></itemList>
			<itemList img="../../static/me/me_icon_dynamic@2x.png" title="我的动态"></itemList>
		</view>
		<view class="other_unctions">
			<itemList img="../../static/me/yaoqing.png" title="邀请好友"></itemList>
			<itemList img="../../static/me/me_icon_vip@2x.png" title="会员中心"></itemList>
		</view>
		<view class="other_unctions end_item">
			<itemList img="../../static/me/me_icon_currency@2x.png" title="通用"></itemList>
		</view>
		<view @click="turnToVip">
			会员中心
		</view>
	</view>
</template>

<script>
<<<<<<< HEAD
	export default {
		data() {
			return {
				
			};
		},
		
		methods:{
			enter(){
				uni.navigateTo({
					url:'../chooseCode/chooseCode'
				})
			},
			turnToVip(){
				uni.navigateTo({
					url:'./vip/vip-center'
				})
			}
=======
import itemList from './components/itemList.vue';
import orderStatus from './components/orderStatus.vue';

export default {
	data() {
		return {};
	},
	components: {
		itemList,
		orderStatus
	},
	methods:{
		goPersonalData(){
			uni.navigateTo({
				url:"./personalData"
			})
>>>>>>> 1fca3daf0f9518b11c053567a5da84e082e649b1
		}
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
.order_status{
	width: 100%;
	background-color: #fff;
	padding: 30upx 0;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-top: 1upx solid #DEDEDE;

}
.other_unctions{
	margin-top: 20upx;
}
.user_vip{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.vip_icon{
	width: 30upx;
	height: 35upx;
	margin:5upx 0 0 10upx;
}
</style>

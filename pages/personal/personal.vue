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
			<view class="bottom_cont">
				<view class="item_cont">
					<view class="item_cont_num">12</view>
					<view class="item_cont_text">关注的商品</view>
				</view>
				<view class="item_cont">
					<view class="item_cont_num">2688</view>
					<view class="item_cont_text">我的积分</view>
				</view>
				<view class="item_cont">
					<view class="item_cont_num">5</view>

					<view class="item_cont_text">我的动态</view>
				</view>
			</view>
			<!-- 全部订单 -->
			<view class="order_area_wrapper">
				<itemList title="我的订单" all="查看全部"></itemList>
			</view>
			<!-- 订单状态 -->
			<view class="order_status_wrapper">
				<orderStatus imgSrc="http://qnimage.xiteng.com/zhongxin_dingdanicon_1@2x.png" statusText="待付款" imgWidth="22px" imgHeight="20px"></orderStatus>
				<orderStatus imgSrc="http://qnimage.xiteng.com/zhongxin_dingdanicon_2@2x.png" statusText="待揭晓" imgWidth="22px" imgHeight="19px"></orderStatus>
				<orderStatus imgSrc="http://qnimage.xiteng.com/zhongxin_dingdanicon_3@2x.png" statusText="已揭晓" imgWidth="23px" imgHeight="21px"></orderStatus>
				<orderStatus imgSrc="http://qnimage.xiteng.com/zhongxin_dingdanicon_4@2x.png" statusText="中签/退款" imgWidth="23px" imgHeight="20px"></orderStatus>
				<orderStatus imgSrc="http://qnimage.xiteng.com/zhongxin_dingdanicon_5@2x.png" statusText="收礼/物流" imgWidth="25px" imgHeight="20px"></orderStatus>
			</view>
			<!-- 我的应用 -->
			<view class="my_software_wrapper">
				<view class="my_software_text">我的应用</view>
				<view class="software_wrapper">
					<view class="top_item">
						<orderStatus imgSrc="http://qnimage.xiteng.com/zhongxin_qianbao@2x.png" statusText="钱包" imgWidth="31.5px" imgHeight="22.5px"></orderStatus>
						<orderStatus imgSrc="http://qnimage.xiteng.com/zhongxin_huiyuan@2x.png" statusText="会员中心" imgWidth="30px" imgHeight="26px"></orderStatus>
						<orderStatus imgSrc="http://qnimage.xiteng.com/zhongxin_touzhu@2x.png" statusText="运势与投注" imgWidth="31px" imgHeight="27.5px"></orderStatus>
					</view>
					<view class="bottom_item">
						<orderStatus imgSrc="http://qnimage.xiteng.com/zhongxin_fenxiang@2x.png" statusText="分享有奖励" imgWidth="23px" imgHeight="27.5px"></orderStatus>
						<orderStatus imgSrc="http://qnimage.xiteng.com/zhongxin_shezhi@2x.png" statusText="设置" imgWidth="30px" imgHeight="26.5px"></orderStatus>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import itemList from '@/components/personal/itemList.vue';
import orderStatus from '@/components/personal/orderStatus.vue';
export default {
	data() {
		return {};
	},
	components: {
		itemList,
		orderStatus
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
.luck_num {
	color: #fff;
	font-size: 26upx;
	margin-top: 20upx;
}
.bottom_cont {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding: 0 30upx;
	box-sizing: border-box;
}
.item_cont {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.item_cont_num {
	color: #ffffff;
	font-size: 36upx;
}
.item_cont_text {
	color: #ffffff;
	font-size: 26upx;
	margin-top: 5upx;
}
.order_area_wrapper {
	margin-top: 50upx;
}
.order_status_wrapper {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	padding: 0 20upx;
	box-sizing: border-box;
	margin-top: 40upx;
}
.my_software_wrapper {
	width: 100%;
	padding: 0 33upx;
	box-sizing: border-box;
	margin-top: 50upx;
}
.my_software_text {
	color: #1f1f1f;
	font-size: 32upx;
	font-weight: bold;
}
.software_wrapper {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.top_item {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin-top: 50upx;
}
.bottom_item{
	width: 66%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin-top: 50upx;

}
</style>

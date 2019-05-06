<template>
	<view class="user_wrapper">
		<view v-if="personalInfoList" class="user_info" @click="goPersonalData">
			<image :src="personalInfoList.userInfo.icon" mode="aspectFill" class="header_img"></image>
			<view class="user_content">
				<view class="user_vip">
					<view class="user_name">{{ personalInfoList.userInfo.cnName }}</view>
					<image src="../../static/me/vip.png" v-if="vipIdentity" class="vip_icon"></image>
				</view>
				<view class="xt_num">喜腾号：{{ personalInfoList.userInfo.xtNumber }}</view>
			</view>
			<image src="http://qnimage.xiteng.com/next_go_icon.png" alt="" class="next_icon"></image>
		</view>
		<!-- 订单 -->
		<view class="order_area_wrapper">
			<itemList img="../../static/me/me_icon_invite@2x.png" title="订单" all="全部" page="./myOrder/myOrder?pageNo=0"></itemList>
			<view class="order_status_wrapper">
				<view class="order_status">
					<orderStatus img="../../static/me/me_order_btn_obligation@2x.png" statusText="待付款" pageNo="1"></orderStatus>
					<orderStatus img="../../static/me/me_order_btn_announce_tobe@2x.png" statusText="待揭晓" pageNo="2"></orderStatus>
					<orderStatus img="../../static/me/me_order_btn_announce_hasbeen@2x.png" statusText="已揭晓" pageNo="3"></orderStatus>
				</view>
				<view class="right_item">
					<orderStatus img="../../static/me/me_order_btn_refund@2x.png" statusText="中签/退款" pageNo="4"></orderStatus>
				</view>
			</view>
		</view>
		<view class="other_unctions">
			<itemList page="/pages/me/wallet/wallet" img="../../static/me/me_icon_wallet@2x.png" title="钱包"></itemList>
		</view>
		<view class="other_unctions">
			<itemList img="../../static/me/me_icon_collect@2x.png" title="我的关注" page="/pages/me/attention/attentionList"></itemList>
			<view class="border_line"></view>
			<view @click="goMoments">
				<itemList img="../../static/me/me_icon_dynamic@2x.png" title="我的动态"></itemList>
			</view>
		</view>
		<view class="other_unctions">
			<view @click="goInviteFriend" class="border_line">
				<itemList img="../../static/me/yaoqing.png" title="邀请好友"></itemList>
			</view>
			<view @click="turnToVip">
				<itemList img="../../static/me/me_icon_vip@2x.png" title="会员中心"></itemList>
			</view>
		</view>
		<view class="other_unctions end_item" @click="paymentCode">
			<itemList img="../../static/me/me_icon_currency@2x.png" title="设置"></itemList>
		</view>
		<view class="contact">
			<button type="primary" open-type="contact">联系客服</button>
		</view>
	</view>
</template>

<script>
	import api from '../../util/api.js';

	import itemList from './components/itemList.vue';
	import orderStatus from './components/orderStatus.vue';

	export default {
		data() {
			return {
				personalInfoList: null,
				vipUserStatus: false,
				vipIdentity: false,
				getMyOrderNum: {}
			};
		},

		components: {
			itemList,
			orderStatus
		},
		methods: {
			goPersonalData(userId) {
				uni.navigateTo({
					url: '/pages/me/personalData'
				});
			},
			turnToVip() {
				uni.navigateTo({
					url: './vip/vip-center'
				});
			},
			goInviteFriend() {
				uni.navigateTo({
					url: './inviteFriend/inviteFriend'
				});
			},
			goMoments() {
				uni.navigateTo({
					url: '/pages/moments/components/recommend'
				});
			},
			async personalInfo() {
				let res = await api.userInfo({});
				this.personalInfoList = res;
			},
			paymentCode() {
				uni.navigateTo({
					url: '/pages/me/common/paymentCode'
				});
			},
			async vipUser() {
				let res = await api.vipInfo({});
				this.vipUserStatus = res;

				if (res.userIsVip == true) {
					this.vipIdentity = true;
				}
			},
			async getMyOrder() {
				let res = await api.getMyOrder({
					clientOrderType: 'waitPayClientOrder'
					// clientOrderType :"waitOpenResultClientOrder",
					// clientOrderType :"waitCommentClientOrder",
					// clientOrderType :"refundClientOrder",
				});
				this.getMyOrderNum = res;
			}
		},
		onShow() {
			this.personalInfo();
			this.vipUser();
		},
		onLoad() {
			this.getMyOrder();
		}
	};
</script>

<style scoped>
	.user_wrapper {
		width: 100%;
		background-color: #f3f3f3;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
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

	.border_line {
		border-bottom: 1upx solid #ddd;
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

	.order_status_wrapper {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-top: 1upx solid #dedede;
	}

	.order_status {
		width: 75%;
		background-color: #fff;
		padding: 30upx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.right_item {
		width: 24.5%;
		background-color: #fff;
		padding: 30upx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.other_unctions {
		margin-top: 20upx;
		border-top: 1upx solid #dedede;
		border-bottom: 1upx solid #dedede;
	}

	.contact {
		margin: 40upx 20upx;
	}

	.user_vip {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.vip_icon {
		width: 30upx;
		height: 35upx;
		margin: 5upx 0 0 10upx;
	}
</style>

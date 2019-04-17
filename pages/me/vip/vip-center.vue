<template>
	<view class="main">
		<view class="top-img">
			<view class="attention-text" v-if="!vipInfo.userIsVip">￥398/年</view>
			<view class="attention-text" v-if="vipInfo.userIsVip">
				已开通VIP会员，{{vipInfo.vipEndTime}}到期
			</view>
		</view>
		<view class="list">
			<view class="vip-item">
				
				<view class="invite-img"></view>
				<view class="item-content">
					<view class="title">
						<view class="main-title">邀请好友20人</view>
						<view class="sub-title">
							<view class="tag"></view>
							<view class="text">
								赠送喜腾会 1个月 体验VIP会员
							</view>
						</view>
					</view>

					<view class="price-action" @click="inviteFriend">
						<view class="price">¥0.00</view>
						<view class="action" 
						:class="{
							'action-unusable': vipInfo.hasPresentMonthVip,
							'action-usable': !vipInfo.hasPresentMonthVip
						}"
						 @click="turnToInviteFriend">立即邀请</view>
					</view>
				</view>
				<view class="free-exp-img" v-if="vipInfo.hasPresentMonthVip"></view>
			</view>

			<block v-for="(p,index) in vipProducts" :key='index'>
				<view class="vip-item" @click="goDetail(p)">
					<image class="item-img" :src="p.imageUrl"></image>
					<view class="item-content">
						<view class="title">
							<view class="main-title">{{p.productName}}</view>
							<view class="sub-title">
								<view class="tag"></view>
								<view class="text">
									{{p.subtitle}}
								</view>
							</view>
						</view>

						<view class="price-action">
							<view class="price">¥{{p.price/100}}</view>
							<view class="action" @click="goDetail(p)">立即购买</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>



<script>
	import api from '@/util/api.js'

	export default {
		data() {
			return {
				vipProducts: [],
				vipInfo: {
					userIsVip: false,
					hasPresentMonthVip: false,
					
				},
				"inviteImg": "http://qnimage.xiteng.com/vip_exp.png"
			}
		},
		methods: {
<<<<<<< HEAD
			turnToInviteFriend() {
				if (this.vipInfo.hasPresentMonthVip) {
					
				} else {
					uni.navigateTo({
						url:"/pages/me/inviteFriend/inviteFriend"
					})
				}
=======
			inviteFriend(){
				uni.navigateTo({
					url:"/pages/me/inviteFriend/inviteFriend"
				})
			},
			turnToLuckyList() {
				console.log('xxxx');
				uni.navigateTo({
					url: './lucky-list'
				})
>>>>>>> d898b3ad5f9b90fd39c5b8d31db90fcf0a334de5
			},
			goDetail(p) {
				uni.navigateTo({
					url: "/pages/me/vip/vipProductDetails?productId=" + p.vipProductId
				})
			},
			async getVipProduct(){
				const res = await api.vipProducts({});
				this.vipProducts = res;
				console.log(res);
			},
			async getVipInfo() {
				const res = await api.vipInfo({});
				// res.hasPresentMonthVip = true;
				res.hasPresentMonthVip = res.hasPresentMonthVip===null ? false : res.hasPresentMonthVip;
				this.vipInfo = res;
				console.log(res);
			}
		},
		onLoad() {
			this.getVipInfo();
			this.getVipProduct();
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100%;
		height: 100%;
		background-color: #f4f8fb;

		.top-img {
			display: flex;
			flex: 1;
			justify-content: flex-end;
			align-items: flex-end;
			width: 100%;
			height: 628upx;
			background: url("http://qnimage.xiteng.com/vip_top_img.png") no-repeat;
			background-size: 100% 100%;
			
			.attention-text {
				margin-right: 100upx;
				margin-bottom: 271upx;
				font-family: 'PingFang-SC-Medium';
				font-weight: bold;
				font-size:24upx;
				color: #49342E;
			}
		}

		.list {
			.vip-item {
				display: flex;
				flex: 1;
				flex-direction: row;
				align-items: center;
				width: 100%;
				height: 280upx;

				.item-img {
					width: 190upx;
					height: 190upx;
					margin-left: 30upx;
					background-size: 100% 100%;
					border-style: solid;
					border-radius: 4upx;
					border-width: 1upx;
					border-color: #e5e5e5;
				}
				.invite-img {
					width: 190upx;
					height: 190upx;
					margin-left: 30upx;
					background: url("http://qnimage.xiteng.com/vip_exp.png") no-repeat;
					background-size: 100% 100%;
				}
				
				.free-exp-img {
					z-index: 10;
					width: 157upx;
					height: 124upx;
					margin-left: -190upx;
					margin-right: 30upx;
					background: url("http://qnimage.xiteng.com/vip_free_exped.png") no-repeat;
					background-size: 100% 100%;
				}

				.item-content {
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-between;
					width: 100%;
					height: 190upx;
					margin-left: 35upx;

					.title {
						flex-direction: column;
						justify-content: space-between;
						height: 76upx;

						.main-title {
							font-size: 32upx;
							color: #333333;
						}

						.sub-title {
							display: flex;
							flex-direction: row;
							align-items: center;

							.tag {
								width: 33upx;
								height: 23upx;
								background: url("http://qnimage.xiteng.com/vip_tag.png") no-repeat;
								background-size: 100% 100%;
							}

							.text {
								margin-left: 14upx;
								font-size: 26upx;
								color: #C9AE7D;
							}
						}

					}

					.price-action {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: flex-end;

						.price {
							font-size: 28upx;
							color: #DE3031;
						}

						.action {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 140upx;
							height: 45upx;
							margin-right: 34upx;
							border-radius: 23upx;
							// background-color: #E1CA9C;
							font-size: 26upx;
							color: white;
						}
						.action-unusable {
							background-color: #D9D9D9;
						}
						.action-usable {
							background-color: #E1CA9C;
						}
					}

				}
			}
		}
	}
</style>

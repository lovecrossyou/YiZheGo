<template>
	<view class="invite_friend_wrapper">
		 <view class="banner" v-if="userProfitInfo" @click="turnToWallet">
			<view class="banner_item">
				<view class="tit">我的好友</view>
				<view class="intro"><span class="count">{{userProfitInfo.userFriendAmount}}</span>人</view>
			</view>
			<view class="banner_item">
				<view class="tit">邀请红包</view>
				<view class="intro"><span class="count">{{userProfitInfo.inviteProfitXtbAmount}}</span>喜币</view>
			</view>
			<view class="banner_item">
				<view class="tit">会员返现</view>
				<view class="intro"><span class="count">{{userProfitInfo.shareSellProfitRmbAmount}}</span>元</view>
			</view>
		</view> 
		<view class="invite">
			<view class="rule">亲，送你2个红包，一起来玩1折抢购吧!从0~9选3个号码,选中立享1折。全场1折、正品保证、公开透明!</view>
			<image :src="yaoqing_bg"></image>
			<view class="invite_btn" @click="inviteBtn">立即邀请</view>
		</view>
		<view class="footer">
			<view class="img">
				<image :src="yaoqing_icon_jinagli"></image>
			</view>
			<view class="invite_intro">
				<view>1.你成功邀请一个钻石好友，你可获10喜币奖励;你的钻石好友成功邀请一个黄金好友，你可获2喜币奖励。邀请越多奖励越多!</view>
				<view>2.你的钻石好友购买会员中心商品你可获返现30%;你的黄金好友购买会员中心商品你可获返现10%。返现可任性提现！</view>
			</view>
		</view>
		<view class="share_wx_friend_wrapper" v-if="isShare">
			<view class="share_wx_friend">
				 <view class="share">
					 <view class="share_item">
						<button open-type="share" class="share_weixin">
							<image :src="yaoqing_icon_weixin"></image>
							<view>微信</view>
						</button>
					 </view>
					<view class="share_item" v-for="(item,i) in shareList" :key="i" @click="shareWxFriend(item.tit)">
						<image :src="item.img"></image>
						<view>{{item.tit}}</view>
					</view> 
				</view> 
				<view class="cancel" @click.stop="cancelBtn">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				yaoqing_bg: 'http://qnimage.xiteng.com/yaoqing_bg.png',
				yaoqing_icon_weixin:"../../../static/me/yaoqing_icon_weixin.png",
				isShare: false,
				shareList: [
					{
					img: "../../../static/me/yaoqing_icon_pengyouquan.png",
					tit: "朋友圈"
				}, {
					img: "../../../static/me/yaoqing_icon_qq.png",
					tit: "QQ"
				}, {
					img: "../../../static/me/yaoqing_icon_weibo.png",
					tit: "微博"
				}]
			}
		},
		onShareAppMessage() {
			console.log('userInfo.userId ',this.userInfo.userId);
			return {
				title: '亲,送你2个红包,专享1折抢购!优质名品,全场1折!',
				path: '/pages/home/home?inviteId='+this.userInfo.userId,
				imageUrl:'http://qnimage.xiteng.com/yaoqing_bg.png'
			}
		},
		computed: {
			...mapState(['userInfo']),
			...mapState('inviteFriend',['userProfitInfo'])
		},
		methods: {
			turnToWallet() {
				uni.navigateTo({
					url:"/pages/me/wallet/wallet"
				})
			},
			inviteBtn() {
				this.isShare = true;
			},
			cancelBtn() {
				this.isShare = false
			},
			shareWxFriend(tit) {
				if (tit == "微信好友") {
					uni.navigateTo({
						url: "./shareWxFriend"
					})
				} else {
					this.fetchInviteUser()
					uni.navigateTo({
						url: "/pages/shareqrcode/shareqrcode"
					})
				}
			this.isShare = false
			},
			fetchUserProfitInfo() {
				this.$store.dispatch('inviteFriend/fetchUserProfitInfo')
			},
			fetchInviteUser(){
				this.$store.dispatch('inviteFriend/fetchInviteUser')
			},
		},
		onLoad() {
			this.fetchUserProfitInfo()
		}
	}
</script>

<style lang="less">
	.invite_friend_wrapper {
		width: 100%;
		font-family: Ebrima-Bold;

		.banner {
			display: flex;
			justify-content: space-around;
			align-items: center;
			text-align: center;
			background: url('http://qnimage.xiteng.com/yaoqing_top_bg.png') no-repeat;
			background-size: 100%;

			.banner_item {
				padding: 60upx 0;
				box-sizing: border-box;

				.tit {
					font-size: 30upx;
					color: rgba(255, 245, 214, 1);
				}

				.intro {
					margin-top: 26upx;
					font-size: 28upx;
					color: rgba(253, 222, 115, 1);

					.count {
						font-size: 44upx;
						font-weight: bold;
						padding-right: 4upx;
					}
				}
			}
		}

		.invite {
			width: 100%;
			margin-top: 20upx;
			position: relative;
			text-align: center;

			image {
				width: 718upx;
				height: 877upx;
			}

			.rule {
				width: 86%;
				text-align: left;
				background: #fff;
				line-height: 1.5;
				border-radius: 10upx;
				font-size: 28upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(141, 141, 141, 1);
				padding: 10upx 20upx;
				box-sizing: border-box;
				position: absolute;
				left: 50%;
				transform: translate(-50%, 0);
				top: 32upx;
				z-index: 2;
			}

			.invite_btn {
				width: 92%;
				height: 88upx;
				line-height: 88upx;
				text-align: center;
				background: rgba(185, 36, 39, 1);
				border-radius: 6upx;
				font-size: 36upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				position: absolute;
				left: 50%;
				transform: translate(-50%, 0);
				bottom: 50upx;
				z-index: 2;
			}
		}

		.footer {
			margin-top: 40upx;
			font-size: 24upx;
			color: rgba(153, 153, 153, 1);
			font-size: 24upx;
			color: rgba(153, 153, 153, 1);
			line-height: 2;

			.img {
				text-align: center;

				image {
					width: 38upx;
					height: 36upx;
				}
			}

			.invite_intro {
				padding: 0 34upx 30upx;
				box-sizing: border-box;
			}
		}

		.share_wx_friend_wrapper {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10;
			background: rgba(18, 18, 18, 0.6);

			.share_wx_friend {
				width: 100%;
				height: 326upx;
				position: fixed;
				bottom: -2upx;
				left: 0;
				z-index: 99;
				.share {
					width: 100%;
					height: 230upx;
					background: #ECECEC;
					display: flex;
					justify-content: space-around;
					align-items: center;
					text-align: center;
					.share_item{
						line-height:1.5;
						background: #ECECEC;
						font-size: 24upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						.share_weixin{
							width:140upx;
							height: 230upx;
							line-height:1.5;
							background: #ECECEC;
							font-size: 24upx;
							font-family: PingFang-SC-Regular;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);
							display:flex;
							flex-direction:column;
							align-items:center;
							justify-content:center;
						}
						button::after{
							border:none;
						}
					}
					
					image {
						width: 104upx;
						height: 104upx;
						margin-bottom: 4upx;
					}

				}

				.cancel {
					height: 96upx;
					background: #fff;
					line-height: 96upx;
					text-align: center;
					font-size: 32upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}
		}
	}
</style>

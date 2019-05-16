<template>
	<view class="home_page">
		<block v-if="loading">
			<LoadingTurn></LoadingTurn>
		</block>
		<block v-else>
			<view class="header">
				<searchWrap></searchWrap>
				<banner></banner>
			</view>
			<view class="nav">
				<view class="nav_list">
					<view class="nav_list_item" v-for="(item, i) in navList" :key="i" @click="goNext(item)">
						<image :src="item.img"></image>
						<view>{{ item.name }}</view>
					</view>
				</view>
				<!-- <image :src="home_huiyuan" @click="goVIP"></image> -->
			</view>
			<view class="tooopencom">
				<view class="tooopencom_content">
					<view class="tooopencom_title" @click="goNewsWelfare">
						<view>新人专区</view>
						<view class="tooopencom_title_right">
							<image :src="home_gengduo_icon"></image>
						</view>
					</view>
					<view class="tooopencom_product_list">
						<view class="tooopencom_product_item" v-for="(item, i) in newsBenefitList3" :key="i" @click="goNewsWelfare">
							<view class="image">
								<image :src="item.productImageUrl" mode="aspectFill"></image>
							</view>
							<view class="tooopencom_product_name">{{ item.productName }}</view>
							<view class="tooopencom_product_price">￥{{ item.oneDiscountPrice / 100 }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="hot_sale">
				<view class="tooopencom_title" @click="hotsales">
					<view>幸福热销榜</view>
				</view>
				<view class="luck_hot">
					<view class="tips_1">
						让你感到幸福的小幸运
					</view>
					<view class="tips_2">
						居家必备单品
					</view>

					<view class="tooopencom_product_list">
						<view class="tooopencom_product_item" v-for="(item, i) in newsBenefitList3" :key="i" @click="goNewsWelfare">
							<view class="image">
								<image :src="item.productImageUrl" mode="aspectFill"></image>
							</view>
							<view class="tooopencom_product_name">{{ item.productName }}</view>

							<view class="sale_amount">
								已售245万
							</view>
							<!-- <view class="tooopencom_product_price">￥{{ item.oneDiscountPrice / 100 }}</view> -->
						</view>
					</view>
				</view>
			</view>
			<view class="tab_filtrate_wrapper">
				<tabFiltrate :data="navBarListTit"></tabFiltrate>
				<product></product>
			</view>
			<!-- 红包模态！ -->
			<view class="registe_success_modal" v-if="modalArea">
				<view class="content_wrapper" v-if="modalStatus">
					<image src="../../static/home/quxiao.png" class="cancel_icon" @click="hiddenImg"></image>
					<image src="../../static/home/no_open.png" class="no_open_img" @click="openPacket"></image>
					<view class="no_oppen_title_area">
						<view class="top_text">{{ openRedPacket.awardDescription }}</view>
						<view class="bottom_text">喜腾送您一个喜币红包</view>
					</view>
				</view>
				<view class="content_wrapper" v-if="openPacketStatus">
					<image src="../../static/home/quxiao.png" class="cancel_icon" @click="closeImg"></image>
					<image src="../../static/home/opening.png" class="opening_img" @click="closeImg"></image>
					<view class="oppen_title_area">
						<view class="top_text">{{ openRedPacket.awardDescription }}</view>
						<view class="bottom_text">
							奖励
							<view class="xibi_num">{{ openRedPacket.rewardMount }}</view>
							喜币
						</view>
					</view>
				</view>
			</view>

			<!-- 获得会员弹框 -->
			<view class="registe_success_modal" v-if="showVIPModal">
				<view class="vip_modal_wrapper">
					<image src="http://qnimage.xiteng.com/huiyuan_photo_lingqu@2x.png" v-if="vipImg" class="vip_img" @click="getVIP"></image>
					<image src="../../static/home/quxiao.png" class="cancel_icon" v-if="hiddenCancel" @click="cancelVip"></image>
					<!-- 领取成功 -->
					<image src="../../static/home/huiyuan_icon_chenggong@2x.png" v-if="getSucceed" class="get_succeed"></image>
				</view>
			</view>
			<!-- 首次注册弹框 -->
			<view class="regiser_modal_wrapper" v-if="showNewUserModal">
				<image class="card" :src="xinren_fuli_icon" @click="cancelNewUserModal"></image>
				<view>
					<image class="cancelBtn" :src="cancelBtn" @click="cancelNewUserModal"></image>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import dataUtil from '@/util/dataUtil.js';
	import {
		mapState,
		mapGetters
	} from 'vuex';
	import api from '../../util/api.js';
	import banner from './components/banner';
	import searchWrap from './components/searchWrap';
	import tabFiltrate from './components/tabFiltrate';
	import product from './components/product';
	import service from '@/service.js';
	import loading from './components/loading';
	import LoadingTurn from '../components/LoadingTurn.vue';

	export default {
		computed: {
			...mapState(['hasLogin', 'userInfo']),
			...mapState('home', ['timeLimitChoiceList', 'timeLimitList']),
			...mapGetters('home', ['timeLimit3', 'newsBenefitList3', 'loading'])
			// loading(){
			// 	return this.timeLimit3.length==0 || this.newsBenefitList3.length==0;
			// }
		},
		methods: {
			async fetchByTimeLimitList() {
				const res = await api.byTimeLimitList({});
				this.$store.commit('home/setByTimeLimitList', res);
			},
			async fetchTimeLimitChoiceList(cb) {
				this.$store.dispatch('home/fetchTimeLimitChoiceList', cb);
			},
			async fetchNewsBenefitList() {
				this.$store.dispatch('home/fetchNewsBenefitList');
			},
			hotsales() {
				uni.navigateTo({
					url: '/pages/xtgoods/xtgoods'
				});
			},

			goNext(item) {
				uni.navigateTo({
					url: item.page
				});
			},
			goDetail(productId, groupId) {
				console.log('productId## ', productId);
				uni.navigateTo({
					url: '/pages/details/productDetails?productId=' + productId + '&groupId=' + groupId
				});
			},
			hiddenImg() {
				this.modalStatus = false;
				this.modalArea = false;
			},
			async openPacket() {
				const id = this.openRedPacket.pushMassageId;
				let res = await api.getRedPacket({
					pushMassageId: id
				});
				this.keepRedPacket = res;
				this.modalStatus = false;
				this.openPacketStatus = true;
			},
			async packets() {
				let res = await api.redPacket({});
				if (res.length != 0) {
					this.openRedPacket = res[0];
					this.modalArea = true;
					this.modalStatus = true;
				}
			},
			async checkBindPhone() {
				let res = await api.checkBindPhone({});
				if (res.statue != 'in_bind') {
					wx.redirectTo({
						url: '/pages/login/WeChatLogin/inputTelNumber'
					})
				}
			},
			goNewsWelfare() {
				uni.navigateTo({
					url: './newsWelfare'
				});
			},
			closeImg() {
				this.openPacketStatus = false;
				this.modalArea = false;
			},
			cancelVip() {
				this.showVIPModal = false;
			},
			async getVIP() {
				this.vipImg = false;
				const res = await api.getPresentVip();
				this.getSucceed = true;
				this.hiddenCancel = false;
				let delayed;
				let that = this;
				clearTimeout(delayed);
				delayed = setTimeout(function() {
					that.showVIPModal = false;
					console.log('领取成功');
				}, 1600);
			},
			async getVipModal() {
				let res = await api.vipModal({});
				// console.log('getVipModal ', res);
				if (res.pushPresentVip) {
					this.showVIPModal = true;
				}
			},
			cancelNewUserModal() {
				this.showNewUserModal = false;
			},
			startNewUserModal() {
				this.showNewUserModal = true;
			},
			async vipInfo() {
				const vip = await api.vipInfo({});
				if (!vip.userIsVip && vip.restPresentCount == 3) {
					this.startNewUserModal();
				}
			},

			goLogin() {
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/login/verifyCodeLogin/verifyCodeLogin'
				})
				// #endif

				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url: "/pages/login/WeChatLogin/WeChatLogin"
				})
				// #endif
			}
		},
		onShow() {
			if (this.hasLogin) {
				this.packets();
				this.getVipModal();
				this.checkBindPhone();
			} else {
				this.goLogin();
			}
		},
		onLoad(option) {
			this.fetchByTimeLimitList();
			this.fetchTimeLimitChoiceList();
			this.fetchNewsBenefitList();
			this.vipInfo();
			console.log('inviteId ', option.inviteId);
			let inviteId = option.inviteId;

			// inviteId = 7;
			if (inviteId) {
				service.addInviteId(inviteId);
			}
			let userId;
			if (this.userInfo) {
				userId = this.userInfo.userId;
			}
			let groupId = option.groupId;
			if (!groupId) {
				groupId = null;
			}
			let productId = option.productId;
			if (!productId) {
				productId = null;
			}
			let payOrderNo = option.payOrderNo;
			if (!payOrderNo) {
				payOrderNo = null;
			}

			if (groupId || productId) {
				if (!userId || userId != inviteId) {
					// console.log('groupId productId', groupId, productId);
					this.goDetail(productId, groupId);
				} else {
					//到自己团(未登录)
					if (this.hasLogin) {
						//到自己团
						uni.navigateTo({
							url: '/pages/gameGroup?payOrderNo=' + payOrderNo
						});
					}
				}
			}
		},
		data() {
			return {
				popMessage: [], //弹出 收到红包  会员奖励
				showVIPModal: false,
				showModal: false,
				home_huiyuan: 'http://qnimage.xiteng.com/home_huiyuan@2x.png',
				home_gengduo_icon: '../../static/home/home_gengduo_icon.png',
				navBarListTit: ['精选', '销量', '价格'],
				modalStatus: true,
				openRedPacket: null,
				keepRedPacket: null,
				modalArea: false,
				openPacketStatus: false,
				vipImg: true,
				getSucceed: false,
				hiddenCancel: true,
				showNewUserModal: false,
				xinren_fuli_icon: '../../static/pay/xinyonghu_photo_fuli@2x.png',
				cancelBtn: '../../static/pay/cancel.png',
				navList: [{
						img: '../../static/home/home_nav_1.png',
						name: '幸福榜单',
						page: '/pages/me/vip/lucky-list'
					},
					{
						img: '../../static/home/home_nav_2.png',
						name: '梦想屋',
						page: '/pages/luckhouse/luckhouse'
					},
					{
						img: '../../static/home/home_nav_3.png',
						name: '一起赚钱',
						page: '/pages/ranklist/ranklist'
					},
					{
						img: '../../static/home/home_nav_4.png',
						name: '幸福银行',
						page: '/pages/category/category'
					}
				]
			};
		},
		components: {
			banner,
			tabFiltrate,
			product,
			searchWrap,
			loading,
			LoadingTurn
		}
	};
</script>

<style lang="less">
	.home_page {
		width: 100%;
		background: #f7f7f7;

		.nav {
			background: #ffffff;
			text-align: center;
			padding-top: 36upx;
			padding-bottom: 32upx;
			box-sizing: border-box;

			.header {
				width: 100%;
				background: #ffffff;
				position: relative;
				height: 427upx;
				position: relative;
			}

			image {
				width: 704upx;
				height: 158upx;
			}

			.nav_list {
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-bottom: 52upx;

				.nav_list_item {
					font-size: 28upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(29, 29, 29, 1);

					image {
						width: 137upx;
						height: 139upx;
					}
				}
			}
		}

		.tooopencom {
			padding: 32upx 20upx 36upx;
			box-sizing: border-box;
			background: #ffffff;
			// margin-top: 20upx;

			.tooopencom_content {
				border-radius: 8upx;
				// background: url('http://qnimage.xiteng.com/home_new_bg@2x.png') no-repeat;
				background-size: 100%;

				.tooopencom_product_list {
					display: flex;
					justify-content: space-around;
					align-content: center;
					padding-bottom: 32upx;

					.tooopencom_product_item {
						.image {
							width: 220upx;
							height: 276upx;
							position: relative;



							image {
								width: 220upx;
								height: 276upx;
							}
						}

						.tooopencom_product_price {
							width: 100%;
							height: 48upx;
							// background: rgba(255, 255, 255, 0.5);
							line-height: 48upx;
							// position: absolute;
							// bottom: 0;
							// left: 0;
							padding-left: 10upx;
							box-sizing: border-box;
							font-size: 28upx;
							font-family: PingFang-SC-Medium;
							font-weight: 500;
							color: #E71C07;
						}

						.tooopencom_product_name {
							width: 220upx;
							font-size: 28upx;
							font-family: PingFang-SC-Medium;
							font-weight: 500;
							color: #1F1F1F;
							line-height: 1.5;
							margin-top: 18upx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
						}
					}
				}
			}
		}

		.tooopencom_title {
			// height: 94upx;
			// line-height: 94upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 32upx;
			padding-right: 32upx;
			font-weight: bold;
			font-size: 40upx;

			.tooopencom_title_right {
				color: #e22537;
				font-size: 26upx;
				display: flex;
				align-items: center;

				image {
					width: 28upx;
					height: 28upx;
					margin-left: 10upx;
				}
			}
		}

		.luck_hot {
			margin: 0 32upx;
			background: url('http://qnimage.xiteng.com/home_rexiao_bk.png') no-repeat center;
			background-size: 685upx 433upx;
			height: 433upx;
			width: 685upx;

			.tips_1 {
				position: relative;
				left: 36upx;
				top: 28upx;

				font-size: 30upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
			}

			.tips_2 {
				position: relative;
				left: 36upx;
				top: 76upx;

				width: 162upx;
				height: 32upx;
				background: #FFB51E;
				border-radius: 16upx;
				font-size: 22upx;

				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: #1F1F1F;
				text-align: center;
			}

			.tooopencom_product_list {
				position: relative;
				top: 90upx;
				height: 260upx;

				display: flex;
				justify-content: space-around;
				align-items: center;

				.tooopencom_product_item {
					background: #ffffff;
					width: 188upx;
					height: 260upx;
					border-radius: 8upx;
					
					display: flex;
					flex-direction: column;
					align-items: center;
					

					.image {
						width: 167upx;
						height: 159upx;
						position: relative;

						image {
							width: 167upx;
							height: 159upx;
						}
					}

					.tooopencom_product_price {
						width: 100%;
						padding-left: 10upx;
						box-sizing: border-box;
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: #E71C07;
						text-align: center;
					}

					.sale_amount {
						margin-top: 12upx;
						width: 111upx;
						height: 30upx;
						background: rgba(255, 221, 161, 1);
						border-radius: 15upx;
						color: #1F1F1F;
						font-size: 18upx;
						text-align: center;
					}

					.tooopencom_product_name {
						margin: 0 5upx;
						overflow: hidden;
						box-sizing: border-box;
						// width: 220upx;
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: #1F1F1F;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
					}
				}
			}

		}

		.hot_sale {
			background: #ffffff;
			padding-bottom: 32upx;
			box-sizing: border-box;
			// margin-top: 20upx;
			// height: 94upx;
			// line-height: 94upx;
			
			.tooopencom_title{
				padding: 40upx 0 40upx 40upx ;
				box-sizing: border-box;
				font-size: 40upx;
			}

			.hot_sale_list {
				padding: 0 20upx 38upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-around;
				align-content: center;
				margin-top: 10upx;

				.hot_sale_product_item {
					width: 222upx;
					height: 324upx;
					background: #f5f5f5;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding-top: 8upx;
					padding-bottom: 10upx;
					box-sizing: border-box;

					&:nth-child(odd) {
						margin-top: 30upx;
					}

					.hot_sale_product_price {
						width: 100%;
						height: 28upx;
						line-height: 28upx;
						font-size: 32upx;
						padding-left: 10upx;
						box-sizing: border-box;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(226, 37, 55, 1);
					}

					.hot_sale_product_name {
						width: 80%;
						height: 34upx;
						background: rgba(250, 224, 181, 1);
						line-height: 34upx;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						border-radius: 16upx;
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(101, 69, 48, 1);
						margin-top: 16upx;
						margin-bottom: 10upx;
						padding-left: 10upx;
						padding-right: 10upx;
						box-sizing: border-box;
					}

					.already_sale {
						font-size: 20upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(101, 69, 48, 1);
					}

					.image {
						width: 136upx;
						height: 178upx;

						image {
							width: 136upx;
							height: 178upx;
						}
					}
				}
			}
		}

		.tab_filtrate_wrapper {
			width: 100%;
			// margin-top: 20upx;
			background: #F2F0F3;
			border-radius: 20upx;
		}

		.registe_success_modal {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.8);
		}

		.content_wrapper {
			width: 565upx;
			margin: 302upx auto 0 auto;
			position: relative;
			display: flex;
			flex-direction: column;

			.cancel_icon {
				width: 54upx;
				height: 54upx;
				position: absolute;
				top: 0;
				right: 0;
			}

			.no_open_img {
				width: 565upx;
				height: 358upx;
				margin-top: 103upx;
			}

			.no_oppen_title_area {
				width: 100%;
				height: 100upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				margin-top: -320upx;

				.top_text {
					color: #fadb30;
					font-size: 40upx;
					font-weight: 500;
				}

				.bottom_text {
					color: #fcd810;
					font-size: 28upx;
				}
			}

			.opening_img {
				width: 565upx;
				height: 622upx;
				margin-top: 30upx;
			}

			.oppen_title_area {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: -460upx;

				.top_text {
					color: #ec1710;
					font-size: 34upx;
					font-weight: 500;
				}

				.bottom_text {
					color: #000;
					font-size: 34upx;
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-top: 60upx;

					.xibi_num {
						color: #bf1913;
						font-size: 50upx;
						margin: -8upx 5upx 0 5upx;
					}
				}
			}
		}

		.vip_modal_wrapper {
			width: 588upx;
			height: 750upx;
			margin: 300upx auto 0 auto;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;

			.vip_img {
				width: 580upx;
				height: 640upx;
			}

			.cancel_icon {
				width: 60upx;
				height: 60upx;
			}

			.get_succeed {
				width: 250upx;
				height: 70upx;
				margin-top: 300upx;
			}
		}

		.regiser_modal_wrapper {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.7);
			position: fixed;
			left: 0;
			top: 0;
			text-align: center;

			.card {
				width: 540upx;
				height: 640upx;
				margin-top: 300upx;
			}

			.cancelBtn {
				width: 60upx;
				height: 60upx;
				margin-top: 48upx;
			}
		}
	}
</style>

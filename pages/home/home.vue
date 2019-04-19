<template>
	<view class="home_page">
		<block v-if="loading">
			<loading></loading>
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
				<image :src="home_huiyuan" @click="goVIP"></image>
			</view>
			<view class="tooopencom">
				<view class="tooopencom_content">
					<view class="tooopencom_title" @click="goNewsWelfare">
						<view>喜腾好物</view>
						<view class="tooopencom_title_right">
							<image :src="home_gengduo_icon"></image>
						</view>
					</view>
					<view class="tooopencom_product_list">
						<view class="tooopencom_product_item" v-for="(item, i) in timeLimit3" :key="i">
							<view class="image">
								<image :src="item.productImageUrl"></image>
								<view class="tooopencom_product_price">￥{{ item.oneDiscountPrice }}</view>
							</view>
							<view class="tooopencom_product_name">{{ item.productName }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="hot_sale" @click="hotsales">
				<view class="tooopencom_title">
					<view>热销榜单</view>
					<view class="tooopencom_title_right">
						<view>抢更多精选好物</view>
						<image :src="home_gengduo_icon"></image>
					</view>
				</view>
				<view class="hot_sale_list">
					<view class="hot_sale_product_item" v-for="(item, i) in timeLimit3" :key="i">
						<view class="image">
							<image :src="item.productImageUrl"></image>
						</view>
						<view class="hot_sale_product_price">￥{{ item.oneDiscountPrice }}</view>
						<view class="hot_sale_product_name">{{ item.productName }}</view>
						<view class="already_sale">已抢{{ item.currentPurchaseCount }}</view>
					</view>
				</view>
			</view>
			<view class="tab_filtrate_wrapper">
				<tabFiltrate :data="navBarListTit"></tabFiltrate>
				<product></product>
			</view>
			<!-- 红包模态！ -->
			<view class="registe_success_modal" v-if="modalArea">
				<!-- <view class="content_wrapper" v-if="modalStatus">
				<image src="../../static/home/quxiao.png" class="cancel_icon" @click="hiddenImg"></image>
				<image src="../../static/home/no_open.png" class="no_open_img" @click="openPacket"></image>
				<view class="no_oppen_title_area">
					<view class="top_text">{{ openRedPacket.awardDescription }}</view>
					<view class="bottom_text">喜腾送您一个喜币红包</view>
				</view>
			</view>
			<view class="content_wrapper" v-if="openPacketStatus">
				<image src="../../static/home/quxiao.png" class="cancel_icon" @click="closeImg"></image>
				<image src="../../static/home/opening.png" class="opening_img"></image>
				<view class="oppen_title_area">
					<view class="top_text">{{ openRedPacket.awardDescription }}</view>
					<view class="bottom_text">
						奖励
						<view class="xibi_num">{{ openRedPacket.rewardMount }}</view>
						喜币
					</view>
				</view>
			</view> -->
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

		</block>
	</view>
</template>

<script>
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
	import loading from "./components/loading"

	export default {
		computed: {
			...mapState(['hasLogin', 'userInfo']),
			...mapState('home', ['timeLimitChoices', 'timeLimitChoiceList']),
			...mapGetters('home', ['timeLimit3'])
		},
		methods: {
			hotsales(){
				uni.navigateTo({
					url: '/pages/xtgoods/xtgoods'
				});
			},
			goVIP() {
				uni.navigateTo({
					url: '/pages/me/vip/vip-center'
				});
			},
			goNext(item) {
				uni.navigateTo({
					url: item.page
				});
			},
			goDetail(productId, groupId) {
				uni.navigateTo({
					url: '/pages/details/productDetails?productId=' + productId + '&groupId=' + groupId
				});
			},
			hiddenImg() {
				this.modalStatus = false;
				this.modalArea = false;
			},
			async openPacket() {
				let res = await api.getRedPacket({});
				this.keepRedPacket = res;
				this.modalStatus = false;
				this.openPacketStatus = true;
			},
			async packets() {
				let res = await api.redPacket({});
				if (res.length != 0) {
					this.openRedPacket = res;
					this.modalArea = true;
					this.modalStatus = true;
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
				this.modalArea = false;
			},
			async getVIP() {
				this.vipImg = false;
				this.getSucceed = true;
				this.hiddenCancel = false;
				const res = await api.getPresentVip();
				this.showVIPModal = false;
			},
			async getVipModal() {
				let res = await api.vipModal({});
				console.log('getVipModal ', res);
				if (res.pushPresentVip) {
					this.showVIPModal = true;
				}
			}
		},
		onShow() {
			this.packets();
			this.getVipModal();
			this.loading = false;
		},
		onLoad(option) {
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

			if (groupId && productId) {
				if (!userId || userId != inviteId) {
					console.log('groupId productId', groupId, productId);
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
				showVIPModal: false,
				showModal: false,
				loading: true,
				home_huiyuan: 'http://qnimage.xiteng.com/home_huiyuan.png',
				home_gengduo_icon: '../../static/home/home_gengduo_icon.png',
				navBarListTit: ['精选', '销量', '价格'],
				modalStatus: true,
				openRedPacket: {},
				keepRedPacket: {},
				modalArea: false,
				openPacketStatus: false,
				vipImg: true,
				getSucceed: false,
				hiddenCancel: true,
				navList: [{
						img: '../../static/home/home_nav_zhongqian.png',
						name: '中签',
						page: '/pages/me/vip/lucky-list'
					},
					{
						img: '../../static/home/home_nav_shaidan.png',
						name: '晒单',
						page: '/pages/ranklist/ranklist'
					},
					{
						img: '../../static/home/home_nav_bangdan.png',
						name: '榜单',
						page: '/pages/ranklist/ranklist'
					},
					{
						img: '../../static/home/home_nav_fenlei.png',
						name: '分类',
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
			loading
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
						width: 52upx;
						height: 52upx;
					}
				}
			}
		}

		.tooopencom {
			padding: 32upx 20upx 36upx;
			box-sizing: border-box;
			background: #ffffff;
			margin-top: 20upx;

			.tooopencom_content {
				background: #fee4e4;
				border-radius: 8upx;
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

							.tooopencom_product_price {
								position: absolute;
								bottom: 10upx;
								left: 10upx;
								font-size: 32upx;
								font-family: PingFang-SC-Medium;
								font-weight: 500;
								color: rgba(226, 37, 55, 1);
							}

							image {
								width: 220upx;
								height: 276upx;
							}
						}

						.tooopencom_product_name {
							width: 220upx;
							font-size: 24upx;
							font-family: PingFang-SC-Medium;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
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
			height: 94upx;
			line-height: 94upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 32upx;
			padding-right: 32upx;

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

		.hot_sale {
			background: #ffffff;
			margin-top: 20upx;

			.hot_sale_list {
				padding: 0 20upx 38upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-around;
				align-content: center;
				margin-top: 10upx;

				.hot_sale_product_item {
					width: 222upx;
					height: 304upx;
					background: #f5f5f5;
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding-bottom: 14upx;
					box-sizing: border-box;

					&:nth-child(odd) {
						margin-top: 30upx;
					}

					.hot_sale_product_price {
						position: absolute;
						top: 4upx;
						left: 4upx;
						font-size: 32upx;
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
						margin-top: 28upx;

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
			margin-top: 20upx;
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
	}
</style>

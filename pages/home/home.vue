<template>
	<view class="home_page">
		<view class="header">
			<searchBox></searchBox>
			<banner></banner>
		</view>
		<view class="nav">
			<view class="nav_list">
				<view class="nav_list_item" v-for="(item,i) in navList" :key="i">
					<image :src="item.img"></image>
					<view>{{item.name}}</view>
				</view>
			</view>
			<image :src="home_huiyuan"></image>
		</view>
		<view class="tooopencom">
			<view class="tooopencom_content">
				<view class="tooopencom_title">
					<view>新人福利</view>
					<view class="tooopencom_title_right">
						<image :src="home_gengduo_icon"></image>
					</view>
				</view>
				<view class="tooopencom_product_list">
					<view class="tooopencom_product_item" v-for="(item,i) in tooopencomList" :key="i">
						<view class="image">
							<image :src="item.img"></image>
							<view class="tooopencom_product_price">￥{{item.price}}</view>
						</view>
						<view class="tooopencom_product_name">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="hot_sale">
			<view class="tooopencom_title">
				<view>热销榜单</view>
				<view class="tooopencom_title_right">
					抢更多精选好物<image :src="home_gengduo_icon"></image>
				</view>
			</view>
			<view class="hot_sale_list">
				<view class="hot_sale_product_item" v-for="(item,i) in hotSaleList" :key="i">
					<view class="image">
						<image :src="item.productImageUrl "></image>
					</view>
					<view class="hot_sale_product_price">￥{{item.oneDiscountPrice}}</view>
					<view class="hot_sale_product_name">{{item.productName}}</view>
					<view class="already_sale">已抢{{item.currentPurchaseCount}}</view>
				</view>
			</view>
		</view>
		<view class="tab_filtrate_wrapper">
			<tabFiltrate :data="navBarListTit"></tabFiltrate>
			<product></product>

		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex";
	import api from '../../util/api.js';
	import banner from './components/banner';
	import searchBox from './components/searchBox';
	import tabFiltrate from './components/tabFiltrate';
	import product from './components/product';

	export default {
		computed: {
			...mapState(['hasLogin']),
			...mapState({
				hotSales:state=>state.home.hotSaleList,
			}),
			hotSaleList(){
				return this.hotSales.slice(0,3);
			}
		},
		methods: {
			async fetchHotSaleList() {
				const res = await api.hotSaleList({
					accessInfo: {}
				})
				this.$store.commit('home/setHotSaleList',res)
			},
			async fetchTimeLimitChoiceList(){
				const res = await api.byTimeLimitChoiceList({
					accessInfo:{}
				})
				this.$store.commit('home/setTimeLimitChoiceList',res)
			}
		},
		onLoad() {
			this.fetchHotSaleList()
			this.fetchTimeLimitChoiceList()
			if (!this.hasLogin) {
				console.log('xxxx');
				uni.navigateTo({
					url: "/pages/login/WeChatLogin/WeChatLogin"
				})
			}
		},
		data() {
			return {
				home_huiyuan: '../../static/home/home_huiyuan.png',
				home_gengduo_icon: '../../static/home/home_gengduo_icon.png',
				home_shop_1: '../../static/home/home_shop_1.png',
				navBarListTit: ["精选", "销量", "价格"],
				navList: [{
					img: '../../static/home/home_nav_zhongqian.png',
					name: "中签"
				}, {
					img: '../../static/home/home_nav_shaidan.png',
					name: "晒单"
				}, {
					img: '../../static/home/home_nav_bangdan.png',
					name: "榜单"
				}, {
					img: '../../static/home/home_nav_fenlei.png',
					name: "分类"
				}, ],
				tooopencomList: [{
					img: '../../static/home/home_shop_1.png',
					name: "口红",
					price: 2.3
				}, {
					img: '../../static/home/home_shop_1.png',
					name: "洗发水",
					price: 3.3
				}, {
					img: '../../static/home/home_shop_1.png',
					name: "粉底液",
					price: 5.3
				}, ],
			}
		},
		components: {
			banner,
			searchBox,
			tabFiltrate,
			product,
		}
	}
</script>

<style lang="less">
	.home_page {
		width: 100%;
		background: #F7F7F7;

		.header {
			width: 100%;
			position: relative;
		}

		.nav {
			background: #FFFFFF;
			text-align: center;
			padding-top: 36upx;
			padding-bottom: 32upx;
			box-sizing: border-box;

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
			background: #FFFFFF;
			margin-top: 20upx;

			.tooopencom_content {
				background: #fee4e4;

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
				color: #E22537;
				font-size: 26upx;

				image {
					width: 28upx;
					height: 28upx;
					margin-left: 10upx;
				}
			}
		}

		.hot_sale {
			background: #FFFFFF;
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
					background: #F5F5F5;
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
						background: rgba(250, 224, 181, 1);
						border-radius: 16px;
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(101, 69, 48, 1);
						padding: 4upx 20upx;
						margin-top: 16upx;
						margin-bottom: 10upx;
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

	}
</style>

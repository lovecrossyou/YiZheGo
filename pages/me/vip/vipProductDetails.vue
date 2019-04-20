<template>
	<view class="product_details_wrapper" v-if="productDetail">
		<!-- 顶部导航 -->
		<view class="header">
			<image :src="nav_icon_back" class="left-arrow" @click="goBack"></image>
			<view class="product_title">
				<view class="product_title_item" v-for="(item, i) in ['商品', '详情']" :key="i" :class="[selectedIndex == i ? 'activeBd' : 'initialBd']" @click="changeIndex(i)">
					{{ item }}
				</view>
			</view>
			<image :src="share_icon" class="share"></image>
		</view>
		<!-- 轮播 -->
		<view class="scroll-wrapper">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item class="swiper-item" v-for="(item, i) in banners" :key="i">
					<view><image :src="item"></image></view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 价格-->
		<view class="price-section">
			<view class="price-section-item">
				<view class="price">
					<view class="rmb_symbol">￥</view>
					<span class="big">{{productDetail.price/100}}</span>
					<view class="rmb_symbol">.00</view>
				</view>
			</view>
			<view class="price-section-item">
				<image class="icon_fire" :src="icon_fire"></image>
				<view class="already_rob">
					已抢
					<view class="rob_num">2499万</view>
					件
				</view>
			</view>
		</view>
		<!-- 商品信息  -->
		<view class="product-info">{{ productDetail.productName }}</view>

		<!-- 赠送 & 服务保障 -->
		<view class="serve_area">
			<view class="give_area">
				<view class="serve_safeguard_text">赠送</view>
				<view class=" give_info">
					<view class="give_year">赠送喜腾会 1年 VIP会员</view>
					<view class="give_price">价值￥398.00</view>
				</view>
				<image src="../../../static/me/photo_xiteng_ka@2x.png" mode="" class="xt_card_img"></image>
			</view>

			<view class="serve_safeguard_area">
				<view class="serve_safeguard_text">服务保障</view>
				<view class="safeguard_area">
					<view class="safeguard_wrapper">
						<image src="../../../static/me/icon_lable@2x.png" mode="" class="right_icon"></image>
						<view class="exemption_text">包邮</view>
					</view>
					<view class="safeguard_wrapper">
						<image src="../../../static/me/icon_lable@2x.png" mode="" class="right_icon"></image>
						<view class="exemption_text">正品保证</view>
					</view>
					<view class="safeguard_wrapper">
						<image src="../../../static/me/icon_lable@2x.png" mode="" class="right_icon"></image>
						<view class="exemption_text">材质保真</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 商品详情 -->
		<view class="winning_periods" style="margin-bottom: 95upx;">
			<view class="particulars_item"><view class="designation">商品详情</view></view>
			<view class="detail_imgurllist">
				<block v-for="(item, i) in productDetail.productDetailImageUrlList" :key="i"><image :src="item.productDetailImageUrl" mode="widthFix"></image></block>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="service_icon"><image src="../../../static/me/icon_kefu@2x.png" mode=""></image></view>
			<view class="buy_now_area" @click="buy">立即购买</view>
		</view>
	</view>
</template>
<script>
import api from '@/util/api.js';
import { mapState } from 'vuex';
export default {
	computed: {
		banners() {
			if (this.productDetail === null) return [];
			return this.productDetail.productShowImageUrlList;
		}
	},
	methods: {
		async buy() {
			//生成订单
			uni.navigateTo({
				url: '/pages/me/vip/vipConfirmOrder?productId=' + this.productDetail.vipProductId
			});
		},
		changeIndex(ind) {
			this.selectedIndex = ind;
		},
		goBack() {
			uni.navigateBack();
		},
		async fetchProductDetail(productId) {
			const res = await api.vipProductDetail({
				vipProductId: productId
			});
			this.productDetail = res;
		},
		confirmOrder(directBuy) {
			uni.navigateTo({
				url: '../chooseCode/confirmOrder?discountGameId=' + this.productDetail.discountGameId + '&directBuy=' + directBuy
			});
		},
		goBuying(){
			console.log('this.productDetail ', this.productDetail);
			uni.navigateTo({
				url:"/pages/buying/buying?discountGameId="+this.productDetail.discountGameId
			})
		},
		goshowWinOrder(){
			uni.navigateTo({
				url:"/pages/moments/components/showWinOrder"
			})
		},
	},
	onLoad(opt) {
		this.fetchProductDetail(opt.productId);
	},
	data() {
		return {
			productDetail: null,
			selectedIndex: 0,
			commentModelList: [
				{
					userName: '电视成金',
					time: 123,
					qishu: 201805260002,
					content: '中签了，太棒了，手气相当不错，真的是0元呀，没问题，看图说话。',
					imageUrlList: []
				},
				{
					userIcoin: '../../static/home/home_shop_1.png',
					userName: '电视成金',
					time: 123,
					qishu: 201805260002,
					content: '中签了，太棒了，手气相当不错，真的是0元呀，没问题，看图说话。',
					imageUrlList: []
				}
			],
			guarantee: '从0～9中选3个号码，选中即享1折。中签号码与当天3D中奖号码同步，每天22:00揭晓，不中全额退款，源自京东自营商品，天天发货。',
			commitment: ['破损包退', '正品保证', '七天退换', '极速退款'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			share_icon: '../../../static/details/share_icon.png',
			icon_right: '../../../static/details/icon_right.png',
			icon_lable: '../../../static/details/icon_lable.png',
			icon_time: '../../../static/details/icon_time.png',
			btn_like: '../../../static/details/btn_like.png',
			btn_message: '../../../static/details/btn_message.png',
			icon_man: '../../../static/details/icon_man.png',
			icon_woman: '../../../static/details/icon_woman.png',
			nav_icon_back: '../../../static/details/nav_icon_back.png',
			icon_vip: '../../../static/details/icon_vip.png',
			icon_fire: '../../../static/details/icon_fire.png',
			btn_collection: '../../../static/details/btn_collection.png'
		};
	}
};
</script>
<style lang="less">
.product_details_wrapper {
	width: 100%;
	background-color: #f3f3f3;

	.header {
		width: 100%;
		height: 180upx;
		padding:77rpx 30rpx 0 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		border-bottom: 1upx solid #e9e9e9;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 111;

		.left-arrow {
			width: 20upx;
			height: 36upx;
		}

		.product_title {
			width: 200upx;
			height: 94upx;
			background: #ffffff;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-sizing: border-box;
			font-size: 32upx;
			color: #333;

			.activeBd {
				border-bottom: 4upx solid #333333;
			}

			.initialBd {
				border: none;
			}

			.product_title_item {
				height: 94upx;
				line-height: 94upx;
			}
		}

		.share {
			width: 36upx;
			height: 30upx;
		}
	}

	.scroll-wrapper {
		height: 700upx;
		width: 100%;
		margin-top: 180upx;

		.swiper {
			width: 100%;
			height: 100%;

			.swiper-item {
				image {
					width: 100%;
					height: 700upx;
				}
			}
		}
	}

	.price-section {
		height: 126upx;
		background: linear-gradient(to right, #e5d0a3, #d2b482);
		color: #ffffff;
		font-size: 28upx;
		padding: 0 24upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.price-section-item {
			display: flex;
			height: 100%;
			flex-direction: row;
			align-items: center;

			.icon_fire {
				width: 20upx;
				height: 32upx;
				margin: -3upx 13upx 0 0;
			}
			.already_rob {
				color: #ffffff;
				font-size: 24upx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.rob_num {
					color: #fffa6d;
					font-size: 32upx;
					margin:-3px 5rpx 0 5px;

				}
			}

			.price {
				font-size: 32upx;
				font-weight: 400;
				color: rgba(212, 27, 45, 1);
				height: 100%;
				display: flex;
				align-items: center;

				.rmb_symbol {
					font-size: 32upx;
					margin-top: 20upx;
				}
				.big {
					font-size: 60upx;
				}
			}

			.vip {
				font-size: 22upx;
				font-family: PingFangSC-Light;
				font-weight: 300;
				text-decoration: line-through;
				color: rgba(255, 255, 255, 1);
				line-height: 42upx;

				image {
					width: 108upx;
					height: 32upx;
				}
			}
		}
	}

	.product-info {
		background: #ffffff;
		padding: 20upx 28upx;
		box-sizing: border-box;
		color: #333333;
		font-size: 30upx;
		line-height: 50upx;

		.product-info-title {
			padding: 22upx;
			box-sizing: border-box;

			.info-name {
				font-size: 30upx;
				line-height: 1.5;
			}

			.pinkage {
				display: inline-block;
				height: 36upx;
				line-height: 36upx;
				text-align: center;
				background: #ff594b;
				border-radius: 6upx;
				color: #ffffff;
				font-size: 20upx;
				margin-right: 8upx;
				padding-left: 10upx;
				padding-right: 10upx;
			}
		}

		.rule {
			padding: 22upx;
			box-sizing: border-box;
			background: #f9f9fa;

			.product-info-guarantee {
				display: flex;
				align-items: center;
				// justify-content: space-around;
				margin-top: 20upx;
				font-size: 26upx;
				color: #e22537;

				.product-info-guarantee-item {
					flex: 1;
					display: flex;
					align-items: center;

					image {
						width: 26upx;
						height: 26upx;
						margin-right: 10upx;
					}
				}
			}

			.rule-info {
				margin-top: 14upx;
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(119, 119, 119, 1);
				line-height: 1.5;
				opacity: 0.9;
			}
		}
	}

	.serve_area {
		width: 100%;
		background-color: #fff;
		margin-top: 20upx;
		.give_area {
			width: 100%;
			display: flex;
			flex-direction: row;
			padding: 27upx 30upx;
			box-sizing: border-box;
			align-items: center;
			border-bottom: 1upx solid #dedede;

			.serve_safeguard_text {
				width: 80upx;
				height: 40upx;
				border-radius: 10upx;
				border: 1upx solid #d41b2d;
				text-align: center;
				line-height: 40upx;
				color: #d41b2d;
				font-size: 24upx;
				margin-right: 20upx;
			}

			.give_info {
				display: flex;
				flex-direction: column;
				flex: 1;

				.give_year {
					color: #666666;
					font-size: 28upx;
				}
				.give_price {
					color: #666666;
					font-size: 28upx;
					margin-top: 15upx;
				}
			}
			.xt_card_img {
				width: 154upx;
				height: 94upx;
			}
		}
		.serve_safeguard_area {
			width: 100%;
			padding: 25upx 30upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.serve_safeguard_text {
				width: 130upx;
				height: 40upx;
				border-radius: 10upx;
				border: 1upx solid #d41b2d;
				text-align: center;
				line-height: 40upx;
				color: #d41b2d;
				font-size: 24upx;
			}
			.safeguard_area {
				width: 62%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.safeguard_wrapper {
					display: flex;
					flex-direction: row;
					align-items: center;

					.right_icon {
						width: 26upx;
						height: 26upx;
						margin: 3upx 10upx 0 0;
					}
					.exemption_text {
						color: #777777;
						font-size: 26upx;
					}
				}
			}
		}
	}
	.winning_periods {
		margin-top: 20upx;
		background: #ffffff;

		.snapping_buy {
			.snapping_buy_item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #333333;
				padding: 26upx 28upx;
				box-sizing: border-box;
				border-bottom: 1upx solid #e3e3e3;

				.designation {
					display: flex;
					align-items: center;

					.snapping_buy_user_icon {
						width: 70upx;
						height: 70upx;

						image {
							width: 70upx;
							height: 70upx;
							border-radius: 10upx;
						}
					}

					.snapping_buy_user_sex {
						width: 26upx;
						height: 26upx;

						image {
							width: 26upx;
							height: 26upx;
						}
					}

					.snapping_buy_user_name {
						font-size: 30upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(43, 84, 144, 1);
						margin-left: 20upx;
						margin-right: 16upx;
					}
				}

				.snapping_buy_time {
					display: flex;
					align-items: center;
					font-size: 24upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);

					.count {
						font-size: 28upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						margin-left: 16upx;
					}
				}
			}
		}

		.product-comment {
			.product-comment-item {
				display: flex;
				font-size: 28upx;
				padding: 30upx 30upx 0;
				box-sizing: border-box;

				.user_icon {
					width: 70upx;
					height: 70upx;
					margin-right: 24upx;

					image {
						width: 70upx;
						height: 70upx;
					}
				}

				.product-comment-item-message {
					padding-bottom: 32upx;
					border-bottom: 1upx solid #e3e3e3;

					.product_comment_user_name {
						display: flex;
						align-items: center;

						image {
							width: 26upx;
							height: 26upx;
							margin-left: 10upx;
						}
					}

					.add_time {
						font-size: 24upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						margin-top: 10upx;
						margin-bottom: 22upx;

						.add_time_left {
							padding-right: 22upx;
						}
					}

					.comment-content {
						line-height: 1.5;
					}

					.comment-img {
						margin-top: 22upx;

						image {
							width: 148upx;
							height: 148upx;
							border-radius: 4upx;
							margin-right: 10upx;
						}
					}
				}

				.periods {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 24upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);

					.periods_commit {
						display: flex;

						view {
							display: flex;
							align-items: center;

							image {
								width: 30upx;
								height: 30upx;
								margin-right: 10upx;
							}
						}

						.periods_like {
							margin-right: 34upx;
						}
					}
				}
			}
		}
	}

	.detail_imgurllist {
		image {
			width: 100%;
		}
	}

	.particulars_item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 32upx;
		font-weight: 500;
		color: #333333;
		padding: 26upx 28upx;
		box-sizing: border-box;
		border-bottom: 1upx solid #e3e3e3;

		.designation {
			font-size: 30upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}

		.view_more {
			font-size: 24upx;
			color: #999999;
			display: flex;
			align-items: center;

			image {
				width: 18upx;
				height: 30upx;
				margin-left: 12upx;
			}
		}

		.count_down {
			image {
				width: 24upx;
				height: 24upx;
				margin-right: 12upx;
			}
		}
	}

	.footer {
		width: 100%;
		height: 97upx;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		left: 0;

		.service_icon {
			width: 97upx;
			height: 97upx;
			padding: 30upx;
			box-sizing: border-box;

			image {
				width: 36upx;
				height: 35upx;
			}
		}
		.buy_now_area {
			flex: 1;
			background: linear-gradient(to right, #e5d0a3, #d2b482);
			line-height: 97upx;
			text-align: center;
			color: #ffffff;
			font-size: 24upx;
		}
	}
}
</style>

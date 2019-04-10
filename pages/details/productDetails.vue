<template>
	<view class="product_details_wrapper" v-if="productDetail">
		<!-- 顶部导航 -->
		<view class="header">
			<view class="left-arrow">
				<image :src="nav_icon_back" @click="goBack"></image>
			</view>
			<view class="product_title">
				<view class="product_title_item" v-for="(item,i) in ['商品','详情']" :key='i' :class="[selectedIndex==i?'activeBd':'initialBd']" @click="changeIndex(i)" >
					{{item}}
				</view>
			</view>
			<view class="share">
				<image :src="share_icon"></image>
			</view>
		</view>
		<!-- 轮播 -->
		<view class="scroll-wrapper">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item class="swiper-item" v-for="(item,i) in banners" :key='i'>
					<view>
						<image :src="item"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 价格 倒计时 -->
		<view class="price-section">
			<view class="price-section-item">
				<view class="price">
					￥1
				</view>
				<view>距结束仅剩</view>
			</view>
			<view class="price-section-item">
				<view>152人购买</view>
				<view>22时30分44秒</view>
			</view>
		</view>
		<!-- 商品信息  -->
		<view class="product-info">
			<view class="product-info-title">
				<span class="pinkage">{{freight}}</span>
				<span class="info-name">{{productInfoModel}}</span>
			</view>
			<view class="rule">
				<view class="product-info-guarantee">
					<view class="product-info-guarantee-item" v-for="(item,i) in commitment" :key="i">
						<image :src="icon_lable"></image>
						<view>{{item}}</view>
					</view>
				</view>
				<view class="rule-info">{{guarantee}}</view>
			</view>
		</view>
		<!-- 中签 -->
		<view class="winning_periods">
			<view class="particulars_item">
				<view class="periods">第 {{count}} 期</view>
				<view class="count_down">
					<view>
						<image :src="icon_time"></image>距揭晓还剩
					</view>
					<view>1:33:4:</view>
				</view>
			</view>
			<view class="particulars_item">
				<view class="designation">往期中签</view>
				<view class="view_more">
					<view>{{count}}</view>
					<image :src="icon_right"></image>
				</view>
			</view>
		</view>
		<!-- 正在抢购 -->
		<view class="winning_periods">
			<view class="particulars_item">
				<view class="designation">正在抢购</view>
				<view class="view_more">
					<view>抢购详情</view>
					<image :src="icon_right"></image>
				</view>
			</view>
			<view class="snapping_buy">
				<view class="snapping_buy_item" v-for="(commentUser,index) in commentModelList" :key='index'>
					<view class="designation">
						<image class="snapping_buy_user_icon" :src="commentUser.userIcoin"></image>
						<view class="snapping_buy_user_name">{{commentUser.userName}}</view>
						<image class="snapping_buy_user_sex" :src="icon_man"></image>
					</view>
					<view class="snapping_buy_time">
						<view>一分钟前</view>
						<view class="count">抢购199份</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 晒单 -->
		<view class="winning_periods">
			<view class="particulars_item">
				<view class="designation">晒单 </view>
				<view class="view_more">
					<view>查看更多</view>
					<image :src="icon_right"></image>
				</view>
			</view>
			<view class="product-comment">
				<view class="product-comment-item" v-for="(commentUser,index) in commentModelList" :key='index'>
					<view class="user_icon">
						<image :src="commentUser.userIcoin"></image>
					</view>
					<view class="product-comment-item-message">
						<view class="product_comment_user_name">
							<view>{{commentUser.userName}}</view>
							<image :src="icon_man"></image>
						</view>
						<view class="add_time">
							<span class="add_time_left">{{commentUser.time}}</span>
						</view>
						<view class="comment-content">{{commentUser.content}}</view>
						<view class="comment-img">
							<block v-for="(item,i) in commentUser.imageUrlList" :key="i">
								<image :src="item"></image>
							</block>
						</view>
						<view class="periods">
							<view>期数: {{commentUser.qishu}}</view>
							<view class="periods_commit">
								<view class="periods_like">
									<image :src="btn_like"></image>
									<view>999</view>
								</view>
								<view>
									<image :src="btn_message"></image>
									<view>999</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view></view>
	</view>
</template>
<script>
	import api from '../../util/api.js';
	import {
		mapState
	} from 'vuex';
	export default {
		computed: {
			...mapState({
				productDetail:state=>state.productDetail.productDetail
			}),
			banners(){
				if(this.productDetail===null)return [];
				return this.productDetail.productItemModel.productShowImageUrlList
			}
		},
		methods: {
			changeIndex(ind){
				this.selectedIndex = ind
			},
			goBack(){
				uni.go
			},
			async fetchProductDetails(){
				const res = await api.productDetails({
					discountGameId:1
				});
				this.$store.commit('productDetail/setProductDetails',res)
			}
		},
		onLoad(){
			this.fetchProductDetails()
		},
		data() {
			return {
				selectedIndex:0,
				commentModelList: [{
						userIcoin: "../../static/home/home_shop_1.png",
						userName: "电视成金",
						time: 123,
						qishu: 201805260002,
						content: "中签了，太棒了，手气相当不错，真的是0元呀，没问题，看图说话。",
						imageUrlList: [
							"../../static/home/home_shop_1.png",
							"../../static/home/home_shop_1.png",
							"../../static/home/home_shop_1.png",
						]
					},
					{
						userIcoin: "../../static/home/home_shop_1.png",
						userName: "电视成金",
						time: 123,
						qishu: 201805260002,
						content: "中签了，太棒了，手气相当不错，真的是0元呀，没问题，看图说话。",
						imageUrlList: [
							"../../static/home/home_shop_1.png",
							"../../static/home/home_shop_1.png",
							"../../static/home/home_shop_1.png",
						]
					}
				],
				count: "2019078",
				freight: "一折购",
				productInfoModel: "伊利 安慕希希腊风味常温酸奶原味205g*12盒/礼盒装",
				guarantee: "从0～9中选3个号码，选中即享1折。中签号码与当天3D中奖号码同步，每天22:00揭晓，不中全额退款，源自京东自营商品，天天发货。",
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				share_icon: "../../static/details/share_icon.png",
				icon_right: "../../static/details/icon_right.png",
				icon_lable: "../../static/details/icon_lable.png",
				icon_time: "../../static/details/icon_time.png",
				btn_like: "../../static/details/btn_like.png",
				btn_message: "../../static/details/btn_message.png",
				icon_man: "../../static/details/icon_man.png",
				icon_woman: "../../static/details/icon_woman.png",
				nav_icon_back: "../../static/details/nav_icon_back.png",

				imageUrlList: [{
					imgUrl: "../../static/home/home_shop_1.png"
				}, {
					imgUrl: "../../static/home/home_shop_1.png"
				}, {
					imgUrl: "../../static/home/home_shop_1.png"
				}, {
					imgUrl: "../../static/home/home_shop_1.png"
				}, ],
				commitment: ["破损包退", "正品保证", "七天退换", "极速退款"]
			};
		},

	}
</script>
<style lang="less">
	.product_details_wrapper {
		width: 100%;
		background-color: #F3F3F3;
		
		.header {
			width:100%;
			height: 96upx;
			padding:0 30upx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			border-bottom: 1upx solid #E9E9E9;
			position:fixed;
			top:0;
			left:0;
			z-index: 111;
			.left-arrow {
				width: 20upx;
				height: 36upx;
				image {
					width: 20upx;
					height: 36upx;
				}
			}
			.product_title {
				width:200upx;
				height: 94upx;
				background: #FFFFFF;			
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-sizing: border-box;
				font-size: 32upx;
				color: #333;
					.activeBd{
						border-bottom: 4upx solid #333333;
					}
					.initialBd{
						border:none;
					}
				.product_title_item{
					height: 94upx;
					line-height: 94upx;
				}
			}

			.share {
				width: 36upx;
				height: 30upx;
				image {
					width: 36upx;
					height: 30upx;
				}
			}
		}

		.scroll-wrapper {
			height: 700upx;
			width: 100%;

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
			background: linear-gradient(to right, #F9D423, #F83600);
			color: #FFFFFF;
			font-size: 28upx;
			padding: 20upx 24upx 0 24upx;
			box-sizing: border-box;

			.price-section-item {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.price {
					font-size: 40upx;
				}
			}
		}

		.product-info {

			background: #FFFFFF;

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
					background: #FF594B;
					border-radius: 6upx;
					color: #FFFFFF;
					font-size: 20upx;
					margin-right: 8upx;
					padding-left: 10upx;
					padding-right: 10upx;
				}
			}

			.rule {
				padding: 22upx;
				box-sizing: border-box;
				background: #F9F9FA;

				.product-info-guarantee {
					display: flex;
					align-items: center;
					// justify-content: space-around;
					margin-top: 20upx;
					font-size: 26upx;
					color: #E22537;

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

		.winning_periods {
			margin-top: 20upx;
			background: #FFFFFF;

			.snapping_buy {
				.snapping_buy_item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #333333;
					padding: 26upx 28upx;
					box-sizing: border-box;
					border-bottom: 1upx solid #E3E3E3;

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
						border-bottom: 1upx solid #E3E3E3;

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

		.particulars_item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 32upx;
			font-weight: 500;
			color: #333333;
			padding: 26upx 28upx;
			box-sizing: border-box;
			border-bottom: 1upx solid #E3E3E3;

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

	}
</style>

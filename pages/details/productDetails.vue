<template>
	<view class="product_details_wrapper" v-if="productDetail">
		<!-- 顶部导航 -->
		<view class="header">
			<view class="left-arrow" @click="goBack">
				<image :src="nav_icon_back" ></image>
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
					￥<span class="big">{{productDetail.productItemModel.oneDiscountPrice}}</span>
				</view>
				<view class="vip">
					<image :src="icon_vip"></image>
					<view class="original_price">市场价 ￥{{productDetail.productItemModel.originalPrice}}</view>
				</view>
			</view>
			<view class="price-section-item">
				<view><image class="icon_fire" :src="icon_fire"></image>已抢{{productDetail.currentPurchaseCount}}件</view>
			</view>
		</view>
		<!-- 商品信息  -->
		<view class="product-info">
			<view class="product-info-title">
				<span class="pinkage">一折购</span>
				<span class="info-name">{{productDetail.productItemModel.productName}}</span>
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
				<view class="periods">第 {{productDetail.discountGameStage}} 期</view>
				<view class="count_down">
					<view>
						<image :src="icon_time"></image>距揭晓还剩
					</view>
					<view>{{productDetail.openResultTime}}</view>
				</view>
			</view>
			<view class="particulars_item">
				<view class="designation">往期中签</view>
				<view class="view_more">
					<view>123456</view>
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
		<view class="winning_periods">
			<view class="particulars_item">
				<view class="designation">商品详情</view>
			</view>
			<view class="detail_imgurllist">
				<block v-for="(item,i) in productDetail.productItemModel.productDetailImageUrlList" :key="i">
					<image :src="item.productDetailImageUrl" mode="widthFix"></image>
				</block>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="left_message">
				<image class="top" :src="btn_message"></image>
				<view class="name">客服</view>
			</view>
			<view class="left_message">
				<image class="top"  :src="btn_collection"></image>
				<view class="name">关注</view>
			</view>
			<view class="right_buy" @click="confirmOrder(true)">
				<view class="top" >￥{{productDetail.productItemModel.originalPrice}}</view>
				<view class="big">全价购买</view>
			</view>
			<view class="right_buy bgr" @click="confirmOrder(false)">
				<view class="top" >￥{{productDetail.productItemModel.oneDiscountPrice}}</view>
				<view class="big">一折抢购</view>
			</view>
		</view>
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
				uni.navigateBack();
			},
			async fetchProductDetails(productId){
				const res = await api.productDetails({
					discountGameId:productId
				});
				this.$store.commit('productDetail/setProductDetails',res)
			},
			confirmOrder(directBuy){
				uni.navigateTo({
					url:'../chooseCode/confirmOrder?discountGameId='+ this.productDetail.discountGameId+'&directBuy='+directBuy
				})
			}
		},
		onLoad(opt){
			console.log('详情啊=========',opt.productId)
			this.fetchProductDetails(opt.productId)
		},
		data() {
			return {
				selectedIndex:0,
				commentModelList: [{
						userName: "电视成金",
						time: 123,
						qishu: 201805260002,
						content: "中签了，太棒了，手气相当不错，真的是0元呀，没问题，看图说话。",
						imageUrlList: []
					},
					{
						userIcoin: "../../static/home/home_shop_1.png",
						userName: "电视成金",
						time: 123,
						qishu: 201805260002,
						content: "中签了，太棒了，手气相当不错，真的是0元呀，没问题，看图说话。",
						imageUrlList: []
					}
				],
				guarantee: "从0～9中选3个号码，选中即享1折。中签号码与当天3D中奖号码同步，每天22:00揭晓，不中全额退款，源自京东自营商品，天天发货。",
				commitment: ["破损包退", "正品保证", "七天退换", "极速退款"],
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
				icon_vip: "../../static/details/icon_vip.png",
				icon_fire: "../../static/details/icon_fire.png",
				btn_collection: "../../static/details/btn_collection.png",
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
			display: flex;
			justify-content: space-between;
			align-items: center;
			.price-section-item{
				display: flex;
				flex-direction: row;
				align-items: center;
				.icon_fire{
					width:20upx;
					height:32upx;
					margin-right:6upx;
				}
				.price{
					font-size:32upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(212,27,45,1);
					line-height:42upx;
					margin-right:14upx;
					.big{
						font-size:60upx;
					}
				}
				.vip{
					font-size:22upx;
					font-family:PingFangSC-Light;
					font-weight:300;
					text-decoration:line-through;
					color:rgba(255,255,255,1);
					line-height:42upx;
					image{
						width:108upx;
						height:32upx;
					}
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
		
		.detail_imgurllist{
			image{
				width:100%;
				
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
		
		.footer {
			width:100%;
			height: 98upx;
			background: #FFFFFF;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			align-items: center;
			.left_message{
				flex:1;
				font-size:20upx;
				font-family:HiraginoSansGB-W3;
				font-weight:normal;
				color:rgba(51,51,51,1);
				image{
					width:36upx;
					height:36upx;
				}
			}
			.right_buy{
				flex:3;
				background: #F4A360;
				font-size:26upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(255,255,255,1);
				.big{
					font-size:28upx;
				}
			}
			.bgr{
				background:#CC2636;
			}
			
			.left_message,
			.right_buy{
				height: 98upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.top{
					margin-bottom:10upx;
				}
			}
		}

	}
</style>

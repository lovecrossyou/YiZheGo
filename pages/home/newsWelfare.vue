<template>
	<view class="news_welfare_wrapper">
		<!-- <view class="search_wrapper">
			<view class="back_home">
				<image :src=""></image>
			</view>
			<view class="search_wrapper_center_input">
				<image :src="home_search" alt="" />
				<view>搜索商品</view>
			</view>
		</view> -->
		<view class="tab_filtrate_wrapper">
			<tabFiltrate :data="navBarListTit"></tabFiltrate>
			<view class="recommend_wrapper">
				<view class="recommend_item" v-for='(item,i) in newsBenefitList' :key='i' @click="goDetail(item.discountGameId)">
					<view class="recommend_item_img">
						<image :src="item.productImageUrl" alt="" mode="aspectFill"/>
					</view>
					<view class="recommend_item_intro">
						<view class="recommend_item_title">
							<span class="discount">1折购</span>
							<span>{{item.productName}}</span>
						</view>
						<view class="recommend_item_intro_sale">
							<view class="price">￥<span style="font-size: 36upx;">{{item.oneDiscountPrice/100}}</span></view>
							<view class="already_sale"><image :src="home_huo_icon"></image>已抢{{item.currentPurchaseCount}}件</view>
						</view>
					</view>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import tabFiltrate from './components/tabFiltrate';
	import product from './components/product';
	export default {
		data(){
			return {
				navBarListTit:['综合','价格','销量'],
				home_search: "../../static/home/home_search.png",

			}
		},
		computed:{
			...mapState('home',['newsBenefitList','timeLimitChoiceList'])
		},
		methods:{
			goDetail(productId){
				uni.navigateTo({
					url:"/pages/details/productDetails?productId="+productId
				})
			},
			
		},
		components:{
			tabFiltrate,
			product
		}
	}
</script>

<style lang="less">
	.news_welfare_wrapper {
		width: 100%;
		background:#FFFFFF;
		.search_wrapper{
			background:#FFFFFF;
			.search_wrapper_center_input {
				width: 100%;
				height: 64upx;
				background:rgba(56,56,56,0.08);
				padding-left: 28upx;
				box-sizing: border-box;
				line-height: 64upx;
				border-radius: 10upx;
				font-size: 28upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				image {
					width: 24upx;
					height: 24upx;
					margin-right: 10upx;
					box-sizing: border-box;
				}
			}
		}
		.recommend_wrapper {
				width: 100%;
				background: rgba(244, 248, 251, 1);
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-top:12upx;
				.recommend_item {
					flex-basis: 49.8%;
					background: rgba(255, 255, 255, 1);
					overflow: hidden;
					margin-bottom: 4upx;
		
					.recommend_item_img {
						width: 100%;
						height: 344upx;
		
						image {
							width: 100%;
							height: 344upx;
						}
					}
		
					.recommend_item_intro {
						width: 100%;
						font-size: 28upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						color: rgba(31, 31, 31, 1);
						padding: 20upx 14upx;
						box-sizing: border-box;
		
						.recommend_item_title {
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							display:-webkit-box;               
							-webkit-box-orient:vertical;
							-webkit-line-clamp:2; 
							.discount{
								background:rgba(226,37,55,1);
								border-radius:6upx;
								font-size:22upx;
								font-family:PingFang-SC-Medium;
								font-weight:500;
								color:rgba(255,255,255,1);
								line-height:1.2;
								padding:0 10upx;
								margin-right:10upx;
							}
						}
		
						.recommend_item_intro_sale {
							margin-top: 10upx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							.price{
								font-size:24upx;
								color: #CC2636;
							}
							.already_sale{
								font-size:22upx;
								font-family:PingFang-SC-Regular;
								font-weight:400;
								color:rgba(102,102,102,1);
								image{
									width:14upx;
									height:14upx;
									margin-right:10upx;
								}
							}
						}
					}
				}
		}
		
		
	}
	
</style>
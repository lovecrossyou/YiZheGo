<template>
	<view class="recommend_wrapper">
		<view class="recommend_item" v-for='(item,i) in timeLimitChoiceList' :key='i' @click="goDetail(item.productId)">
			<view class="recommend_item_img">
				<image :src="item.timeLimitProductImageUrl " alt="" />
			</view>
			<view class="recommend_item_intro">
				<view class="recommend_item_title">
					<span class="discount">一折购</span>
					<span>{{item.productName}}</span>
				</view>
				<view class="recommend_item_intro_sale">
					<view class="price">￥<span style="font-size: 36upx;">{{item.oneDiscountPrice}}</span></view>
					<view class="already_sale"><image :src="home_huo_icon"></image>已抢{{item.currentPurchaseCount}}件</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		computed:{
			...mapState({
				timeLimitChoiceList:state=>state.home.timeLimitChoiceList,
			})
		},
		data() {
			return {
				home_huo_icon:'../../static/home/home_huo_icon.png',
				recommendProductModelList: [
					{
						imageUrl:"../../static/home/home_shop_1.png",
						productName:"周杰伦",
						productPrice:99999,
						productId:1
					},{
						imageUrl:"../../static/home/home_shop_1.png",
						productName:"周杰伦周杰伦周杰伦周杰伦周杰伦周杰伦周杰伦周杰伦周杰伦周杰伦",
						productPrice:99999,
						productId:2
					},{
						imageUrl:"../../static/home/home_shop_1.png",
						productName:"周杰伦",
						productPrice:99999,
						productId:3
					},{
						imageUrl:"../../static/home/home_shop_1.png",
						productName:"周杰伦",
						productPrice:99999,
						productId:4
					},
				]
			}
		},
		methods:{
			goDetail(productId){
				uni.navigateTo({
					url:"/pages/details/productDetails"
				})
			},
			
		}
	}
</script>

<style lang="less">
	.recommend_wrapper {
		width: 100%;
		background: rgba(244, 248, 251, 1);
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.recommend_item {
			flex-basis: 49%;
			background: rgba(255, 255, 255, 1);
			border-radius: 10upx;
			overflow: hidden;
			margin-bottom: 14upx;

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
</style>

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
			<product style="{margin-top: 10upx}"></product>
		
		</view>
	</view>
</template>

<script>
	import tabFiltrate from './components/tabFiltrate';
	import product from './components/product';
	export default {
		data(){
			return {
				navBarListTit:['综合','价格','销量'],
				home_search: "../../static/home/home_search.png",

			}
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
	}
	
</style>
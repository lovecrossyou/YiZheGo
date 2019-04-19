<template>
	<view class="uni-tab-bar">
		<view id="tab-bar" class="uni-swiper-tab">
			<view
				v-for="(tab, index) in tabBars"
				:key="tab.id"
				:class="['swiper-tab-list', tabIndex == index ? 'active' : '']"
				:id="tab.id"
				:data-current="index"
				@click="tapTab(index)"
			>
				{{ tab.name }}
			</view>
		</view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab, index1) in orderData" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="getMoreOrder(index1)" v-if="tab.list.length > 0">
					<block v-for="(orderItem, index2) in tab.list" :key="index2">
						<view class="order-item" @click="goDetail(orderItem.platformOrderNo)">
							<view class="top">
								<text class="time">下单时间：{{ orderItem.orderTime }}</text>
								<text class="state">{{ orderItem.orderStatus }}</text>
							</view>
							<productInfo
								:productImg="orderItem.productImageUrl"
								:productName="orderItem.productName"
								:currentPrice="(orderItem.oneDiscountPrice / 100).toFixed(2)"
								:originPrice="(orderItem.originalPrice / 100).toFixed(2)"
							></productInfo>

							<view class="bottom">
								
								<view class="count">共{{ orderItem.purchaseCount }}件{{ '&#8195;' }}实付款：￥
								<priceText
								:price="(orderItem.totalPayPrice / 100).toFixed(2)"
								></priceText>
								</view>
							</view>
						</view>
					</block>

					<view class="uni-tab-bar-loading"><uni-load-more :loadingType="tab.loadingType" :contentText="loadingText"></uni-load-more></view>
				</scroll-view>
				<view class="empty-content" v-else>
					<image class="empty-img" :src="emptyIcon"></image>
					<text class="empty-tips">您还没有相关的订单</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
import mediaList from '../components/mediaList.vue';
import uniLoadMore from '../components/uni-load-more.vue';
import productInfo from '../components/productInfo.vue';
import priceText from '../components/priceText.vue';
import { mapActions, mapState } from 'vuex';
export default {
	components: {
		mediaList,
		uniLoadMore,
		productInfo,
		priceText
		
	},

	computed: {
		...mapState({
			orderData: state => state.myOrder.orderData
		}),
		
	},

	data() {
		return {
			loadingText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			icon: '../../../static/me/yaoqing.png',
			emptyIcon: '../../../static/me/icon_order.png',
			isClickChange: false,
			tabIndex: 0,
			tabBars: [
				{
					name: '全部',
					id: 'guanzhu'
				},
				{
					name: '待付款',
					id: 'tuijian'
				},
				{
					name: '待揭晓',
					id: 'tiyu'
				},
				{
					name: '已揭晓',
					id: 'redian'
				},
				{
					name: '中签/退款',
					id: 'caijing'
				}
			]
		};
	},
	onLoad: function() {
		//this.getOrderData();
		//this.addDataes(16);
	},
	onShow() {
		this.getOrderData();
	},
	methods: {
		...mapActions({
			getOrderData: 'myOrder/getOrderData',
			getMoreOrder: 'myOrder/addData'
		}),

		
		goDetail(platformOrderNo) {
			uni.navigateTo({
				url: './orderDetail?platformOrderNo=' + platformOrderNo
			});
		},
		loadMore(e) {
			this.newsitems[e].loadingType = 1;
			setTimeout(() => {
				this.addData(e);
			}, 1200);
		},
		addData(e) {
			if (this.newsitems[e].data.length > 30) {
				this.newsitems[e].loadingType = 2;
				return;
			}
			for (let i = 1; i <= 10; i++) {
				this.newsitems[e].data.push(this['data' + Math.floor(Math.random() * 5)]);
			}
			this.newsitems[e].loadingType = 1;
		},
		async changeTab(e) {
			let index = e.detail.current;
			if (this.isClickChange) {
				this.tabIndex = index;
				this.isClickChange = false;
				return;
			}
			this.isClickChange = false;
			this.tabIndex = index; //一旦访问data就会出问题
		},
		async tapTab(index) {
			//点击tab-bar
			if (this.tabIndex === index) {
				return false;
			} else {
				this.isClickChange = true;
				this.tabIndex = index;
			}
		},
	
	}
};
</script>

<style lang="less">
.uni-tab-bar {
	width: 100%;
	display: flex;
	flex: 1;
	flex-direction: column;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	.uni-swiper-tab {
		width: 100%;
		display: flex;
		flex-direction: row;
		line-height: 100upx;
		height: 100upx;
		border-top: 1upx solid #c8c7cc;
		justify-content: space-around;
		align-items: center;
		.swiper-tab-list {
			font-size: 30upx;

			text-align: center;
			color: #555;
		}
		.active {
			color: #cc2636;
			border-bottom: 3upx solid #cc2636;
		}
	}

	.swiper-box {
		flex: 1;
		width: 100%;
		.list {
			width: 100%;
			height: 100%;
			background-color: #efeff4;
			.order-item {
				width: 100%;
				background-color: white;
				display: flex;
				margin-top: 25upx;
				padding-left: 28upx;
				padding-right: 28upx;
				padding-top: 30upx;
				padding-bottom: 30upx;
				.top {
					display: flex;
					flex-direction: row;
					.time {
						flex: 1;
						font-size: 26upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(119, 119, 119, 1);
					}
					.state {
						font-size: 28upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(204, 38, 55, 1);
					}
				}
				.product {
					display: flex;
					flex-direction: row;
					margin-top: 34upx;
					.product-image {
						height: 140upx;
						width: 140upx;
						display: flex;
						border: 1upx solid #efeff4;
					}
					.product-info {
						display: flex;
						margin-left: 26upx;

						.one-tips {
							background: rgba(204, 38, 55, 1);
							border-radius: 5upx;
							font-size: 22upx;
							font-family: PingFang-SC-Medium;
							font-weight: 500;
							color: rgba(255, 255, 255, 1);
							position: absolute;
							line-height: 38upx;
							padding-left: 10upx;
							padding-right: 10upx;
						}
						.product-name {
							font-size: 30upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);
						}
						.product-prices {
							display: flex;
							flex-direction: row;
							align-items: center;
							margin-top: 24upx;

							.current-price {
								font-size: 34upx;
								font-family: PingFangSC-Regular;
								font-weight: 400;
								color: rgba(204, 38, 55, 1);
							}
							.origin-price {
								font-size: 24upx;
								font-family: PingFangSC-Light;
								font-weight: 300;
								text-decoration: line-through;
								color: rgba(119, 119, 119, 1);
								margin-left: 24upx;
							}
						}
					}
				}
				.bottom {
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					margin-top: 57upx;
					.count {
						display: flex;
						flex-direction: row;
						font-size: 26upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: #333333;
					}
				}
			}

			.uni-tab-bar-loading {
				padding: 20upx 0;
			}
		}
		.empty-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #efeff4;
			flex: 1;
			width: 100%;
			height: 100%;
			.empty-img {
				width: 134upx;
				height: 148upx;
				margin-top: 357upx;
			}
			.empty-tips {
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(119, 119, 119, 1);
				margin-top: 29upx;
			}
		}
	}
}
</style>

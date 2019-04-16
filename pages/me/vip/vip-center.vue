<template>
	<view class="main">
		<view class="top-img"></view>
		<view class="list">
			<view class="vip-item">
				<view class="item-img"></view>
				<view class="item-content">
					<view class="title">
						<view class="main-title">邀请好友20人</view>
						<view class="sub-title">
							<view class="tag"></view>
							<view class="text">
								赠送喜腾会 1个月 体验VIP会员
							</view>
						</view>
					</view>

					<view class="price-action">
						<view class="price">¥0.00</view>
						<view class="action">立即邀请</view>
					</view>
				</view>
			</view>

			<block v-for="(p,index) in vipProducts" :key='index'>
				<view class="vip-item" @click="goDetail(p)">
					<view class="item-img"></view>
					<view class="item-content">
						<view class="title">
							<view class="main-title">{{p.productName}}</view>
							<view class="sub-title">
								<view class="tag"></view>
								<view class="text">
									{{p.subtitle}}
								</view>
							</view>
						</view>

						<view class="price-action">
							<view class="price">¥{{p.price}}</view>
							<view class="action" @click="goDetail(p)">立即购买</view>
						</view>
					</view>
				</view>
		   </block>
		</view>
	</view>
</template>



<script>
	import api from '@/util/api.js'

	export default {
		data() {
			return {
				vipProducts: []
			}
		},
		methods: {
			turnToLuckyList() {
				console.log('xxxx');
				uni.navigateTo({
					url: './lucky-list'
				})
			},
			goDetail(p) {
				uni.navigateTo({
					url: "/pages/me/vip/vipProductDetails?productId=" + p.vipProductId
				})
			}
		},
		async onLoad() {
			const res = await api.vipProducts();
			this.vipProducts = res;
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100%;
		height: 100%;
		background-color: #f4f8fb;

		.top-img {
			width: 100%;
			height: 628upx;
			display: block;
			background: url("http://qnimage.xiteng.com/vip_top_img.png") no-repeat;
			background-size: 100% 100%;
		}

		.list {
			.vip-item {
				display: flex;
				flex: 1;
				flex-direction: row;
				align-items: center;
				width: 100%;
				height: 280upx;

				.item-img {
					width: 190upx;
					height: 190upx;
					margin-left: 30upx;
					background: url("http://qnimage.xiteng.com/vip_exp.png") no-repeat;
					background-size: 100% 100%;
				}

				.item-content {
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-between;
					height: 190upx;
					margin-left: 35upx;

					.title {
						flex-direction: column;
						justify-content: space-between;
						height: 76upx;

						.main-title {
							font-size: 32upx;
							color: #333333;
						}

						.sub-title {
							display: flex;
							flex-direction: row;
							align-items: center;

							.tag {
								width: 33upx;
								height: 23upx;
								background: url("http://qnimage.xiteng.com/vip_tag.png") no-repeat;
								background-size: 100% 100%;
							}

							.text {
								margin-left: 14upx;
								font-size: 26upx;
								color: #C9AE7D;
							}
						}

					}

					.price-action {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: flex-end;

						.price {
							font-size: 28upx;
							color: #DE3031;
						}

						.action {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 140upx;
							height: 45upx;
							margin-right: 34upx;
							border-radius: 23upx;
							background-color: #E1CA9C;
							font-size: 26upx;
							color: white;
						}
					}

				}
			}
		}
	}
</style>

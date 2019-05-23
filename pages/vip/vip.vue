<template>
	<view class="swiper">
		<view class="header">
			<swiper class="swiper-tall" :indicator-dots="indicatorDots" :autoplay="autoplay" :previous-margin="previousMargin"
			 :next-margin="nextMargin" :circular="circular" @change="change" :current="swiperCurrentIndex">
				<swiper-item class="swiper-container" v-for="(img,index) in imgs" :key="index" :item-id="index" :data-year="index">
					<view class="swiper-item" :animation="animationData[index]">
						<view class="xingfu">
							幸福卡
						</view>
						<view class="yueka">
							月卡/￥99
						</view>
						<view class="vip">
							VIP
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- VIP介绍 -->
			<view class="vip-items">
				<view class="vip-item">
					<image class="icon" src="../../static/vip/huiyuan_icon_1.png" mode="aspectFill"></image>
					<view class="title">
						全场一折购
					</view>
					<view class="desc">
						所有商品可参与
					</view>
				</view>
				<view class="vip-item">
					<image class="icon" src="../../static/vip/huiyuan_icon_2.png" mode="aspectFill"></image>
					<view class="title">
						每天可投5注
					</view>
					<view class="desc">
						中奖率高达0.05%
					</view>
				</view>
				<view class="vip-item">
					<image class="icon" src="../../static/vip/huiyuan_icon_3.png" mode="aspectFill"></image>
					<view class="title">
						幸福礼包
					</view>
					<view class="desc">
						同等价位礼物
					</view>
				</view>
			</view>
		</view>

		<!-- 幸福礼包 任选一款商品 -->
		<view class="libao">
			<view class="libao-title">
				<view class="libao-t">
					幸福礼包
				</view>
				<view class="libao-desc">
					任选一款商品
				</view>
			</view>

			<view class="libao-items">
				<view class="libao-item">
					<image class="icon" src="../../static/vip/huiyuan_icon_1.png" mode="widthFix"></image>
					<view class="desc">
						所有商品可参与
					</view>
				</view>
				<view class="libao-item">
					<image class="icon" src="../../static/vip/huiyuan_icon_1.png" mode="widthFix"></image>
					<view class="desc">
						所有商品可参与
					</view>
				</view>
				<view class="libao-item">
					<image class="icon" src="../../static/vip/huiyuan_icon_1.png" mode="widthFix"></image>
					<view class="desc">
						所有商品可参与
					</view>
				</view>
			</view>
		</view>


		<view class="btn_vip">
			开通幸福会员月卡
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				screenHeight: 0,
				animationData: {
					0: {},
					1: {},
					2: {}
				},
				title: '0',
				indicatorDots: false,
				autoplay: false,
				previousMargin: uni.upx2px(82) + 'px',
				nextMargin: uni.upx2px(82) + 'px',
				circular: true,
				zoomParam: 1.20,
				swiperCurrentIndex: 0,
				data: [],
				max: 0,
				imgs: [
					'../../static/1.jpg',
					'../../static/2.jpg',
					'../../static/3.jpg'
				]
			}
		},
		computed: {

		},
		onLoad() {
			this.animation = uni.createAnimation();
			this.animation.scale(this.zoomParam).step();
			this.animationData[0] = this.animation.export();
		},
		methods: {
			change(e) {
				this.swiperCurrentIndex = e.detail.current;
				this.title = e.detail.currentItemId;
				for (let key in this.animationData) {
					if (e.detail.currentItemId == key) {
						this.animation.scale(this.zoomParam).step();
						this.animationData[key] = this.animation.export();
					} else {
						this.animation.scale(1.0).step();
						this.animationData[key] = this.animation.export();
					}
				}
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: rgba(248, 248, 248, 1);
	}

	.swiper {
		width: 100%;
	}

	.header {
		/* background: linear-gradient(red, green, blue); */
		background-color: #007AFF;
		width: 100%;
		height:600upx ;
	}

	.swiper-container {
		display: flex;
		align-items: center;
		background: #FFFFFF;
	}

	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-left: 20upx;
		margin-right: 20upx;
		height: 100%;
		width: 611upx;
		text-align: center;
		broder-radius: 30upx !important;
		position: relative;
		background-color: #FF4161;
	}



	.swiper-tall {
		display: flex;
		align-items: center;
		height: 310upx;

	}



	.swiper-title {
		width: 750upx;
		text-align: center;
	}

	.xingfu {
		/* width: 153upx; */
		height: 49upx;
		font-size: 52upx;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		color: rgba(255, 245, 245, 1);
		line-height: 81upx;
		position: absolute;
		top: 71upx;
		left: 40upx;
	}

	.yueka {
		/* width: 83upx; */
		height: 31upx;
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		color: rgba(255, 245, 245, 1);
		line-height: 35upx;
		position: absolute;
		left: 40upx;
		bottom: 40rpx;
	}

	.vip {
		/* width: 222upx; */
		height: 107upx;
		font-size: 152upx;
		font-family: Ebrima;
		font-weight: bold;
		color: rgba(255, 245, 245, 1);
		line-height: 183upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
	}

	.vip-items {
		width: 100%;
		/* padding-top: 60upx; */
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 60upx;
		box-sizing: border-box;
		background: #FFFFFF;
	}

	.vip-item {
		/* margin-left: 80upx; */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.vip-item>image {
		width: 102upx;
		height: 102upx;
	}

	.title {
		padding-top: 10upx;
		font-size: 28upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(31, 31, 31, 1);
	}

	.desc {
		font-size: 24upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		text-align: center;
	}

	.libao {
		margin-top: 20upx;
		background: #FFFFFF;
	}

	.libao-title {
		display: flex;
		flex-direction: row;
		height: 120upx;
		align-items: center;
		padding: 20upx;
		box-sizing: border-box;
	}

	.libao-items {
		display: flex;
		flex-direction: row;
		/* height: 308upx; */
		align-items: center;
		padding: 20upx;
		/* box-sizing: border-box; */
		
		margin-bottom: 160upx;
	}

	.libao-item {
		width: 218upx;
		height: 308upx;
		background: rgba(248, 248, 248, 1);
		border: 2upx solid rgba(255, 174, 185, 1);
		box-shadow: 0upx 5upx 35upx 0upx rgba(159, 21, 51, 0.13);
		border-radius: 8upx;
		margin-right: 15upx;
	}

	.libao-item>image {
		width: 218upx;
	}

	.libao-t {
		font-size: 32upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(31, 31, 31, 1);
		line-height: 80upx;
		text-align: center;
	}

	.libao-desc {
		font-size: 24upx;
		font-family: PingFang-SC-Regular;
		font-weight: bold;
		color: rgba(153, 153, 153, 1);
		line-height: 80upx;
	}

	.btn_vip {
		width: 669upx;
		height: 92upx;
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		background: #FF2C46;
		text-align: center;
		line-height: 92upx;
		border-radius: 46upx;
		color: #FFFFFF;
		position: fixed;
		bottom: 58upx;
		left: 40upx;
		right: 40upx;
	}
</style>

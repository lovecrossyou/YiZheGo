<template>
	<view>
		<view class="uni-padding-wrap" v-if="homeBannerLists.length!=0">
			<view class="page-section swiper">
				<view class="swiper-item uni-bg-red" @click="goRule(item.detailPage)">
					<!-- banner bg -->
					<image class="banner_bg" src="http://qnimage.xiteng.com/home_banner_bg.jpg" mode="widthFix"></image>
					<!-- adv -->
					<view class="ad">
						<view class="ad_wrapper">
							<image src="http://qnimage.xiteng.com/home_banner@2x.png" mode="widthFix"></image>
						</view>
					</view>
					<!-- vip  -->
					<view class="vip" @click.stop="goVIP">
						<view class="vip_wrapper">
							<image src="http://qnimage.xiteng.com/home_huiyuan_xf.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState('home', ['homeBannerLists'])
		},
		data() {
			return {
				mall_banner: "http://qnimage.xiteng.com/banner.png",
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				arr: []
			}
		},
		methods: {
			goVIP() {
				uni.navigateTo({
					url: '/pages/me/vip/vip-center'
				});
			},
			goRule(detailPage) {
				// console.log('detailPage',detailPage)
				uni.navigateTo({
					url: detailPage
				})
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			async fetchBannerLists() {
				this.$store.dispatch('home/fetchBannerLists')
			}
		},
		onLoad() {
			this.fetchBannerLists()
		}
	}
</script>

<style scoped>
	.swiper {
		height: 608upx;
		width: 100%;
		position: relative;
	}

	.ad {
		position: absolute;
		width: 100%;
		top: 125upx;
		height: 186upx;
		
	}
	
	.ad>image{
		width: 684upx;
	}
	
	.vip{
		position: absolute;
		width: 100%;
		bottom: 0;
		height: 270upx;
	}
	
	.vip_wrapper {
		display: flex;
		justify-content: center;
	}
	
	.vip_wrapper>image{
		width: 750upx;
		/* height: 270upx; */
	}

	.ad_wrapper {
		display: flex;
		justify-content: center;
	}

	.banner_bg {
		width: 100%;
		height: 608upx;
	}
</style>

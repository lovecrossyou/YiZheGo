<template>
	<view>
		<view class="uni-padding-wrap" v-if="homeBannerLists.length!=0">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots"  :interval="interval" :duration="duration">
						<swiper-item v-for='(item,i) in homeBannerLists' :key='i'>
							<view class="swiper-item uni-bg-red" @click="goRule(item.detailPage)">
								<image :src="item.bannerUrl" mode="widthFix"></image>
							</view>
						</swiper-item>
					</swiper>
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
			...mapState('home',['homeBannerLists'])
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
			goRule(detailPage){
				// console.log('detailPage',detailPage)
				uni.navigateTo({
					url:detailPage
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
			async fetchBannerLists(){
				this.$store.dispatch('home/fetchBannerLists')
			}
		},
		onLoad(){
			this.fetchBannerLists()
		}
	}
</script>

<style scoped>
	.swiper{
		height: 427upx;
	}
	.swiper-item>image {
		width: 100%;
		height: 427upx;
	}
</style>

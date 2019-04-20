<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper" @click="goRule">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots"  :interval="interval" :duration="duration">
						<swiper-item v-for='(item,i) in [1,2,3,4]' :key='i'>
							<view class="swiper-item uni-bg-red">
								<image :src="mall_banner"></image>
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
			goRule(){
				uni.navigateTo({
					url:"/pages/rule/rule"
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
			}
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

<template>
	<view class="main">
		<view class="header">
			<view class="topbg">
			</view>
			<view class="tab">
				<view class="tab_body">
					<wuc-tab textFlex :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
				</view>
			</view>
		</view>
		<swiper :current="TabCur2" class="swiper_body" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)"
		 indicator-active-color="rgba(255,255,255,0)" @change="swiperChange2">
			<swiper-item v-for="(item,index) in tabList2" :key="index">
				<div class="bg-white padding margin text-center text-black">{{item.name}}</div>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';

	export default {
		data() {
			return {
				TabCur: 0,
				tabList: [{
					name: '精选'
				}, {
					name: '订阅'
				}],
				TabCur2: 0,
				tabList2: [{
					name: '精选'
				}, {
					name: '订阅'
				}],
			}
		},
		components: {
			WucTab
		},
		methods: {
			tabChange(index) {
				this.TabCur = index;
				this.TabCur2 = index;
			},
			swiperChange2(e) {
				let {
					current
				} = e.target;
				this.TabCur2 = current;
				this.TabCur = current;
			},
		}
	}
</script>

<style>
	.main {
		width: 100%;
	}

	.header {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	.topbg {
		height: 120upx;
		border-radius: 100% 100% 100% 100% / 0% 0% 150% 150%;
		background-color: #feb1bb;
	}

	.tab {
		width: 686upx;
		height: 128upx;
		background: #fff;
		box-shadow: 0upx 5upx 18upx 0upx rgba(0, 0, 0, 0.05);
		border-radius: 8upx;
		margin: -80upx auto 0 auto;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.tab_body {
		width: 269upx;
	}

	.swiper_body {
		height: 140upx;
		margin-top: 160upx;
		background-color: #1AAD19;
	}
</style>

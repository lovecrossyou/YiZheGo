<template>
	<view class="mainBg" @click="enter">
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import api from '@/util/api.js';
	export default {
		methods: {
			enter() {
				uni.switchTab({
					url: "/pages/home/home"
				})
			},
			async fetchByTimeLimitList() {
				const res = await api.byTimeLimitList({})
				this.$store.commit('home/setByTimeLimitList', res)
			},
			async fetchTimeLimitChoiceList() {
				const res = await api.byTimeLimitChoiceList({})
				this.$store.commit('home/setTimeLimitChoiceList', res)
			},
			async fetchNewsBenefitList() {
				this.$store.dispatch('home/fetchNewsBenefitList');
			},
		},
		data() {
			return {

			};
		},
		onLoad() {
			this.fetchByTimeLimitList()
			this.fetchTimeLimitChoiceList()
			this.fetchNewsBenefitList()
		}
	}
</script>

<style>
	.mainBg{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url('http://qnimage.xiteng.com/WechatIMG1.jpeg') no-repeat center;
		background-size: 100% 100%;
	}
</style>

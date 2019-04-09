<template>
	<view class="mainBg" @click="enter">
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";

	export default {
		methods: {
			enter() {
				uni.switchTab({
					url: "/pages/home/home"
				})
			}
		},
		data() {
			return {

			};
		},
		onLoad() {

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

<template>
	<view class="wrapper">
		<view>{{QRcode.url}}</view>
	</view>
</template>

<script>
	import api from '@/util/api.js';
	export default {
		data() {
			return {
				QRcode:""
			}
		},
		methods: {
			async getQrCode() {
				let res = await api.qrCode({
					xitengCode :"000033"
				});
				this.QRcode = res;
				console.log("code",this.QRcode)
			},
		},
		onLoad(){
			this.getQrCode()
		}
	}
</script>

<style scoped>
	.wrapper{
		width: 100%;
	}
</style>

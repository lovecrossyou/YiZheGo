<template>
	<view class="wrapper">
		<view class="top_title_text">请设置支付密码，用于提现。</view>
		<inputPassword></inputPassword>
		<button type="warn" class="finish_btn">完成</button>
	</view>
</template>

<script>
	import inputPassword from '@/components/inputPassword.vue';
	export default {
		data() {
			return {
				
			}
		},
		components:{
			inputPassword
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.wrapper{
		width: 100%;
		background-color: #EFEFF4;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.top_title_text{
		width: 100%;
		text-align: center;
		color: #333333;
		font-size: 34upx;
		margin: 250upx 0 100upx 0;
	}
	.finish_btn{
		width: 680upx;
		height: 80upx;
		margin-top: 50upx;
	}
</style>

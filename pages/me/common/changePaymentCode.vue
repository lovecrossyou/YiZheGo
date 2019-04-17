<template>
	<view class="wrapper">
		<view class="top_title_text">请输入支付密码，以验证身份</view>
		<inputPassword></inputPassword>
		<button type="warn" class="login_btn" @click="goNext">下一步</button>
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
			goNext(){
				uni.navigateTo({
					url:"/pages/me/common/setPaymentCode"
				})
			}
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
	.login_btn{
		width: 680upx;
		height: 80upx;
		margin-top: 80upx;
	}
</style>

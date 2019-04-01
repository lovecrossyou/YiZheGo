<template>
	<view class="verify_wrapper">
		<view class="top_title">请输入验证码</view>
		<view class="verify_tel_num">短信验证码已发送至+86 156 0120 0051</view>
		<security-code v-model="authCode"></security-code>
	</view>
</template>

<script>
	import securityCode from "../components/securityCode.vue"
	export default {
		data() {
			return {
				
			}
		},
		components: {
			
		},
		computed: {
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.verify_wrapper{
		width: 100%;
		padding: 38upx;
		box-sizing: border-box;
	}
	.top_title{
		color: #333333;
		font-size: 40upx;
	}
	.verify_tel_num{
		color: #979696;
		font-size: 22upx;
		margin-top: 13upx;
	}
</style>

<template>
	<view class="wrapper">
		<uni-password ref="secrity" @input="onInput" @confirm="onConfirm">
			请设置支付密码，用于提现。
		</uni-password>
		<button type="warn" class="finish_btn" @click="completePaySetting">完成</button>
	</view>
</template>

<script>
	import uniPassword from '../../components/payPsw/uni-password.vue'
	import api from '@/util/api.js';

	export default {
		data() {
			return {
				paymentPassword: '',
				code: ''
			}
		},
		components: {
			uniPassword
		},
		methods: {

			onConfirm(pwd) {
				this.paymentPassword = pwd.value;
			},
			async completePaySetting() {
				if(this.paymentPassword.length!=6){
					uni.showToast({
						title: '请设置6位密码',
					    duration: 2000
					})
					return;
				}
				const params = {
					code: this.code,
					payPassword: this.paymentPassword,
					phoneNum: this.phoneNum
				}
				const res = await api.findPayPassword(params);
				uni.reLaunch({
					url: "/pages/home/home"
				})
			}
		},
		onLoad(opt) {
			const code = opt.code;
			const phoneNum = opt.phoneNum;

			this.phoneNum = phoneNum;
			this.code = code;
		}
	}
</script>

<style scoped>
	.wrapper {
		width: 100%;
		background-color: #EFEFF4;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.top_title_text {
		width: 100%;
		text-align: center;
		color: #333333;
		font-size: 34upx;
		margin: 250upx 0 100upx 0;
	}

	.finish_btn {
		width: 680upx;
		height: 80upx;
		margin-top: 50upx;
	}
</style>

<template>
	<view>
		<uni-password ref="secrity" @input="onInput" @confirm="onConfirm">
			设置支付密码，用于提现。
		</uni-password>
	</view>
</template>

<script>
	import uniPassword from '../components/payPsw/uni-password.vue'
	import uniIcon from '../components/payPsw/i-icon/i-icon.vue'
	import uniKeyboard from '../components/payPsw/uni-keyboard.vue'
	export default{
		components: {
			uniPassword,
			uniIcon,
			uniKeyboard
		},
		methods:{
			done(password) {
				console.log(password);
				console.log(this.$refs);
			},
			confirmPwd() {
				//this.$refs.keyboard.show();
			},
			onInput(e) {
				//e.cancel = true;
				console.log('输入密码------'+e.data);

			},
			onConfirm(e) {
				let password = e.value;
				console.log('确认密码------'+password);
			},
		}
	}
</script>

<style>
</style>

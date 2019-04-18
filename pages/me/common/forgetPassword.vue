<template>
	<view class="verify_login_wrapper">
		<view class="input_tel_area">
			<view class="add_front">+86</view>
			<input type="number" v-model="phoneNum" placeholder="请填写手机号" />
		</view>
		<view class="message_code_area">
			<input type="number" v-model="checkCode" placeholder="请填写验证码" />
			<button type="warn" @click="send">获取验证码</button>
		</view>
		<button type="warn" class="login_btn" @click="goNext">下一步</button>
	</view>
</template>

<script>
	import api from '@/util/api.js';
	export default {
		data() {
			return {
				checkCode:'',
				phoneNum:''
			};
		},
		components: {},
		computed: {},
		methods: {
			async send(){
				let res = await api.getVerificationCode({
					phoneNum: this.phoneNum,
					codeType: "findBackPayPassword"
				})
			},
			
			goNext(code) {
				uni.navigateTo({
					url: "/pages/me/common/setPaymentCode?code="+this.checkCode+'&phoneNum='+this.phoneNum
				})
			}
		}
	};
</script>

<style scoped>
	.verify_login_wrapper {
		width: 100%;
		padding: 38upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.input_tel_area {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.add_front {
		color: #333333;
		font-size: 22upx;
		margin-right: 30upx;
	}

	.input_tel_area>input {
		font-size: 28upx;
	}

	.message_code_area {
		width: 100%;
		height: 94upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1upx solid #ebeaea;
		margin-top: 30upx;
	}

	.message_code_area>input {
		font-size: 28upx;
		flex: 1;
	}

	.message_code_area>button {
		width: 130upx;
		height: 54upx;
		border-radius: 10upx;
		font-size: 22upx;
		padding-left: 0px;
		padding-right: 0px;
	}

	.login_btn {
		width: 100%;
		margin-top: 183upx;
	}

	.partition_line {
		width: 366upx;
		border-bottom: 1upx solid #e3e3e3;
		margin-top: 300upx;
		position: relative;
	}
</style>

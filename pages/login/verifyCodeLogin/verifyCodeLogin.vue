<template>
	<view class="verify_login_wrapper">
		<image src="../../../static/login/logo@2x.png" class="logo_icon"></image>
		<view class="input_tel_area">
			<view class="add_front">+86</view>
			<input type="number" @input="inputFn" placeholder="请输入手机号" v-model="formData.phoneNum" />
		</view>
		<view class="message_code_area">
			<input type="number" v-model="formData.checkCode" placeholder="请输入短信验证码" />
			<button type="warn" @click="send" :disabled="judge?true:false">获取验证码</button>
		</view>

		<!-- #ifdef MP-WEIXIN -->
		<button type="warn" class="login_btn" @getuserinfo="oauth('weixin')" open-type="getUserInfo">登录</button>
		<!-- #endif -->

		<!-- #ifdef APP-PLUS -->
		<button type="warn" class="login_btn" @click="login">登录</button>
		<!-- #endif -->

		<view class="partition_line">
			<view class="or_text">微信快捷登录</view>
		</view>
		<image src="../../../static/login/wechat@2x.png" mode="" class="weixin" @click="goWeChat"></image>
	</view>
</template>

<script>
	import api from '@/util/api.js';
	export default {
		data() {
			return {
				authCode: {},
				judge: true,
				getInputContent: '',
				formData: {
					phoneNum: '',
					checkCode: ''
				}
			};
		},
		components: {},
		computed: {},
		methods: {
			goWeChat() {
				uni.redirectTo({
					url: '../WeChatLogin/WeChatLogin'
				});
			},
			inputFn(e){
				if(e.target.value.length == 11){
					this.judge = false
				}
			},
			async wxlogin(params){
				this.$store.dispatch('wxlogin',params);
				
			},
			async login() {
				this.$store.dispatch('checkCodeLogin', this.formData);
			},
			async send() {
				let res = await api.getVerificationCode({
					phoneNum: this.formData.phoneNum,
					codeType: 'login'
				});
			},
			oauth(value) {
				let that = this;
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								const {
									encryptedData,
									iv
								} = infoRes;
								console.log("infoRes ", JSON.stringify(infoRes));
								console.log("res ", JSON.stringify(res));
								const params = {
									code: res.code,
									miniProgramsEncode: {
										"encryptedData": encryptedData,
										"iv": iv
									},
									phoneNum:that.formData.phoneNum,
									checkCode:that.formData.checkCode
								}
								that.wxlogin(params);
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
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

	.logo_icon {
		width: 90upx;
		height: 90upx;
		margin-top: 70upx;
	}

	.input_tel_area {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 100upx;
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

	.or_text {
		width: 190upx;
		color: #373737;
		font-size: 24upx;
		position: absolute;
		top: -15upx;
		left: 24.5%;
		background-color: #fff;
		text-align: center;
	}

	.weixin {
		width: 90upx;
		height: 74upx;
		margin-top: 50upx;
	}
</style>

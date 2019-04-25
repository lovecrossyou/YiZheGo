<template>
	<view class="wx_login_wrapper">
		<image src="../../../static/login/wechat@2x.png" class="wechat_icon"></image>
		<view class="wechat_text">微信快捷登录</view>
		<button open-type="getUserInfo" @getuserinfo="oauth('weixin')" type="warn" class="wechat_login_btn">登录</button>
		<view class="partition_line">
			<view class="or_text">或</view>
		</view>
		<view class="code_login" @click="goTelNumber">手机号验证码登录</view>
	</view>
</template>

<script>
	import {APP_KEY,genSignature} from "@/util/request.js"
	import api from '@/util/api.js';

	export default {
		data() {
			return {};
		},
		methods: {
			async wxlogin(params){
				this.$store.dispatch('wxlogin',params);
				
			},
			goTelNumber() {
				uni.redirectTo({
					url: "/pages/login/verifyCodeLogin/verifyCodeLogin"
				})
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
								console.log("infoRes## ", JSON.stringify(infoRes));
								console.log("res ", JSON.stringify(res));
								const {userInfo} = infoRes;
								const {openId,nickName,avatarUrl,gender} = userInfo;
								
								
								// #ifdef APP-PLUS
								const nativeParams = {
									userName:openId,
									app_key:APP_KEY,
									nickName,
									headImageUrl:avatarUrl,
									sex:gender,
									accessInfo:{
										app_key:APP_KEY,
										access_token:'',
										signature:genSignature(openId),
										phone_num:openId,
										loginType:'weixin'
									}
								}
								this.$store.dispatch('authwxappLogin',nativeParams)
															
								// #endif
								
								// #ifdef MP-WEIXIN
									const params = {
									code: res.code,
									miniProgramsEncode: {
										"encryptedData": encryptedData,
										"iv": iv
									}
								}
								that.wxlogin(params);
								// #endif
								
							
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
		}
	};
</script>

<style scoped>
	.wx_login_wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.wechat_icon {
		width: 120upx;
		height: 98upx;
		margin-top: 180upx;
	}

	.wechat_text {
		color: #333;
		font-size: 26upx;
		margin-top: 24upx;
	}

	.wechat_login_btn {
		width: 690upx;
		height: 88upx;
		background: #C00F0F;
		border-radius: 10upx;
		color: #fff;
		font-size: 32upx;
		line-height: 88upx;
		text-align: center;
		margin-top: 130upx;
	}

	.partition_line {
		width: 330upx;
		border-bottom: 1upx solid #E3E3E3;
		margin-top: 455upx;
		position: relative;
	}

	.or_text {
		width: 67upx;
		color: #373737;
		font-size: 24upx;
		position: absolute;
		top: -15upx;
		left: 38.5%;
		background-color: #fff;
		text-align: center;
	}

	.code_login {
		color: #C00F0F;
		font-size: 26upx;
		margin-top: 40upx;
	}
</style>

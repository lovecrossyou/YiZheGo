<template>
	<view class="verify_wrapper">
		<view class="top_title">请输入验证码</view>
		<view class="verify_tel_num">短信验证码已发送至+86 {{phoneNum}}</view>
		<view class="code_item">
			<security-code @inputFnOn="inputFnOn"></security-code>
		</view>
		<view class="count_down">{{content}}</view>
		<button type="warn" :disabled="judge" @click="goVerifyLogin">完成</button>
	</view>
</template>

<script>
	import securityCode from '../components/securityCode.vue';
	import api from "@/util/api.js"
	
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				judge: true,
				phoneNum: '',
				checkCode:'',
				content: '60s后重新发送',
			};
		},
		components: {
			securityCode
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			inputFnOn(value) {
				this.judge = false;
				this.checkCode = value;
			},
			async goVerifyLogin() {
				//完成绑定手机号
				const params = {
					phone_num: this.phoneNum,
					userIconUrl: this.userInfo.icon,
					check_code: this.checkCode
				}
				const res = await api.bindPhone(params);
				uni.reLaunch({
					url:"/pages/home/home"
				})
			},
			async sendCode(phoneNum) {
				let res = await api.getVerificationCode({
					phoneNum: phoneNum,
					codeType: "bindPhone"
				})
			}
		},
		onLoad(opt) {
			const phoneNum = opt.phoneNum;
			this.phoneNum = phoneNum;
			this.sendCode(phoneNum);
		},
		created(){
			const TIME_COUNT = 59;
			this.count = TIME_COUNT;
			this.timer = setInterval(() => {
				this.content = this.count + "s后重新发送";
				if (this.count > 0) {
					this.count--;
				}else{
					clearInterval(this.timer);
					this.timer= null;
					this.content = "重新发送"
				}
			}, 1000);
		}
	};
</script>

<style scoped>
	.verify_wrapper {
		width: 100%;
		padding: 38upx;
		box-sizing: border-box;
	}

	.top_title {
		color: #333333;
		font-size: 40upx;
	}

	.verify_tel_num {
		color: #979696;
		font-size: 22upx;
		margin-top: 13upx;
	}

	.code_item {
		margin-top: 100upx;
	}

	.count_down {
		margin: 100upx 0 50upx 0;
		color: #929191;
		font-size: 22upx;
		width: 100%;
		text-align: right;
	}
</style>

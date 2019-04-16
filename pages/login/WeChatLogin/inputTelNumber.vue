<template>
	<view class="tel_number_wrapper">
		<view class="title_text">输入手机号，快速注册</view>
		<view class="main_content">
			<view class="mainland_tel">
				<view class="left_text">中国</view>
				<view class="add_num">+86</view>
				<image src="http://qnimage.xiteng.com/right_icon@2x.png" mode="aspectFit" class="next_icon"></image>
			</view>
			<input type="number" value="" @input="inputFn" placeholder="请输入手机号" v-model="inputContent"/>
		</view>
		<button type="warn" class="next_btn" :disabled="judge?true:false" @click="goVerification">下一步</button>
	</view>
</template>

<script>
	import api from "@/util/api.js"
export default {
	data() {
		return {
			judge:true,
			authCode:{},
			getInputContent:null,
			inputContent:""
		};
	},
	components: {},
	computed: {},
	methods: {
		inputFn(e){ 
			if(e.target.value.length>=11){
				this.judge=false
			}
		},
		goVerification(){
			uni.navigateTo({
				url:"./verificationCode"
			});
			this.getInputContent = this.inputContent;
			console.log("getInputContent",this.getInputContent)
			
		},
		async verification() {
			let res = await api.getVerificationCode({
				phoneNum:"getInputContent",
				codeType:"Register"
			})
			this.authCode = res;
		},
	},
	onLoad(){
		this.verification()
	}
};
</script>

<style scoped>
.tel_number_wrapper {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 35upx;
	box-sizing: border-box;
}
.title_text {
	color: #333333;
	font-size: 40upx;
	margin-top: 100upx;
}
.main_content {
	width: 100%;
	margin-top: 100upx;
}
.mainland_tel {
	width: 100%;
	height: 100upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	color: #1c1c1c;
	font-size: 28upx;
}
.left_text {
	width: 60upx;
}
.add_num {
	margin-left: 23upx;
	flex: 1;
}
.next_icon {
	width: 13upx;
	height: 24upx;
}
.main_content > input {
	width: 100%;
	height: 100upx;
	color: #636363;
	font-size: 30upx;
}
.next_btn {
	width: 100%;
	height: 88upx;
	background:rgba(192,15,15,1);
	border-radius: 10upx;
	color: #DEDEDE;
	font-size: 30upx;
	margin-top: 140upx;
	opacity:0.74;
	line-height: 88upx;
	text-align: center;
}
</style>

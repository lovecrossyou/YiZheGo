<template>
	<view class="container">
		<uni-password ref="secrity" @input="onInput" @confirm="onConfirm">
			{{title}}
		</uni-password>
		<view class="done" v-if="!isFirstSetPsw" @click="done">完成</view>
	</view>
</template>

<script>
	import uniPassword from '../components/payPsw/uni-password.vue' 
	import uniIcon from '../components/payPsw/i-icon/i-icon.vue'
	import uniKeyboard from '../components/payPsw/uni-keyboard.vue'
	import api from '../../util/api.js';
	export default{
		data(){
			return{
				title:'设置支付密码',
				firstSetPsw:'',
				confirmPsw:'',
				isFirstSetPsw:true
			}
		},
		components: {
			uniPassword,
			uniIcon,
			uniKeyboard
		},
		methods:{
			confirmPwd() {
			},
			onInput(e) {
                  
			},
			onConfirm(e) {
				let password = e.value;
				console.log('确认密码------'+password);
				if(!this.isFirstSetPsw){
					this.confirmPsw = password;
				}else{
					this.firstSetPsw = password;
					this.title = "请再次填写确认";
					this.isFirstSetPsw = false;
					this.$refs.secrity.clear();
				}
			},
			async done(){
				console.log('一密码------'+this.firstSetPsw+'-----二密码-------'+this.confirmPsw);
				if(this.firstSetPsw!=this.confirmPsw){
					uni.showToast({
						title: '前后密码不一致',
                        duration: 2000
					})
					return;
				}
				const res = await api.setPayPassword({
					payPassword:this.firstSetPsw
				});
				console.log('设置密码结果------'+JSON.stringify(res));
				if(res.respMsg=='successful'){
					uni.showToast({
						title: '密码设置成功',
					    duration: 2000,
						success:uni.navigateBack()
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container{
		display: flex;
		flex-direction: column;
		height: 100%;
		align-items: center;
		background: #f5f5f5;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		.done{
			width:690upx;
			height:80upx;
			background:rgba(204,38,54,1);
			border-radius:5upx;
			font-size:36upx;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(245,245,245,1);
			line-height:90upx;
			margin-top: 20upx;
			text-align: center;
		}
	}
</style>

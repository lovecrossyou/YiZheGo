<template>
	<view class="wrapper">
		<view class="border_line"></view>
		<selectItemList title="修改支付密码" page="/pages/me/common/changePaymentCode"></selectItemList>
		<selectItemList title="忘记支付密码" page="/pages/me/common/forgetPassword"></selectItemList>
	</view>
</template>

<script>
	import selectItemList from '../components/selectItemList.vue';
	export default {
		data() {
			return {
				
			}
		},
		components:{
			selectItemList
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.wrapper{
		width: 100%;
	}
	.border_line{
		border-top: 1upx solid #DEDEDE;
	}
</style>

<template>
	<view class="wrapper">
		<!-- <selectItemList title="修改支付密码" page="/pages/me/common/changePaymentCode"></selectItemList> -->
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
</style>

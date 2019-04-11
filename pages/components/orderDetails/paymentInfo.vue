<template>
	<view class="payment_info_wrapper">
		<view class="payment_info_text">{{paymentText}}</view>
		<view class="payment_info_price">{{paymentPrice}}</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		props:{
			paymentText:String,
			paymentPrice:String
		},
		data() {
			return {
				
			}
		},
		components: {
			
		},
		computed: {
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.payment_info_wrapper{
		width: 100%;
		height: 70upx;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.payment_info_text{
		width: 150upx;
		text-align: left;
		color: #999;
		font-size: 28upx;
	}
	.payment_info_price{
		color: #1F1F1F;
		font-size: 28upx;
		width: 65upx;
		text-align: left;
	}
	
</style>

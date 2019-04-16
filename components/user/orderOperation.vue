<template>
	<view class="order_operation_wrapper">
		<view class="order_operation_item">
			<view class="order_operation_img">
				<img :src="img" alt="">
			</view>
			<view class="order_operation_text">{{operation}}</view>
		</view>
		
	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		props:{
			img:String,
			operation:String
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
	.order_operation_wrapper{
		width: 100%;
		display: flex;
		flex-direction: row;
	}
	.order_operation_item{
		flex: 1;
		height: 95upx;
		display:flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	.order_operation_img>img{
		width: 47upx;
		height: 45upx;
	}
	.order_operation_text{
		width: 100%;
		text-align: center;
		color: #1F1F1F;
		font-size: 26upx;
	}
</style>

<template>
	<view class="wrapper">
		<img :src="img" alt="" class="top_img">
		<view class="status_text">{{statusText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			img:String,
			statusText:String
		}
	}
</script>

<style scoped>
	.wrapper{
		width: 100%;
		height: 80upx;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.top_img{
		width: 44upx;
		height: 44upx;
	}
	.status_text{
		color: #666;
		font-size: 24upx;
	}
</style>

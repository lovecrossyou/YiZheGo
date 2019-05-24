<template>
	<view class="wrapper" @click="goNext">
		<view class="left_item">
			<!-- <image :src="img" class="item_img"></image> -->
			<view class="item_text">{{title}}</view>
		</view>
		<view class="right_item">
			<view class="right_text">{{all}}</view>
			<image src="http://qnimage.xiteng.com/next_go_icon.png" alt="" class="next_icon"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	props:{
		title:String,
		all:String,
		img:String,
		page:String
	},
	methods:{
		goNext(){
			uni.navigateTo({
				url:this.page
			})
		}
	}
};
</script>

<style scoped>
.wrapper {
	width: 100%;
	height: 88upx;
	background-color: #fff;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 20upx;
	box-sizing: border-box;
	justify-content: space-between;
}
.item_img{
	width: 44upx;
	height: 44upx;
}
.item_text{
	color: #1F1F1F;
	font-size: 32upx;
	margin-left: 11upx;
	font-weight: bold;
}
.left_item,
.right_item{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.right_text{
	color: #999999;
	font-size: 24upx;
	margin-right: 15upx;
}
.next_icon{
	width: 14upx;
	height: 24upx;
	margin-right: 13upx;
}
</style>

<template>
	<view class="wrapper">
		<view class="left_item">
			<view class="item_text">{{title}}</view>
		</view>
		<view class="right_item">
			<view class="right_text">{{leftText}}</view>
			<image src="http://qnimage.xiteng.com/next_go_icon.png" alt="" class="next_icon"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props:{
		title:String,
		leftText:String
	}
};
</script>

<style scoped>
.wrapper {
	width: 100%;
	height: 100upx;
	background-color: #fff;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 26upx;
	box-sizing: border-box;
	justify-content: space-between;
	border-bottom: solid 1upx rgba(229, 229, 229, 1);
}
.item_img {
	width: 44upx;
	height: 44upx;
}
.item_text {
	color: #666666;
	font-size: 28upx;
	margin-left: 11upx;
}
.left_item,
.right_item {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.right_text {
	color: #aaaaaa;
	font-size: 24upx;
	margin-right: 15upx;
}
.next_icon {
	width: 17upx;
	height: 30upx;
}
</style>

<template>
	<view class="wrapper">
		<view class="item_wrapper">
			<image class="top_img" :src="imgSrc" :style="{ width: imgWidth,height:imgHeight}"/>
			<view class="status_text">{{ statusText }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		imgSrc: String,
		statusText: String,
		imgWidth: String,
		imgHeight: String,
	},
	methods: {}
};
</script>

<style scoped>
.wrapper {
	width: 180upx;
}
.item_wrapper {
	width: 100%;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.status_text {
	width: 100%;
	color: #666;
	font-size: 26upx;
	text-align: center;
	margin-top: 18upx;
}
</style>

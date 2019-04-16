<template>
	<view>
		<view class="select-active" v-if="isselected" @tap="onchange"></view>
		<view class="select" v-else @tap="onchange"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		onchange() {
			this.$emit('change');
		}
	},
	props: {
		isselected: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style>
.select {
	border: 1upx solid rgba(254, 89, 75, 1);
	
	width: 28upx;
	height: 28upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 50%;
}
.select-active {
	border: 1upx solid rgba(254, 89, 75, 1);
	
	width: 28upx;
	height: 28upx;
	background: rgba(254, 89, 75, 1);
	border-radius: 50%;
}
</style>

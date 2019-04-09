<template>
	<view @click="enter">
		选号
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			enter(){
				uni.navigateTo({
					url:'../chooseCode/confirmOrder'
				})
			}
		}
	}
</script>

<style>

</style>

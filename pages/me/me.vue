<template>
	<view>
		<view @click="enter">
			选号1
		</view>
		<view @click="turnToVip">
			会员中心
		</view>
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
					url:'../chooseCode/chooseCode'
				})
			},
			turnToVip(){
				uni.navigateTo({
					url:'./vip/vip-center'
				})
			}
		}
	}
</script>

<style>

</style>

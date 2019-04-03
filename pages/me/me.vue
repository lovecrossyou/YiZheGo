<template>
	<view>
		<view @click="enter">
			选号3
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
			}
		}
	}
</script>

<style>

</style>

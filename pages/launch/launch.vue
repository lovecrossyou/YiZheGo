<template>
	<view @click="enter">
		进入首页
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	
	export default {
		methods:{
			enter(){
				uni.switchTab({
					url:"/pages/home/home"
				})
			}
		},
		data() {
			return {
				
			};
		},
		onLoad() {
			
		}
	}
</script>

<style>

</style>

<template>
	<view class="praisedetailWrapper">
		<block v-for="(item,index) in praisedetaillist" :key="index">
			<view>{{item.userName}}</view>
		</block>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				praisedetaillist:[]
			}
		},
		onLoad(options) {
			this.praisedetaillist=options.list
			console.log(this.praisedetaillist)
		}
	}
</script>

<style>
	.praisedetailWrapper{
		width: 100%;
	}
</style>

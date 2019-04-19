<template>
	<view  class="price" :style="priceStyle">{{price}}</view>
</template>

<script>
	export default{
		props: {
			price: {
				type: String,
				default: ''
			},
			priceStyle:{
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="less">
	.price{
		
		
	}
</style>

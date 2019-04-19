<template>
	<view>
		<web-view @message="EventHandler" :src="url"></web-view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {};
		},
		computed: {
			...mapGetters(['h5Page']),
			url(){
				return this.h5Page('rank/page')
			}
		},
		methods: {
			EventHandler: function(e) {
				
			}
		},
		onLoad() {
			console.log('url ###',this.url);
		}
	}
</script>

<style>

</style>

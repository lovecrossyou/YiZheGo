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
			return {
				extra:''
			};
		},
		computed: {
			...mapGetters(['h5Page']),
			url(){
				return this.h5Page('ximessage/page?extra='+this.extra)
			}
		},
		methods: {
			EventHandler: function(e) {
				
			}
		},
		onShow() {
			this.extra = Math.random(100000);
		}
	}
</script>

<style>

</style>

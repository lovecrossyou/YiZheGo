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
				return this.h5Page('ximessage/page')
			}
		},
		methods: {
			EventHandler: function(e) {
				
			}
		}
	}
</script>

<style>

</style>

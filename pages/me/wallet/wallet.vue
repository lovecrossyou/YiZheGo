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
				return this.h5Page('wallet/page?')
			}
		},
		methods: {
			EventHandler: function(e) {
				const addr_id = e.detail.data[0];
				this.$store.commit('confirmPay/setAddrId', addr_id);
			}
		},
		onLoad() {
			console.log('url ', this.url);
		}
	}
</script>

<style>

</style>

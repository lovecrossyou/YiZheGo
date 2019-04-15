<template>
	<view>
		<web-view @message="EventHandler" :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				url: 'http://192.168.1.235:8000/xitenggamenode/#/address/page?app_key=b5958b665e0b4d8cae77d28e1ad3f521&signature=99B3423B8F187025F01BBD01693CDB3A&access_token=7c6eaa31426d4b2a806fd4616a5d4250#wechat_redirect'
			};
		},
		methods: {
			EventHandler: function(e) {
				const addr_id = e.detail.data[0];
				console.log('addr_id ',addr_id);
				this.$store.commit('confirmPay/setAddrId',addr_id);
			}
		}
	}
</script>

<style>

</style>

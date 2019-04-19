<template>
	 <view>
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
    </view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {};
		},
		computed: {
			...mapGetters(['h5Page']),
			url(){
				return this.h5Page('3DHotSell/page')
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

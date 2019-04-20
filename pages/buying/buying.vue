<template>
	 <view>
        <web-view :src="url"></web-view>
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
			return {
				discountGameId:1
			};
		},
		computed: {
			...mapState(['userInfo']),
			...mapGetters(['h5Page']),
			url(){
				return this.h5Page('buyDetail/page?')
			}
		},
		onLoad(opt) {
			this.discountGameId = opt.discountGameId;
			
			console.log('buyDetail/page ',this.url);
		}
	}
</script>

<style>

</style>

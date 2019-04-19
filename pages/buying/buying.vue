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
				productId:1
			};
		},
		computed: {
			...mapGetters(['h5Page']),
			url(){
				return this.h5Page('buyDetail/page?'+'&id='+this.productId)
			}
		},
		onLoad(opt) {
			this.productId = opt.productId;
		}
	}
</script>

<style>

</style>

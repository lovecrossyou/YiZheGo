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
			...mapGetters(['h5Page']),
			url(){
				return this.h5Page('buyDetail/page?'+'&id='+this.discountGameId)
			}
		},
		onLoad(opt) {
			this.discountGameId = opt.discountGameId;
		}
	}
</script>

<style>

</style>

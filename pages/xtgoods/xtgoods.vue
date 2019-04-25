<template>
	<view v-if="page">
		<web-view :src="page"></web-view>
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
				page: null
			};
		},
		computed: {
			...mapGetters(['h5Page'])
		},
		methods: {

		},
		onLoad() {
			this.page = this.h5Page('3DHotSell/page');
		}
	}
</script>

<style>

</style>

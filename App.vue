<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(['hasLogin'])
		},
		onLaunch: function () {
			this.$store.dispatch('checkLoginStatus');
		},
		onShow: function () {
			// console.log('App Show')
		},
		onHide: function () {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

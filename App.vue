<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(['hasLogin'])
		},
		onLaunch: function () {
			console.log('App Launch hasLogin ', this.hasLogin);
			this.$store.dispatch('checkLoginStatus');
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

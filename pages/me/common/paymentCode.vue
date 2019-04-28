<template>
	<view class="wrapper">
		<!-- <selectItemList title="修改支付密码" page="/pages/me/common/changePaymentCode"></selectItemList> -->
		<selectItemList title="忘记支付密码" page="/pages/me/common/forgetPassword"></selectItemList>

		<button class="logout_btn" type="warn" @click="logOut">退出登录</button>
	</view>
</template>

<script>
import selectItemList from '../components/selectItemList.vue';
export default {
	data() {
		return {};
	},
	components: {
		selectItemList
	},
	methods: {
		logOut() {
			this.$store.commit('logout');
			uni.switchTab({
				url: '/pages/home/home'
			});
		}
	}
};
</script>

<style scoped>
.wrapper {
	width: 100%;
}
.border_line {
	border-top: 1upx solid #dedede;
}
.logout_btn {
	width: 85%;
	height: 85upx;
	font-size: 30upx;
	line-height: 85upx;
	margin-top: 100upx;
}
</style>

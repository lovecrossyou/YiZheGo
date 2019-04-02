<template>
	 <view>
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				url:'https://www.xiteng.com/xitenggamenode/#/rank/page?app_key=b5958b665e0b4d8cae77d28e1ad3f521&signature=99B3423B8F187025F01BBD01693CDB3A&access_token=7c6eaa31426d4b2a806fd4616a5d4250#wechat_redirect'
			};
		}
	}
</script>

<style>

</style>

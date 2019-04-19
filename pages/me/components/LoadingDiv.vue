<template>
	<div class="loading-tip">
		<span class="icon-loading"></span>
		<span class="loading-tip-text">{{loadingText}}</span>
	</div>
</template>

<script>
	export default {
		props: {
			loadingText: ''
		}
	}
</script>

<style scoped>
	.load-more {
		width: 100%;
		color: #c0c0c0;
		background: #f7f7f7;
	}

	/* .moreData-tip, */
	.loading-tip {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60px;


	}

	,
	.loading-tip-text {
		margin-left: 10upx;
		font-size: 28upx;
		color: #555555;
	}

	.noMoreData-tip {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60px;
		font-size: 28upx;
		color: #555555;
	}

	.loadMoudle .icon-loading {
		display: inline-flex;
		width: 35px;
		height: 35px;
		background: #00C456;
		background: url("http://qnimage.xiteng.com/loading.png") no-repeat;
		background-size: cover;
		margin-right: 5px;
		animation: rotating 2s linear infinite;
	}

	@keyframes rotating {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(1turn);
		}
	}

	.connectingLine {
		display: inline-flex;
		width: 150px;
		height: 2px;
		background: #ddd;
		margin-left: 20px;
		margin-right: 20px;
	}
</style>


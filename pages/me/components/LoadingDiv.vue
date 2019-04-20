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
		},
	}
</script>

<style scoped>
	.loading-tip {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		height: 60px;
	}

	.loading-tip-text {
		margin-left: 10upx;
		font-size: 28upx;
		color: #555555;
	}

	.icon-loading {
		display: inline-flex;
		width: 40px;
		height: 40px;
		background: url("../../../static/home/loading_half.png") no-repeat;
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
</style>

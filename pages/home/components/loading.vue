<template lang="html">
	<div class="main">
		<slot class="loading-more">
			<div class="loading-tip">
				<span class="icon-loading"></span>
				<span class="loading-tip-text">正在加载...</span>
			</div>
		</slot>
	</div>
	
</template>

<script>
</script>

<style scoped>
	.load-more {
		width: 100%;
	}
	.loading-tip {
		display: flex;
		flex:1;
		align-items: center;
		justify-content: center;
		height: 60px;
	}
	.icon-loading {
		display: inline-flex;
		width: 50px;
		height: 50px;
		background:#FFF url("../../../static/home/loading_half.png") no-repeat center;
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
	.loading-tip-text {
		margin-left: 10upx;
		font-size: 28upx;
		color: #555555;
	}
	.main {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;

		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

	}
</style>

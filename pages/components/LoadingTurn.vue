<template lang="html">
	<div class="main">
		<slot class="load-more">
			<div class="loading-tip">
				<span class="icon-loading"></span>
			</div>
		</slot>
	</div>
	
</template>

<script>
	export default{
		
	}
</script>

<style scoped>
	.load-more {
		display: flex;
		flex: 1;
		width: 100%;
		height: 100%;
		position: absolute;
		background: white;
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
		width: 200px;
		height: 200px;
		background:#FFF url("http://qnimage.xiteng.com/Loading_Turn.gif") no-repeat center;
		background-size: cover;
		margin-right: 5px;
		/* animation: rotating 2s linear infinite; */
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

		position: absolute;
		background-color: white;
		
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>

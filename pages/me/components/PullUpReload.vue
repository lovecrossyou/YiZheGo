<template lang="html">
	<div class="load-more" :style="{transform: 'translate3d(0,' + top + 'px, 0)',background:backgroudcolor}">
		<slot></slot>
		<footer>
			<!-- <slot name="load-more"> -->
				<LoadingDiv v-if="pullUpState==1" :loadingText="pullUpStateText.moreDataTxt"></LoadingDiv>
				<LoadingDiv v-if="pullUpState==2 || isLoading" :loadingText="pullUpStateText.loadingMoreDataTxt"></LoadingDiv>
				<div class="loading-tip" v-if="pullUpState==3">
					<span class="connectingLine"></span>
					<span class="noMoreData-tip-text">{{pullUpStateText.noMoreDataTxt}}</span>
					<span class="connectingLine"></span>
				</div>
			<!-- </slot> -->
		</footer>
	</div>
</template>

<script>
	import LoadingDiv from './LoadingDiv.vue'
	export default {
		components: {
			LoadingDiv,
		},
		props: {
			isLoading: true,
			backgroudcolor: "#f7f7f7",
			parentPullUpState: {
				default: 2
			},
			onInfiniteLoad: {
				type: Function,
				require: false
			}
		},
		data() {
			return {
				pullUpState: 2, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
				// isLoading: true, // 是否正在加载
				pullUpStateText: {
					moreDataTxt: '上拉加载更多',
					loadingMoreDataTxt: '加载中...',
					noMoreDataTxt: '我是有底线的'
				}
			}
		},
		mounted() {
			this.reload = this.$refs.reload;
			this.clientHeight = '${document.documentElement.clientHeight}'
		},
		onReachBottom: function() {
			console.log(this.isLoading);
			if (this.pullUpState !== 3 && !this.isLoading) {
				if (!this.isLoading) {
					this.onInfiniteLoad(this.infiniteLoadDone);
				}
			}
		},
		methods: {
			infiniteLoad() {
				this.pullUpState = 2
				this.isLoading = true
// 				setTimeout(() => {
// 					this.onInfiniteLoad(this.infiniteLoadDone)
// 				}, 800)
			},
			infiniteLoadDone() {
				this.pullUpState = 2
			}
		},
		watch: {
			parentPullUpState(curVal, oldVal) {
				this.pullUpState = curVal
			}
		},
	}
</script>

<style scoped>
	.load-more {
		width: 100%;
		color: #c0c0c0;
	}

	.loading-tip {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60px;
	}

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

	.connectingLine {
		display: inline-flex;
		width: 150px;
		height: 2px;
		background: #ddd;
		margin-left: 20px;
		margin-right: 20px;
	}
</style>

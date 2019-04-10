<template>
	<view class="segment-wrapper">
		<block v-for="
		 (data,index) in datas" :key="index">
			<view v-if="index===0" class="basic" v-bind:class="[activeIndex===index?activeLeftClass:normalLeftClass]" @click="changeSegment(index)">
				{{data}}
			</view>
			<view v-else-if="index===lastIndex" class="basic" v-bind:class="[activeIndex===index?activeRightClass:normalRightClass]"
			 @click="changeSegment(index)">
				{{
					data
				}}
			</view>
			<view v-else class="basic" v-bind:class="[activeIndex===index? activeMidClass:normalMidClass]" @click="changeSegment(index)">
				{{data}}
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props:{
			onSegmentChange:Object
		},
		data() {
			return {
				isActive: true,
				datas: [ "今日秒杀", "明日预告"],
				activeLeftClass: {
					'left-active': true,
				},
				normalLeftClass: {
					'left-normal': true,
				},
				normalRightClass: {
					'right-normal': true,
				},
				activeRightClass: {
					'right-active': true,
				},
				activeMidClass: {
					'mid-active': true,
				},
				normalMidClass: {
					'mid-normal': true,
				},
				activeIndex: 0,
			};
		},
		methods: {
			changeSegment(index) {
				this.activeIndex = index;
				this.onSegmentChange && this.onSegmentChange({
					index,
					name:this.datas[index]
				})
			}
		},
		computed: {
			firstActive() {
				return this.activeIndex === 0
			},
			lastActive() {
				return this.activeIndex === this.datas.length - 1;
			},
			lastIndex() {
				return this.datas.length - 1;
			},
		}
	}
</script>

<style lang="less">
	.segment-wrapper {
		padding: 0;
		// margin: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;

		.basic {
// 			height: 100%;
// 			width: 100%;
			display: flex;
			flex: 1;
			text-align: center;
			line-height: 88upx;
			justify-content: center;
		}

		.left-normal {
			background: #FFFFFF;
			border: 1upx solid rgba(255, 89, 75, 1);
			border-radius: 44upx 0upx 0upx 44upx;
			color: #FF594B;
		}

		.left-active {
			background: rgba(255, 130, 121, 1);
			border: 1upx solid rgba(255, 89, 75, 1);
			border-radius: 44upx 0upx 0upx 44upx;
			color: #FFFFFF;

		}

		.mid-normal {
			background: #FFFFFF;
			border: 1upx solid rgba(255, 89, 75, 1);
			color: #FF594B;
		}

		.mid-active {
			background: rgba(255, 130, 121, 1);
			border: 1upx solid rgba(255, 89, 75, 1);
			color: #FFFFFF;
		}

		.right-normal {
			background: #FFFFFF;
			border: 1upx solid rgba(255, 89, 75, 1);
			border-radius: 0upx 44upx 44upx 0upx;
			color: #FF594B;

		}

		.right-active {
			background: rgba(255, 130, 121, 1);
			border: 1upx solid rgba(255, 89, 75, 1);
			border-radius: 0upx 44upx 44upx 0upx;
			color: #FFFFFF;

		}

		.item {
			background-color: #FF8279;
		}
	}
</style>

<template>
	<view class="moments">
		<view class="navigation">
			<block v-for="(item,index) in navigationlist" :key=index>
				<view class="navigationtext" :class="{'navigationclicktext':isOnclick===index}" @click="navigationclick(index)">{{item}}</view>
			</block>
		</view>
		<view class="contentlist">
			<view class="recommend" v-show="isOnclick===0">00000000</view>
			<view class="comment" v-show="isOnclick===1">11111111</view>
			<view class="showwinorder" v-show="isOnclick===2">222222222</view>
			<view class="wingame" v-show="isOnclick===3">3333333</view>
			<view class="福彩" v-show="isOnclick===4">4444444</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {};
		},
		computed: {
			...mapState({
				navigationlist: state => state.moments.navigationlist,
				isOnclick: state => state.moments.isOnclick
			})
		},
		methods: {
			...mapMutations({
				navigationclick: "moments/navigationclick"
			})
		}
	}
</script>

<style lang="scss">
	.moments {
		width: 100%;

		.navigation {
			width: 100%;
			height: 100upx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			border-top: solid 1upx rgba(234,234,234,1);

			.navigationtext {
				font-size: 30upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}

			.navigationclicktext {
				font-size: 30upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(205, 46, 63, 1);
			}
		}
		
		.comtentlist{
			width: 100%;
			height: 500upx;
			background: rgba(234,234,234,1);
			margin-top: 26upx;
		}
	}
</style>

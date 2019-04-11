<template>
	<view class="moments">
		<view class="navigation">
			<block v-for="(item,index) in navigationlist" :key=index>
				<view class="navigationtext" :class="{'navigationclicktext':isOnclick===index}" @click="navigationclick(index)">{{item}}</view>
			</block>
		</view>
		<view class="contentlist">
			<recommend v-if="isOnclick===0"></recommend>
			<comment v-if="isOnclick===1"></comment>
			<showWinOrder v-if="isOnclick===2"></showWinOrder>
			<view v-if="isOnclick===3">待开发</view>
		</view>
	</view>
</template>

<script>
	import api from "@/util/api.js"
	import recommend from '/pages/moments/components/recommend.vue'
	import comment from '/pages/moments/components/comment.vue'
	import showWinOrder from '/pages/moments/components/showWinOrder.vue'
	
	export default {
		data() {
			return {
				isOnclick: 0,
				navigationlist: ["推荐", "讨论", "晒单", "中签"],
			}
		},
		methods: {
			navigationclick(index){
				this.isOnclick=index;
			},
// 			async changelist(index){
// 				let res=[];
// 				switch(index){
// 					case 0:
// 						res = await api.discusRecommendList({});
// 						break;
// 					case 1:
// 						res = await api.discusCommentList({});
// 						break;
// 					case 2:
// 						res = await api.showWinOrderList({});
// 						break;
// 					case 3:
// 						break;
// 				};
// 				this.list = res;
// 			}
		},
		components:{
			recommend,
			comment,
			showWinOrder
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
				border-bottom: solid 2upx rgba(205,46,63,1);
			}
		}
		
		.contentlist{
			width: 100%;
			background: #eeeeee;
			padding: 20upx 30upx;
			box-sizing: border-box;
		}
	}
</style>

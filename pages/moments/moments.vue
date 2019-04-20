<template>
	<view class="moments">
		<view class="top_wrapper">
			<view class="navigation">
				<block v-for="(item,index) in navigationlist" :key=index>
					<view class="navigationtext" :class="{'navigationclicktext':isOnclick===index}" @click="navigationclick(index)">{{item}}</view>
				</block>
			</view>
			<view class="notice_bar">
				<noticebar></noticebar>
			</view>
		</view>
		<view class="contentlist">
			<recommend v-if="isOnclick===0"></recommend>
			<comment v-if="isOnclick===1"></comment>
		</view>
	</view>
</template>

<script>
	import recommend from './components/recommend';
	import comment from './components/comment';
	import noticebar from './components/noticebar';
	
	export default {
		data() {
			return {
				isOnclick: 0,
				navigationlist: ["推荐", "讨论"],
			}
		},
		methods: {
			navigationclick(index){
				this.isOnclick=index;
			}
		},
		components:{
			recommend,
			comment,
			noticebar
		}
	}
</script>

<style lang="scss">
	.moments {
		width: 100%;

		.top_wrapper{
			width: 100%;
			height: 170upx;
			position: fixed;
			top: 0upx;
			z-index: 10;
			
			.navigation {
				width: 100%;
				height: 100upx;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				background:white;
			
			
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
			
			.notice_bar{
				width: 100%;
				height:70upx;
				position: fixed;
			}
			
		}
		
		.contentlist{
			width: 100%;
			margin-top: 171upx;
		}
	}
</style>

<template>
	<view class="moments">
		<view class="top_wrapper">
			<view class="navigation">
				<view class="navigationtext_left" @click="change_isOnclick">
					<view class="left_text" :class="{'left_click_text':isOnclick===0}">推荐</view>
				</view>
				<view class="navigationtext_right" @click="change_isOnclick">
					<view class="right_text" :class="{'right_click_text':isOnclick===1}">讨论</view>
				</view>
			</view>
			<view class="notice_bar"  @click="goluckylist">
				<noticebar></noticebar>
			</view>
		</view>
		<view class="contentlist">
			<recommend v-if="isOnclick===0"></recommend>
			<comment v-if="isOnclick===1"></comment>
		</view>
		<image class="creat_discuss_btn" v-if="isOnclick===1" src="/static/moments/icon_add.png" @click="gocreatdiscuss"></image>
	</view>
</template>

<script>
	import recommend from './components/recommend';
	import comment from './components/comment';
	import noticebar from './components/noticebar';
	
	export default {
		data() {
			return {
				isOnclick: 0
			}
		},
		methods: {
			change_isOnclick(){
				this.isOnclick=this.isOnclick===0?1:0;
			},
			goluckylist(){
				uni.navigateTo({
					url:"/pages/me/vip/lucky-list"
				})
			},
			gocreatdiscuss(){
				uni.navigateTo({
					url:"/pages/moments/creatdiscuss"
				})
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
		height: 100%;
		position: absolute;
		background: #eeeeee;

		.top_wrapper{
			width: 100%;
			height: 170upx;
			position: fixed;
			top: 0upx;
			z-index: 10;
			
				.navigation {
				width: 100%;
				height: 81upx;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				background:white;
			
				.navigationtext_left {
					width: 50%;
					display: flex;
					flex-direction: row-reverse;
					padding-right: 35upx;
					
					.left_text{
						width: 60upx;
						font-size: 30upx;
						font-family:PingFang-SC-Regular;
						font-weight:400;
						color: rgba(51, 51, 51, 1);
						margin-top: 10upx;
					}
					
					.left_click_text {
						width: 80upx;
						font-size: 40upx;
						font-family:PingFang-SC-Medium;
						font-weight:500;
						color: rgba(205, 46, 63, 1);
						border-bottom: solid 2upx rgba(205,46,63,1);
						margin-top: 0upx;
					}
				}
			
				.navigationtext_right {
					width: 50%;
					display: flex;
					padding-left: 35upx;
					
					.right_text{
						width:60upx;
						font-size: 30upx;
						font-family:PingFang-SC-Regular;
						font-weight:400;
						color: rgba(51, 51, 51, 1);
						margin-top: 10upx;
					}
					
					.right_click_text {
						width: 80upx;
						font-size: 40upx;
						font-family:PingFang-SC-Medium;
						font-weight:500;
						color:rgba(205,46,63,1);
						border-bottom: solid 2upx rgba(205,46,63,1);
						margin-top: 0upx;
					}
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
			margin-top: 170upx;
		}
		
		.creat_discuss_btn {
			width: 93upx;
			height: 93upx;
			position: fixed;
			right: 24upx;
			bottom: 76upx;
			z-index: 9;
			background: rgba(205,46,63,0);
		}
	}
</style>

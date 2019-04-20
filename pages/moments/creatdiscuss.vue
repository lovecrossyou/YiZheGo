<template>
	<view>
		<view class="creatdiscusswrapper">
			<view class="discuss_input_wrapper">
				<input class="discuss_input" placeholder="请输入讨论内容"/>
				
			</view>
			<button class="commitbtn" type="primary" @tap="getUpImgInfo">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
				}
		},
		components:{
		}
		
	}
</script>

<style lang="scss">
	.creatdiscusswrapper{
		width: 100%;
		background: #eeeeee;
		
		.discuss_input_wrapper{
			width: 100%;
			height: 350upx;
			background: white;
			padding-left: 10upx;
			
			.discuss_input{
				width: 100%;
				font-size:28upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:36upx;
			}
			
		}
		
		.commitbtn{
			width: 100%;
			height: 100upx;
			font-size: 36upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			line-height: 38upx;
			background: rgba(204, 38, 55, 1);
			padding-top: 37upx;
		}
	}
</style>

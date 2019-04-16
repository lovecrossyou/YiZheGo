<template>
	<view class="share_info">
		<image :src="yaoqing_bg"></image>
		<view class="user">
			<view class="user_info">
				<image class="user_pic" :src="yaoqing_bg"></image>
				<view class="user_name">贝贝啊</view>
			</view>
			<view class="message">
				<view class="triangle_border_up">
					<span></span>
				</view>
				亲，送你2个红包，一起来玩1折抢购吧!从0~9选3个号码,选中立享1折。全场1折、正品保证、公开透明!
			</view>
		</view>
		<view class="share_footer">
			<view class="discern_qr_code">
				<view class="discern">长按识别小程序，立即参与喜腾抢购!</view>
				<view class="qr_code"></view>
			</view>
			<view class="logo">
				<image :src="yaoqing_bg"></image>喜腾抢购
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				yaoqing_bg: '../../../static/me/yaoqing_bg.png',
			}
		}
	}
</script>

<style lang="less">
	.share_info {
		width: 100%;
		height: 1043upx;
		position: relative;
	
		.user {
			width: 92%;
			position: absolute;
			top: 40upx;
			left: 22upx;
	
			.user_info {
				display: flex;
				align-items: center;
				margin-left: 22upx;
	
				.user_pic {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					overflow: hidden;
					border: 1upx solid #FFF;
				}
	
				.user_name {
					margin-left: 18upx;
					font-size: 28upx;
					font-family: MicrosoftYaHei-Bold;
					font-weight: bold;
					color: #FFF;
				}
	
			}
	
			.message {
				width: 94%;
				height: 160upx;
				line-height: 1.5;
				margin-top: 22upx;
				background: rgba(252, 251, 223, 1);
				opacity: 0.6;
				border-radius: 10upx;
				padding: 20upx;
				box-sizing: border-box;
				font-size: 26upx;
				font-family: MicrosoftYaHei;
				font-weight: 400;
				color: rgba(0, 0, 0, 1);
				position: relative;
	
				.triangle_border_up {
					position: absolute;
					left: 28upx;
					top: -16upx;
					width: 0;
					height: 0;
					border-width: 0 20px 20px;
					border-style: solid;
					border-color: transparent transparent #FCFBDF;
				}
			}
		}
	
		image {
			width: 100%;
			height: 1043upx;
		}
	
		.share_footer {
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
	
			.discern_qr_code {
				width: 100%;
				height: 216upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(0, 0, 0, 0.4);
				font-size: 26upx;
				font-family: MicrosoftYaHei-Bold;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 40upx;
	
				.discern {
					width: 226upx;
	
				}
	
				.qr_code {
					width: 140upx;
					height: 138upx;
					background: #FFF;
					margin-left: 110upx;
				}
			}
	
			.logo {
				width: 100%;
				height: 56upx;
				background: #FFF;
				font-size: 26upx;
				font-family: MicrosoftYaHei;
				font-weight: 400;
				display: flex;
				align-items: center;
				justify-content: center;
	
				image {
					display: inline-block;
					width: 34upx;
					height: 34upx;
					background: rgba(255, 255, 255, 1);
					box-shadow: 0px 1px 5px 0px rgba(124, 1, 6, 0.28);
					margin-right: 12upx;
				}
			}
		}
	}
	
	
</style>

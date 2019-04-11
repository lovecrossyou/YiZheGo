<template>
	<view class="container">
		<view class="pay-status">
			<image v-bind:src="successIcon" class="pay-icon"></image>
			<view class="pay-msg">支付成功</view>
		</view>
		<view class="product-info">
				<image v-bind:src="logo" class="product-img"></image>
				<view class="product-text">
					<view class="product-name">商品名称</view>
					<view class="product-price">
						<view class="product-now-price">¥100.00</view>
						<view class="product-old-price">¥100.00</view>
					</view>
				</view>
		</view>
		<view class="pay-order-info">
			<view class="pay-order-text">订单号:</view>
			<view class="pay-order-text">下单时间:</view>
			<view class="pay-order-text">商品代码:</view>
			<view class="pay-order-text">期数:</view>
			<view class="pay-order-text">抢购数量:</view>
			<view class="pay-order-text">金额:</view>
			<view class="pay-order-text">支付方式:</view>
			<view class="pay-order-text">支付时间:</view>
		</view>
		<view class="pay-button-info">
			<view class="pay-button">完成</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				successIcon:"../../static/pay/icon_pay success@2x.png",
				failIcon:"../../static/pay/icon_pay_failure@2x.png",
				logo:'../../static/logo.png'
			}
		}
	}
</script>

<style lang="scss">
	.container{
		display: flex;
		flex-direction: column;
		background: #F7F7F7;
		.pay-status{
			height:211upx;
			background:rgba(255,255,255,1);
			border:1px solid rgba(222,222,222,1);
			background: white;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.pay-icon{
				height: 50upx;
				width: 50upx;
			}
			.pay-msg{
				font-size:30upx;
				font-family:FZLTHK--GBK1-0;
				font-weight:normal;
				color:rgba(38,204,104,1);
				margin-top: 5upx;
			}
		}
		.product-info{
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 20upx;
			    height: 168upx;
				margin-top: 20upx;
				background: white;
				.product-img{
					width:127upx;
					height:127upx;
				}
			    .product-text{
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 20upx;
					.product-name{
						font-size:28upx;
						font-family:MicrosoftYaHei;
						font-weight:400;
						color:rgba(51,51,51,1);
					}
					.product-price{
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-top: 20upx;
						.product-now-price{
							font-size:32upx;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:#FF4243;
						}
						.product-old-price{
							font-size:24upx;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:#999999;
							margin-left: 20upx;
							text-decoration:line-through;
						}
					}
				}
		}
		.pay-order-info{
			display: flex;
			flex-direction: column;
			background: white;
			height: 418upx;
			margin-top: 2upx;
			padding-left: 20upx;
			padding-top: 50upx;
			.pay-order-text{
				font-size:28upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:#777777;
				margin-top: 10upx;
			}
		}
		.pay-button-info{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			margin-top: 100upx;
			.pay-button{
				width:691upx;
				height:80upx;
				background:rgba(204,38,54,1);
				border-radius:5upx;
				font-size:36upx;
				font-family:FZLTHK--GBK1-0;
				font-weight:normal;
				color:rgba(255,255,255,1);
				text-align: center;
				line-height: 73upx;
			}
		}
	}
</style>

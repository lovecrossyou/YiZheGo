<template>
	<view v-if="OrderDetail" class="gameGroupwrapper">
		<view class="productwrapper">
			<image class="product_icon" :src="OrderDetail.productImageUrl"></image>
			<view class="product_icon_right">
				<view class="product_name">{{ OrderDetail.productName }}</view>
				<view class="product_price">
					<view class="product_onediscountprice">¥{{ OrderDetail.oneDiscountPrice }}</view>
					<view class="product_originalprice">市场价 ¥{{ OrderDetail.originalPrice }}</view>
				</view>
			</view>
		</view>
		<view class="orderwrapper">
			<view class="group_endtime">
				<view class="group_endtime_text">揭晓中签：22:00 还剩：</view>
				<view class="counttime">11</view>
				<view class="colon">:</view>
				<view class="counttime">22</view>
				<view class="colon">:</view>
				<view class="counttime">33</view>
			</view>
			<view class="purchase_count">你的幸运号码：{{ OrderDetail.purchaseCount }}组</view>
			<view class="purchase_code">
				<view class="purchase_code_row" v-for="(number, number_index) in stringToList" :key="number_index">
					<view class="purchase_code_item" v-for="(item, index) in number" :key="index">
						<view class="purchase_code_item_text">{{ item }}</view>
					</view>
				</view>
			</view>
			<view class="order_detail" v-if="visibility">
				<view class="order_detail_text">订单号：{{ OrderDetail.payOrderNo }}</view>
				<view class="order_detail_text">商品代码： {{ OrderDetail.productId }}</view>
				<view class="order_detail_text">期数： {{ OrderDetail.discountGameStage }}</view>
				<view class="order_detail_text">参与数量： {{ OrderDetail.purchaseCount }}</view>
				<view class="order_detail_text">金额： ¥{{ OrderDetail.totalPayPrice }}</view>
				<view class="order_detail_text">支付方式： {{ OrderDetail.payChannel }}</view>
				<view class="order_detail_text">下单时间： {{ OrderDetail.clientOrderTime }}</view>
			</view>
			<view class="pack_up" @click="pack_up_btn">
				<view class="pack_up_text">收起</view>
				<image class="pack_up_icon" :src="pack_up_icon"></image>
			</view>
		</view>
		<view class="groupwrapper">
			<view class="group_text">
				<view class="group_text1">邀请好友参与3D抢购</view>
				<view>成功发起拼团奖励喜币红包</view>
			</view>
			<view class="group_user">
				<image class="user_icon" :src="OrderDetail.userIconUrl"></image>
				<image class="user_icon" src="/static/gameGroup/user_default_icon.png"></image>
				<image class="user_icon" src="/static/gameGroup/user_default_icon.png"></image>
			</view>
		</view>
		<button class="invite_btn" open-type="share">邀请拼团</button>
	</view>
</template>

<script>
	import api from '@/util/api.js';
	export default {
		data() {
			return {
				OrderDetail: {
					purchaseCode: []
				},
				GameGroup: {},
				visibility: true,
				pack_up_icon: '/static/gameGroup/icon_up.png'
			};
		},
		async onLoad(options) {
			const res = await api.clientOrderDetail({
				payOrderNo: options.payOrderNo
			});
			this.OrderDetail = res;
			this.GameGroup = res.discountGameGroupModel;
		},
		onShareAppMessage(){
			console.log('userInfo.userId ',userInfo.userId);
			const groupId = this.OrderDetail.discountGameGroupModel.groupId;
			const productId = this.OrderDetail.productId;
			return {
				title: '邀请好友',
				path: '/pages/home/home?inviteId='+userInfo.userId+'&groupId='+groupId+'&productId='+productId
			}
		},
		computed: {
			stringToList() {
				var list = [];
				for (var i = 0; i < this.OrderDetail.purchaseCode.length; i++) list.push(this.OrderDetail.purchaseCode[i].split(','));
				return list;
			}
			// 			countTime() {
			// 				var h=0;
			// 				var m=0;
			// 				var s=0;
			//                 //获取当前时间
			//                 var date = new Date();
			//                 var now = date.getTime();
			//                 //设置截止时间
			//                 var endDate = new Date(this.OrderDetail.openResultTime);
			//                 var end = endDate.getTime();
			//                 //时间差
			//                 var leftTime = end - now;
			//                 //定义变量 d,h,m,s保存倒计时的时间
			//                 if (leftTime >= 0) {
			//                     h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
			//                     m = Math.floor(leftTime / 1000 / 60 % 60);
			//                     s = Math.floor(leftTime / 1000 % 60);
			//                 }
			//                 return {"h":h,"m":m,"s":s}
			//                 //递归每秒调用countTime方法，显示动态时间效果
			//                 setTimeout(this.countTime, 1000);
			//             }
		},
		methods: {
			pack_up_btn() {
				this.visibility = !this.visibility;
				this.pack_up_icon = this.visibility ? '/static/gameGroup/icon_up.png' : '/static/gameGroup/icon_down.png';
			}
		}
	};
</script>

<style lang="less">
	.gameGroupwrapper {
		width: 100%;

		.productwrapper {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 168upx;
			padding: 24upx 29upx;
			box-sizing: border-box;
			border-top: solid 2upx rgba(234, 234, 234, 1);
			border-bottom: solid 2upx rgba(234, 234, 234, 1);

			.product_icon {
				width: 100upx;
				height: 100upx;
				border: solid 1upx rgba(234, 234, 234, 1);
			}

			.product_icon_right {
				display: flex;
				flex: 1;
				flex-direction: column;
				padding-left: 20upx;
				padding-top: 18upx;

				.product_name {
					font-size: 30upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 36upx;
					overflow: hidden;
				}

				.product_price {
					display: flex;
					flex-direction: row;
					margin-bottom: 10upx;

					.product_onediscountprice {
						font-size: 24upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(204, 38, 55, 1);
						padding-top: 2upx;
					}

					.product_originalprice {
						font-size: 22upx;
						font-family: PingFangSC-Light;
						font-weight: 300;
						text-decoration: line-through;
						color: rgba(119, 119, 119, 1);
						line-height: 42upx;
						padding-left: 30upx;
					}
				}
			}
		}


		.orderwrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			margin-top: 71upx;

			.group_endtime {
				display: flex;
				flex-direction: row;
				align-items: center;

				.group_endtime_text {
					font-size: 30upx;
					font-family: PingFangSC-Medium;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 36upx;
				}

				.counttime {
					width: 44upx;
					height: 44upx;
					font-size: 30upx;
					font-family: PingFangSC-Medium;
					font-weight: 500;
					color: #ffffff;
					line-height: 44upx;
					background: #cc2637;
					border-radius: 6upx;
					text-align: center;
				}

				.colon {
					margin: 5upx 7upx 10upx 7upx;
					box-sizing: border-box;
					color: #cc2637;
				}
			}

			.purchase_count {
				font-size: 28upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 46upx;
				margin-top: 66upx;
			}

			.purchase_code {
				margin: 68upx 290upx 47upx 290upx;

				.purchase_code_row {
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					margin-top: 10upx;

					.purchase_code_item {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						margin-right: 12upx;
						width: 60upx;
						height: 60upx;
						background: #cc2637;
						border-radius: 50%;

						.purchase_code_item_text {
							font-size: 28upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(255, 255, 255, 1);
							line-height: 46upx;
						}
					}
				}
			}

			.order_detail {
				width: 100%;

				.order_detail_text {
					font-size: 28upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(119, 119, 119, 1);
					margin-left: 43upx;
					margin-top: 21upx;
				}
			}

			.pack_up {
				display: flex;
				flex-direction: row;
				padding: 62upx 330upx 34upx 330upx;
				box-sizing: border-box;

				.pack_up_text {
					font-size: 24upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					line-height: 46upx;
				}

				.pack_up_icon {
					width: 27upx;
					height: 16upx;
					margin-left: 16upx;
					margin-top: 15upx;
				}
			}
		}

		.groupwrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-top: solid 20upx rgba(234, 234, 234, 1);

			.group_text {
				font-size: 28upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 38upx;
				margin: 66upx 201upx;
				box-sizing: border-box;

				.group_text1 {
					padding-left: 40upx;
				}
			}

			.group_user {
				width: 451upx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding-top: 21upx;
				padding-bottom: 178upx;

				.user_icon {
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
				}
			}
		}

		.invite_btn {
			width: 100%;
			height: 100upx;
			font-size: 36upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			line-height: 38upx;
			background: rgba(204, 38, 55, 1);
			padding-top: 37upx;
			position: fixed;
			bottom: 0upx;
		}
	}
</style>

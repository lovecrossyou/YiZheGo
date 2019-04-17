<template>
	<view class="gameGroupwrapper">
		<view class="productwrapper">
			<image class="product_icon" :src="OrderDetail.productImageUrl"></image>
			<view class="product_icon_right">
				<view class="product_name">{{OrderDetail.productName}}</view>
				<view class="product_price">
					<view class="product_onediscountprice">¥{{OrderDetail.oneDiscountPrice}}</view>
					<view class="product_originalprice">¥{{OrderDetail.originalPrice}}</view>
				</view>
			</view>
		</view>
		<view class="orderwrapper">
			<view class="group_endtime">揭晓中签：{{OrderDetail.openResultTime}} 还剩：{{GameGroup.groupEndTime}}</view>
			<view class="purchase_count">你的幸运号码：{{OrderDetail.purchaseCount}}组</view>
			<view class="purchase_code" >
				<view class="purchase_code_row" v-for="(number,number_index) in stringToList" :key="number_index">
					<view class="purchase_code_item" v-for="(item,index) in number" :key="index">
						{{item}}
					</view>
				</view>
			</view>
			<view class="order_detail" v-if="visibility">
				<view class="order_detail_text">订单号：{{OrderDetail.payOrderNo}} </view>
				<view class="order_detail_text">商品代码： {{OrderDetail.productId}}</view>
				<view class="order_detail_text">期数： {{OrderDetail.discountGameStage}}</view>
				<view class="order_detail_text">参与数量： {{OrderDetail.purchaseCount}}</view>
				<view class="order_detail_text">金额： ¥{{OrderDetail.totalPayPrice}}</view>
				<view class="order_detail_text">支付方式： {{OrderDetail.payChannel}}</view>
				<view class="order_detail_text">下单时间： {{OrderDetail.clientOrderTime}}</view>
			</view>
			<view class="pack_up" @click="pack_up_btn">
				<view class="pack_up_text">收起</view>
				<image class="pack_up_icon" :src="pack_up_icon"></image>
			</view>
		</view>
		<view class="groupwrapper">
			<view class="group_text">
				<view class="group_text1">  邀请好友参与3D抢购</view>
				<view>成功发起拼团奖励喜币红包</view>
			</view>
			<view class="group_user">
				<block v-for="(item,index) in groupUserList" :key="index">
					<image class="user_icon" :src="item.iconUrl"></image>
					<br v-if="item%3===0">
				</block>
			</view>
		</view>
		<button class="invite_btn">邀请拼团</button>
	</view>
</template>

<script>
	import api from "@/util/api.js"
	export default {
		data() {
			return {
				OrderDetail: {
					purchaseCode: []
				},
				GameGroup: {
					groupUserModelList: []
				},
				visibility:true,
				pack_up_icon:"/static/gameGroup/icon_up.png",
				purchaseCode:["555","111","312"]
			}
		},
		async onLoad(options) {
			const res = await api.clientOrderDetail({
				payOrderNo: 20190416165520892850
			});
			this.OrderDetail = res.DiscountGameClientOrderDetailModel;
			this.GameGroup = res.DiscountGameGroupModel;
			console.log(this.OrderDetail)
		},
		computed: {
			groupUserList() {
				if (this.GameGroup.groupUserModelList % 3 == 0) {
					return this.GameGroup.groupUserModelList
				} else if (this.GameGroup.groupUserModelList % 3 == 1) {
					return this.GameGroup.groupUserModelList.push({
						iconUrl: "/static/gameGroup/user_default_icon.png"
					}, {
						iconUrl: "/static/gameGroup/user_default_icon.png"
					})
				} else if (this.GameGroup.groupUserModelList % 3 == 2) {
					return this.GameGroup.groupUserModelList.push({
						iconUrl: "/static/gameGroup/user_default_icon.png"
					})
				}
			},
			stringToList(){
				var list=[];
				for(var i=0;i<this.purchaseCode.length;i++)
					list.push(this.purchaseCode[i].split(''))
					console.log(list)
				return list
			}
		},
		methods:{
			pack_up_btn(){
				this.visibility = !this.visibility;
				this.pack_up_icon = this.visibility?"/static/gameGroup/icon_up.png":"/static/gameGroup/icon_down.png";
			}
		}
	}
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
			border-top:solid 2upx rgba(234, 234, 234, 1); 
			border-bottom:solid 2upx rgba(234, 234, 234, 1); 

			.product_icon {
				width: 97upx;
				height: 100upx;
			}

			.product_icon_right {
				display: flex;
				flex-direction: column;
				flex: 1;

				.product_name {
					font-size: 30upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 36upx;
				}

				.product_price {
					display: flex;
					flex-direction: row;

					.product_onediscountprice {
						font-size: 24upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(204, 38, 55, 1);
					}

					.product_originalprice {
						font-size: 22upx;
						font-family: PingFangSC-Light;
						font-weight: 300;
						text-decoration: line-through;
						color: rgba(119, 119, 119, 1);
						line-height: 42upx;
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
				font-size: 30upx;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 36upx;
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
				margin: 78upx 290upx 57upx 290upx;
				
				.purchase_code_row{
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					width: 60upx;
					height: 60upx;
					
					.purchase_code_item{
						margin-right: 12upx;
					}
				}
			}
			
			.order_detail {
				width: 100%;
				
				.order_detail_text{
					font-size: 28upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(119, 119, 119, 1);
					margin-left: 43upx;
					margin-top: 21upx;
				}
			}
			
			.pack_up{
				display: flex;
				flex-direction:row;
				padding: 62upx 330upx 34upx 330upx;
				box-sizing: border-box;
				
				.pack_up_text{
					font-size:24upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:46upx;
				}
				
				.pack_up_icon{
					width:27upx;
					height:16upx;
					margin-left:16upx; 
					margin-top: 15upx;
				}
			}

		}

		.groupwrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-top:solid 20upx rgba(234, 234, 234, 1); 

			.group_text {
				font-size: 28upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 38upx;
				margin: 66upx 201upx;
				box-sizing: border-box;
				
				.group_text1{
					padding-left: 40upx;
				}
			}

			.group_user {
				display: flex;
				flex-direction: row;
				justify-content: center;
				padding: 21upx 150upx;
				box-sizing: border-box;

				.user_icon {
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
				}
			}
		}
		
		.invite_btn{
			width:100%;
			height:100upx;
			font-size:36upx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:38upx;
			background: rgba(204,38,55,1);
			padding-top: 37upx;
			position: fixed;
			bottom: 0upx;
		}
	}
</style>

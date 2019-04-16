<template>
	<view class="successfulPaymentwrapper">
		<view class="productwrapper">
			<image class="product_icon" :src="OrderDetail.productImageUrl"></image>
			<view class="product_icon_right">
				<view class="product_name">OrderDetail.productName</view>
				<view class="product_price">
					<view class="product_onediscountprice">¥{{OrderDetail.oneDiscountPrice}}</view>
					<view class="product_originalprice">¥{{OrderDetail.originalPrice}}</view>
				</view>
			</view>
		</view>
		<view class="orderwrapper">
			<view class="group_endtime">揭晓中签：{{OrderDetail.openResultTime}}  还剩：{{GameGroup.groupEndTime}}</view>
			<view class="purchase_count">你的幸运号码：{{OrderDetail.purchaseCount}}组</view>
			<view class="purchase_code">
				<block v-for="(item,index) in OrderDetail.purchaseCode">
					<view class="purchase_code_text">{{item}}</view>
				</block>
			</view>
			<view class="order_detail">
				<view class="platform_orderNo">订单号： </view>
				<view class="product_No">商品代码： </view>
				<view class="game_stage">期数： </view>
				<view class="purchase_count">参与数量： </view>
				<view class="total_price">金额： ¥</view>
				<view class="pay_channel">支付方式： </view>
				<view class="client_ordertime">下单时间： </view>
			</view>
			<view class="pack_up"></view>
		</view>
		<view class="groupwrapper">
			<view class="group_text">邀请好友参与3D抢购成功发起拼团奖励喜币红包</view>
			<view class="group_user">
				<image></image>
			</view>
		</view>
		<button class="invite_btn">邀请拼团</button>
	</view>
</template>

<script>
	import api from "@/util/api.js"
	export default{
		data(){
			return{
				OrderDetail:{purchaseCode:[]},
				GameGroup:{groupUserModelList:[]},
				
			}
		},
		async onLoad(options) {
			const res = await api.clientOrderDetail({
				platformOrderNo:6201901211547001
			});
			this.OrderDetail=res.DiscountGameClientOrderDetailModel;
			this.GameGroup=res.DiscountGameGroupModel;
			
		}
	}
</script>

<style>
</style>

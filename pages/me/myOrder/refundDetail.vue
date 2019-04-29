<template>
	<view class="page-content">
		<view class="bg_color"></view>

		<!-- 商品信息 -->
		<view class="item-content">
			<productInfo
				:productImg="orderDetail.productImageUrl"
				:productName="orderDetail.productName"
				:currentPrice="(orderDetail.oneDiscountPrice / 100).toFixed(2)"
				:originPrice="(orderDetail.originalPrice / 100).toFixed(2)"
			></productInfo>
			<view class="title-content price-content">
				<text class="item-title">商品</text>
				<view class="item-title">
					￥
					<priceText :price="(orderDetail.oneDiscountPrice*orderDetail.purchaseCount / 100).toFixed(2)"></priceText>
				</view>
			</view>
			<view class="title-content">
				<text class="item-title">运费</text>
				<view class="item-title">
					￥
					<priceText :price="(orderDetail.freight / 100).toFixed(2)"></priceText>
				</view>
			</view>
			<view class="zongji">
				共
				<text class="color">{{ orderDetail.purchaseCount }}</text>
				件 实付款：

				<view class="color">
					￥
					<priceText :price="(orderDetail.totalPayPrice / 100).toFixed(2)"></priceText>
				</view>
			</view>
		</view>
		<view class="item-content">
			<view class="title-content">
				<text class="item-title">中签商品</text>
				<view class="item-title">
					-￥
					<priceText :price="((orderDetail.oneDiscountPrice * orderDetail.winCodeCount) / 100).toFixed(2)"></priceText>
				</view>
			</view>
			<view class="title-content">
				<text class="item-title">运费</text>
				<view class="item-title">
					-￥
					<priceText :price="orderDetail.winCodeCount > 0 ? (orderDetail.freight / 100).toFixed(2) : '0.00'"></priceText>
				</view>
			</view>
			<view class="zongji">
				中签
				<text class="color">{{ orderDetail.winCodeCount }}</text>
				件 退款金额：

				<view class="color">
					￥
					<priceText :price="(refundDetail.refundTotalRmb / 100).toFixed(2)"></priceText>
				</view>
			</view>
		</view>
		<view class="item-content">
			<view class="refund-title">{{ stepTitle }}</view>

			<view class="refund-step" v-for="(step, index) in stepList" :key="index">
				<view class="left-line">
					<view :class="step.done ?  'point-done' : 'point'"></view>
					<view :class="step.done ?  'line-done' : 'line'" v-if="index < 4"></view>
				</view>
				<view class="step-content">
					<view :class="step.done ?  'content-title-done' : 'content-title'    ">{{ step.title }}</view>
					<view :class="step.done ?  'content-desc-done' : 'content-desc'    ">{{ step.desc }}</view>
				</view>
				<view class="step-time" v-if="index === 0">{{ refundDetail.createRefundTime }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcon from '@/pages/components/uni-icon/uni-icon.vue';
import productInfo from '../components/productInfo.vue';
import priceText from '../components/priceText.vue';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import api from '@/util/api';
export default {
	components: {
		uniIcon,
		productInfo,
		priceText
	},
	data() {
		return {
			stepList: [
				{ title: 'T日22:00 揭晓中签', desc: '已揭晓中签，未中签全额退款' },
				{ title: 'T+1日 发起退款', desc: '系统自动发起退款' },
				{ title: 'T+2日 审核退款', desc: '退款正在审核中，T+7日完成审核流程' },
				{ title: 'T+7日 办理退款', desc: '开始办理退款，预计到账时间1~3日' },
				{ title: '退款完成', desc: '退款路径:' }
			],
			stepTitle: ''
		};
	},
	onLoad(params) {
		
		let { payOrderNo, isRefund } = params;
		//this.getRefundDetail(payOrderNo);
		
		
		api.getRefundDetail({
			payOrderNo: payOrderNo
		}).then(res => {
			this.setRefundDetail(res);
			
			
			let startRefundTime;
			let currentTime;
			let hours;
			
			if (isRefund === 'true') {
				uni.setNavigationBarTitle({
					title: '退款状态'
				});
				this.stepTitle = '退款流程';
				let way = this.orderDetail.refundWay === 'account' ? '喜币钱包' : '原路返还';
				this.stepList = [
					{ title: 'T日22:00 揭晓中签', desc: '已揭晓中签，未中签全额退款',done:true },
					{ title: 'T+1日 发起退款', desc: '系统自动发起退款',done:false },
					{ title: 'T+2日 审核退款', desc: '退款正在审核中，T+7日完成审核流程',done:false },
					{ title: 'T+7日 办理退款', desc: '开始办理退款，预计到账时间1~3日',done:false },
					{ title: '退款完成', desc: '退款路径:' + way,done:false }
				];
				
				if(res.refundStatus === "finish"){
					this.stepList.every((cur,index)=>{
						cur.done = true;
					})
				}else{
					 startRefundTime = new Date(res.createRefundTime.replace(/-/g, '/')).getTime();
					 
					
					 
					 currentTime = new Date().getTime();
					 hours = (currentTime - startRefundTime)/1000/60/60;
					if(hours > 2){
						this.stepList[1].done = true;
					}
					if(hours > (2 + 24*1)){
						this.stepList[2].done = true;
					}
					if(hours > (2 + 24*6)){
						this.stepList[3].done = true;
					}
					
				}
				
			} else {
				uni.setNavigationBarTitle({
					title: '发货状态'
				});
				this.stepTitle = '发货流程';
				this.stepList = [
					{ title: 'T日22:00 揭晓中签', desc: '已揭晓中签，中签立享1折',done:true },
					{ title: 'T+1日 中签审核', desc: '审核中签，组织备货',done:false },
					{ title: 'T+3日 中签发货', desc: '中签商品由京东自营发货，请注意查收',done:false }
				];
				
				if(res.refundStatus === "finish"){
					this.stepList.every((cur,index)=>{
						cur.done = true;
					})
				}else{
					 startRefundTime = new Date(res.createRefundTime.replace(/-/g, '/')).getTime();
					 currentTime = new Date().getTime();
					 hours = (currentTime - startRefundTime)/1000/60/60;
					if(hours > 2){
						this.stepList[1].done = true;
					}
					
					if(hours > (2 + 24*2)){
						this.stepList[2].done = true;
					}
					
				}
			}
			
			
		})
		
		
		
		
		
	},

	methods: {
		/* ...mapActions({
			getRefundDetail: 'myOrder/getRefundDetail'
		}) */
		...mapMutations({
			setRefundDetail: 'myOrder/setRefundDetail'
		})
	},
	computed: {
		...mapState({
			orderDetail: state => state.myOrder.orderDetail,
			refundDetail: state => state.myOrder.refundDetail
		})
	}
};
</script>

<style lang="less">
.page-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #efeff4;
	height: 100%;

	.bg_color {
		position: fixed;
		width: 100%;
		background-color: #efeff4;
		height: 100%;
	}

	.item-content {
		margin-top: 6upx;
		padding-left: 30upx;
		padding-right: 30upx;
		padding-top: 34upx;
		padding-bottom: 34upx;
		display: flex;
		flex-direction: column;
		margin-bottom: 20upx;
		background-color: white;
		z-index: 5;

		.price-content {
			margin-top: 80upx;
		}
		.title-content {
			display: flex;
			justify-content: space-between;

			.item-title {
				font-size: 30upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 46upx;
				display: flex;
			
			}
		}
		.zongji {
			display: flex;
			justify-content: flex-end;
			margin-top: 60upx;
			font-size: 26upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: black;
			.color {
				font-size: 26upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #cc2636;
				display: flex;
			}
		}
		.refund-title {
			font-size: 28upx;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			color: rgba(54, 189, 60, 1);
			margin-bottom: 37upx;
		}
		.refund-step {
			display: flex;
			flex-direction: row;
			.left-line {
				display: flex;
				flex-direction: column;
				align-items: center;
				.point {
					width: 19upx;
					height: 19upx;
					background: #B9B9B9;
					border-radius: 50%;
				}
				.line {
					width: 2upx;
					flex: 1;
					background: #B9B9B9;
				}
				
				.point-done {
					width: 19upx;
					height: 19upx;
					background: rgba(54, 189, 60, 1);
					border-radius: 50%;
				}
				.line-done {
					width: 2upx;
					flex: 1;
					background: rgba(185, 185, 185, 1);
				}
				
			}

			.step-content {
				display: flex;
				flex-direction: column;
				margin-bottom: 69upx;
				margin-left: 30upx;
				flex: 1;
				.content-title {
					font-size: 28upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #B9B9B9;
				}
				.content-desc {
					font-size: 24upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #B9B9B9;
				}
				.content-title-done {
					font-size: 28upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(54, 189, 60, 1);
				}
				.content-desc-done {
					font-size: 24upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(119, 119, 119, 1);
				}
			}
			.step-time {
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(119, 119, 119, 1);
			}
		}
	}
}
</style>

<template>
	<view class="xy-dialog" 
		:class="{ 'xy-dialog__show': isShow }"
		@touchmove.stop.prevent="bindTouchmove"
	>
		<view class="xy-dialog__mask"></view>
		<view class="xy-dialog__container">
			<view class="xy-dialog__container_pay_info">
				<view class="container_top">
					<image v-bind:src="closeIcon" class="channel" @click="closeDialog"></image>
					<view class="header" v-if="title.length > 0">{{ title }}</view>
					<view class="line"></view>
					<view class="msg">钱包支付</view>
					<view class="price">¥{{fix2Price.fix2TotalPayRmb}}</view>
				</view>
				<view class="channel_container">
					<view class="line"></view>
					<block v-for="(channel,index) in paychannels" :key="index">
						<view class="channel_info" @click="changePaychanel(index)">
						   <view class="channel_info_select">
							   <image v-bind:src="channel.selIcon" class="channel_info_select_icon" v-if="selectIndex==index"></image>
							   <image v-else v-bind:src="channel.unselIcon" class="channel_info_select_icon"></image>
							   <view class="channel_info_select_title">{{channel.title}}</view>
							   <view class="balance_notEnough" v-if="!isPayEnough[index].amountEnough">余额不足</view>
						   </view>
						   <view class="balance_info">
							   <view class="balance_msg" v-if="paychannels[index].title=='零钱'">余额 ¥{{fix2Price.fix2RmbAmount}}</view>
							   <view class="balance_msg" v-else>余额 ${{account.xtbTotalAmount}}</view>
						   </view>
						</view>
					</block>
					<view class="line"></view>
				</view>
				<view class="psw_body">
					<view class="password-box">
						<view class="password-item" @tap="showKeboard">
							<view class="password-item-char" v-for="i in items" :key="i">
								<view class="password-item-char__dot" v-if="password[i] || password[i] === 0"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<keyboard ref="keyboard" @input="input" @del="del"  @done="done"></keyboard>

		</view>
	</view>
</template>

<script>
	import keyboard from '../components/keyboard.vue';
	import api from '../../util/api.js';
    import {mapState} from 'vuex';
	import dataUtil from '../../util/dataUtil.js';

	export default {
		props: {
			
			// 标题
			title: {
				type: String,
				default: ''
			},
			payOrderNo:{
				type: String,
				default: ''
			},
			totalPayRmb:{
				type: String,
				default: ''
			},
			// 内容
			content: String,
			 
			// 是否显示弹出框
			show: {
				type: Boolean,
				default: false
			}
		},
		onLoad() {
			this.accountInfo();
		},
		components:{keyboard},
		data() {
			return {
				isShow: false,
				selectIndex:-1,
				paychannels:[{ selIcon: '../../static/pay/pay_choose@2x.png',
				            title: "零钱",
				            unselIcon: '../../static/pay/pay_btn@2x.png',
							payChannel:'payByRmbAccount'
							 },
							{ selIcon: '../../static/pay/pay_choose@2x.png',
				            title: "喜币",
				            unselIcon: '../../static/pay/pay_btn@2x.png',
							payChannel:'payByXtbAccount'
							 }],
				items: [0, 1, 2, 3, 4, 5],
				password: [],
				account:{},
				closeIcon:'../../static/pay/zhifu_mima_icon_guanbi@2x.png'
			}
		},
		watch: {
			show (val) {
				this.isShow = val
			}
		},
		computed: {
			...mapState({
				openid: state => state.openid,
				directBuy: state => state.confirmPay.buyType,
			}),
			fix2Price:function(){
				return {
					fix2TotalPayRmb:dataUtil.priceFix2(this.totalPayRmb),
					fix2RmbAmount:dataUtil.priceFix2(this.account.rmbAmount),
				}
			},
			isPayEnough:function(){
				return [{amountEnough:this.account.rmbAmount>this.totalPayRmb},{amountEnough:this.account.xtbTotalAmount*10>this.totalPayRmb}]
			},
		},
		methods: {
			// 禁止穿透
			bindTouchmove() {},
			changePaychanel(index){
				if(this.isPayEnough[index].amountEnough)
				this.selectIndex = index;
			},
			show() {
				this.isShow = true;
			},
			
			// 取消方法
			clickCancel() {
				setTimeout(() => {
					this.$emit('cancelButton');
				}, 200);
				this.closeDialog();
			},
			
			// 确定方法
			clickConfirm() {
				setTimeout(() => {
					this.$emit('confirmButton');
				}, 200);
				this.closeDialog();
			},
			
			// 关闭弹窗
			closeDialog() {
				this.isShow = false;
				this.password=[];
				this.$emit('close')
			},
			showKeboard(){
				this.$refs.keyboard.show()
			},
			input(item){
					if (this.password.length === this.items.length) {
						//长度达6位，自动验证
						return;
					}
					this.password.push(item);
			},
			 del(){
				 if (this.password.length > 0) {
				 	this.password = this.password.slice(0, this.password.length - 1);
				 }
			 },
			done(){
				if (this.password.length !== this.items.length) return;  
				//支付
				this.pay();
			},
			async pay(){
				const orderInfo = await api.commitPay({
					openId: '',
					payChannel: this.paychannels[this.selectIndex].payChannel,
					payOrderNo: this.payOrderNo,
					payPassword:this.password.join('')
				})
				console.log('钱包支付结果------'+JSON.stringify(orderInfo))
				this.payResult(orderInfo)
			},
			async accountInfo(){
				const account = await api.accountInfo({})
				this.account = account;
				console.log('账户信息------'+JSON.stringify(account));
				//设置可选择的支付项
				for(var i=0;i<this.isPayEnough.length;i++){
					if(this.isPayEnough[i].amountEnough){
						this.selectIndex=i;
						break;
					}
				}
			},
			payResult(msg) {
				if (this.directBuy !== 'false') {
						uni.redirectTo({
							url: "./payResult?payOrderNo=" + this.payOrderNo + "&totalPayRmb=" + this.totalPayRmb + "&payChannel=" +
								this.paychannels[this.selectIndex].payChannel + "&openId=" + this.openid
						})
					} else {
						uni.redirectTo({
							url: "/pages/gameGroup?payOrderNo=" + this.payOrderNo
						})
					}
			},
		}
	}
</script>

<style lang="scss" >
	.xy-dialog {
		position: fixed;
		visibility: hidden;
		width: 100%;
		height: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
		transition: visibility 200ms ease-in;
		&.xy-dialog__show {
			visibility: visible;
		}
		
		&__container {
			position: absolute;
			z-index: 1010;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			transition: transform 0.3s;
			width: 100%;
			height: 640upx+480upx+30upx;
			overflow: hidden;
			opacity: 0;
			transition: opacity 200ms ease-in;
			display: flex;
			flex-direction: column;
			align-items: center;
			&_pay_info{
			  width: 80%;
			  height: 640upx;	
			  background-color: #fff;
			  margin-bottom: 30upx;
			  border-radius: 10upx;
			.container_top{
				display: flex;
				flex-direction: column;
				align-items: center;
				.line{
					width:560upx;
					height:2upx;
					background:#f5f5f5;
					border-radius:10upx;
					margin-top: 20upx;
				}
				 
				.header{
					color: #303133;
					font-weight: bold;
					font-size: 34upx;
					margin-top: 10upx;
				}
					
				.channel{
					position: absolute;
					left: 12%;
					top: 20upx;
					width:23upx;
					height:23upx;
				}
				.msg{
					font-size:32upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-top: 30upx;
				}
				.price{
					font-size:44upx;
					font-family:PingFangSC-Medium;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:94upx;
				}
				
			}
			.channel_container{
				.line{
					width:560upx;
					height:2upx;
					background:#f5f5f5;
					border-radius:10upx;
				}
				.channel_info{
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					height: 90upx;
					padding: 15upx;
					margin-left: 20upx;
					margin-right: 20upx;
					.channel_info_select{
						display: flex;
						flex-direction: row;
						align-items: center;
						.channel_info_select_icon{
							height: 38upx;
							width: 38upx;
						}
						.channel_info_select_title{
							font-size:31upx;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(51,51,51,1);
							margin-left: 10upx
						}
						.balance_notEnough{
							font-size:22upx;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(212,78,93,1);
							line-height:42upx;
							margin-left: 10upx;
						}
					}
					.balance_info{
						display: flex;
						flex-direction: row;
						align-items: center;
						.balance_msg{
							font-size:26upx;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:#999999;
						}
					}

				}
			}
			.psw_body{
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				justify-content: center;
				margin-top: 30upx;
				.password-box {
					height: 84upx;
					text-align: center;
					box-sizing: border-box;
					.password-item {
						height: 100%;
						border: 1upx solid rgba(159,159,159,1);
						width: 480upx;
						margin: 0 auto;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						&-char {
							width: 16.66666666%;
							height: 84upx;
							border-right: 1upx solid rgba(159,159,159,1);
							line-height: 84upx;
							text-align: center;
							&:last-child {
								border-right: none;
							}
							&__dot {
								height: 84upx;
								&:after {
									content: '●';
								}
							}
						}
						}
					}
			}
			}
		}
		
		&__mask {
			display: block;
			position: absolute;
			z-index: 1000;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.2);
			opacity: 0;
			transition: opacity 200ms ease-in;
		}
		&__show {
			.xy-dialog__container,.xy-dialog__mask {
				opacity: 1;
			}
		}
	}
</style>
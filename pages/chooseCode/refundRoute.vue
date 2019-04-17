<template>
	<view class="container">
		<view class="tip">
            参与1折购，中签立享1折，未中签全额退款。你可选择退款至喜腾钱包或原路返还，预计T+7到账。
		</view>
		<view class="channels">
			<block v-for="(channel,index) in refundChannels" :key="index">
				<view class="channel" @click="changeSelect(index)">
					<view class="title">{{channel.title}}</view>
					<image v-bind:src="icon" class="selctIcon" v-if="channel.title == refundWay.title"></image>
				</view>
			</block>	
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default{
		computed:{
			...mapState({
				refundWay:state => state.confirmPay.refundWay
			})
		},
		data(){
			return {
				refundChannels:[
					{title:'喜币钱包',refundWay:'account'},
					{title:'原路返还',refundWay:'original'}
				],
				selectIndex:0,
				icon:'../../static/pay/icon_choose@2x.png'
			}
		},
		methods:{
			changeSelect(index){
				this.selectIndex = index;
				this.$store.commit('confirmPay/setRefundWay', this.refundChannels[this.selectIndex])
			}
		}
	}
</script>

<style lang="scss">
	.container{
		display: flex;
		flex-direction: column;
		background: #f5f5f5;
		height: 100%;
		.tip{
			font-size:26upx;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(102,102,102,1);
			line-height:36upx;
			padding: 20upx;
		}
		.channels{
			.channel{
				display: flex;
				flex-direction: row;
				background: #ffffff;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 1upx;
				height: 100upx;
				padding-left: 20upx;
				padding-right: 20upx;
				.title{
					font-size:32upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				.selctIcon{
					width: 38upx;
					height: 27upx;
				}
			}
		}
	}
</style>

<template>
	<view class="main">
		<block v-if="infoLoading||proLoading"> 
			<LoadingTurn></LoadingTurn>
		</block>
		
		<block v-else>
			<view class="top-img" @click="turnToVipRight">
				<view class="attention-text" v-if="!vipInfo.userIsVip">￥398/年</view>
				<view class="attention-text" v-if="vipInfo.userIsVip">
					已开通VIP会员，{{vipInfo.vipEndTime}}到期
				</view>
			</view>
			<view class="list">
				<vipProductItem :item="inviteItem" :hasPresentMonthVip="vipInfo.hasPresentMonthVip" :action="turnToInviteFriend"></vipProductItem>
			
				<block v-for="(pItem,index) in vipProducts" :key='index'>
					<vipProductItem :item="pItem" :hasPresentMonthVip="vipInfo.hasPresentMonthVip" :action="goDetail"></vipProductItem>
				</block>
			</view>
		</block>
		
	</view>
</template>



<script>
	import api from '@/util/api.js'
	import LoadingTurn from '../../components/LoadingTurn.vue'
	import vipProductItem from '../components/vipProductItem.vue'
	export default {
		components: {
			LoadingTurn,
			vipProductItem,
		},
		data() {
			return {
				infoLoading: true,
				proLoading: true,
				vipProducts: [],
				vipInfo: {
					userIsVip: false,
					hasPresentMonthVip: false,
					
				},
				inviteItem : {
					productName: "邀请好友20人",
					subtitle: "赠送喜腾 1个月 体验VIP会员",
					price: 0,
					isVipPro:false,
				},
				"inviteImg": "http://qnimage.xiteng.com/vip_exp.png"
			}
		},
		methods: {
			turnToVipRight() {
				uni.navigateTo({
					url:"/pages/me/vip/vip-right"
				})
			},
			turnToInviteFriend() {
				if (this.vipInfo.hasPresentMonthVip) {
					
				} else {
					uni.navigateTo({
						url:"/pages/me/inviteFriend/inviteFriend"
					})
				}
			},
			goDetail(item) {
				uni.navigateTo({
					url: "/pages/me/vip/vipProductDetails?productId=" + item.vipProductId
				})
			},
			async getVipProduct(){
				const res = await api.vipProducts({}).then((res)=>{
					res.forEach(pro=>{
						pro.isVipPro=true;
					})
					this.vipProducts = res;
					this.proLoading = false;
					console.log(res);
				});
				
				
			},
			async getVipInfo() {
				api.vipInfo({}).then((res)=>{
					res.hasPresentMonthVip = res.hasPresentMonthVip===null ? false : res.hasPresentMonthVip;
					this.vipInfo = res;
					this.infoLoading=false;
					console.log(res);
				})
			}
		},
		onLoad() {
			this.getVipInfo();
			this.getVipProduct();
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100%;
		height: 100%;
		background-color: #f4f8fb;

		.top-img {
			display: flex;
			flex: 1;
			justify-content: flex-end;
			align-items: flex-end;
			width: 100%;
			height: 628upx;
			background: url("http://qnimage.xiteng.com/vip_top_img.png") no-repeat;
			background-size: 100% 100%;
			
			.attention-text {
				margin-right: 100upx;
				margin-bottom: 271upx;
				font-family: 'PingFang-SC-Medium';
				font-weight: bold;
				font-size:24upx;
				color: #49342E;
			}
		}

		.list {
			width:100%;
			
			
		}
	}
</style>

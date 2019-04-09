<template>
	<view class="page-content">
	<view class="count-content">
		
			
		
		<text class="title">购买数量</text>
		
		<view class="reduce" @click="reduce">
			-
		</view>
		<input type="number" :value="buyCount" class="input-num" @confirm="onCountChanged" @blur="onCountChanged"/>
		<view class="reduce" @click="changeCodeCount(buyCount+1)">
			+
		</view>
	</view>
	<view class="choose-code" @click="chooseCode">
		选择号码
	</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default{
		computed:{
			...mapState({
				buyCount:state=>state.chooseCode.codeCount,
			})
			
			
		},
		methods:{
			...mapMutations({
				changeCodeCount:'chooseCode/changeCodeCount'
			}),
			chooseCode(){
				uni.navigateTo({
					url:'./chooseCode'
				})
			},
			reduce(){
				if(this.buyCount>1){
					this.changeCodeCount(this.buyCount -1)
				}
			},
			onCountChanged(event){
				this.changeCodeCount(+event.target.value)
			}
		}
	}
	
	
	
</script>

<style lang="less">
	.count-content{
		width: 100%;
		display: flex;
		.title{
			flex: 1;
		}
		.reduce{
			
		}
		
		.input-num{
			
			display: flex;
			justify-content: center;
			text-align: center;
		}
	}
</style>

<template>
	<view class="tab_filtrate">
		<view class="nav_bar_list">
			<span v-for="(item,i) in data" 
					class="nav_bar_list_item" 
					:key="i" 
					@click='changeActive(i)' 
					v-bind:class="[selectedIndex==i?'activeClass':'initialClass']"
					>
				{{item}}
			</span>
		</view>
		
	</view>
</template>

<script>
	import api from '../../../util/api.js';
	import {mapState} from 'vuex'
	export default {
		props: {
			data: Array,
		},
		data() {
			return {
				selectedIndex: 0
			}
		},
		methods: {
			async fetchTeaMallContent(ind) {
				// console.log('ind----',ind);
				const res = await api.HomeTeaMallContent({
					"accessInfo": {},
					"categoryId": ind
				})
				// this.$store.commit('main/setMallContent',res)
			},
			changeActive(i) {
				if(i==1){
					this.$store.commit('home/setSelectedInd',"relatedProductSaleMount")
				}else if(i==2){
					this.$store.commit('home/setSelectedInd',"originalPrice")
				}else{
					this.$store.commit('home/setSelectedInd',"participatePersonCount")
				}
				this.selectedIndex = i;
				// this.fetchTeaMallContent(i);
				
			}

		},
		components:{
		}
	}
</script>

<style lang="less">
	.tab_filtrate {
		width: 100%;
		background:#FFFFFF;

		.nav_bar_list {
			width: 100%;
			height: 88upx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-bottom:1upx solid #f5f5f5;
			.nav_bar_list_item {
				font-size: 28upx;
				height: 88upx;
				line-height: 88upx;
				font-family: PingFang-SC-Bold;
			}
		
			.initialClass {
				border:0;
			}
		
			.activeClass {
				border-bottom:4upx solid #E22537;
				border-radius:1px;
			}
		}
	}
	
</style>

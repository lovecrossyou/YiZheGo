<template>
	<view class="tab_filtrate">
		<view class="tab_filtrate_list">
			<view v-bind:class="[selectedIndex==i?'activeClass':'initial']" v-for="(item,i) in data" :key="i" @click='changeActive(i,item)'>
				<view>{{item}}</view>
				<view class="assend" v-if="item=='销量'">
					<image v-if="ascendBtn" :src="top_gory"></image>
					<image v-if="!ascendBtn" :src="top_red"></image>
					<image v-if="descendBtn" :src="bottom_gory" class="mt6"></image>
					<image v-if="!descendBtn" :src="bottom_red" class="mt6"></image>
				</view>
				<view class="assend" v-if="item=='价格'">
					<image v-if="priceascendBtn" :src="top_gory"></image>
					<image v-if="!priceascendBtn" :src="top_red"></image>
					<image v-if="pricedescendBtn" :src="bottom_gory" class="mt6"></image>
					<image v-if="!pricedescendBtn" :src="bottom_red" class="mt6"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../util/api.js';
	import {
		mapState
	} from 'vuex'
	export default {
		props: {
			data: Array,
		},
		data() {
			return {
				selectedIndex: 0,
				ascendBtn: true,
				descendBtn: true,
				priceascendBtn: true,
				pricedescendBtn: true,
				top_gory: "../../static/home/top_gray.png",
				bottom_gory: "../../static/home/bottom_gray.png",
				top_red: "../../static/home/top_red.png",
				bottom_red: "../../static/home/bottom_red.png",
			}
		},
		methods: {
			async fetchTeaMallContent(ind) {
				const res = await api.HomeTeaMallContent({
					"accessInfo": {},
					"categoryId": ind
				})
				// this.$store.commit('main/setMallContent',res)
			},
			changeActive(index, item) {
				switch (item) {
					case '销量':
						this.priceascendBtn = true
						this.pricedescendBtn = true
						this.ascendBtn = !this.ascendBtn
						this.descendBtn = !this.ascendBtn
						this.$store.commit('home/setSelectedInd', {
							filt: "relatedProductSaleMount",
							rev: !this.ascendBtn
						});
						break;
					case '价格':
						this.ascendBtn = true
						this.descendBtn = true
						this.priceascendBtn = !this.priceascendBtn
						this.pricedescendBtn = !this.priceascendBtn
						this.$store.commit('home/setSelectedInd', {
							filt: "oneDiscountPrice",
							rev: !this.priceascendBtn
						});
						break;
					default:
						this.priceascendBtn = true
						this.pricedescendBtn = true
						this.ascendBtn = true
						this.descendBtn = true
						this.$store.commit('home/setSelectedInd', {
							filt: "relatedProductSaleMount"
						});
						break;
				}
				this.selectedIndex = index;
			}

		},
		components: {}
	}
</script>

<style lang="less">
	.mt6 {
		margin-top: 6upx;
	}

	.tab_filtrate {
		width: 100%;

		.tab_filtrate_list {
			width: 100%;
			height: 88upx;
			line-height: 88upx;
			border-bottom: 1upx solid #f5f5f5;
			background: #FFFFFF;
			font-size: 28upx;
			font-family: PingFang-SC-Bold;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.initial,
			.activeClass {
				display: flex;
				justify-content: center;
				align-items: center;

				.assend {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-left: 8upx;

					image {
						width: 12upx;
						height: 8upx;
					}
				}
			}

			.activeClass {
				border-bottom: 4upx solid #E22537;
			}

		}
	}
</style>

<template>
	<view class="page">
		<view class="gray-bg"></view>
		<view class="choose-content">
			<text class="tips">从0～9中选择3个号码，选中立享1折，中签号码与 当天3D中奖号码同步，每天22:00揭晓。</text>
			<view class="ball-list">
				<view class="ball" v-for="(ball, index) in ballList" :key="index" @click="setCode(ball)">{{ ball }}</view>
			</view>
			<view class="button-list">
				<text class="choose-tips">点击号码选中</text>
				<button class="button" :style="{ opacity: allFinished || isAllCode ? 0.5 : 1 }" :disabled="allFinished || isAllCode" @click="randomCode">机选一注</button>
				<button class="button" :style="{ opacity: isResetState || isAllCode ? 0.5 : 1 }" :disabled="isResetState || isAllCode" @click="randomAllCode(codeCount)">全部机选</button>
			</view>
		</view>
		<scroll-view class="code-content" scroll-y>
			<view class="code-tips-content">
				<text class="code-tips">
					{{isAllCode ? '您选择的' : '您可选择'}}
					<text class="color-tips">{{ codeCount }}组{{isAllCode ? '连号' : ''}}</text>
					{{isAllCode ? '' : '3D号码'}}
					
				</text>
				<view 
				:class="['all-code', isAllCode? '' : 'all-code-dis']"
				>连号包中</view>
			</view>
			<view class="code-list-content">
				<view class="code-list">
					<view class="code-array" v-for="(codeArray, arrayIndex) in codeList" :key="arrayIndex" v-if="codeArray.state !== 'other'">
						<button
							class="code"
							v-for="(code, index) in codeArray.code"
							:key="index"
							:style="{ opacity: code > -1 ? 1 : 0.5 }"
							@click="deleteCode(index)"
							:disabled="codeArray.state !== 'modify'"
						>
							{{ code > -1 ? code : '' }}
						</button>
						<view class="blank"></view>
						<button
							class="re-choose"
							@click="resetCode(arrayIndex)"
							v-if="codeArray.showReset && (!isAllCode)"
							:style="{ opacity: codeArray.state === 'modify' ? 0.5 : 1 }"
							:disabled="codeArray.state === 'modify'"
						>
							重选
						</button>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="confirm-button" :style="{ background: allFinished ? '#D22222' : '#E28A8A' }" @click="goBack">我选好了</view>
	</view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			ballList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			isAllCode : false,
		};
	},
	
	onLoad(option) {
		//console.log(option);
		this.isAllCode =  option.isAllCode == "true";
	},
	
	computed: {
		...mapState({
			codeCount: state => state.chooseCode.codeCount,
			codeList: state => state.chooseCode.codeList
		}),
		...mapGetters({
			allFinished: 'chooseCode/allFinished',
			isResetState: 'chooseCode/isResetState',
			allCode: 'chooseCode/allCode'
		})
	},
	methods: {
		...mapMutations({
			setCode: 'chooseCode/setCode',
			deleteCode: 'chooseCode/deleteCode',
			resetCode: 'chooseCode/resetCode',
			randomCode: 'chooseCode/randomCode',
			randomAllCode: 'chooseCode/randomAllCode'
		}),
		goBack() {
			uni.navigateBack({});
		},
		
	},
	
};
</script>

<style lang="less">
.page {
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 100%;
	flex: 1;
	background-color: #f2f2f2;
	.gray-bg {
		position: fixed;
		background-color: #f2f2f2;
		width: 100%;
		height: 100%;
	}
	.choose-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid #999999;
		padding: 37upx 30upx 31upx 30upx;
		box-sizing: border-box;
		z-index: 999;
		background-color: #f2f2f2;
		position: fixed;
		top: 0;

		.tips {
			font-size: 30upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}

		.ball-list {
			margin-top: 34upx;
			display: flex;
			flex-wrap: wrap;

			.ball {
				width: 62upx;
				margin-bottom: 26upx;
				height: 62upx;
				background-color: #d22222;
				border-radius: 31upx;
				margin-left: 38upx;
				margin-right: 39upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 34upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
		}

		.button-list {
			margin-top: 11upx;
			height: 42upx;
			display: flex;
			justify-items: center;
			padding-left: 45upx;
			padding-right: 10upx;

			.choose-tips {
				font-size: 24upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(153, 153, 153, 1);
				flex: 1;
			}

			.button {
				width: 138upx;
				font-size: 24upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(208, 56, 73, 1);
				height: 39upx;
				border: 1px solid rgba(204, 37, 55, 1);
				border-radius: 20upx;
				margin-right: 33upx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding-left: 0;
				padding-right: 0;
				text-align: center;
			}
		}
	}

	.code-content {
		padding-top: 48upx;
		padding-left: 36upx;
		padding-right: 36upx;
		margin-bottom: 80upx;
		display: flex;
		flex-direction: column;
		z-index: 10;
		background-color: #f2f2f2;
		box-sizing: border-box;
		top: 410upx;
		width: 100%;
		margin-top: 410upx;

		.code-tips-content {
			display: flex;
			flex-direction: row;
			
			
			.code-tips {
				font-size: 30upx;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				flex: 1;
				.color-tips {
					color: #e31b1b;
					
				}
			}

			.all-code {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 40upx;
				background: rgba(206, 3, 27, 1);
				border-radius: 20upx;
				font-size: 24upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(254, 254, 254, 1);
				
				padding-left: 22upx;
				padding-right: 22upx;
			}
			
			.all-code-dis{
				opacity: 0.4;
			}
		}

		.code-list-content {
			margin-top: 49upx;
			padding-left: 16upx;
			display: flex;
			flex-direction: column;
			// background-color: red;
			flex: 1;

			.code-list {
				.code-array {
					display: flex;
					align-items: center;
					margin-bottom: 34upx;

					.code {
						width: 62upx;
						height: 62upx;
						background-color: #d22222;
						border-radius: 31upx;
						margin-right: 30upx;
						padding: 0upx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 34upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
					}

					.blank {
						flex: 1;
					}

					.re-choose {
						width: 128upx;
						height: 74upx;
						background: rgba(133, 133, 133, 1);
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 26upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
					}
				}
			}
		}
	}

	.confirm-button {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 80upx;
		font-size: 34upx;
		font-family: Adobe Heiti Std R;
		font-weight: normal;
		color: rgba(255, 255, 255, 1);
		z-index: 10;
	}
}
</style>

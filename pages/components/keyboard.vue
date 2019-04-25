<template>
	<view :class="'keyboard ' + pattern">
		<ul class="number">
			<li class="button" @tap="input(item)" v-for="item in keys" :key="item">{{item}}</li>
			<!-- <li class="button down" @tap="hide"></li> -->
		</ul>
			<!-- <view class="ok" @tap="done"></view> -->
		<view class="action">
			<view class="space"></view>
			<view class="zero" @tap="input('0')">0</view>
			<view class="space" @tap="del">
				<image v-bind:src="deleteIcon" class="delete"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from './payPsw/i-icon/i-icon.vue'

    const keys = () => {
    	return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    };
	export default{
		onLoad() {
		},
		comments:{uniIcon},
		data(){
			return{
				keys: keys(),
				pattern: 'hidden',
				password:[],
				deleteIcon:'../../static/pay/btn_delete@2x.png'
			}
		},
		methods:{
			show() {
				let args = {
					cancel: false
				};
				this.$emit('shown', args);
				if (!args.cancel) {
					this.pattern = 'slideup';
				}
			},
			hide() {
				console.log('隐藏键盘------');
				let args = {
					cancel: false
				};
				this.$emit('hidden', args);
				if (!args.cancel) {
					this.pattern = 'slidedown';
				}
			},
			input(item) {
				let args = {
					target: this,
					data: item,
					cancel: false,
					callback: undefined
				};
				console.log('输入-------'+item);
				this.$emit('input', item);
			},
			del() {
				this.$emit('del', {});	 
			},
			done(){
				this.$emit('done', {});
			},
			handleActionShow() {
			}
		}
	}
</script>

<style lang="scss">
	.keyboard {
		position: fixed;
		bottom: 0;
		height: 480upx;
		width: 100%;
		border-top: 1px solid #ddd;
		background: #fff;
		display: flex;
		flex-direction: column;
		.number {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			list-style: none;
			padding: 0 0 0 1px;
			margin: 0;
			border-right: 1px solid #ddd;
			.button {
				margin: 0;
				padding: 0;
				width: 33%;
				height: 120upx;
				text-align: center;
				line-height: 100upx;	
				border-right: 0.5px solid #ddd;
				border-bottom: 0.5px solid #ddd;
				font-size:56upx;
				&:nth-child(3),
				&:nth-child(6),
				&:nth-child(9),
				&:nth-child(12) {
					border-right: none;
				}
				
				&:nth-child(10),
				&:nth-child(11),
				&:nth-child(12) {
					border-bottom: none;
				}
				&:nth-child(11) {
					font-size: $uni-font-size-lg;
					font-weight: bold;
				}
				
				&:active {
					background: #ddd;
				}
			}
			.down:after {
				content: '\e902';
				font-family: 'icomoon';
				font-size: 30px;
			}
		}
		
		.action {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.space{
				margin: 0;
				padding: 0;
				width: 33.33%;
				height: 120upx;
				line-height: 100upx;	
				background: #ECECEC;
				display: flex;
				justify-content: center;
				align-items: center;
				.delete{
					height: 34upx;
					width: 46upx;
				}
			}
			.zero{
				margin: 0;
				padding: 0;
				width: 33%;
				height: 120upx;
				text-align: center;
				line-height: 100upx;	
				border-right: 0.5px solid #ddd;
				border-bottom: 0.5px solid #ddd;
				font-size: 56upx;
			}
// 			.ok {
// 				flex: 1;
// 				width: 100%;
// 				&:after {
// 					content: '\e901';
// 					font-family: 'icomoon';
// 					width: 100%;
// 					height: 100%;
// 					line-height: 100%;
// 					text-align: center;
// 					font-size: 30px;
// 					display: block;
// 					line-height: 240upx;
// 				}
// 				&:active {
// 					background: #ddd;
// 				}
// 			}
		}
	}
	/*动画*/
	@keyframes slidedown {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(100%);
		}
	}
	.slidedown {
		animation: slidedown 0.3s linear;
		transform: translateY(100%);
	}
	.slideup {
		animation: slideup 0.3s linear;
		transform: translateY(0);
	}
	@keyframes slideup {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}
</style>


<template>
	<view class="mainBg" @click="enter">
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import api from '@/util/api.js';
	import timeUtil from '@/util/timeUtil.js'
	export default {
		methods: {
			enter() {
				uni.switchTab({
					url: "/pages/home/home"
				})
			}
		},
		data() {
			return {
				count:5,
				showTime: '2019-04-18 22:00:00',
				timer:null
			};
		},
		computed: {
			formatTime() {
				return timeUtil.todayFormat(this.showTime);
			}
		},
		onLoad() {
			let that = this;
			this.timer = setInterval(()=>{
				that.count--;
				if(that.count==0){
					that.enter();
				}
			},1000);
		},
		onUnload() {
			clearInterval(this.timer);
			this.timer=null;
		}
	}
</script>

<style>
	.mainBg {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url('http://qnimage.xiteng.com/WechatIMG1.jpeg') no-repeat top;
		/* background-origin: content-box;; */
		background-size: cover ;
	}
	
	.timer{
		position: absolute;
		top: 150upx;
		right: 20upx;
		width: 110upx;
		height: 50upx;
		/* background-color: #999999; */
		color: #FFFFFF;
		font-size: 28upx;
		text-align: center;
		line-height: 50upx;
		border-radius: 40upx;
		
		border: solid 1upx #FFFFFF;
	}
</style>

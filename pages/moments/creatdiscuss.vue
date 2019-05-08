
<template>
<view>
	<view class="creatdiscusswrapper">
		<view class="discuss_input_wrapper">
			<textarea ref="disarea" class="discuss_input" placeholder="请输入讨论内容" @input="getComemnt" />
			<view class="imgwrapper">
					<view v-if="addBtnShow" class="imgBack" :style="{width:imgStyle.width+15+'px',height:imgStyle.height+15+'px'}">
						<view class="upbtn" :style="{width:imgStyle.width+'px',height:imgStyle.height+'px'}" @click="chooseImageFromFile"></view>
					</view> 
					<block v-for="(item, index) in imglist" :key="index">
						<view class="imgBack" :style="{width:imgStyle.width+15+'px',height:imgStyle.height+15+'px'}">
							<image :style="{width:imgStyle.width+'px',height:imgStyle.height+'px'}" :src="item"></image>
						</view>	
					</block>
				</view>
			</view>
			<button class="commitbtn" type="primary" @tap="getUpImgInfo" @click="createDis" :disabled="isDisable">发送</button>
		</view>
	</view>
</template>

<script>
	import api from "@/util/api.js"
export default {
	data() {
		return {
			comment: '',
			addBtnShow: true,
			imgStyle: {
				width:'120upx',
				height:'120upx'
			},
			imglist: [],
			isDisable:false
		};
	},
	methods: {
		getComemnt(e) {
			this.comment = e.target.value;
		},
		async createDis() {
			console.log('createDis');
			let param = {
					comment: this.comment,
					commentSource: 'discuss',
					imageOrVideoUrl: this.imglist,
			}
			if (this.comment===''&&this.imglist.length===0) {
				
			} else {
				api.createShowWinOrder(param).then((res)=>{
					if (res.respMsg==="successful") {
						uni.navigateBack();
					}
				})
			}
			this.isDisable=true;
		},
		  chooseImageFromFile(){
			var that = this;
			
			uni.chooseImage({
			  count: 9,
			  success: function (res) {
				// 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
				var filePath = res.tempFilePaths[0];
				let params = {
                    filePath: filePath,
					"qiNiuKey": "@@256**qniu",
				}
				console.log(params);
				api.uploadImgToQN(params).then((res)=>{
					console.log(res);
					// 						that.imglist.push(filePath);
					// 						that.addBtnShow=that.imglist.length<9;
				}).catch(error=>{
					console.log(error);
				})
			  },
			  fail: function (error) {
				console.error("调用本地相册文件时出错")
				console.warn(error)
			  },
			  complete: function () {

			  },
			});
		},
	},
	onReady() {
		let that = this;
		uni.getSystemInfo({success: function(rect) {
			console.log(rect.windowWidth);
			let windouW = rect.windowWidth;
			let width = (windouW-75)/4;
			that.imgStyle = {
				width: width,
				height: width 
			}
			console.log(that.imgStyle);
		}})
	}
};
</script>

<style lang="scss">
.creatdiscusswrapper {
	display: flex;
	flex: 1;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background: #eeeeee;
	position: absolute;

	.discuss_input_wrapper {
		width: 100%;
		background: white;
		padding-bottom: 20upx;

		.discuss_input {
			width: 100%;
			display: flex;
			flex: 1;
			font-size: 28upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 36upx;
			padding: 30upx 30upx;
			box-sizing: border-box;
		}

		.imgwrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			margin: 60upx 15upx 15upx 15upx;
			flex-wrap: wrap;
			.upbtn {
				background: url('../../static/moments/add_icon.png') no-repeat;
				background-size: 100% 100%;
			}
			.imgBack {
				display: flex;
				justify-content: center;
				justify-items: center;
				margin-top: 20upx;
				margin-bottom: 20upx;
			}
			
		}
	}

	.commitbtn {
		height: 100upx;
		font-size: 36upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 38upx;
		background: rgba(204, 38, 55, 1);
		padding-top: 37upx;
		margin: 30upx 40upx;
	}
}
</style>

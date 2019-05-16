<template>
	<view>
		<view class="tips">
			填写梦想，平台用户过百万既有机会美梦成真
		</view>
		<view class="creatdiscusswrapper">
			<view class="discuss_input_wrapper">
				<textarea ref="disarea" class="discuss_input" placeholder="请输入讨论内容" @input="getComemnt" />
				<view class="imgwrapper">
					<robby-image-upload v-model="imglist" @delete="deleteImage" @add="addImage"  :enable-del="enableDel" :enable-add="enableAdd" :limit="limitNumber"></robby-image-upload>

					<!-- <view v-if="addBtnShow" class="imgBack" :style="{width:imgStyle.width+15+'px',height:imgStyle.height+15+'px'}">
						<view class="upbtn" :style="{width:imgStyle.width+'px',height:imgStyle.height+'px'}" @click="chooseImageFromFile">
							
						</view>
					</view> -->
					<!-- <block v-for="(item, index) in imglist" :key="index">
						<view class="imgBack" :style="{width:imgStyle.width+15+'px',height:imgStyle.height+15+'px'}">
							<image :style="{width:imgStyle.width+'px',height:imgStyle.height+'px'}" :src="item"></image>
						</view>	
					</block> -->
				</view>
			</view>
			<button class="commitbtn" @tap="getUpImgInfo" @click="createDis" :disabled="isDisable">发布</button>
		</view>
	</view>
</template>

<script>
	import api from "@/util/api.js"
		import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';

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
			isDisable:false,
			enableDel:true,
			enableAdd:true,
			limitNumber:6
		};
	},
	components: {
			robbyImageUpload
		},
	methods: {
		getComemnt(e) {
			this.comment = e.target.value;
		},
		deleteImage(){
			
		},
		addImage(){
			
		},
		async createDis() {
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
				this.isDisable=true;
			}
		},
// 		  chooseImageFromFile(){
// 			var that = this;
// 			uni.chooseImage({
// 			  count: 9,
// 			  success: function (res) {
// 				// 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
// 				var filePath = res.tempFilePaths[0];
// 				
// 				api.uploader(filePath, res => {
// 						console.log(JSON.stringify(res));
// 						
// 						that.imglist.push(filePath);
// 						that.addBtnShow=that.imglist.length<9;
// 					});
// 				
// 				
// 				
// 				console.log(res);
// 				console.log(that.imglist);
// 			  },
// 			  fail: function (error) {
// 				console.error("调用本地相册文件时出错")
// 				console.warn(error)
// 			  },
// 			  complete: function () {
// 
// 			  },
// 			});
// 		}
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
	},
	onUnload() {
		this.$store.commit('comment/updatelist');
		this.$store.commit('comment/get_list');
	}
};
</script>

<style lang="scss">
	.tips {
		// width: 558upx;
		// height: 30upx;
		font-size: 28upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(41, 41, 41, 1);
		padding: 50upx 0 30upx 32upx;
		
		
	}
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

		// .imgwrapper {
		// 	width: 100%;
		// 	display: flex;
		// 	flex-direction: row;
		// 	margin: 60upx 15upx 15upx 15upx;
		// 	flex-wrap: wrap;
		// 	.upbtn {
		// 		background: url('../../static/moments/add_icon.png') no-repeat;
		// 		background-size: 100% 100%;
		// 	}
		// 	.imgBack {
		// 		display: flex;
		// 		justify-content: center;
		// 		justify-items: center;
		// 		margin-top: 20upx;
		// 		margin-bottom: 20upx;
		// 	}
		// 	
		// }
	}

	.commitbtn {
		height: 100upx;
		font-size: 36upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 38upx;
		// background: rgba(204, 38, 55, 1);
		padding-top: 37upx;
		margin: 30upx 40upx;
		
		
// 		width:540px;
// height:88px;
background:rgba(255,89,75,1);
border-radius:44upx;
	}
}
</style>

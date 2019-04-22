<template>
	<view>
		<view class="creatdiscusswrapper">
			<view class="discuss_input_wrapper">
				<input class="discuss_input" placeholder="请输入讨论内容" />
				<view class="imgwrapper">
					<view class="upbtn" @click="clickCarWin"></view>
					<block v-for="(item, index) in imglist" :key="index"><image class="upimg" :src="item"></image></block>
				</view>
			</view>
			<button class="commitbtn" type="primary" @tap="getUpImgInfo">发送</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imglist: []
		};
	},
	components: {},
	methods: {
		  clickCarWin(){
			var that = this;
			wx.chooseImage({
			  count: 1,
			  success: function (res) {
				// 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
				var filePath = res.tempFilePaths[0];
				//将刚才选的照片/拍的 放到下面view视图中
				that.setData({
				  carWin_img: filePath, //把照片路径存到变量中，
				  carWin_img_hidden: false //让展示照片的view显示
				});
				// 这个是使用微信接口保存文件到数据库
				// wx.uploadFile({
				//   url: "",
				//   filePath: filePath,
				//   name: 'file',
				//   success: function (res) {

				//   }
				// })
			  },
			  fail: function (error) {
				console.error("调用本地相册文件时出错")
				console.warn(error)
			  },
			  complete: function () {

			  }
    });
  }
	}
};
</script>

<style lang="scss">
.creatdiscusswrapper {
	width: 100%;
	background: #eeeeee;

	.discuss_input_wrapper {
		width: 100%;
		background: white;
		padding-left: 10upx;
		padding-bottom: 20upx;

		.discuss_input {
			width: 100%;
			height: 350upx;
			font-size: 28upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 36upx;
		}

		.imgwrapper {
			width: 100%;
			display: flex;
			flex-direction: row;

			.upbtn {
				width: 120upx;
				height: 120upx;
				background: url('../../static/moments/add_icon.png') no-repeat;
				background-size: 100% 100%;
			}

			.upimg {
				width: 120upx;
				height: 120upx;
			}
		}
	}

	.commitbtn {
		width: 100%;
		height: 100upx;
		font-size: 36upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 38upx;
		background: rgba(204, 38, 55, 1);
		padding-top: 37upx;
	}
}
</style>

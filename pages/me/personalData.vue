<template>
	<view class="personal_wrapper" v-if="personalInfoList">
		<view class="header_img_wrapper">
			<view class="header_img_text">头像</view>
			<view class="right_header_img" @click="changeIcon">
				<image :src="personalInfoList.userInfo.icon" class="header_img"></image>
				<image src="http://qnimage.xiteng.com/next_go_icon.png" alt="" class="next_icon"></image>
			</view>
		</view>
		<view class="mpvue-picker">
			<!-- <view class="uni-padding-wrap uni-common-mt">
				<view class="uni-textarea uni-common-mt"><textarea :value="pickerText" disabled placeholder="请点击下面的按钮进行选择"></textarea></view>
				<view class="uni-btn-v"><button type="default" @click="showSinglePicker">单列选择</button></view>
			</view> -->
			<mpvue-picker
				:themeColor="themeColor"
				ref="mpvuePicker"
				:mode="mode"
				:deepLength="deepLength"
				:pickerValueDefault="pickerValueDefault"
				@onConfirm="onConfirm"
				@onCancel="onCancel"
				:pickerValueArray="pickerValueArray"
			></mpvue-picker>
		</view>

		<selectItemList title="名字" :leftText="personalInfoList.userInfo.cnName"></selectItemList>

		<view class="xt_num_area">
			<view class="header_img_text">喜腾号</view>
			<view class="num_text">{{ personalInfoList.userInfo.xtNumber }}</view>
		</view>
		<view class="wx_code_wrapper">
			<view class="header_img_text">我的二维码</view>
			<view class="right_header_img">
				<image src="../../static/me/wx_code.png" class="xw_code_icon"></image>
				<image src="http://qnimage.xiteng.com/next_go_icon.png" alt="" class="next_icon"></image>
			</view>
		</view>
		<view class="bottom_item_list">
			<!-- <view @click="showSinglePicker"> -->
			<selectItemList title="性别" :leftText="personalInfoList.userInfo.sex == 1 ? '男' : '女'"></selectItemList>
			<!-- <selectItemList title="性别" :leftText="pickerText"></selectItemList> -->
		</view>
		<!-- <selectItemList title="星座" :leftText="personalInfoList.userInfo.constellation"></selectItemList> -->
		<selectItemList page="/pages/me/address/address" title="送货地址"></selectItemList>
		
	</view>
</template>

<script>
import api from '../../util/api.js';
import selectItemList from './components/selectItemList.vue';
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
export default {
	data() {
		return {
			personalInfoList: null,
			// formData:{
			pickerSingleArray: [
				{
					label: '男'
				},
				{
					label: '女'
				}
			],
			// constellation:[
			// 	{
			// 		consItem:"水瓶座"
			// 	},{
			// 		consItem:"双鱼座"
			// 	},{
			// 		consItem:"白羊座"
			// 	},{
			// 		consItem:"金牛座"
			// 	},{
			// 		consItem:"双子座"
			// 	},{
			// 		consItem:"巨蟹座"
			// 	},{
			// 		consItem:"狮子座"
			// 	},{
			// 		consItem:"处女座"
			// 	},{
			// 		consItem:"天秤座"
			// 	},{
			// 		consItem:"天蝎座"
			// 	},{
			// 		consItem:"射手座"
			// 	},{
			// 		consItem:"射手座"
			// 	}
			// ]
			// },
			// cityPickerValueDefault: [0, 0, 1],
			themeColor: '#007AFF',
			pickerText: '',
			mode: '',
			pickerValueDefault: [0],
			pickerValueArray: []
		};
	},
	components: {
		selectItemList,
		mpvuePicker,
		mpvueCityPicker
	},
	computed: {},

	methods: {
		changeIcon() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function(res) {
					const imagePath = res.tempFilePaths[0];
					api.uploader(imagePath, res => {
						console.log(JSON.stringify(res));
					});
				}
			});
		},
		async personalInfo() {
			let res = await api.userInfo({});
			this.personalInfoList = res;
			console.log(this.personalInfoList);
		},
		onCancel(e) {
			console.log(e);
		},
		// 修改内容弹框
		async showSinglePicker() {
			this.pickerValueArray = this.pickerSingleArray;
			this.mode = 'selector';
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			this.$refs.mpvuePicker.show();
			let res = await api.constellation({
				// sex :this.formData.pickerSingleArray.label,
				// constellation :"",
			});
		},
		onConfirm(e) {
			this.pickerText = e.label;
		}
	},
	onLoad() {
		this.personalInfo();
	}
};
</script>

<style scoped>
.personal_wrapper {
	width: 100%;
	background-color: #f5f5f5;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
.header_img_wrapper {
	width: 100%;
	height: 140upx;
	background-color: #fff;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-top: solid 1upx rgba(229, 229, 229, 1);
	border-bottom: solid 1upx rgba(229, 229, 229, 1);
	padding: 26upx;
	box-sizing: border-box;
	margin-top: 30upx;
}
.header_img_text {
	color: #666666;
	font-size: 28upx;
	margin-left: 8upx;
}
.right_header_img {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.header_img {
	width: 100upx;
	height: 100upx;
	border-radius: 5upx;
	margin-right: 22upx;
}
.next_icon {
	width: 20upx;
	height: 34upx;
}
.xt_num_area {
	width: 100%;
	height: 100upx;
	background-color: #fff;
	padding: 0 26upx;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.num_text {
	color: #999;
	font-size: 24upx;
}
.wx_code_wrapper {
	width: 100%;
	height: 100upx;
	background-color: #fff;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-top: solid 1upx rgba(229, 229, 229, 1);
	border-bottom: solid 1upx rgba(229, 229, 229, 1);
	padding: 26upx;
	box-sizing: border-box;
}
.xw_code_icon {
	width: 33upx;
	height: 33upx;
	margin-right: 11upx;
}
.bottom_item_list {
	margin-top: 27upx;
	border-top: solid 1upx rgba(229, 229, 229, 1);
}
.personal_wrapper {
	width: 100%;
	background-color: #f5f5f5;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.header_img_wrapper {
	width: 100%;
	height: 140upx;
	background-color: #fff;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-top: solid 1upx rgba(229, 229, 229, 1);
	border-bottom: solid 1upx rgba(229, 229, 229, 1);
	padding: 26upx;
	box-sizing: border-box;
	margin-top: 30upx;
}

.header_img_text {
	color: #666666;
	font-size: 28upx;
	margin-left: 8upx;
}

.right_header_img {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.header_img {
	width: 100upx;
	height: 100upx;
	border-radius: 5upx;
	margin-right: 22upx;
}

.next_icon {
	width: 20upx;
	height: 34upx;
}

.xt_num_area {
	width: 100%;
	height: 100upx;
	background-color: #fff;
	padding: 0 26upx;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.num_text {
	color: #999;
	font-size: 24upx;
}

.wx_code_wrapper {
	width: 100%;
	height: 100upx;
	background-color: #fff;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-top: solid 1upx rgba(229, 229, 229, 1);
	border-bottom: solid 1upx rgba(229, 229, 229, 1);
	padding: 26upx;
	box-sizing: border-box;
}

.xw_code_icon {
	width: 33upx;
	height: 33upx;
	margin-right: 11upx;
}

.bottom_item_list {
	margin-top: 27upx;
	border-top: solid 1upx rgba(229, 229, 229, 1);
}
</style>

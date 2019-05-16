<template>
	<view class="wrapper">
		<block v-for="(item, index) in dreamContentList" :key="index">
			<view class="dream_details">
				<image :src="item.img" class="cont_img" mode="aspectFill"></image>
				<view class="right_content_area">
					<view class="user_info">
						<image :src="item.userImg" class="user_img" mode=""></image>
						<view class="user_name">{{ item.userName }}</view>
					</view>
					<view class="publish_cotent">{{ item.publishCotent }}</view>
					<view class="bottom_cont">
						<view class="publish_time">{{ item.publishTime }}美梦成真</view>
						<view class="with_happy" @click="showModal">
							<image src="http://qnimage.xiteng.com/chengzhen_icon_xiaolian@2x.png" class="smile_img" mode=""></image>
							<view class="with_happy_text">沾沾喜气</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<view class="with_happy_success_modal" v-if="modalArea">
			<image src="http://qnimage.xiteng.com/chengzhen_tanchukuang@2x.png" class="modal_img" @click="cancelModal"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dreamContentList: [
				{
					img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3121747171,2429610755&fm=26&gp=0.jpg',
					userImg: 'http://img0.imgtn.bdimg.com/it/u=785035511,1243398691&fm=26&gp=0.jpg',
					userName: 'chechero',
					publishCotent: '我想要一盆向日葵，用来装饰我的花园',
					publishTime: '2017-5-4'
				},
				{
					img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4271304455,747214714&fm=26&gp=0.jpg',
					userImg: 'http://img1.imgtn.bdimg.com/it/u=4264372010,294710907&fm=26&gp=0.jpg',
					userName: 'kris吴',
					publishCotent: '我想要很多植物，用来装饰我的房间，我想要很多植物',
					publishTime: '2018-9-4'
				},
				{
					img: 'http://img2.imgtn.bdimg.com/it/u=2179927049,797278815&fm=26&gp=0.jpg',
					userImg: 'http://img1.imgtn.bdimg.com/it/u=3577286334,84084145&fm=26&gp=0.jpg',
					userName: '包围楼上',
					publishCotent: '我想要一个大西瓜，用来读过炎热的夏天，我想要一个大西瓜，用来读过炎热的夏天',
					publishTime: '2019-7-2'
				},
				{
					img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3121747171,2429610755&fm=26&gp=0.jpg',
					userImg: 'http://img0.imgtn.bdimg.com/it/u=785035511,1243398691&fm=26&gp=0.jpg',
					userName: 'chechero',
					publishCotent: '我想要一盆向日葵，用来装饰我的花园',
					publishTime: '2017-5-4'
				},
				{
					img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4271304455,747214714&fm=26&gp=0.jpg',
					userImg: 'http://img1.imgtn.bdimg.com/it/u=4264372010,294710907&fm=26&gp=0.jpg',
					userName: 'kris吴',
					publishCotent: '我想要很多植物，用来装饰我的房间，我想要很多植物',
					publishTime: '2018-9-4'
				},
				{
					img: 'http://img2.imgtn.bdimg.com/it/u=2179927049,797278815&fm=26&gp=0.jpg',
					userImg: 'http://img1.imgtn.bdimg.com/it/u=3577286334,84084145&fm=26&gp=0.jpg',
					userName: '包围楼上',
					publishCotent: '我想要一个大西瓜，用来读过炎热的夏天，我想要一个大西瓜，用来读过炎热的夏天',
					publishTime: '2019-7-2'
				}
			],
			modalArea: false
		};
	},
	methods: {
		showModal() {
			this.modalArea = true;
		},
		cancelModal() {
			this.modalArea = false;
		}
	}
};
</script>

<style scoped>
.wrapper {
	width: 100%;
	padding: 0 33upx;
	box-sizing: border-box;
}
.dream_details {
	width: 100%;
	padding: 60upx 0;
	box-sizing: border-box;
	border-bottom: 1upx solid rgba(237, 237, 237, 1);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.cont_img {
	width: 260upx;
	height: 205upx;
	border-radius: 8upx;
}
.right_content_area {
	flex: 1;
	margin-left: 33upx;
	display: flex;
	flex-direction: column;
}
.user_info {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.user_img {
	width: 40upx;
	height: 40upx;
	border-radius: 50%;
}
.user_name {
	color: #1f1f1f;
	font-size: 28upx;
	margin-left: 8upx;
}
.publish_cotent {
	width: 100%;
	height: 105upx;
	color: #1f1f1f;
	font-size: 28upx;
	margin-top: 15upx;
}
.bottom_cont {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 19upx;
}
.publish_time {
	color: #999999;
	font-size: 24upx;
}
.with_happy {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.smile_img {
	width: 28upx;
	height: 28upx;
}
.with_happy_text {
	color: #f73845;
	font-size: 28upx;
	margin-left: 8upx;
}
.with_happy_success_modal {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.8);
	padding: 0 103upx;
	box-sizing: border-box;
}
.modal_img {
	width: 543upx;
	height: 345upx;
	margin-top: 358upx;
}
</style>

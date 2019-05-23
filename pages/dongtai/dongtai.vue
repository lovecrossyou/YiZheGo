<template>
	<view class="main">
		<view class="header">
			<view class="topbg"></view>
			<view class="tab_area">
				<view class="option_tabs">
					<view class="option_tabs_item" v-for="(item, index) in tabsParam" @click="toggleTabs(index)" :class="{ active: index == nowIndex }">{{ item }}</view>
				</view>
			</view>
		</view>
		<!-- 动态 -->
		<view class="dynamic_option" v-show="nowIndex === 0">
			<block v-for="(item, index) in publishList" :key="index">
				<view class="dream_content_details">
					<view class="user_info">
						<image :src="item.img" class="user_img" mode=""></image>
						<view class="user_name">{{ item.name }}</view>
					</view>
					<view class="publish_right_time">{{ item.publishTime }}个小时之前</view>
				</view>
				<image src="http://qnimage.xiteng.com/dream_pic@2x.png" class="publish_img" mode="aspectFit"></image>
				<view class="publish_content">希望有一个P30手机，记录生活的点点滴滴，希望平台早日用户过万</view>
				<!-- 点赞 & 转发 & 评论 -->
				<view class="operation_list">
					<view class="bottom_operation" @click="givePraise(index)">
						<view class="operation_icon">
							<image v-if="item.isPraise" src="http://qnimage.xiteng.com/dream_xin_dianji@2x.png"></image>
							<image v-else src="http://qnimage.xiteng.com/dream_xin@2x.png" mode=""></image>
						</view>
						<view class="operation_num">1.5W</view>
					</view>
					<view class="bottom_operation">
						<view class="operation_icon">
							<image src="http://qnimage.xiteng.com/Teafight_icon_share@2x.png"></image>
						</view>
						<view class="operation_num">1.5W</view>
					</view>
					<view class="bottom_operation">
						<view class="operation_icon">
							<image src="http://qnimage.xiteng.com/Teafight_icon_comment@2x.png"></image>
						</view>
						<view class="operation_num">1520</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 梦想 -->
		<view class="dream_option" v-show="nowIndex === 1">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsParam: ['动态', '梦想'],
				nowIndex: 0,
				publishList: [{
						isPraise: false,
						name: '张韶涵',
						publishTime: 9,
						img: 'http://img4.imgtn.bdimg.com/it/u=1671816861,451680427&fm=26&gp=0.jpg'
					},
					{
						isPraise: false,
						name: '朱理哲',
						publishTime: 1,
						img: 'http://img2.imgtn.bdimg.com/it/u=350479878,4015742982&fm=26&gp=0.jpg'
					},
					{
						isPraise: false,
						name: '张韶涵',
						publishTime: 9,
						img: 'http://img4.imgtn.bdimg.com/it/u=1671816861,451680427&fm=26&gp=0.jpg'
					}
				],
				dreamContentList: [{
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
		components: {},
		methods: {
			toggleTabs: function(index) {
				this.nowIndex = index;
			},
			givePraise(index) {
				this.publishList[index].isPraise = !this.publishList[index].isPraise;
			},
			showModal() {
				this.modalArea = true;
			},
			cancelModal() {
				this.modalArea = false;
			}
		}
	};
</script>

<style>
	.main {
		width: 100%;
	}

	.header {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	.topbg {
		height: 120upx;
		border-radius: 100% 100% 100% 100% / 0% 0% 150% 150%;
		background-color: #feb1bb;
	}

	.tab_area {
		width: 686upx;
		height: 128upx;
		background: #fff;
		box-shadow: 0upx 5upx 18upx 0upx rgba(0, 0, 0, 0.05);
		border-radius: 8upx;
		margin: -110upx auto 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.active {
		border-bottom: 5upx solid #ff0036;
	}

	.option_tabs {
		width: 40%;
		height: 65upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.option_tabs_item {
		width: 50%;
		height: 65upx;
		line-height: 60upx;
		display: inline-block;
		text-align: center;
		font-size: 28upx;
	}

	.dream_content_details {
		width: 100%;
		height: 53upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 50upx;
	}

	.user_info {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-weight: bold;
	}

	.user_img {
		width: 53upx;
		height: 53upx;
		border-radius: 50%;
	}

	.user_name {
		color: #1f1f1f;
		font-size: 26upx;
		margin-left: 19upx;
	}

	.publish_right_time {
		width: 30%;
		color: #999999;
		font-size: 20upx;
		text-align: right;
	}

	.publish_img {
		width: 684upx;
		height: 339upx;
		border-radius: 15upx;
		margin-top: 23upx;
	}

	.publish_content {
		color: #1f1f1f;
		font-size: 28upx;
		margin-top: 20upx;
		font-weight: bold;
		line-height: 35upx;
	}

	.operation_list {
		width: 50%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 10upx;
	}

	.bottom_operation {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.operation_num {
		font-size: 24upx;
		color: #666;
		margin-left: 10upx;
	}

	.operation_icon image {
		width: 29upx;
		height: 24upx;
	}

	.dynamic_option {
		width: 100%;
		padding: 0 33upx;
		box-sizing: border-box;
		overflow-y: scroll;
		margin-top: 120upx;
	}

	.dream_option {
		width: 100%;
		padding: 0 33upx;
		box-sizing: border-box;
		margin-top: 130upx;
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

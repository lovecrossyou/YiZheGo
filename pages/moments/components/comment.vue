<template>
	<view class="commentwrapper">
		<image class="creat_discuss_btn"  src="/static/moments/icon_add.png" @click="gocreatdiscuss"></image>
		<block v-for="(item,index) in list" :key="index">
			<view class="commentItem">
				<view class="user">
					<image class="user_icon" :src="item.userIconUrl"></image>
					<view class="user_icon_right">
						<view class="user_wrapper">
							<view class="user_name">{{item.userName}}</view>
							<image class="user_sex" v-if="item.userSex==='男'" src="/static/moments/icon_man.png"></image>
							<image class="user_sex" v-else src="/static/moments/icon_woman.png"></image>
						</view>
						<view class="time">{{item.createTime}}</view>
					</view>
				</view>
				<view class="momentcontent"  @click="godetails(index)">
					<view class="moment_text">{{item.commentContent}}</view>
					<view class="moment_image_wrapper" v-if="item.imageOrVideoUrl.length!==0">
						<image class="moment_image" :src="item.imageOrVideoUrl[0]"></image>
						<view class="moment_image_num_wrapper">
							<image class="moment_num_icon" src="/static/moments/shaidan_icon_tupian.png"></image>
							<view class="moment_image_num">{{item.imageOrVideoUrl.length}}</view>
						</view>
					</view>
				</view> 
				<view class="moment_data">
					<view class="gamestage"></view>
					<view class="moment_num">
						<view class="praise" @click="change_praise(item)">
							<image class="praise_img" v-if="item.praise" src="/static/moments/btn_like_red.png"></image>
							<image class="praise_img" v-else src="/static/moments/icon_illume.png"></image>
							<view class="praise_num">{{item.praiseCount}}</view>
						</view>
						<view class="comment" @click="godetails(index)">
							<image class="comment_img" src="/static/moments/icon_comment.png"></image>
							<view class="comment_num">{{item.commentCount}}</view>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import api from "@/util/api.js"
	export default{
		data(){
			return{
				id:0,
				list:[]
			}
		},
		methods:{
			godetails(index){
				uni.navigateTo({
					url:"/pages/moments/showWinOrderdetails?id="+this.list[index].discussCommentId
				})
			},
			gocreatdiscuss(){
				uni.navigateTo({
					url:"/pages/moments/creatdiscuss"
				})
			},
			async change_praise(item){
				const res = await api.praiseShowWinOrder({
					showWinOrderId:item.discussCommentId,
				});
				item.praise=res.praise;
				item.praiseCount=res.praiseCount;
			}
		},
		async onLoad() {
			const res = await api.discusCommentList({
			});
			this.list = res;
		}
	}
</script>

<style lang="less">
	.commentwrapper{
		width: 100%;
		padding: 20upx 30upx;
		box-sizing: border-box;
		background: #eeeeee;
		
		.creat_discuss_btn{
			width: 93upx;
			height: 93upx;
			position: fixed;
			right:24upx;
			bottom:76upx;
			z-index: 9;
		}
		
		.commentItem {
			display: flex;
			flex-direction: column;
			width: 100%;
			background: rgba(255, 255, 255, 1);
			margin-bottom: 20upx;
		
			.user {
				width: 100%;
				height: 99upx;
				display: flex;
				flex-direction: row;
		
				.user_icon {
					width: 70upx;
					height: 70upx;
					margin-left: 31upx;
					margin-top: 29upx;
					float: left;
				}
		
				.user_icon_right {
					margin-left: 18upx;
					margin-top: 31upx;
		
					.user_wrapper {
						display: flex;
						flex-direction: row;
		
						.user_name {
							font-size: 30upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);
						}
		
						.user_sex {
							width: 27upx;
							height: 27upx;
							margin-left: 9upx;
							margin-top: 8upx;
						}
					}
		
					.time {
						font-size: 24upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						line-height: 40upx;
						margin-bottom: 3upx;
					}
				}
		
			}
		
			.momentcontent{
				width: 100%;
				
				.moment_text {
					font-size: 28upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 36upx;
					margin: 31upx 32upx 18upx 32upx;
					box-sizing: border-box;
				}
						
				.moment_image_wrapper {
					width: 100%;
					height: 400upx;
					position: relative;
						
					.moment_image {
						width: 630upx;
						height: 100%;
						margin-left: 30upx;
						position: absolute;
						
					}
						
					.moment_image_num_wrapper {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						width: 66upx;
						height: 33upx;
						background: rgba(0, 0, 0, 1);
						opacity: 0.3;
						border-radius: 10px;
						margin-top: 349upx;
						margin-left: 544upx;
						position: absolute;
						
						.moment_num_icon {
							width: 18upx;
							height: 16upx;
						}
						
						.moment_image_num {
							font-size: 22upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(255, 255, 255, 1);
							margin-left: 5upx;
						}
					}
						
				}
			}
		
			.moment_data {
				width: 100%;
				height: 60upx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 41upx;
				margin-right: 31upx;
		
				.gamestage {
					font-size: 24upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					margin-left: 37upx;
		
				}
				
				.moment_num{
					display: flex;
					flex-direction: row;
					margin-right: 1upx;
					
					.praise {
						display: flex;
						flex-direction: row;
						height: 26upx;
					
						.praise_img {
							width: 29upx;
							height: 26upx;
						}
					
						.praise_num {
							font-size: 24upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(102, 102, 102, 1);
							margin-left: 10upx;
							margin-top: -5upx;
						}
					}
					
					.comment {
						display: flex;
						flex-direction: row;
						margin-left: 36upx;
					
						.comment_img {
							width: 28upx;
							height: 28upx;
						}
					
						.comment_num {
							font-size: 24upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(102, 102, 102, 1);
							margin-left: 10upx;
							margin-top: -5upx;
							margin-right: 31upx;
						}
					}
				}
			}
		}
	}
</style>

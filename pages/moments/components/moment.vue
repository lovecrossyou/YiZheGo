<template>
	<view class="momentlistMain">
		<block v-for="(item,index) in momentlist" :key="index">
			<view class="moment">
				<view class="user">
					<image class="user_icon"></image>
					<view class="user_right">
						<view class="user_wrapper">
							<view class="user_name"></view>
							<view class="user_sex"></view>
						</view>
						<view class="time"></view>
					</view>
				</view>
				<view class="moment_text"></view>
				<view class="moment_image_wrapper">
					<image class="moment_image"></image>
					<image class="moment_image_num"></image>
				</view>
				<view class="moment_data">
					<view class=""></view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>

</script>

<style lang="less">
	.momentlistMain{
		width: 100%;
		background: #eeeeee;
		padding: 26upx 30upx 20upx 30upx;
		
		.moment{
			
		}
	}
</style>

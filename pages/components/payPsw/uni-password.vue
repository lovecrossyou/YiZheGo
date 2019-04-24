<template>
	<view class="box">
		<view class="box__header">
			<slot></slot>
		</view>
		<view class="box__body">
			<view class="password-box">
				<view class="password-item" @tap="show">
					<view class="password-item-char" v-for="i in items" :key="i">
						<view class="password-item-char__dot" v-if="password[i] || password[i] === 0"></view>
					</view>
				</view>
			</view>
		</view>
		<view :class="'keyboard ' + pattern">
			<ul class="number">
				<li class="button" @tap="input(item)" v-for="item in keys" :key="item">{{item}}</li>
			</ul>
			<view class="action">
				<view class="space"></view>
				<view class="zero" @tap="input('0')">0</view>
				<view class="space" @tap="del">
					<image v-bind:src="deleteIcon" class="delete"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const keys = () => {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
	};
	
	import uniIcon from './i-icon/i-icon.vue'
	
	export default {
		props: {
			defaultPassword: String
		},
		components: {
			uniIcon
		},
		data() {
			return {
				items: [0, 1, 2, 3, 4, 5],
				password: [],
				keys: keys(),
				pattern: 'hidden',
				deleteIcon:'../../../static/pay/btn_delete@2x.png'
			};
		},
		methods: {
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
				console.log('隐藏键盘----');
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
				if (!args.cancel){
					if (this.password.length === this.items.length) {
						//长度达6位，自动验证
						return;
					}
					if (args.callback && typeof args.callback === 'function') {
						args.callback.call(this);
					}
					this.password.push(item);
					if (this.password.length == this.items.length){
						this.$emit('confirm', {
							target: this,
							value: this.password.join('')
						});
					}
					//this.$emit('input', args);
				}
			},
			del() {
				let args = {
					cancel: false
				};
				this.$emit('delete', args);
				if (!args.cancel) {
					if (this.password.length > 0) {
						this.password = this.password.slice(0, this.password.length - 1);
					}
				}
			},
			done(){
				if (this.password.length !== this.items.length) return;
				
				this.$emit('confirm', {
					target: this,
					value: this.password.join('')
				});
			},
			clear(){
				this.password = [];
			}
		},
		watch: {
			defaultPassword: {
				immediate:true,
				handler(val){
					if (val && val.length === 6) {
						this.password = val.split('').map(Number);
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './uni-password.scss'
</style>
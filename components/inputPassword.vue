<!--四位验证码输入框组件-->
<template>
	<div class="security-code-wrap">
		<label for="code">
			<ul class="security-code-container">
				<li class="field-wrap" v-for="(item, index) in number" :key="index">
					<i class="char-field">{{ value[index] || placeholder }}</i>
				</li>
			</ul>
		</label>
		<!-- @keyup="handleInput($event)"	 -->
		<input ref="input" class="input-code" @input="inputFn" id="code" name="code" type="number" :maxlength="number" autocorrect="off" autocomplete="off" autocapitalize="off" />
	</div>
</template>
<script>
export default {
	name: 'SecurityCode',
	// component properties
	props: {
		number: {
			type: Number,
			default: 6
		},
		placeholder: {
			type: String,
			default: ''
		}
	},
	// variables
	data() {
		return {
			value: ''
		};
	},
	methods: {
		inputFn(e) {
			this.value = e.target.value;
			if (this.value.length >= this.number) {
				this.handleSubmit();
				this.hideKeyboard();
			}
		},
		handleSubmit() {
			this.$emit('inputFnOn', this.value);
		},
		hideKeyboard() {
			// 输入完成隐藏键盘
			document.activeElement.blur(); // ios隐藏键盘
			this.$refs.input.blur(); // android隐藏键盘
		}
	}
};
</script>
<style scoped lang="less">
.security-code-wrap {
	width: 80%;
	overflow: hidden;
	text-align: center;
	position: relative;
	margin: 0 auto;

}
.security-code-container {
	width: 80%;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	border-top: 1upx solid #C4C4C4;
	border-left: 1upx solid #C4C4C4;
	border-bottom: 1upx solid #C4C4C4;

	.field-wrap{
		list-style: none;
		display: block;
		width: 80upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 34upx;
		color: #3C3C3C;
		background-color: #fff;
		color: #000;
		border-right: 1upx solid #C4C4C4;
		.char-field {
			font-style: normal;
		}
		
	}
	
}
.input-code {
	position: absolute;
	left: 0upx;
	top: 0;
	width: 100% !important;
	height: 100% !important;
	z-index: 2;
	opacity: 0;
}
</style>

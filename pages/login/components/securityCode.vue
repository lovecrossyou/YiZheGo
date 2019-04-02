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
	width: 100%;
	overflow: hidden;
	text-align: center;
	position: relative;
}
.security-code-container {
	width: 100%;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	.field-wrap {
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
		border-bottom: 2upx solid #ebeaea;
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

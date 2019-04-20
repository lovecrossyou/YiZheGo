<template>
  <view>
    <view class="textBox">
		<image class="notice_icon" src="/static/moments/dongtai_gonggao_icon.png"></image>
		<transition name="slide">
			<view class="text" :key="text.id">{{text.val}}</view>
		</transition>
    </view>
  </view>
</template>

<script>
import api from "@/util/api.js"
export default {
  name: 'noticebar',
  data () {
    return {
      textArr:[],
      number: 0,
	  winGameNotice:[]
    }
  },
  computed: {
    text () {
      return {
        id: this.number,
        val: this.textArr[this.number]
      }
    },
	gettext(){
				for(var i=0;i<this.winGameNotice.length;i++){
					this.textArr.push('恭喜 '+this.winGameNotice[i].phoneNum+' 一折抢购 '+this.winGameNotice[i].productName)
				}
				return this.textArr
			}
  },
  mounted () {
    this.startMove()
  },
  async onLoad() {
			const res = await api.winGameNotice({});
			this.winGameNotice=res;
	},
  methods: {
    startMove () {
      // eslint-disable-next-line
      let timer = setTimeout(() => {
		if(this.number!=this.winGameNotice.length-1){
			this.number=this.number+1;
		}
		else{
			this.number=0
		}
		 this.startMove();
      }, 2000); // 滚动不需要停顿则将2000改成动画持续时间
    }
  }
}
</script>

<style scoped>

  .textBox {
	display: flex;
	flex-direction:row;
	align-items: center;
    width: 100%;
    height: 70upx;
    overflow: hidden;
	background: #fff2f2;
  }
  
  .notice_icon{
	  width: 22upx;
	  height: 18upx;
	  margin-left: 30upx;
  }
  
  .text {
	display: flex;
	flex: 1;
	font-size:24upx;
	font-family:Adobe Heiti Std R;
	font-weight:normal;
	color:rgba(205,46,63,1);
	text-align: center;
	margin-left: 21upx;
	overflow: hidden;
	-webkit-line-clamp: 1;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s linear;
  }
  .slide-enter{
    transform: translateY(20px) scale(1);
    opacity: 1;
  }
  .slide-leave-to {
    transform: translateY(-20px) scale(0.8);
    opacity: 0;
  }
</style>
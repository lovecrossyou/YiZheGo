import api from '@/util/api.js';
 
const state={
	recommendlist:[],
	pageNo:1,
	pageSize:10,
	totalCount:0,
	loading: true,
	pullUpState:2,
	index:0,
	type_id:1
}

 
const mutations={
	godetails(state,index){
		state.index=index;
		uni.navigateTo({
			url:"/pages/moments/showWinOrderdetails?id="+state.recommendlist[index].showWinOrderCommentId+"&type_id="+state.type_id
		})
	},
	change_praise(state,date){
		date[0].praise=date[1].praise;
		date[0].praiseCount=date[1].praiseCount;
	},
	get_list(state){
		state.loading=true;
		let param = {
		pageNo:state.pageNo,
		size:state.pageSize
		};
		api.discusRecommendList(param).then((res)=>{
			state.totalCount=res.totalCount;
			if(state.pageNo===1){
				state.recommendlist = res.list;
			}
			else{
				state.recommendlist= state.recommendlist.concat(res.list);
			}
			state.pageNo=res.pageNo+1;
			state.loading=false;
			if (state.pageNo === state.totalCount) {
				state.pullUpState = 3;
			} else {
				state.pullUpState = 2;
			}
		});
	},
	updatelistpraise(state,date){
		state.recommendlist[state.index].praise=date.praise;
		state.recommendlist[state.index].praiseCount=date.praiseCount;
	},
	updatelistcommentCount(state,date){
		state.recommendlist[state.index].commentCount =date.commentCount ;
	}
}


const actions={
	async change_praise({commit},item){
		const res = await api.praiseShowWinOrder({
			showWinOrderId:item.showWinOrderCommentId,
		});
		let date=[item,res]
		commit('change_praise',date)
	},
	async get_list({commit}){
		commit('get_list')
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}
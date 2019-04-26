import api from '@/util/api.js';
 
const state={
	showWinOrderlist:[],
	pageNo:1,
	pageSize:10,
	totalCount:0,
	loading: true,
	pullUpState:2,
	index:0,
	type_id:3
} 

const mutations={
	godetails(state,index){
		state.index=index;
		uni.navigateTo({
			url:"/pages/moments/showWinOrderdetails?id="+state.showWinOrderlist[index].showWinOrderCommentId+"&type_id="+state.type_id
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
		api.showWinOrderList(param).then((res)=>{
			state.totalCount=res.totalCount;
			if(state.pageNo===1){
				state.showWinOrderlist = res.list;
			}
			else{
				state.showWinOrderlist = state.showWinOrderlist.concat(res.list);
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
		state.showWinOrderlist[state.index].praise=date.praise;
		state.showWinOrderlist[state.index].praiseCount=date.praiseCount;
	},
	updatelistcommentCount(state,date){
		state.showWinOrderlist[state.index].commentCount =date.commentCount ;
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
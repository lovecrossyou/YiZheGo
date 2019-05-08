import api from '@/util/api.js';
 
const state={
	commentlist:[],
	pageNo:0,
	pageSize:10,
	totalCount:0,
	loading: true,
	pullUpState:2,
	index:0,
	type_id:2
}
 
const mutations={
	change_index(state,index){
			state.index=index;
		},
	change_praise(state,date){
		date[0].praise=date[1].praise;
		date[0].praiseCount=date[1].praiseCount;
	},
	get_list(state){
		console.log('讨论加载...')
		state.loading=true;
		let param = {
		pageNo:state.pageNo,
		size:state.pageSize
		};
		api.discusCommentList(param).then((res)=>{
			state.totalCount=res.totalCount;
			if(state.pageNo===0){
				state.commentlist = res.list;
			}
			else{
				state.commentlist = state.commentlist.concat(res.list);
			}
			state.pageNo=res.pageNo+1;
			state.loading=false;
			console.log(res);
			if (state.pageNo === state.totalCount-1) {
				state.pullUpState = 3;
			} else {
				state.pullUpState = 2;
			}
		});
	},
	updatelistpraise(state,date){
		state.commentlist[state.index].praise=date.praise;
		state.commentlist[state.index].praiseCount=date.praiseCount;
	},
	updatelistcommentCount(state,date){
		state.commentlist[state.index].commentCount =date.commentCount ;
	}
}


const actions={
	async change_praise({commit},item){
		const res = await api.praiseShowWinOrder({
			showWinOrderId: item.discussCommentId,
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
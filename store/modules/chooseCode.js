import api from '../../util/api'

export default {
	namespaced: true,
	state:{
			codeCount: 5,
			codeList:[{code:[1,-1,-1],state:'modify'},{code:[1,-1,-1],state:'other'},{code:[1,-1,-1],state:'other'}],
			modifyIndex:0,
		},
		getters:{
			/* codeListShow(state){
				return state.codeList.map((element)=>{
					element.code = element.code.split(',')
					return element
					
				})
			} */
		},
	mutations: {
		setCode(state, data) {
			
			console.log(state.codeList[state.modifyIndex]);
			console.log(data);
				let codes = state.codeList[state.modifyIndex].code;
				for(let i=0;i<3;i++){
				if(codes[i] < 0){
					codes[i] = data;
				}
				if(i==2){
					state.codeList[state.modifyIndex].state = 'done';
					if(state.modifyIndex<state.codeList.length-1){
						state.modifyIndex+=1;
						state.codeList[state.modifyIndex].state = 'modify';
					}
				}
				state.codeList[state.modifyIndex].code = codes;
				
				break;
			}
			
			
			
		},
		
	},
	actions: {
		getAddressList({commit}) {
			
		}
	}
}

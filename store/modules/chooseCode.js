import api from '../../util/api'


// class Ball {
// 	// value color active
// 	
// 	// setActive
// 	// getValue
// setColor
// }


// class BallGroup
// reset
// setValue
// isModifying
// isComplete



export default {
	namespaced: true,
	state:{
			codeCount: 5,
			codeList:[{code:[3,-2,-1],state:'modify'},{code:[-1,-1,-1],state:'other'},{code:[-1,-1,-1],state:'other'}],
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
			
			
			//console.log(data);
				let preCodes = state.codeList[state.modifyIndex].code;
				for(let i=0;i<3;i++){
				if(preCodes[i] < 0){
					//codes[i] = data;
					const nextCodes = preCodes.map(c=>c);
					nextCodes[i] = data;
					
					state.codeList[state.modifyIndex].code = nextCodes;
					console.log(state.codeList[state.modifyIndex]);
					//state.codeList[state.modifyIndex].state = 'modify'+i;
					if(i==2){
						state.codeList[state.modifyIndex].state = 'done';
						if(state.modifyIndex<state.codeList.length-1){
							state.modifyIndex+=1;
							state.codeList[state.modifyIndex].state = 'modify';
						}
					}
					//state.codeList[state.modifyIndex].code = codes;
					break;
				}
				
				
				
				
			}
			
			
			
		},
		
	},
	actions: {
		getAddressList({commit}) {
			
		}
	}
}

import api from '../../util/api'
let allRedCodesForRandom = [0, 1, 2, 3, 4, 5, 6, 7,
	8, 9
];


function generateCode() {
	let code = '';
	let allCode = [];
	for (let i = 0; i < 3; i++) {
		let random = Math.floor(Math.random() * allRedCodesForRandom.length);
		code = allRedCodesForRandom[random];
		allCode[i] = code;

	}
	return allCode.join(',');
}

function getOneCode(allCodes) {

	//let times = Math.floor(allCodes.length / 1000 )+1 ;
	
	let code = generateCode();
	let canUse = true;
	//let timeShowed = 0;
	
	for (let i = 0; i < allCodes.length; i++) {
		
		if (code === allCodes[i]) {
			//if (++timeShowed == times) {
				canUse = false;
				break;
			//}
		}
	}
	if (canUse) {
		return code.split(',');
	} else {
	return	getOneCode(allCodes);
	}
}



function getAllCode(codeCount) {
	
	let codeArray = [];
	let group = Math.floor(codeCount/1000);
	 let rest = codeCount % 1000;
	 let restArr = [];
	 
	 for(let i=0;i<group;i++){
		 
		 for(let j=0;j<1000;j++){
			 let num = j+'';
			 let zeroSize = 3- num.length;
			 for(let k=0;k<zeroSize;k++){
				 num = '0'+num;
			 }
			codeArray.push(num.split('').join());
		 }
	 }
	
	for (let resti = 0; resti < rest; resti++) {
		
		let code = getOneCode(restArr);
		
		restArr.push(code.join());
	}
	
	codeArray = 	codeArray.concat(restArr);
	codeArray.sort();
	return codeArray;
}



function setCodeCount(state,count) {

	let blankList = [];
	for(let i=0;i<count;i++){
		
		let codeItem = {};
		codeItem.code = [-1, -1, -1];
		codeItem.state = 'other';
		codeItem.showReset = false;
		if(i===0){
			codeItem.state = 'modify';
		}
		blankList.push(codeItem);
	}
	
	state.codeList = blankList;
	state.modifyIndex = 0;
	state.codeCount = count;
	state.tempIndex = [];
}

export default {
	namespaced: true,
	state: {
		codeCount: 1000,
		codeList: [{
			code: [-1, -1, -1],
			state: 'modify',
			showReset: false,
		}],
		modifyIndex: 0,
		tempIndex: [],
	},
	getters: {
		allFinished(state) {
			return state.codeList.every((element) => {
				return element.state === 'done';
			})
		},
		isResetState(state) {
			return state.tempIndex.length > 0;
		},
		allCode(state) {
			return state.codeList.map((element) => {
				return element.code.join();
			})
		},
		codeListForShow(state){
			let size = state.codeList.length > 3 ? 3 : state.codeList.length;
			let codeListShow = [];
			for(let i = 0;i<size;i++){
			codeListShow.push(state.codeList[i].code)	
			}
			return codeListShow;
		}
	},
	mutations: {
		setCode(state, data) {
			let code = state.codeList[state.modifyIndex].code.slice(0);
			for (let i = 0; i < 3; i++) {
				if (code[i] < 0) {
					code[i] = data;
					state.codeList[state.modifyIndex].code = code;

					if (i == 2) {
						state.codeList[state.modifyIndex].state = 'done';
						state.codeList[state.modifyIndex].showReset = true;
						if (state.tempIndex.length > 0) {
							state.modifyIndex = state.tempIndex.shift();
						} else if (state.modifyIndex < state.codeList.length - 1) {
							state.modifyIndex += 1;
							state.codeList[state.modifyIndex].state = 'modify';
						}
					}
					break;
				}
			}
		},
		deleteCode(state, index) {
			let codeArray = state.codeList[state.modifyIndex].code.slice(0);
			codeArray[index] = -1;
			state.codeList[state.modifyIndex].code = codeArray;
		},
		resetCode(state, index) {
			state.codeList[index].code = [-1, -1, -1];
			state.codeList[index].state = 'modify';
			state.tempIndex.push(state.modifyIndex);
			state.tempIndex.push(index);
			state.tempIndex.sort((a, b) => a - b);
			state.modifyIndex = state.tempIndex.shift();
		},
		randomCode(state) {
			let allCodes = state.codeList.map((element) => {
				return element.code.join();
			})
			let code = getOneCode(allCodes);
			state.codeList[state.modifyIndex].code = code;
			state.codeList[state.modifyIndex].state = 'done';
			state.codeList[state.modifyIndex].showReset = true;
			if (state.tempIndex.length > 0) {
				state.modifyIndex = state.tempIndex.shift();
			} else if (state.modifyIndex < state.codeList.length - 1) {
				state.modifyIndex += 1;
				state.codeList[state.modifyIndex].state = 'modify';
			}
		},
		randomAllCode(state,count){
			uni.showLoading({
				mask:true
			});
			let codeArray = getAllCode(count);
			
			let codeList = [];
			for(let i=0;i<count;i++){
				let codeItem = {};
				codeItem.code = codeArray[i].split(',');
				codeItem.state = 'done';
				codeItem.showReset = true;
				codeList.push(codeItem);
			}
			
			state.codeList = codeList;
			state.modifyIndex = codeList.length -1;
			uni.hideLoading();
		},
		changeCodeCount(state,count){
			setCodeCount(state,count);
		},
		initCode(state){
			setCodeCount(state,1);
		}

	},
	actions: {
		getAddressList({
			commit
		}) {

		}
	}
}

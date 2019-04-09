const state = {
	navigationlist: ["推荐", "讨论", "晒单", "中签", "福彩"],
	isOnclick: 0,
	discusRecommendList: [{
			"userIconUrl": "/static/moments/user_icon.jpg",
			"userName": "钻石大佬",
			"userSex": 0,
			"createTime": "2018-05-10 14:16",
			"commentContent": "中签了，太棒了，手气相当不错，平台有保障，没问题，看图说话。",
			"imageOrVideoUrl": ["/static/moments/banner_1.jpg", "/static/moments/banner_2.jpg"],
			"discountGameStage": "201607260002",
			"praiseCount": 888,
			"commentCount": 888
		},
		{
			"userIconUrl": "/static/moments/user_icon.jpg",
			"userName": "白金大佬",
			"userSex": 1,
			"createTime": "2019-04-02 16:16",
			"commentContent": "中签了，太棒了，你没中过，气不气。",
			"imageOrVideoUrl": ["/static/moments/banner_1.jpg", "/static/moments/banner_2.jpg"],
			"discountGameStage": "201904020002",
			"praiseCount": 999,
			"commentCount": 999
		}
	]
}

const getters = {

}

const mutations = {
	navigationclick(state, index) {
		state.isOnclick = index;
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	getters
}

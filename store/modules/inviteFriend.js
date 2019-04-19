import api from '@/util/api.js';

const state = {
	inviteUserList: null,
	profitAllFriendInfo: null,
	userProfitInfo: null
}

const actions = {
	async fetchInviteUser({
		commit
	}) {
		const res = await api.inviteUser({
			inviteUserId: 0
		})
		commit('setInviteUser', res)
	},
	async fetchUserProfitAllFriendInfo({
		commit
	}) {
		const res = await api.userProfitAllFriendInfo({});
		commit('setProfitAllFriendInfo', res)
	},
	async fetchUserProfitInfo({
		commit
	}) {
		const res = await api.userProfitInfo({});
		commit('setUserProfitInfo', res)
	}
}

const getters = {

}

const mutations = {
	setInviteUser(state, data) {
		state.inviteUserList = data
	},
	setProfitAllFriendInfo(state, data) {
		state.profitAllFriendInfo = data
	},
	setUserProfitInfo(state, data) {
		state.userProfitInfo = data
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

// 管理账号信息
const TOKEN_KEY = 'TOKEN_KEY';
const INFO_KEY = 'INFO_KEY';
const OPENID = 'OPENID'


const INVITEID = 'INVITEID'


const getToken = function() {
	let ret = '';
	ret = uni.getStorageSync(TOKEN_KEY);
	if (!ret) {
		return null;
	}
	return JSON.parse(ret);
}

const addToken = function(token) {
	uni.setStorageSync(TOKEN_KEY, JSON.stringify(token));
}

const addInviteId = function(id) {
	uni.setStorageSync(INVITEID, id);
}

const getInviteId = function() {
	let ret = '';
	ret = uni.getStorageSync(INVITEID);
	if (!ret) {
		return null;
	}
	return ret;
}


const addOpenId = function(openid) {
	uni.setStorageSync(OPENID, openid);
}

const getOpenId = function(openid) {
	let ret = '';
	ret = uni.getStorageSync(OPENID);
	if (!ret) return ret;
	return ret;
}


const getInfo = function() {
	let ret = '';
	ret = uni.getStorageSync(INFO_KEY);
	if (!ret) return null;
	return JSON.parse(ret);
}

const addInfo = function(info) {
	if (!info) return;
	uni.setStorageSync(INFO_KEY, JSON.stringify(info));
	addToken(info.accessToken);
}

export default {
	getToken,
	getInfo,
	addToken,
	addInfo,
	getOpenId,
	addOpenId,
	addInviteId,
	getInviteId
}

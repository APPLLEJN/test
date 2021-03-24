import api from './index'
// axios
import request from '@/utils/request'

export function weixinConfig() {
  return request({
    url: api.weixinConfig,
    method: 'get',
    params: { url: location.href }
  })
}

export function weixinPay(id, data) {
  return request({
    url: api.getMeet + '/' + id + '/pay',
    method: 'post',
    data
  })
}

// 登录
export function login(data) {
  return request({
    url: api.Login,
    method: 'post',
    data
  })
}

// 刷新token
export function refreshToken(data) {
  console.log('00000', data, '5555555555555')
  return request({
    url: api.refreshToken,
    method: 'post',
    data
  })
}

// 用户信息 post 方法
export function getUserInfo(data) {
  return request({
    url: api.UserInfo,
    method: 'post',
    data,
    hideloading: true
  })
}

// 用户名称 get 方法
export function getUserName(params) {
  return request({
    url: api.UserName,
    method: 'get',
    params,
    hideloading: true
  })
}

// 授权
export function getToken(params) {
  return request({
    url: api.getToken,
    method: 'post',
    params
  })
}

// 授权
export function editUser(data) {
  return request({
    url: api.userInfo,
    method: 'put',
    data
  })
}

export function getInfo() {
  return request({
    url: api.userInfo,
    method: 'get'
  })
}

export function getFund() {
  return request({
    url: api.selfFund,
    method: 'get'
  })
}

export function postWithdraw() {
  return request({
    url: api.selfWithdraw,
    method: 'post'
  })
}

export function getMeets(params) {
  return request({
    url: api.getMeets,
    method: 'get',
    params
  })
}

export function getReceives(params) {
  return request({
    url: api.getReceives,
    method: 'get',
    params
  })
}

export function editUserPrice(data) {
  return request({
    url: api.userPrice,
    method: 'put',
    data
  })
}

export function booking(id, data) {
  return request({
    url: api.user + '/' + id + '/meets',
    method: 'post',
    data
  })
}

export function getMeet(id) {
  return request({
    url: api.getMeet + '/' + id,
    method: 'get'
  })
}

export function getMeetMessage(id) {
  return request({
    url: api.getMeet + '/' + id + '/messages',
    method: 'get'
  })
}


export function comment(id, data) {
  return request({
    url: api.getMeet + '/' + id + '/comments',
    method: 'post',
    data
  })
}

export function meetConfirm(id) {
  return request({
    url: api.getMeet + '/' + id + '/confirm',
    method: 'post'
  })
}

export function meetRefuse(id) {
  return request({
    url: api.getMeet + '/' + id + '/refuse',
    method: 'post'
  })
}

export function meetCancel(id) {
  return request({
    url: api.getMeet + '/' + id + '/cancel',
    method: 'post'
  })
}

export function meetFinish(id) {
  return request({
    url: api.getMeet + '/' + id + '/finish',
    method: 'post'
  })
}

export function getInvite(id) {
  return request({
    url: api.getnvite,
    method: 'get'
  })
}

export function getInvites(id) {
  return request({
    url: api.creatInvite,
    method: 'get'
  })
}

export function createInvite(id) {
  return request({
    url: api.creatInvite,
    method: 'post'
  })
}

export function acceptInvite(data) {
  return request({
    url: api.acceptInvite,
    method: 'post',
    data
  })
}

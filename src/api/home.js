// import qs from 'qs'
// axios
// import request from '@/utils/request'
// home api

import api from './index'
// axios
import request from '@/utils/request'

// 登录
export function getList(params) {
  return request({
    url: api.user,
    method: 'get',
    params
  })
}

export function getDetail(id) {
  return request({
    url: api.user + '/' + id,
    method: 'get'
  })
}

export function getComments(id, params) {
  return request({
    url: api.user + '/' + id + '/comments',
    method: 'get',
    params
  })
}

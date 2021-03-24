import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'
// create an axios instance
import Cookie from 'js-cookie'
import { refreshToken } from '@/api/user.js'

const BASE_TOKEN = 'Basic 97d4fbd532a9b12f4ac8b7ee25a2889d'

// axios.defaults.baseURL = process.env.API_HOST

// axios.defaults.headers.common['Authorization'] = Cookie.get('hackerby_token') ? ('JWT ' + Cookie.get('hackerby_token')) : BASE_TOKEN

const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    if (store.getters.token) {
      config.headers['X-Token'] = ''
    }
    config.headers['Authorization'] = Cookie.get('hackerby_token') ? ('JWT ' + Cookie.get('hackerby_token')) : BASE_TOKEN
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  async response => {
    Toast.clear()
    if (response.data.code && response.data.code !== 200) {
      // 登录超时,重新登录
      if (response.data.code === 403) {
        
        // store.dispatch('FedLogOut').then(() => {
        //   location.reload()
        // })
        Cookie.remove('hackerby_token')
        refreshToken({user_id: JSON.parse(Cookie.get('me')).id, refresh_token: Cookie.get('hackerby_refresh_token')}).then((res) => {
          Cookie.set('hackerby_token', res.AccessToken, { expires: 7 })
          Cookie.set('hackerby_refresh_token', res.RefreshToken, { expires: 7 })
        })
        Toast.clear()
      }
      return Promise.reject(response || 'error')
    } else {
      if (response.data.code === 403) {}
      return Promise.resolve(response.data.body)
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service

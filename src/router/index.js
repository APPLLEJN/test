import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config.js'
import Cookie from 'js-cookie'
import { param2Obj, linkToWXAuth } from '@/utils'
import { getToken, getInfo, refreshToken } from '@/api/user.js'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: 'history',
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    base: '/',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.beforeEach(async(to, from, next) => {
  Cookie.set('hackerby_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklEIjoiNWZjZjhkMzRhNTllMWFkMmVhZDI0ODNjIiwiT3BlbklEIjoibzRnckM1bUpZQ21rWE9jZFBpaGFPUUtGSHJBZyJ9LCJleHAiOiIyMDIxLTAyLTEyVDExOjE5OjQ3LjU3MTc3OTE3MyswODowMCIsImlzcyI6Imlzc3VlciIsInN1YiI6ImFjY2VzcyJ9.z3eF4izPJ8TfccB-TYLJeGvIVUcAC3ZplL8gc3xdHUQ')
  Cookie.set('me', {})
  Vue.prototype.GLOBAL = { me: Cookie.get('me') }
  if (to.matched.some(recode => recode.meta.noAuth)) {
    next()
  } else {
    const { code } = param2Obj(location.href)
    if (code && !Cookie.get('me')) {
      const wxRes = await getToken({ code: code })
      Cookie.set('me', wxRes.user, { expires: 7 })
      Cookie.set('hackerby_token', wxRes.token.AccessToken, { expires: 7 })
      Cookie.set('hackerby_refresh_token', wxRes.token.RefreshToken, { expires: 7 })
      Vue.prototype.GLOBAL = { me: wxRes.user }
      next()
    } else {
      if (!Cookie.get('me')) {
        console.log('enter======')
        linkToWXAuth()
      } else if (!Vue.prototype.GLOBAL.me) {
        const res = await getInfo()
        console.log(res, '=====')
        if (res.statusCode === 403) {
          // Cookie.remove('hackerby_token')
          // refreshToken({ user_id: JSON.parse(Cookie.get('me')).id , refresh_token: Cookie.get('hackerby_refresh_token') })
          // Cookie.set('hackerby_token', res.AccessToken, { expires: 7 })
          // Cookie.set('hackerby_refresh_token', res.RefreshToken, { expires: 7 })
          next()
        } else {
          const userInfo = await getInfo()
          console.log(userInfo, 'userInfo')
          Cookie.set('me', userInfo, { expires: 7 })
          Vue.prototype.GLOBAL = { me: userInfo }
          next()
        }
        next()
      } else {
        next()
      }
    }
  }
})

export default router

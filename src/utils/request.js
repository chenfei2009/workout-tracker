import axios from 'axios'
// import { cacheAdapterEnhancer } from 'axios-extensions'
import { AuthManager } from '@/utils/AuthManager'
import { BASEURL, TOKEN, REFRESH_TOKEN } from './constants'
import { useStore } from '@/store/index'

const request = axios.create({
  timeout: 5000,
  baseURL: BASEURL
  // eslint-disable-next-line
  // adapter: cacheAdapterEnhancer(Axios.defaults.adapter)
})

// 请求拦截
request.interceptors.request.use(config => {
  // show request in console during development
  // if (process.env.NODE_ENV === 'development') {
  //   console.info('✉️ ', config.method?.toUpperCase() + ' ' + config.url)
  // }
  const token = JSON.parse(window.localStorage.getItem(TOKEN))
  // 如果有登录用户信息，则统一设置 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
},
// 请求失败，会经过这里
error => {
  console.log('请求失败')
  return Promise.reject(error)
})

let isRefreshing = false

// 定义一个请求队列，方便我们刷新后重新请求
const authQueue = []

// 响应拦截
request.interceptors.response.use(
  response => {
    // console.log(response)
    if (!response.data.meta || response.data.meta.status !== 401) {
      console.log('响应拦截', response.data)
      return response
    }
    if (response.data.meta.status === 401) {
      if (!isRefreshing) {
        console.log('token已过期，自动刷新token')
        isRefreshing = true
        // 调用刷新token的接口
        return refreshToken()
          .then(res => {
            console.log('token 刷新成功')
            // 登录
            const store = useStore()
            store.signIn()
            // 替换token
            const { accessToken } = res.data.data
            localStorage.setItem(TOKEN, JSON.stringify(accessToken))
            response.config.headers.Authorization = `Bearer ${accessToken}`
            // token 刷新后将数组的方法重新执行
            authQueue.forEach(cb => cb())
            // authQueue.forEach(cb => {
            //   console.log('重新发送请求', cb)
            //   return cb()
            // })
            authQueue.length = 0 // 重新请求完清空
            return request(response.config)
          })
          .catch(error => {
            console.log('token 刷新失败', error, authQueue)
            authQueue.length = 0 // 重新请求完清空
            // 退出登录
            AuthManager.signOut()
            return Promise.reject(error)
          })
          .finally(() => {
            isRefreshing = false
          })
      }
      // 正在刷新token，返回一个未执行resolve的promise
      // 把promise 的resolve 保存到队列的回调里面，等待刷新Token后调用
      // 原调用者会处于等待状态直到 队列重新发起请求，再把响应返回，以达到用户无感知的目的（无痛刷新）
      return new Promise(resolve => {
        // authQueue.push(accessToken => {
        //   response.config.headers.Authorization = `Bearer ${accessToken}`
        //   resolve(request(response.config))
        // })
        authQueue.push(() => {
          // console.log('添加请求至缓存队列', response.config)
          resolve(request(response.config))
        })
      })
    }
    return new Promise(() => {})
  },
  error => {
    return Promise.reject(error)
  }
)

export default request

function refreshToken () {
  // 获取我们存在本地的refreshToken
  const oldRefreshToken = JSON.parse(localStorage.getItem(REFRESH_TOKEN))
  if (!oldRefreshToken) {
    // 退出登录
    AuthManager.signOut()
    throw new Error('本地找不到 refreshToken')
  }
  return axios.create({
    timeout: 5000,
    baseURL: BASEURL
  }).post(
    '/auth/refresh',
    {
      refreshToken: oldRefreshToken
    },
    {
      headers: {} // 刷新token的请求headers肯定不要携带Authorization字段
    }
  )
}

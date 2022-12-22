import router from '@/router'
import { useStore } from '@/store/index'

import request from '@/utils/request'
import { signInValidator, signUpValidator } from '@/utils/validator'
import { TOKEN, REFRESH_TOKEN, USER } from '@/utils/constants'

/**
 * 用户登录
 */
export async function signIn (form) {
  // 表单验证
  const msg = signInValidator(form)
  if (msg) return alert(msg)
  // 发送请求
  request.post('login', form)
    .then(res => {
      const { data } = res
      if (data.status === 200) {
        // 登陆成功
        const { user } = data.data
        window.localStorage.setItem(USER, JSON.stringify(user))
        window.localStorage.setItem(TOKEN, JSON.stringify(data.data.accessToken))
        window.localStorage.setItem(REFRESH_TOKEN, JSON.stringify(data.data.refreshToken))
        const store = useStore()
        store.signIn(user)
      }
      router.push({ name: 'Home' })
    })
    .catch(err => console.error(err))
}

/**
 * 退出登录
 */
export function signOut () {
  // router.push({ name: 'LoginView' })
  window.localStorage.removeItem(USER)
  window.localStorage.removeItem(TOKEN)
  window.localStorage.removeItem(REFRESH_TOKEN)
  const store = useStore()
  store.signOut()
  router.push({ name: 'Home' })
}

/**
 * 用户注册
 */
export async function signUp (form) {
  // 表单验证
  const msg = signUpValidator(form)
  if (msg) return alert(msg)
  // 发送请求
  request.post('register', form)
    .then(res => {
      const { data } = res
      if (data.meta.status === 200) {
        // 注册成功
        const { user } = data.data
        window.localStorage.setItem(USER, JSON.stringify(user))
        window.localStorage.setItem(TOKEN, JSON.stringify(data.data.accessToken))
        window.localStorage.setItem(REFRESH_TOKEN, JSON.stringify(data.data.refreshToken))
        const store = useStore()
        store.signIn(user)
      }
      router.push({ name: 'Home' })
    })
    .catch(err => console.error(err))
}

/**
 * 验证邮箱是否已注册
 * @param {string} email
 */
export async function vertifyEmail (email) {
  request.post('register/check', { email })
    .then(res => {
      const { status, msg } = res.data.meta
      console.log(status, msg)
      if (status === 402) return alert(msg)
    })
    .catch(err => console.log(err))
}

/**
 * 认证 token
 */
// export async function verfiyUser () {
//   const token = localStorage.getItem(lsKey)
//   if (!token) return false
//   const options = {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }
//   const res = await fetch(`${BASEURL}user/verify`, options)
//     .then(res => res.json())
//     .catch(() => {
//       signOut()
//       return false
//     })
//   if (res.statusCode && res.statusCode === 401) {
//     console.log('token 过期')
//     signOut()
//     return false
//   }
//   return true
// }

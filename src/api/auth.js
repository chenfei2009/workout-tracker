import request from '@/utils/request'

/**
 * 用户登录
 * @param {object} form
 */
export const _login = async form => request.post('login', form)

/**
 * 用户注册
 * @param {object} form
 */
export const _register = async form => request.post('register', form)

/**
 * 验证邮箱是否已注册
 * @param {string} email
 */
export const _vertifyEmail = async email => request.post('register/check', { email })

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

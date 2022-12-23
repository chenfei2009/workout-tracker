import { anHour, DAYS } from '@/utils/constants'

/**
 * returns formatted time string
 * @param time seconds or timestamp
 */
/* eslint-disable */
export const formatDate = time => {
  switch (typeof time) {
    case 'number':
      break
    case 'string':
      time = +new Date(time)
      break
    case 'object':
      if (time.constructor === Date) time = time.getTime()
      break
    default:
      time = +new Date()
  }
  const time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ]
  let seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds)
    token = 'from now'
    list_choice = 2
  }
  let i = 0,
    format
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == 'string') return (format)[list_choice]
      else
        return Math.floor(seconds / +format[2]) + ' ' + format[1] + ' ' + token
    }
  return time
}

/**
 * returns date or XX minutes ago, depending on time.
 * @param {number} timestamp 
 */
export const formatTimeForMessage = timestamp => {
  if (new Date().getTime() - timestamp < 3 * anHour)
    return formatDate(timestamp)
  return (
    DAYS[new Date(timestamp).getDay()].substring(0, 2) +
    ' ' +
    [
      { day: 'numeric' },
      { month: 'short' },
      { hour: 'numeric', hour12: false },
      { minute: 'numeric' }
    ]
      .map(x => new Intl.DateTimeFormat('en-US', x).format(timestamp))
      .map(
        (x, i) =>
          (i === 3 ? (+x < 10 ? '0' + x : x) : x) +
          (i === 1 ? ', ' : i === 2 ? ':' : ' ')
      )
      .join('')
  )
}

/**
 * returns date str
 * @param {number} date timestamp
 * @param {string} fmt eg.'YYYY-mm-DD'
 */
export const formatDateForCale = (date, fmt) => {
  // 1.获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    // fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').slice(4 - RegExp.$1.length))
  }
  // M+ 正则表达式规则
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      // fmt = fmt.replace(RegExp.$1, str)
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
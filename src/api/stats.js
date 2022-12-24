import request from '@/utils/request'

/**
 * 查询日期范围记录数据
 * @param {number} start 起始日期
 * @param {number} end 结束日期
 * @param {string} userId
 */
// export const _getCaleStats = async params => request.get('stats/cale', { params })
export const _getCaleStats = async (start, end, userId) => {
  return request.get('stats/cale', {
    params: { start, end, userId }
  })
}
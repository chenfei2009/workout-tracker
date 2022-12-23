import request from '@/utils/request'

/**
 * 查询日期范围记录数据
 * @param {string} start 起始日期
 * @param {string} end 结束日期
 * @param {string} userId
 */
// export const _getCaleStats = async params => request.get('stats/cale', { params })
export const _getCaleStats = async (start, end, userId) => {
  request.get('stats/cale', {
    params: { start, end, userId }
  })
}
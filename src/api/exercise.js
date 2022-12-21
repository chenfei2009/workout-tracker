import request from '@/utils/request'

// 获取关键词对应的动作
export const _getExercisesByQuery = async (query, areas) =>
  request.get('/exercise', {
    params: { query, areas }
  })

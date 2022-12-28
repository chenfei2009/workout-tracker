import request from '@/utils/request'

// 获取关键词对应的动作
export const _getExercisesByQuery = async (query, areas) =>
  request.get('/exercise', {
    params: { query, areas }
  })

// 获取id对应的动作详情
export const _getExerciseById = async id => request.get(`/exercise/${id}`)

// 收藏动作
export const _markExercise = async exId => request.post(`/exercise/mark/${exId}`)

// 取消收藏动作
export const _cancelMarkExercise = async exId => request.delete(`/exercise/mark/${exId}`)

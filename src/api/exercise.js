import request from '@/utils/request'

// 获取关键词对应的动作
export const _getExercisesByQuery = async (query, areas) =>
  request.get('/exercise', {
    params: { query, areas }
  })

// 获取id对应的动作详情
export const _getExerciseById = async id => request.get(`/exercise/${id}`)

/** 
 * 收藏/取消收藏动作
 * subscribe an exercise or cancel
 * @param {string} exId  动作 id
 * @param {number} t  操作,1 为收藏,其他为取消收藏
 */
export const _subExercise = async (exId, t = -1) => request.post('/exercise/sub', exId, t)

/** 
 * 新建自定义动作
 * create a private exercise
 * @param {object} dto
 */
export const _createExercise = async dto => request.post('/exercise', dto)

/** 
 * 更新自定义动作
 * update a private exercise
 * @param {string} exId  动作 id
 * @param {object} dto
 */
export const _updateExercise = async (exId, dto) => request.put(`/exercise/update/${exId}`, dto)

import request from '@/utils/request'

// 获取所有训练
export const _getWorkouts = async () => request.get('workout')

// 获取流行训练
export const _getTrendingWorkouts = async () => request.get('workout/trending')

// 获取最近训练
export const _getLatestWorkouts = async author => request.get(`workout/${author}/latest`)

// 获取关键词对应的训练
export const _getCateWorkouts = async params => request.get('workout/list', { params })

// 获取用户创建的训练
export const _getUserWorkouts = async author => request.get(`workout/${author}/created`)

// 获取训练详情
export const _getWorkoutById = async id => request.get(`workout/details/${id}`)

// 保存训练
export const _saveWorkout = async dto => request.post('exercise/finished', dto)

export const _createWorkout = async dto => request.post('workout', dto)

export const _updateWorkout = async (id, dto) => request.put('workout', id, dto)

// 收藏训练
export const _subWorkout = async workoutId => request.post(`user/mark/workout/${workoutId}`)

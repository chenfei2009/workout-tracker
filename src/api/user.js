import request from '@/utils/request'

// 收藏训练
export const _markWorkout = async workoutId => request.post('user/mark/workout/:id')

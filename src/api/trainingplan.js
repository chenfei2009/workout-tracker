import request from '@/utils/request'

// 收藏训练
export const _getFullPlan = async () => request.get('trainingplan/full')

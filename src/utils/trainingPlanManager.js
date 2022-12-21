/**
 * 管理官方训练数据
 */
export class UserTrainingPlan {
  static getTrainingPlan () {
    const store = useStore()
    return store.trainingPlan
  }

  static async loadTrainingPlan () {
    const { data } = await request.get('trainingplan/full')
    this.setTrainingPlan(data.data)
  }

  static setTrainingPlan (plan) {
    if (!plan) return
    const store = useStore()
    store.setTrainingPlan(plan)
  }
}

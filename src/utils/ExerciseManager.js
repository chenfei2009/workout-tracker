import { useStore } from '@/store/index'

export class ExerciseManager {
  /**
   * 将动作添加到 store.state.workout
   * @param {IExercise | IExerciseInfo} ex
   */
  static addToWorkout (ex) {
    // 判断是否登录
    // if (!store.getters.valid) return openFullscreen('login')
    const store = useStore()
    store.setWorkoutToAdd(ex)
  }
}



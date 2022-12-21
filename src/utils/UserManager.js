import { useStore } from '@/store/index'
import request from '@/utils/request'
import { USER } from '@/utils/constants'
import { _getCreatedWorkouts, _markWorkout } from '@/api/workout'

export class UserManager {
  static addWorkout (workout) {
    let workouts = this.getWorkouts() || []
    let exists = false
    workouts = workouts.map(x => {
      if (x._id === workout._id) {
        exists = true
        return workout
      }
      return x
    })
    if (!exists) workouts.push(workout)
    this.setWorkouts(workouts)
    console.log('addWorkout succeed', workout)
  }

  /**
   * 管理用户个人训练数据
   */
  static getCreatedWorkouts () {
    const store = useStore()
    console.log('get user workouts from store', store.createdWorkouts)
    return store.createdWorkouts
  }

  static setCreatedWorkouts (workouts) {
    const store = useStore()
    store.setCreatedWorkouts(workouts)
  }

  static async loadCreatedWorkouts () {
    // if (!this.getWorkouts() && this.getUser())
    if (!this.getCreatedWorkouts()) {
      const user = JSON.parse(localStorage.getItem(USER))
      const { data } = await _getCreatedWorkouts(user._id)
      this.setCreatedWorkouts(data.data)
    }
  }

  // static getMarkedWorkouts () {
  //   const store = useStore()
  //   console.log('get user workouts from store', store.createdWorkouts)
  //   return store.createdWorkouts
  // }

  static markWorkout (id, workout) {
    _markWorkout(id, workout)
  }

  /**
   * 管理用户计划数据
   */
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

  static getExercises () {
    const store = useStore()
    console.log('get userExercises from store', store.exercises)
    return store.exercises
  }

  static setExercises (exercises) {
    const store = useStore()
    store.setExercises(exercises)
  }

  static async loadExercises () {
    // if (!this.getWorkouts() && this.getUser())
    if (!this.getExercises()) {
      const user = JSON.parse(localStorage.getItem(USER))
      const { data } = await request.get(`exercise/${user._id}/created`)
      this.setExercises(data.data)
    }
  }
}

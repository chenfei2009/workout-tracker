import { useStore } from '@/store/index'
// import { FinishExerciseDTO } from './dtos';
import { closeFullscreen, openFullscreen } from './fullScreen'
import { _getWorkouts, _saveWorkout } from '@/api/workout'
// import { TrainingStatistics } from './Trainingstatistics'

/**
 * 管理官方训练数据
 */
export class WorkoutManager {
  static getWorkout (id) {
    return (this.getWorkouts() || []).filter(x => x._id === id)[0] || null
  }

  static getWorkouts () {
    const store = useStore()
    console.log('get public from store', store.workouts)
    return store.workouts
  }

  static setWorkouts (workouts) {
    const store = useStore()
    store.setWorkouts(workouts)
  }

  static async loadWorkouts () {
    // if (!this.getWorkouts() && this.getUser())
    if (!this.getWorkouts()) {
      const { data } = await _getWorkouts()
      this.setWorkouts(data.data)
    }
  }
}

/**
 * 管理训练中数据
 */
export class RunningWorkout {
  static lsStats = 'running-workout-st' // Local_Storage_Stats
  static lsExerc = 'running-workout-ex' // Local_Storage_Exercise
  static lsStartTS = 'running-workout-ts' // Local_Storage_Start_Time_Str

  static startWorkout (exercises) {
    // 判断是否登录
    // if (!UserManagement.getUser()) return openFullscreen('login')
    if (exercises && exercises.length > 0) {
      // 数据保存到本地缓存
      localStorage.setItem(this.lsStartTS, new Date().getTime().toString())
      localStorage.setItem(this.lsExerc, JSON.stringify(exercises))
      this.prepareStats(exercises)
      openFullscreen('RunningWorkout')
    }
  }

  static prepareStats (exercises) {
    const stats = exercises.map(x => {
      return {
        exerciseId: x._id,
        start: -1,
        duration: 0,
        reps: [],
        weights: [],
        distance: '',
        time: -1
      }
    })
    localStorage.setItem(this.lsStats, JSON.stringify(stats))
  }

  static hasActiveWorkout () {
    return (
      !!localStorage.getItem(this.lsStartTS) &&
      !!localStorage.getItem(this.lsExerc) &&
      !!localStorage.getItem(this.lsStats)
    )
  }

  static checkActive () {
    if (this.hasActiveWorkout()) {
      openFullscreen('RunningWorkout')
    }
  }

  static clearActiveWorkout () {
    // 清除本地缓存
    localStorage.removeItem(this.lsStartTS)
    localStorage.removeItem(this.lsExerc)
    localStorage.removeItem(this.lsStats)
    closeFullscreen('Workouts')
  }

  static saveStats (stats) {
    localStorage.setItem(this.lsStats, JSON.stringify(stats))
  }

  static getStartTime () {
    return +(localStorage.getItem(this.lsStartTS) || 0)
  }

  static getStats () {
    return JSON.parse(localStorage.getItem(this.lsStats) || '[]')
  }

  static getExercises () {
    return JSON.parse(localStorage.getItem(this.lsExerc) || '[]')
  }

  static saveWorkout (stats) {
    console.log(stats)
    const dto = stats
      .map(x => {
        const d = {
          duration: x.duration,
          exerciseId: x.exerciseId,
          start: this.getStartTime()
        }
        if (x.reps.length > 0) {
          d.setsReps = x.reps
          d.setsWeights = x.weights
        } else if (x.distance.length > 0) {
          d.distances = [x.distance]
        } else if (x.time > 0) {
          d.times = [x.time]
        } else {
          return null
        }
        return d
      })
      .filter(x => !!x)

    // 提交数据到后台
    _saveWorkout(dto)
    // 清除当前活动数据
    this.clearActiveWorkout()
    // TrainingStatistics.loadCharts()
  }
}

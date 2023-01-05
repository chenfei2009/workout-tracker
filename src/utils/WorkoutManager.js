import { closeFullscreen, openFullscreen } from './fullScreen'
import { _saveWorkout } from '@/api/workout'
import { UserManager } from '@/utils/UserManager'

/**
 * 管理训练中数据
 */
export class WorkoutManager {
  static lsStats = 'running-workout-st' // Local_Storage_Stats
  static lsExerc = 'running-workout-ex' // Local_Storage_Exercise
  static lsWork = 'running-workout' // Local_Storage_Workout
  static lsStartTS = 'running-workout-ts' // Local_Storage_Start_Time_Str

  static startWorkout (exercises, workout) {
    // 判断是否登录
    if (!UserManager.getUserId()) return openFullscreen('login')
    // 判断是否有 exercise
    if (!exercises || exercises.length === 0) return console.error('no exercise')
    // 判断是否有 workout
    if (!workout) return console.error('no workout')
    // 数据保存到本地缓存
    localStorage.setItem(this.lsStartTS, new Date().getTime().toString())
    localStorage.setItem(this.lsExerc, JSON.stringify(exercises))
    const { _id, author, title, reps, times } = workout
    localStorage.setItem(this.lsWork, JSON.stringify({ _id, author, title, reps, times }))
    this.prepareStats(exercises)
    openFullscreen('RunningWorkout')
  }

  static prepareStats (exercises) {
    const stats = exercises.map(x => {
      return {
        exerciseId: x._id,
        start: -1,
        duration: 0,
        reps: [],
        weights: [],
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

  static getWorkout () {
    return JSON.parse(localStorage.getItem(this.lsWork) || '{}')
  }

  static getExercises () {
    return JSON.parse(localStorage.getItem(this.lsExerc) || '[]')
  }

  static saveWorkout (stats) {
    // console.log(stats)
    const dto = stats
      .map(x => {
        console.log(x)
        const d = {
          duration: x.duration,
          exerciseId: x.exerciseId,
          start: this.getStartTime()
        }
        if (x.reps.length > 0) {
          d.setsReps = x.reps
          d.setsWeights = x.weights
        } else if (x.time > 0) {
          d.times = [x.time]
        } else {
          return null
        }
        return d
      })
      .filter(x => !!x)

    // 提交数据到后台
    console.log('提交数据到后台', dto)
    _saveWorkout(dto)
    // 清除当前活动数据
    this.clearActiveWorkout()
    // TrainingStatistics.loadCharts()
  }
}

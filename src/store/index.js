import { defineStore } from 'pinia'

import { openFullscreen } from '@/utils/fullScreen'
import { UserManager } from '@/utils/UserManager'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'main',

  // state: 返回对象的函数
  state: () => ({
    // auth 相关
    isUserValid: false,
    userId: null,

    // route 相关
    storeRoute: null,

    /* workout */
    runningWorkout: null, // 进行中的训练
    workouts: null,
    workoutToAdd: null,
    cateWorkouts: null,
    trendingWorkouts: null,
    latestWorkouts: null,
    // createdWorkouts: null, // 用户创建的训练
    // markedWorkouts: null, // 用户收藏的训练

    /* 训练相关 */
    runningExercise: null, // 进行中的动作
    exercises: null,
    trendingExercises: null, // [benchPress]
    latestExercises: null, // [benchPress]
    createdExercises: null,

    // Plan 相关
    trainingPlan: null,

    // SpotaneousList 相关
    spotaneousList: [], // 悬浮球组件 spotaneousWorkout

    // achievement
    achievements: []
  }),

  getters: {},

  actions: {
    // auth 相关
    signIn (user = null) {
      this.isUserValid = true
      this.user = user
      // 初始化用户数据
      // UserManagement.loadWorkouts()
      UserManager.loadTrainingPlan()
      // AchievementManager.load()
      // RecipeManagement.loadLiked()
      // RecipeManagement.loadCreated()
      // ExerciseManagement.loadSubmissions()
      // ExerciseManagement.loadCreated()
      // TrainingStatistics.loadCharts()
      // TrainingStatistics.loadWater()
      // TrainingStatistics.loadHeights()
      // TrainingStatistics.loadWeights()
    },
    signOut () {
      this.isUserValid = false
      this.user = null
    },
    user: null,

    // route 相关
    setStoreRoute (route) {
      console.log('store.setStoreRoute', route)
      this.storeRoute = route
    },

    // workout 相关
    setWorkouts (workouts) {
      this.workouts = workouts
    },
    setTrendingWorkouts (arr) {
      this.trendingWorkouts = arr
    },
    setLatestWorkouts (arr) {
      this.latestWorkouts = arr
    },
    setCreatedWorkouts (workouts) {
      this.createdWorkouts = workouts
    },
    setMarkedWorkouts (workouts) {
      this.markedWorkouts = workouts
    },

    // exercise 相关
    setExercises (arr) {
      this.exercises = arr
    },
    setTrendingExercises (arr) {
      this.trendingExercises = arr
    },
    setLatestExercises (arr) {
      this.latestExercises = arr
    },
    setWorkoutToAdd (exercise) {
      this.workoutToAdd = exercise
      console.log('openFullscreen AddToWorkout')
      if (exercise) {
        openFullscreen('AddToWorkout')
      }
    },

    // Plan 相关
    setTrainingPlan (plan) {
      this.trainingPlan = plan
    },

    // SpotaneousList 相关
    addToSpotaneousList (exercise) {
      const { _id } = exercise
      const index = this.spotaneousList.findIndex(item => item._id === _id)
      if (index !== -1) return console.log('重复添加', this.spotaneousList)
      this.spotaneousList.push(exercise)
      console.log('添加成功', this.spotaneousList)
    },
    removeSpotaneousList (index) {
      this.spotaneousList = this.spotaneousList.filter((_x, i) => i !== index)
    },
    clearSpotaneousList () {
      this.spotaneousList = []
    },

    // achievement
    setAchievements (arr) {
      this.achievements = arr
    }
  }
})

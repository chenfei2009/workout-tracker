import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const prefix = 'WorkoutTracker | '

const routes = [
  { // 首页
    path: '/',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomeView
      }
    ]
  },

  { // 发现页
    path: '/workouts',
    name: 'Workouts',
    component: () => import(/* webpackChunkName: "home" */ '@/views/workout/WorkoutView.vue')
  },

  { // 训练列表
    path: '/workouts/list',
    name: 'WorkoutList',
    component: () => import(/* webpackChunkName: "home" */ '@/views/workout/WorkoutList.vue'),
    meta: {
      fullscreen: true,
      fsFallback: 'Workouts'
    }
  },

  { // 训练详情
    path: '/workout/:id',
    name: 'WorkoutDetails',
    component: () => import(/* webpackChunkName: "home" */ '@/views/workout/WorkoutDetails.vue'),
    meta: {
      title: prefix + 'Workout',
      fullscreen: true,
      fsFallback: 'Workouts'
    }
  },

  { // 搜索训练
    path: '/workouts/search',
    name: 'SearchWorkouts',
    component: () => import(/* webpackChunkName: "home" */ '@/views/workout/SearchWorkouts.vue'),
    meta: {
      fullscreen: true,
      fsFallback: 'Workouts'
    }
  },

  { // 动作库
    path: '/exercises',
    name: 'Exercises',
    component: () => import(/* webpackChunkName: "home" */ '@/views/exercise/ExerciseView.vue')
  },

  { // 数据
    path: '/stats',
    name: 'Stats',
    component: () => import(/* webpackChunkName: "home" */ '@/views/stats/StatsView.vue')
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '@/views/login/LoginView.vue'),
    meta: {
      fullscreen: true,
      fsFallback: 'Workouts'
    }
  },

  { // 用户相关
    path: '/profile',
    component: () => import('@/views/profile/ProfileIndex.vue'),
    children: [
      {
        path: '',
        name: 'Profile',
        component: () => import('@/views/profile/ProfileView.vue'),
        meta: {
          title: prefix + '个人中心',
          needsSignIn: true,
          banner: '个人中心'
        }
      },
      {
        path: 'achievements',
        name: 'Achievements',
        component: () => import('@/views/profile/AchievementsView.vue'),
        meta: {
          title: prefix + 'Erfolge',
          needsSignIn: true,
          hero: 'Erfolge'
        }
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/profile/StatisticsView.vue'),
        meta: {
          title: prefix + 'Trainingsstatistik',
          needsSignIn: true,
          hero: 'Trainingsstatistik'
        }
      }
    ]
  },

  /**
   * training/workouts
   */
  // {
  //   path: '/training/workout/:id',
  //   name: 'WorkoutDetails',
  //   component: () => import('@/views/training/WorkoutDetails.vue'),
  //   meta: {
  //     title: prefix + 'Workout',
  //     fullscreen: true,
  //     fsFallback: 'Training'
  //   }
  // },
  {
    path: '/training/workout/:id/update',
    name: 'UpdateWorkout',
    component: () => import('@/views/profile/workout/UpdateWorkout.vue'),
    meta: {
      title: prefix + 'Update Workout',
      fullscreen: true,
      needsSignIn: true,
      fsFallback: 'Workouts'
    }
  },

  /**
   * profile/workouts
   */
  { // 我的训练  收藏/创建
    path: '/profile/workouts',
    name: 'UserWorkouts',
    component: () => import('@/views/profile/workout/UserWorkouts.vue'),
    meta: {
      title: prefix + '我的训练',
      needsSignIn: true,
      banner: '我的训练' // 'Workouts'
    }
  },
  { // 创建训练
    path: '/profile/workouts/create',
    name: 'CreateWorkout',
    component: () => import('@/views/profile/workout/CreateWorkout.vue'),
    meta: {
      title: prefix + 'Create Workout',
      fullscreen: true,
      needsSignIn: true,
      fsFallback: 'Workouts'
    }
  },

  /**
   * profile/exercises
   */
  { // 我的动作  收藏/创建
    path: '/profile/exercises',
    name: 'UserExercises',
    component: () => import('@/views/profile/exercise/UserExercises.vue'),
    meta: {
      title: prefix + '我的动作',
      needsSignIn: true,
      banner: '我的动作' // 'Exercises'
    }
  },
  {
    path: '/profile/exercise/submit',
    name: 'SubmitExercise',
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/views/profile/exercise/SubmitExercise.vue'),
    meta: {
      title: prefix + 'Create Exercise',
      fullscreen: true,
      needsSignIn: true,
      hero: 'Erstellen',
      backTitle: 'Übungen',
      backRoute: 'Home'
    }
  },
  {
    path: '/profile/exercise/:id/update',
    name: 'UpdateExercise',
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/views/profile/exercise/UpdateExercise.vue'),
    meta: {
      title: prefix + 'Update Exercise',
      needsSignIn: true,
      fullscreen: true,
      fsFallback: 'Exercises'
    }
  },

  /* profile/trainingplan */
  { // 训练计划
    path: '/profile/trainingplan',
    name: 'TrainingPlan',
    component: () => import('@/views/profile/trainingPlan/TrainingPlan.vue'),
    meta: {
      title: prefix + 'TrainingPlan',
      fullscreen: true,
      needsSignIn: true,
      fsFallback: 'TrainingPlan'
    }
  },
  { // 更新单日训练计划
    path: '/profile/trainingplan/update/:day',
    name: 'UpdateTrainingPlan',
    component: () => import('@/views/profile/trainingPlan/UpdateTrainingPlan.vue'),
    meta: {
      title: prefix + 'Update TrainingPlan',
      fullscreen: true,
      needsSignIn: true,
      fsFallback: 'TrainingPlan'
    }
  },

  {
    path: '/training/exercise/:id',
    name: 'ExerciseDetails',
    component: () => import(/* webpackChunkName: "start" */ '../views/exercise/ExerciseDetails.vue'),
    meta: {
      title: prefix + 'exercise',
      fullscreen: true,
      fsFallback: 'Training'
    }
  },

  /* workout */
  { // 开始训练
    path: '/running-workout',
    name: 'RunningWorkout',
    component: () => import(/* webpackChunkName: "profile" */ '../views/profile/workout/RunningWorkout.vue'),
    meta: {
      title: prefix + 'Workout',
      fullscreen: true,
      needsSignIn: true,
      fsFallback: 'Workouts'
    }
  },
  {
    path: '/add-to-workout',
    name: 'AddToWorkout',
    component: () => import(/* webpackChunkName: "profile" */ '../views/profile/workout/AddToWorkout.vue'),
    meta: {
      title: prefix + 'Add To Workout',
      fullscreen: true,
      needsSignIn: true,
      fsFallback: 'Training'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

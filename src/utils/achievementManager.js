import request from './request'
import { useStore } from '@/store/index'
const store = useStore()

export class achievementManager {
  static add (achievement) {
    let ach = this.getAll() || []

    let exsits = false
    ach = ach.map(x => {
      if (x.exerciseId === achievement.exerciseId) {
        exsits = true
        return x
      }
      return x
    })

    if (!exsits) {
      ach.push(achievement)
      // store.commit('newAchievements')
    }
    store.setAchievements(ach)
  }

  static async load () {
    // const { data } = await request.get('achievement')
    const { data } = await request.get('achievement')
    store.setAchievements(data.data)
  }

  static getAll () {
    return store.achievements
  }

  static getNew () {
    return store.newAchievements
  }
}

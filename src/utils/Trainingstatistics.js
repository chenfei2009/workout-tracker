import request from './request'
import { useStore } from '@/store/index'
const store = useStore()

export class TrainingStatistics {
  static async loadCharts () {
    const { data } = await request.get('charts')
    store.setTainingStats(data)
  }

  static async loadWeights () {
    const { data } = await request.get('health/weight')
    store.setWeight(data)
  }

  static async loadHeights () {
    const { data } = await request.get('health/height')
    store.setHeight(data)
  }

  static async loadWater () {
    const { data } = await request.get('health/water')
    store.setWater(data)
  }

  static getChartData () {
    return store.trainingStats || Array.from({ length: 28 }, () => [])
  }

  static getWeight () {
    return store.weight
  }

  static getWater () {
    return store.water
  }

  static getHeight () {
    const height = store.height
    if (!height) return null
    return height.value
  }

  static async setHeight (height) {
    const { data } = await request.post('health/height', { amount: height })
    store.setHeight(data)
  }

  static async addWeight (weight) {
    const { data } = await request.post('health/weight', { amount: weight })
    const weights = this.getWeight() || []
    weights.push(data)
    store.setWeight(weights)
  }

  static async addWater (amount) {
    const { data } = await request.post('health/water', { amount: amount })
    let water = this.getWater() || []
    let exists = false
    water = water.map(x => {
      if (x._id === data._id) {
        exists = true
        return data
      }
      return x
    })
    if (!exists) {
      water.push(data)
    }
    store.setWater(water)
  }
}

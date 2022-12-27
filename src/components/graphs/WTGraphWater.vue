<template>
  <!-- v-if="$store.getters.valid" -->
  <div class="wt-graph-card fh-graph-water">
    <template v-if="!onlyToday">
      <!-- :dark="$store.getters.darkmode" v-model="timespan" -->
      <a-tabs v-model:activeKey="timespan">
        <a-tab-pane key="1" tab="今天" />
        <a-tab-pane key="2" tab="本周" />
        <a-tab-pane key="3" tab="本月" />
        <a-tab-pane key="4" tab="今年" />
      </a-tabs>
      <WTGraphHead
        v-if="timespan !== '1'"
        :timespan="timespan"
        :showSpan="true"
        :amount="amount"
      />
      <template v-if="timespan !== '1'">
        <!-- {{series}} -->
        <VueApexCharts
          width="100%"
          height="250"
          type="line"
          :options="options"
          :series="series"
        />
      </template>
    </template>
    <div flow class="water-only-today" v-if="timespan === '1'">
      <div>
        <WTGraphHead
          timespan="1"
          :amount="today"
          unitLong="三角计"
          :showSpan="true"
        />
        <div class="progress">
          <!-- :dark="$store.getters.darkmode" -->
          <a-progress
            tfcolor="success"
            :width="80"
            type="circle"
            :percent="Math.min(100, percentage)"
          />
          <div class="amount">{{ percentage }}%</div>
        </div>
      </div>
    </div>
    <div class="intakes">
      <div class="intake" v-for="i in intakeValues" :key="i" @click="add(i)">
        +{{ i }}
      </div>
    </div>
  </div>
</template>

<script setup>
import WTGraphHead from './WTGraphHead.vue'
import { ChartOptions } from '@/utils/ChartOptions'
import { aDay, aWeek, aYear } from '@/utils/constants'
import { TrainingStatistics } from '@/utils/Trainingstatistics'
import { computed, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

defineProps({
  onlyToday: {
    type: Boolean,
    // required: true,
    default: false
  }
})

const timespan = ref('1')
const multis = ref([aDay, aWeek, 4 * aWeek, aYear])
const intakeValues = ref([0.25, 0.5, 0.75, 1])
const recommend = ref(4)

const healthData = computed(() => TrainingStatistics.getWater())

const today = computed(() => {
  if (!healthData.value) return 0
  const today = healthData.value.filter(
    x => x.date === new Date().setHours(0, 0, 0, 0)
  )[0]
  if (today) return today
  return 0
})

const percentage = computed(() => (today.value / recommend.value) * 100)

const amount = computed(() => {
  if (!healthData.value) return -1
  if (timespan.value === '1') {
    return today.value
  }
  const latest = new Date().getTime() - multis.value[timespan.value - 1]
  const resultingData = healthData.value
    .filter(x => x.date >= latest)
    .map(x => x.value)
  const sum = resultingData.reduce((a, b) => a + b, 0)
  return Math.round((sum / resultingData.length) * 100) / 100
})

function add (amount) {
  TrainingStatistics.addWater(amount)
}

const options = computed(() => {
  return ChartOptions.water(
    multis.value[timespan.value - 1],
    timespan.value - 1,
    recommend.value
  )
})

const series = computed(() => {
  const data = (healthData.value || [])
    .map(d => {
      return { x: d.date, y: d.value }
    })
    .sort((a, b) => b.x - a.x)
  return [
    {
      name: 'Liter getrunken',
      data
    }
  ]
})

</script>

<style lang="less" scoped>
.wt-graph-water {
  .intakes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    margin-top: 10px;
    user-select: none;
    .intake {
      padding: 10px;
      text-align: center;
      border-radius: @border-radius;
      background: @container;
      @media (prefers-color-scheme: dark) {
        background: @container_dark;
      }

      cursor: pointer;
      font-weight: bold;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
  .water-only-today {
    justify-content: space-between;
    .progress {
      position: relative;
      .amount {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.5;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>

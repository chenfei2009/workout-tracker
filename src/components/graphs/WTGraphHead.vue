<template>
  <div class="wt-graph-card--head">
    <WTHeading
      :title="description || amount + ' ' + unitShort"
      :subtitle="timespan === '1' ? unitLong : average"
    />
    <div class="timespan" v-if="showSpan">{{ timespanText }}</div>
  </div>
</template>

<script setup>
import { aDay, aWeek, aYear, DAYS, MONTHS } from '@/utils/constants'
import { formatTimeForMessage } from '@/utils/formatters'
import { computed, ref } from 'vue'
import WTHeading from '../WTHeading.vue'

const props = defineProps({
  unitLong: {
    type: String,
    // required: true,
    default: 'Liter'
  },
  unitShort: {
    type: String,
    // required: true,
    default: '1'
  },
  amount: {
    type: Number,
    // required: true,
    default: 20
  },
  timespan: {
    type: String,
    // required: true,
    default: '2'
  },
  average: {
    type: String,
    // required: true,
    default: '平均'
  },
  showSpan: {
    type: Boolean,
    // required: true,
    default: false
  },
  description: String
})

const multis = ref([aDay, aWeek, 4 * aWeek, aYear])

// transforms seconds or timestamp to Date
const timespanText = computed(() => {
  const date = new Date()
  // const wday = days[date.getDay()].substring(0, 2)
  const wday = DAYS[date.getDay()]
  const day = date.getDate()
  const month = MONTHS[date.getMonth()]
  const year = date.getFullYear()

  const now = `${wday}, ${day}. ${month} ${year}`
  if (props.timespan === '1') return now

  const span = formatTimeForMessage(
    date.getTime() - multis.value[props.timespan - 1]
  )

  return `${span} - ${now}`
})

</script>

<style lang="less" scoped>
.wt-graph-card--head {
  .timespan {
    font-weight: 600;
    opacity: 0.75;
    font-size: 14px;
  }
}
</style>

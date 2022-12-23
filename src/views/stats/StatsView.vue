<template>
  <div class="view-stats">
    <!-- header -->
    <PageHeader title="训练数据">
      <WTTabs :tabs="tabs"/>
    </PageHeader>

    <div content max-width>
      <section>
        <!-- 日历组件 -->
        <WTCalendar ref="calendarRef"
          :caleData=caleStats
          @dateItemClick="dateItemClick"
          @dateChange="handleDateChange">
        </WTCalendar>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageHeader from '@/components/common/PageHeader.vue'
import WTTabs from '@/components/WTTabs.vue'
import WTCalendar from '@/components/WTCalendar.vue'
import { UserManager } from '@/utils/UserManager.js'
import { _getCaleStats } from '@/api/stats.js'
import { formatDateForCale } from '@/utils/formatters.js'

const tabs = ref(['历史', '统计'])

const calendarRef = ref(null)

// 训练记录数据 包括 date part
const caleStats = ref([])

const dateItemClick = () => console.log('dateItemClick')

const handleDateChange = () => console.log('handleDateChange')

// 查询当前日期范围部位记录数据
const getCaleStats = async () => {
  // 获取子组件数据
  const dateList = calendarRef?.value.dateList
  // 格式化请求参数
  let start = dateList[0].date
  let end = dateList[dateList.length - 1].date
  start = new Date(start).getTime()
  end = new Date(end).getTime()
  // start = formatDateForCale(start, 'yyyy-MM-dd')
  // end = formatDateForCale(end, 'yyyy-MM-dd')
  const userId = UserManager.getUserId()
  const data = await _getCaleStats(start, end, userId)
  console.log('res', data)
  // [
  //   { start: 1666949168041, areas: [ '背' ] },
  //   { start: 1666949233817, areas: [ '背' ] },
  //   { start: 1666949315158, areas: [ '背' ] },
  //   { start: 1666949391883, areas: [ '胸' ] },
  //   { start: 1666949391883, areas: [ '胸' ] }
  // ]
  const temp = []
  res.data.forEach(item => {
    const index = temp.indexOf(item.start)
    if (index === -1) return temp.push(item)
    temp[index].areas = [...new Set([temp[index].areas].concat(...item.areas))]
  })
  caleStats.value = temp
  console.log(caleStats.value)
}

onMounted(async () => {
  const data = await _getCaleStats(1669564800000, 1669564800000, '6345444c0c3364c6462be6dc')
  console.log('data', data)
  getCaleStats()
})
</script>

<style lang="less" scoped>
[content] {
  padding-top: 90px;
}
</style>

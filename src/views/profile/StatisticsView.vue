<template>
  <div class="view-trainingstatistics" content>
    <div max-width>
      <h3>数据</h3>
      <!-- gird -->
      <div>
        <div>
          <WTGraphWater />
        </div>
        <!-- <div>
          <FHGraphBMI />
        </div>
        <div>
          <FHGraphWeight />
        </div> -->
      </div>
      <!-- <h3>Wöchentlich</h3>
      <tl-grid>
        <FHGraphTimeW />
        <FHGraphTime-c />
        <FHGraphWorkout7 />
        <FHGraphWorkoutW />
      </tl-grid>
      <h3>Monatlich</h3>
      <FHGraphWorkout28 /> -->
    </div>
  </div>
</template>

<script setup>
// import FHGraphBMI from '@/components/graphs/FHGraphBMI.vue'
// import FHGraphTimeC from '@/components/graphs/FHGraphTimeC.vue'
// import FHGraphTimeW from '@/components/graphs/FHGraphTimeW.vue'
import WTGraphWater from '@/components/graphs/WTGraphWater.vue'
// import FHGraphWeight from '@/components/graphs/FHGraphWeight.vue'
// import FHGraphWorkout28 from '@/components/graphs/FHGraphWorkout28.vue'
// import FHGraphWorkout7 from '@/components/graphs/FHGraphWorkout7.vue'
// import FHGraphWorkoutW from '@/components/graphs/FHGraphWorkoutW.vue'
</script>

<style lang="less" scoped>
.view-trainingstatistics {
  padding-top: 0;
}
</style>

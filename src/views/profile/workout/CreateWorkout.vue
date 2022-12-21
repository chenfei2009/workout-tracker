<template>
  <div class="view-create-workout">
    <WTSwipeable @swipeDown="router.go(-1)">
      <!-- banner -->
      <WTBanner title="创建我的训练">
        <template v-slot:media>
          <img src="/assets/hero/home.webp" alt="" />
        </template>
        <!-- <div>31 分钟  |  初级</div> -->
      </WTBanner>
    </WTSwipeable>
    <section content max-width>
      <WTWorkoutForm />
    </section>
  </div>
</template>

<script setup>
import WTSwipeable from '@/components/WTSwipeable.vue'
import WTBanner from '@/components/WTBanner.vue'
import WTWorkoutForm from '@/components/forms/WTWorkoutForm.vue'
import router from '@/router'
</script>

<style lang="less" scoped>
.view-create-workout {
  min-height: 100vh;

  [content] {
    padding-bottom: 20px;
  }
}
</style>

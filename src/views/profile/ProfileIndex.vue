<template>
  <div class="view-profile">
    <!-- $route.meta.fullscreen: false -->
    <!-- <WTHeader
      :backTitle="$route.meta.backTitle || 'Profile'"
      :rootRoute="$route.meta.backRoute || 'Profile'"
      :title="$route.meta.banner"
    /> -->
    <!-- <tc-hero
      :dark="$store.getters.darkmode"
      :hasFixedHeader="$store.getters.isDesktop"
    > -->
    <PageHeader title="个人中心" ref="headerRef" />
    <div content>
      <router-view />
    </div>
    <!-- <WTRouter /> -->
  </div>
</template>

<script setup>
// import { computed } from '@vue/runtime-core'
import { useStore } from '@/store/index'
import router from '@/router'

// import WTHeader from '@/components/WTHeader.vue'
import PageHeader from '@/components/common/PageHeader.vue'

// import WTRouter from '@/components/WTRouter.vue'

const store = useStore()
const $route = router.currentRoute
</script>

<style lang="less" scoped>
[content] {
  margin: 50px 0;
}
</style>

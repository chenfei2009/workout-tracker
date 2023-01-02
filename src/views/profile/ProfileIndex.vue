<template>
  <div class="view-profile">
    <PageHeader title="个人中心" />
    <div content>
      <router-view />
    </div>
    <!-- <WTRouter /> -->
  </div>
</template>

<script setup>
// import { computed } from 'vue'
// import { useStore } from '@/store/index'
// import router from '@/router'
// import WTHeader from '@/components/WTHeader.vue'
// import WTRouter from '@/components/WTRouter.vue'
import PageHeader from '@/components/common/PageHeader.vue'

</script>

<style lang="less" scoped>
[content] {
  margin: 50px 0;
  @media only screen and (min-width: 851px) {
    margin-top: 130px;
  }
}
</style>

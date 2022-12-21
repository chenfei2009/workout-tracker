<template>
  <a-tabs v-model:activeKey="activeKey" @change="onTabClick">
    <a-tab-pane
      v-for="(tab, index) in tabs"
      :key="index + 1"
      :tab="tab"
    />
  </a-tabs>
</template>

<script setup>
import { defineProps, defineEmits, ref } from '@vue/runtime-core'
defineProps({ tabs: Array })

const activeKey = ref(1)

const emit = defineEmits(['switch'])
const onTabClick = activeKey => emit('switch', activeKey)

</script>

<style lang="less" scoped>
/deep/ .ant-tabs-nav {
  margin-bottom: 0;
}

/deep/ .ant-tabs-nav-wrap {
  // justify-content: space-evenly;
  .ant-tabs-nav-list {
    width: 100%;
    justify-content: space-evenly;
    .ant-tabs-tab {
      width: 100%;
      justify-content: center;
      padding: 0 0 5px 0;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: @color;
      // font-size: 1rem;
    }
    .ant-tabs-ink-bar {
      background: @color;
    }
  }
}
</style>

<template>
  <div class="header" :class="{'fullscreen': router.currentRoute.value.meta.fullscreen}">
    <div class="main" v-if="!isShowInput">
      <div class="title">{{title}}</div>
      <span v-if="search" class="iconfont icon-search" @click="searchBtnClick" />
    </div>
    <div class="input-bar" v-else-if="search && isShowInput">
      <span class="iconfont icon-search" @click="submit" />
      <a-input
        v-model:value="input"
        :bordered="false"
        autofocus
        @change="submit"
      />
    </div>
    <slot />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'

defineProps({
  title: String,
  search: {
    type: Boolean,
    default: false
  }
})

const input = ref('')
defineExpose({ input })

const isShowInput = ref(false)

const searchBtnClick = () => {
  if (!isShowInput.value) {
    isShowInput.value = true
  }
}

const emit = defineEmits(['submit'])
const submit = () => emit('submit')
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  height: fit-content;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
  justify-content: space-between;
  align-items: center;
  background-color: @background;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
  font-size: 1.2rem;

  &:not(.fullscreen) {
    @media only screen and (min-width: 851px)  {
      margin-top: 80px;
    }
  }
  // @media only screen and (min-width: 851px)  {
  //   margin-top: 80px;
  // }

  .main {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .title {
    font-size: inherit;
    font-weight: 600;
  }
  .input-bar {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }
  input {
    flex: 1;
  }
  .ant-input {
    font-size: 16px;
  }
  .icon-search {
    font-size: inherit;
  }
}
</style>

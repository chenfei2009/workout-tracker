<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style scoped>
#tab-bar {
  display: flex;
  /* 固定在底部 */
  position: fixed;
  z-index: 19;
  left: 0;
  right: 0;
  bottom: 0;
  /* justify-content: space-between; */
  background-color: #f6f6f6;
  /* 阴影效果 */
  box-shadow: 0 -1px 1px rgba(100,100,100,0.1);
  font-size: 14px;
}
</style>

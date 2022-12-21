<template>
  <!-- 封装复用的 Transition 组件 -->
  <Transition
    name="expand"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @leave="onLeave"
  >
    <slot /> <!-- 向内传递插槽内容 -->
  </Transition>
</template>

<script setup>
// props: { name: 'expand' }

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter (el, done) {
  const { width } = getComputedStyle(el)
  el.style.width = width
  el.style.position = 'absolute'
  el.style.visibility = 'hidden'
  el.style.height = 'auto'
  const { height } = getComputedStyle(el)
  el.style.width = null
  el.style.position = null
  el.style.visibility = null
  el.style.height = 0
  // getComputedStyle(element).height
  requestAnimationFrame(() => (el.style.height = height))
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  // done()
}

// 当进入过渡完成时调用
function onAfterEnter (el) {
  // el.style.height = 'auto'
  el.style.height = ''
}

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave (el, done) {
  el.style.height = getComputedStyle(el).height
  requestAnimationFrame(() => (el.style.height = 0))
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  // done()
}
</script>

<style scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>

<style>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}
.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>

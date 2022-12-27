<template>
  <div
    class="wt-Swipeable"
    :style="{ 'margin-top': -offsetY + 'px' }"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const xDown = ref(null) // number | null
const yDown = ref(null) // number | null

const offsetY = ref(0)

const emit = defineEmits(['swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown'])

function handleTouchEnd () {
  offsetY.value = 0
}

function handleTouchStart (e) {
  const firstTouch = e.touches[0]
  xDown.value = firstTouch.clientX
  yDown.value = firstTouch.clientY
}

function handleTouchMove (e) {
  if (!xDown.value || !yDown.value) return
  const xUp = e.touches[0].clientX
  const yUp = e.touches[0].clientY
  let xDiff = xDown.value - xUp
  let yDiff = yDown.value - yUp
  offsetY.value = yDiff
  if (Math.abs(xDiff) < 100) xDiff = 0
  if (Math.abs(yDiff) < 100) yDiff = 0

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      emit('swipeLeft')
    } else if (xDiff < 0) {
      emit('swipeRight')
    }
  } else {
    if (yDiff > 0) {
      emit('swipeUp')
    } else if (yDiff < 0) {
      emit('swipeDown')
    }
  }
}

</script>

<style lang="less" scoped></style>

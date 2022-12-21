<template>
  <div class="wt-preview" @click="clicked">
    <div class="media" :style="{ height: height + 'px' }">
      <slot name="media" />
    </div>
    <div class="container">
      <div class="title">{{ title }}</div>
      <!-- <div v-if="$slots.default || $slots.action" horizontal="space-between"> -->
      <div class="content">
        <slot />
        <!-- <div :dark="$store.getters.darkmode"> -->
        <div>
          <slot name="action" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { defineProps, defineEmits } from 'vue'

defineProps({
  title: String,
  height: {
    type: Number,
    default: 200
  }
})

const emit = defineEmits(['click'])

function clicked (e) {
  emit('click', e)
}

</script>

<style lang="less" scoped>
.wt-preview {
  position: relative;
  border-radius: @border-radius;
  height: fit-content;
  display: block;
  // margin-right: 20px;
  flex-shrink: 0;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  box-shadow: @shadow;
  &:hover {
    box-shadow: @shadow-hover;
  }

  background: @paragraph;
  // background: @paragraph;
  // @media #{@isLight} {
  //   background: $paragraph;
  // }
  // @media #{$isDark} {
  //   background: $color;
  // }

  @media only screen and(max-width: 599px) {
    width: 80vw;
    min-width: 300px;
    max-width: 350px;
  }

  @media only screen and(min-width: 600px) {
    min-width: 350px;
    max-width: 500px;
  }

  .media {
    overflow: hidden;
    /deep/ img,
    /deep/ video {
      border-radius: @border-radius @border-radius 0 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .container {
    .title {
      overflow-wrap: break-word;
      font-weight: bold;
      font-size: 1.4em;
      position: relative;
      z-index: 10;

      border-radius: 0 0 @border-radius @border-radius;

      background: linear-gradient(
        to bottom,
        rgba(@paragraph, 0),
        rgba(@paragraph, 1) 25px
      );

      // @media #{$isLight} {
      //   background: linear-gradient(
      //     to bottom,
      //     rgba($paragraph, 0),
      //     rgba($paragraph, 1) 25px
      //   );
      // }
      // @media #{$isDark} {
      //   background: linear-gradient(
      //     to bottom,
      //     rgba($color, 0),
      //     rgba($color, 1) 25px
      //   );
      // }

      padding: 10px 20px 10px;
      margin-top: -25px;
    }

    .content {
      display: flex;
      justify-content: space-between;
    }

    .tl-flow {
      position: relative;
      z-index: 11;
      margin-top: -10px;
      padding: 0 10px 10px 10px;
    }
  }
}
</style>

<template>
  <div class="wt-banner" flow @click="clicked">
    <div class="media-deskstop" :style="{ height: height + 'px' }">
      <!-- 大屏背景图 -->
      <img src="/assets/hero/home.webp" />
    </div>
    <div class="media-mobile" :style="{ height: height + 'px' }">
      <slot name="media" />
    </div>
    <div class="container">
      <h3 class="sub-title">{{subTitle}}</h3>
      <h1 class="title">{{title}}</h1>
      <div class="content" flow>
        <slot />
      </div>
    </div>
    <div class="action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subTitle: String,
  height: {
    type: Number,
    default: -1
  }
})

const emit = defineEmits(['click'])

const clicked = e => emit('click', e)
</script>

<style lang="less" scoped>
.wt-banner {
  position: relative;
  height: fit-content;
  cursor: pointer;

  @media only screen and (max-width: 850px) {
    width: 100vw;
    // max-width: 600px;
    .media-mobile {
      // height: fit-content;
      min-height: 300px;
    }
    .media-deskstop {
      display: none;
    }
  }

  @media only screen and (min-width: 851px) {
    // width: 100vw;
    // .media-deskstop {
    //   display: none;
    // }
    // 485-80
    height: 380px;
    // margin-top: 80px;
    overflow: hidden;
    .media-mobile {
      display: none;
    }
    .media-deskstop {
      width: 100vw;
      // height: 300px;
      // padding-top: 80px;
      img {
        width: 100%;
      }
    }
  }

  .media-deskstop, .media-mobile {
    // overflow: hidden;
    :deep(img),
    :deep(video) {
      height: 100%;
      min-height: 300px;
      width: 100vw;
      object-fit: cover;
    }
  }
  .container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    padding: 20px;
    color: #fff;
    background: linear-gradient(
      to bottom,
      rgba(@color, 0),
      rgba(@color,0.5) 25px
    );
    .title {
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 2em;
      color: inherit;
    }
    .sub-title {
      color: inherit;
    }
    .content {
      // margin-top: 10px;
      display: flex;
      opacity: .7;
    }
  }
  .action {
    position: absolute;
  }
}
</style>

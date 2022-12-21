<template>
  <div class="wt-carousel">
    <!-- <div class="wt-carousel__fade" left /> -->
    <div class="wt-carousel__spacer" />
    <slot />
    <div class="wt-carousel__spacer" />
    <!-- <div class="wt-carousel__fade" right /> -->
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.wt-carousel {
  margin: 10px -5vw 0px;
  display: flex;
  overflow: scroll visible;
  padding-bottom: 20px;
  user-select: none;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  position: relative;

  .wt-carousel__fade {
    position: sticky;
    top: 0;
    bottom: 0;
    z-index: 1000;
    width: 5vw;
    max-width: 45px;
    flex-shrink: 0;

    &[left] {
      left: 0;
      margin-left: -5vw;

      background: linear-gradient(
        to right,
        rgba(@background, 1),
        rgba(@background, 0)
      );
      // @media #{$isDark} {
      //   background: linear-gradient(
      //     to right,
      //     rgba($background_dark, 1),
      //     rgba($background_dark, 0)
      //   );
      // }
    }
    &[right] {
      right: 0;
      background: linear-gradient(
        to left,
        rgba(@background, 1),
        rgba(@background, 0)
      );
      // @media #{$isDark} {
      //   background: linear-gradient(
      //     to left,
      //     rgba($background_dark, 1),
      //     rgba($background_dark, 0)
      //   );
      // }
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }

  .wt-carousel__spacer {
    flex-shrink: 0;
    width: 5vw;
  }

  div:not([class^='wt-carousel']),
  a:not([class^='wt-carousel']) {
    margin-left: 30px;
    scroll-snap-align: center;
    flex-shrink: 0;
    width: 280px;

    &:nth-child(3) {
      margin-left: 0px;
    }
  }
}
</style>

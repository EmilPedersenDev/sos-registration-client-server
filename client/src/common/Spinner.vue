<template>
  <div
    :class="{ 'loading-background': !loaded }"
    :style="`height: ${screenHeight}px`"
  >
    <div class="sk-folding-cube">
      <div class="sk-cube1 sk-cube"></div>
      <div class="sk-cube2 sk-cube"></div>
      <div class="sk-cube4 sk-cube"></div>
      <div class="sk-cube3 sk-cube"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    screenHeight: {
      type: Number,
      default: 0,
    },
    loaded: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

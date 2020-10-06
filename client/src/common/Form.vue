<template>
  <form @submit.prevent="onSubmit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "st-form",
  props: {
    submit: {
      type: Function,
    },
  },
  methods: {
    onSubmit() {
      if (this.submit) {
        this.submit();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/form.scss";
</style>
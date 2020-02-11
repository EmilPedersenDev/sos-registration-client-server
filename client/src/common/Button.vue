<template>
  <button @click="onClick" :class="classList" :disabled="disabled">
    <slot>Default text</slot>
  </button>
</template>

<script>
  export default {
    name: "sos-button",
    props: {
      primary: {
        type: Boolean,
        default: false
      },
      large: {
        type: Boolean,
        default: false
      },
      medium: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classList() {
        return [
          "sos-button",
          this.primary && "primary",
          this.large && "lg",
          this.medium && "md"
        ];
      }
    },
    methods: {
      onClick(e) {
        this.$emit("click", e);
      }
    }
  };
</script>

<style lang="scss" scoped>
  button {
    border: 1px solid rgba(30, 139, 195, 1);
    background: #fff;
    transition: all 0.2s ease-in-out;
    color: rgba(30, 139, 195, 1);
    border-radius: 4px;
    padding: 5px 14px;
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.71;
    letter-spacing: normal;
    &:hover:not(:disabled),
    &:focus {
      background-color: rgba(30, 139, 195, 1);
      color: #fff;
      border-color: rgba(30, 139, 195, 1);
      cursor: pointer;
    }

    &.primary {
      color: rgba(30, 44, 94, 1);
      background-color: #faf9f7;
      border-color: rgba(33, 45, 94, 0.914);

      &:hover:not(:disabled),
      &:focus {
        background-color: rgba(30, 44, 94, 1);
        color: #fff;
        border-color: rgba(30, 44, 94, 1);
      }
    }

    &.lg {
      font-weight: 600;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.45;
      letter-spacing: normal;
      padding: 14px 40px;
      border-width: 2px;
      width: 155px;

      &:hover {
        border-width: 2px;
      }
    }

    &.md {
      font-weight: 600;
      font-style: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: normal;
      padding: 12px 32px;
      border-width: 2px;

      &:hover {
        border-width: 2px;
      }
    }
  }
</style>
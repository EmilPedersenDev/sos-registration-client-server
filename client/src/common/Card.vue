<template>
  <div :class="classList">
    <slot>default slot</slot>
  </div>
</template>

<script>
  export default {
    name: "st-card",

    props: {
      size: {
        type: String,
        default: "lg",
        validator: function(size) {
          return ["lg", "md", "sm", "xs", "mega"].includes(size);
        }
      },

      widthSize: {
        type: String,
        default: "sm-width",
        validator: function(widthSize) {
          return [
            "xs-width",
            "sm-width",
            "md-width",
            "lg-width",
            "mega-width"
          ].includes(widthSize);
        }
      },

      isLoading: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classList: function() {
        return [
          "st-card",
          this.size,
          this.widthSize,
          this.isLoading && "loading"
        ];
      }
    }
  };
</script>

<style lang="scss" scoped>
  .error-message {
    word-wrap: normal;
    padding: 0px 32px;
    p {
      opacity: 1;
      margin-bottom: 0px;
      margin-top: 0px;
      color: #cc4039;
      font-size: 14px;
      font-weight: 600;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.71;
      letter-spacing: normal;
      text-align: left;
    }
  }
</style>

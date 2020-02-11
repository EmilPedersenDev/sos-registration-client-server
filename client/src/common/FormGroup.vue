<template>
  <div :class="classList">
    <label>{{label}}</label>
    <slot>default slot</slot>
  </div>
</template>

<script>
  export default {
    name: "st-form-group",

    props: {
      label: {
        type: String,
        default: ""
      },

      required: {
        type: Boolean,
        default: false
      },

      invalid: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classList: function() {
        return [
          "st-form-group",
          this.required && "required",
          this.invalid && "invalid"
        ];
      }
    }
  };
</script>

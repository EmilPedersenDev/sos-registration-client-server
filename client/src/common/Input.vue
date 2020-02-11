<template>
  <input
    :id="id"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    :class="classList"
    :disabled="disabled"
    :tabindex="tabindex"
    @input="onInput"
    @change="onChange"
    @blur="onBlur"
    @focus="onFocus"
    @click="onClick"
    @keydown.down.prevent="onKeydownDown"
    @keydown.up.prevent="onKeydownUp"
    @keyup.esc="onKeyupEsc"
    @keyup.enter="onKeyupEnter"
  />
</template>

<script>
  export default {
    name: "st-input",

    data: function() {
      return {
        localValue: this.value
      };
    },

    props: {
      id: {
        type: String,
        default: ""
      },
      type: {
        type: String,
        default: "text",
        validator: function(type) {
          return ["text", "number", "date", "tel", "password"].includes(type);
        }
      },
      placeholder: {
        type: String
      },
      value: {
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      tabindex: {
        type: String,
        default: "0"
      },
      invalid: {
        type: Boolean,
        default: false
      },
      blur: {
        type: Function
      },
      focus: {
        type: Function
      },
      click: {
        type: Function
      },
      input: {
        type: Function
      },
      keydownDown: {
        type: Function
      },
      keydownUp: {
        type: Function
      },
      keyupEsc: {
        type: Function
      },
      keyupEnter: {
        type: Function
      }
    },

    computed: {
      classList: function() {
        return ["st-input", this.invalid && "invalid"];
      }
    },

    watch: {
      value: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.localValue = newVal;
        }
      },
      localValue: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit("input", newVal);
        }
      }
    },

    methods: {
      onInput: function(evt) {
        this.localValue = evt.target.value;
        if (this.input) this.input();
      },
      onChange: function(evt) {
        this.localValue = evt.target.value;
        this.$emit("change", this.localValue);
      },
      onBlur: function() {
        if (this.blur) this.blur();
      },
      onFocus: function() {
        if (this.focus) this.focus();
      },
      onClick: function() {
        if (this.click) this.click();
      },
      onKeydownDown: function() {
        if (this.keydownDown) this.keydownDown();
      },
      onKeydownUp: function() {
        if (this.keydownUp) this.keydownUp();
      },
      onKeyupEsc: function() {
        if (this.keyupEsc) this.keyupEsc();
      },
      onKeyupEnter: function() {
        if (this.keyupEnter) this.keyupEnter();
      }
    }
  };
</script>

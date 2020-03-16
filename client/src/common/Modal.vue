<template>
  <transition name="modal-fade">
    <div>
      <div class="modal-mask" ref="mymodal" @click="close">
        <div
          class="modal-base modal-center"
          :style="'max-width:' + modalMaxWidth + 'px;'"
          onclick="event.stopPropagation();"
        >
          <st-card
            :class="classList"
            :isLoading="isLoading"
            :width-size="widthSize"
            :style="style"
            style="pointer-events:auto;"
          >
            <div :class="isHidden">
              <slot name="header">
                <i
                  v-if="onClose"
                  class="fas fa-times closeButton"
                  @click="close"
                ></i>
              </slot>

              <slot name="body"></slot>

              <slot name="footer"></slot>
            </div>
          </st-card>
        </div>
      </div>
      <div class="modal-background"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "st-modal",

  props: {
    onClose: {
      type: Function
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    loadingMessage: {
      type: String
    },
    large: {
      type: Boolean,
      default: false
    },
    mega: {
      type: Boolean,
      default: false
    },
    error: {
      type: Object
    },
    width: {
      type: Number,
      default: 0
    }
  },

  computed: {
    classList: function() {
      return ["st-modal", this.large && "lg", this.small && "sm"];
    },
    widthSize: function() {
      if (this.mega) return "mega-width";
      if (!this.large) return "md-width";
      if (this.large) return "lg-width";
    },
    style: function() {
      if (this.width > 0) {
        return `max-width: ${this.width}px`;
      }
    },
    isHidden: function() {
      return this.isLoading ? "hidden" : "";
    },
    modalMaxWidth: function() {
      if (this.width > 0) {
        return this.width;
      }
      if (this.mega) return 1412;
      if (!this.large) return 576;
      if (this.large) return 776;
    }
  },

  methods: {
    close: function() {
      if (this.onClose) {
        this.onClose();
      }
    }
  },
  mounted() {
    document.body.classList.add("modal-opened");
    let modalHeight = this.$refs.mymodal.scrollHeight;
    let windowHeight = window.innerHeight;

    //If scrollbar, add padding to body to avoid jitter.
    if (modalHeight > windowHeight) document.body.style.paddingRight = "17px";
  },
  beforeDestroy() {
    document.body.classList.remove("modal-opened");
    document.body.style.removeProperty("padding-right");
  }
};
</script>

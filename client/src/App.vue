<template>
  <div id="app">
    <app-navigation></app-navigation>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import VueJwtDecode from "vue-jwt-decode";
  import AppNavigation from "./common/AppNavigation";
  import { mapGetters } from "vuex";

  export default {
    components: {
      AppNavigation
    },
    computed: {
      ...mapGetters(["authenticated"])
    },
    watch: {
      authenticated(token) {
        if (!token) {
          this.$router.push("/");
        }
      }
    }
  };
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    .fade-enter-active,
    .fade-leave-active {
      transition-duration: 0.3s;
      transition-property: opacity;
      transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
      opacity: 0;
    }
  }
</style>

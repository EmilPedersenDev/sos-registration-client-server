<template>
  <div id="app" :class="{ background: isLoginPage }">
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
  created() {
    if (this.authenticated) {
      this.$store.dispatch("setUser");
    }
  },
  computed: {
    ...mapGetters(["authenticated"]),
    isLoginPage() {
      return (
        this.$route.path === "/" ||
        this.$route.path === "/register" ||
        this.$route.path === "/about"
      );
    }
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
  font-family: "Montserrat", "Avenir", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;

  &.background {
    background: linear-gradient(rgba(255, 255, 255, 0.2)),
      url("~@/assets/forest1.jpg") no-repeat;
    background-size: cover;
    @media (max-width: 768px) {
      background: #fff;
    }
  }

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

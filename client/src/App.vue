<template>
  <div id="app" :class="{ background: hasBackground }">
    <app-navigation></app-navigation>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import AppNavigation from "./common/AppNavigation";
import authService from "./services/authService";
import { mapGetters } from "vuex";

export default {
  components: {
    AppNavigation,
  },
  created() {
    if (this.authenticated) {
      this.$store.dispatch("setUser");
    }

    let _this = this;
    setInterval(() => {
      if (_this.authenticated && !authService.hasValidToken()) {
        authService.logout();
        _this.$router.push("/");
      }
    }, 1000 * 60);
  },
  computed: {
    ...mapGetters(["authenticated"]),
    hasBackground() {
      return this.$route.path === "/users";
    },
  },
};
</script>

<style lang="scss">
body,
html {
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Montserrat", "Avenir", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  background: linear-gradient(rgba(255, 255, 255, 0.2)),
    url("~@/assets/forest1.jpg") no-repeat center center fixed;
  background-size: cover;
  @media (max-width: 768px) {
    background: #fff;
  }

  &.background {
    background: #fff;
  }
}
</style>

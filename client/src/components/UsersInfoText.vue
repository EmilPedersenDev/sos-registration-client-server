<template>
  <div class="users-info-text">
    <h5 :class="{ notAuthenticated: !auth }">
      Here you can see all the people that as of now is in some kind of an
      emergency situation.
    </h5>
    <router-link v-if="auth" :to="{ name: 'RegisterPosition' }">
      {{ LinkText }}
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "users-info-text",
  computed: {
    ...mapGetters({ userState: "getUser", auth: "authenticated" }),
    LinkText() {
      if (!this.auth) return;
      if (!this.userState._id) return;
      if (this.userState.lat && this.userState.long) {
        return `Edit your location ${this.userState.name}`;
      } else {
        return `Add your location ${this.userState.name}`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.users-info-text {
  width: 100%;
  h5 {
    margin: 20px;
  }
  .notAuthenticated {
    margin-bottom: 35px;
  }

  a {
    display: inline-block;
    margin: 20px auto 40px auto;
    color: #002b55;
    font-weight: 700;
    text-decoration: none;
    padding: 10px;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-in-out;
    border-radius: 5px;
    &:hover {
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.7);
    }
  }
}
</style>

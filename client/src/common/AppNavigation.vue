<template>
  <div class="nav" id="fading">
    <div class="left-nav col-md-4">
      <router-link to="/users">
        <img src="../assets/ocean.png" alt />
      </router-link>
      <div class="user-info"></div>
    </div>
    <div class="right-nav col-md-8">
      <ul>
        <li>
          <router-link to="/about">About Us</router-link>
        </li>
      </ul>
      <sos-button v-if="authenticated" primary medium @click="logout">Logout</sos-button>
      <sos-button v-else primary medium @click="login">Login</sos-button>
    </div>
    <logout-modal v-if="showLogoutModal" :close="closeModal"></logout-modal>
  </div>
</template>

<script>
  import VueJwtDecode from "vue-jwt-decode";
  import LogoutModal from "../components/LogoutModal";
  import { mapGetters } from "vuex";
  export default {
    name: "app-navigation",
    data() {
      return {
        isDropdownActive: false,
        showLogoutModal: false
      };
    },
    components: {
      LogoutModal
    },
    computed: {
      ...mapGetters(["authenticated"])
    },
    methods: {
      toggle() {
        this.isDropdownActive = !this.isDropdownActive;
      },
      closeModal() {
        this.showLogoutModal = false;
      },
      logout() {
        this.showLogoutModal = true;
      },
      login() {
        this.$router.push("/");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .nav {
    width: 100%;
    display: flex;
    box-shadow: 0px 8px 16px 0px #80c565;
    margin-bottom: 40px;

    ul {
      list-style-type: none;
      padding: 0;
    }
    a {
      color: #001e3c;
      font-size: 20px;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        text-decoration: none;
        color: #80c565;
      }
    }

    .left-nav {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 100px;
      height: 110px;
      img {
        width: 80px;
      }
    }
    .right-nav {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 100px;

      ul {
        display: flex;
        margin: 0;
        li {
          margin-right: 30px;
        }
      }
    }
  }
</style>
<template>
  <div class="nav" id="fading" :class="{ 'no-margin': isRegisterPosition }">
    <div class="left-nav col-6 col-md-4">
      <router-link to="/users" class="img-svg d-none d-sm-block">
        <img src="../assets/logo.svg" alt />
      </router-link>
      <router-link to="/users" class="img-png d-sm-none">
        <img src="../assets/cutlogo.png" alt />
      </router-link>
      <div class="user-info"></div>
    </div>
    <div class="right-nav col-6 col-md-8">
      <ul>
        <li class="no-mobile-view">
          <router-link to="/users">Search People</router-link>
        </li>
        <li class="no-mobile-view">
          <router-link to="/about">About Us</router-link>
        </li>
        <li class="no-desktop-view">
          <i v-if="!isToggled" class="fas fa-bars" @click="toggle(true)"></i>
        </li>
      </ul>
      <sos-button
        v-if="authenticated"
        class="no-mobile-view"
        primary
        medium
        @click="logout"
        >Logout</sos-button
      >
      <sos-button v-else class="no-mobile-view" secondary medium @click="login"
        >Login</sos-button
      >
    </div>
    <div
      :style="menuHeight"
      :class="[
        isToggled ? 'dropdown-wrapper-active' : 'dropdown-content-inactive',
      ]"
    >
      <i v-if="isToggled" class="fas fa-times" @click="toggle"></i>

      <ul>
        <li @click="toggle">
          <router-link to="/users">Search People</router-link>
        </li>
        <li @click="toggle">
          <router-link to="/about">About Us</router-link>
        </li>
        <li @click="toggle">
          <sos-button
            v-if="authenticated"
            class="no-mobile-view"
            tretton
            medium
            @click="logout"
            >Logout</sos-button
          >
        </li>
        <li @click="toggle">
          <sos-button
            v-if="!authenticated"
            class="no-mobile-view"
            tretton
            medium
            @click="login"
            >Login</sos-button
          >
        </li>
      </ul>
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
      showLogoutModal: false,
      isToggled: false,
      screenHeight: 0,
    };
  },
  mounted() {
    this.screenHeight = window.innerHeight;

    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  components: {
    LogoutModal,
  },
  computed: {
    ...mapGetters(["authenticated"]),
    isRegisterPosition() {
      return this.$route.path === "/add-position";
    },
    menuHeight() {
      if (this.isToggled) {
        return `height: ${this.screenHeight}px`;
      } else {
        return `height: 0px`;
      }
    },
  },
  methods: {
    toggle(bool) {
      this.isToggled = !this.isToggled;
    },
    closeModal() {
      this.showLogoutModal = false;
      if (!this.authenticated) {
        this.$router.push("/");
      }
    },
    logout() {
      this.showLogoutModal = true;
    },
    login() {
      this.$router.push("/");
    },
    onResize() {
      this.screenHeight = window.innerHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  display: flex;
  box-shadow: 0px 8px 16px 0px #80c565;
  margin-bottom: 40px;
  background: #fff;

  &.no-margin {
    margin-bottom: 11px;
    z-index: 9999;
  }

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

    @media (max-width: 768px) {
      padding-left: 40px;
    }

    .img-svg {
      img {
        width: 180px;
        @media (max-width: 768px) {
          width: 150px;
        }
      }
    }

    .img-png {
      img {
        width: 50px;
        margin-left: 10px;
      }
    }
  }
  .right-nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 100px;
    @media (max-width: 768px) {
      padding-right: 40px;
    }

    .no-mobile-view {
      @media (max-width: 992px) {
        display: none;
      }
    }

    .no-desktop-view {
      @media (min-width: 993px) {
        display: none;
      }
      .sub-page {
        color: black;
      }
    }

    button {
      @media (max-width: 576px) {
        padding: 10px 20px;
        margin-right: 10px;
      }
    }

    ul {
      display: flex;
      margin: 0;
      li {
        margin-right: 30px;
        a {
          font-size: 16px;
        }
        @media (max-width: 780px) {
          margin-right: 20px;
          a {
            font-size: 16px;
          }
        }
        @media (max-width: 576px) {
          margin-right: 10px;
          a {
            font-size: 14px;
          }
        }
      }
    }
  }

  .fas {
    width: 20px;
    font-size: 25px;
    &:hover {
      cursor: pointer;
    }
  }

  .dropdown-wrapper-active {
    position: fixed;
    z-index: 7;
    padding: 30px;
    color: #000;
    background-color: #29292e;
    width: 100%;
    .fa-times {
      color: #fff;
      float: right;
      font-size: 30px;
    }
    ul {
      position: absolute;
      top: 30%;
      margin-top: -50px;
      margin-left: 30px;
      text-align: start;
      li {
        margin: 20px 0px;
        a {
          font-size: 24px;
          color: #fff;
          &.sub-page-link {
            color: #fff;
            &:hover {
              &::before {
                background-color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .dropdown-content-inactive {
    display: none;
    .sub-page {
      color: #000;
    }
  }
}
</style>

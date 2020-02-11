<template>
  <div class="nav" id="fading">
    <div class="left-nav col-md-4">
      <router-link to="/">
        <img src="../assets/ocean.png" alt />
      </router-link>
    </div>
    <div class="right-nav col-md-8" v-if="authenticated">
      <sos-button primary medium @click="logout">Logout</sos-button>
      <i v-if="!isDropdownActive" class="fas fa-bars" @click="toggle"></i>
      <i v-else class="fas fa-times" @click="toggle"></i>
    </div>
    <div :class="[ isDropdownActive ? 'dropdown-active' : 'dropdown' ]">
      <div class="dropdown-content">
        <ul class="links">
          <li class="main-links home" @click="toggle">
            <router-link to="/">Home</router-link>
            <ul class="sub-links home">
              <li class="sub-links-item">
                <router-link to="/">Ocean</router-link>
              </li>
              <li class="sub-links-item">
                <router-link to="/">Atlantic</router-link>
              </li>
            </ul>
          </li>
          <li class="main-links about" @click="toggle">
            <router-link to="/about">About</router-link>

            <ul class="sub-links about">
              <li class="sub-links-item">
                <router-link to="/about">Our Company</router-link>
              </li>
              <li class="sub-links-item">
                <router-link to="/about">Vision</router-link>
              </li>
            </ul>
          </li>
          <li class="main-links logout">
            <router-link to="/about">Konto</router-link>

            <ul class="sub-links about">
              <li class="sub-links-item">
                <router-link to="/about">Mina Uppgifter</router-link>
              </li>
              <li class="sub-links-item">
                <router-link to="/about">GDPR</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
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
        user: {},
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
        // localStorage.removeItem("jwt");
        // this.$store.commit("setToken");
        // this.$router.push("/");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .nav {
    width: 100%;
    display: flex;
    // margin-bottom: 200px;
    box-shadow: 0px 8px 16px 0px rgba(30, 139, 195, 1);
    margin-bottom: 40px;

    ul {
      list-style-type: none;
      padding: 0;
    }
    a {
      color: #2c3e50;
      font-size: 20px;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        text-decoration: none;
        color: rgba(30, 139, 195, 1);
      }
    }

    .left-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      height: 110px;
      img {
        width: 100px;
      }
    }
    .right-nav {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      z-index: 2;
      button {
        margin-right: 60px;
      }
      i {
        font-size: 25px;
        margin-right: 100px;
        &:hover {
          cursor: pointer;
          color: rgba(30, 139, 195, 1);
        }
      }
    }
    .dropdown-active {
      display: inline-block;
      width: 100%;
      height: 100%;
      z-index: 1;
      .dropdown-content {
        display: block;
        border-radius: 8px;
        position: absolute;
        right: 0;
        top: 0;
        background-color: rgba(255, 255, 255, 1);
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(30, 139, 195, 1);
        text-align: start;
        width: 100%;
        height: 230px;
        z-index: 2;
        .links {
          margin-top: 100px;
          display: flex;
          justify-content: center;
          transition: all 0.8s ease;

          .main-links {
            &:hover {
              .sub-links {
                display: block;
                position: absolute;
                padding-left: 1px;
                a {
                  font-size: 14px;
                  font-weight: 600;
                }
              }
            }
            &.home,
            &.about {
              margin-right: 30px;
            }
            .sub-links {
              display: none;
            }
            a {
              flex-direction: column;
            }
          }
        }
      }
    }
    .dropdown {
      position: relative;
      display: inline-block;
      .dropdown-content {
        display: none;
      }
    }
  }
</style>
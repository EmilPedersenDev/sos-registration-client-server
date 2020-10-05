<template>
  <div class="Users">
    <st-spinner
      v-show="isLoading"
      :loaded="isLoading"
      :screenHeight="innerHeight"
    ></st-spinner>
    <div class="users-wrapper" v-if="!isLoading">
      <h1>Emergency search</h1>
      <users-info-text class="col-12"></users-info-text>
      <div class="col-12 col-sm-8 col-lg-4 search-wrapper">
        <i class="fas fa-search"></i>
        <st-input placeholder="Search for a person" v-model="search"></st-input>
      </div>
      <div v-if="users.length > 0" class="table-wrap">
        <table>
          <thead>
            <th>Name</th>
            <th>Latest Update</th>
            <th>Location</th>
            <th>Message</th>
            <th>Mapview</th>
            <th align="center">Edit</th>
          </thead>
          <tbody>
            <tr
              v-for="user in filteredUsers"
              :key="user._id"
              :class="[isCurrentUser(user._id) ? 'current-user' : 'other-user']"
            >
              <td>
                <span>{{ user.name }}</span>
              </td>
              <td>{{ user.time }}</td>
              <td v-if="user.location">{{ user.location.slice(7) }}</td>
              <td v-else>
                <span v-if="user.lat || user.long"
                  >Latitude: {{ user.lat }}, Longitude: {{ user.long }}</span
                >
              </td>
              <td class="comment-info">{{ user.comment }}</td>
              <td class="userMap">
                <i
                  v-if="user.location"
                  class="fas fa-globe-americas hoverable"
                  :class="{ 'map-current-user': isCurrentUser(user._id) }"
                  @click="openMapModal(user._id)"
                ></i>
              </td>
              <td>
                <router-link
                  :to="{ name: 'RegisterPosition' }"
                  v-if="isCurrentUser(user._id)"
                >
                  <i
                    class="fas fa-edit hoverable"
                    :class="{ 'map-current-user': isCurrentUser(user._id) }"
                  ></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mobile-table-wrapper">
        <div
          class="mobile-item"
          :class="[isCurrentUser(user._id) ? 'current-user' : '']"
          v-for="user in filteredUsers"
          :key="user._id"
        >
          <div class="row" style="margin: 0">
            <div class="col-4">
              <p>Name:</p>
            </div>
            <div class="col-8">
              <p>{{ user.name }}</p>
            </div>
            <div class="col-4">
              <p>Update:</p>
            </div>
            <div class="col-8">
              <p>{{ user.time }}</p>
            </div>
            <div class="col-4">
              <p>Location:</p>
            </div>
            <div class="col-8">
              <p v-if="user.location">{{ user.location.slice(7) }}</p>
            </div>
            <div class="col-4">
              <p>Message:</p>
            </div>
            <div class="col-8 comment-info">
              <p>{{ user.comment }}</p>
            </div>
            <sos-button
              v-if="isCurrentUser(user._id)"
              class="col-10"
              primary
              @click="toRegisterPosition"
              >Edit</sos-button
            >
          </div>
        </div>
      </div>
      <div v-if="!users">There are no users..</div>
      <map-modal
        v-if="showMapModal"
        :close="closeMapModal"
        :userId="userId"
      ></map-modal>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import api from "../../services/api";
import { mapGetters } from "vuex";
import UsersInfoText from "../UsersInfoText";
import mapModal from "../modals/mapModal";

export default {
  name: "users",
  data() {
    return {
      users: [],
      userId: "",
      search: "",
      isLoading: false,
      innerHeight: 0,
      showMapModal: false,
    };
  },
  components: {
    UsersInfoText,
    mapModal,
  },
  created() {
    this.innerHeight = window.innerHeight;
    this.getUsers();
  },

  computed: {
    ...mapGetters({ auth: "authenticated", userState: "getUser" }),
    filteredUsers() {
      let usersFilterArr = this.users;
      if (!this.search && this.userState) {
        usersFilterArr.sort((a, b) => {
          if (a._id === this.userState._id) {
            return -1;
          } else if (b._id === this.userState._id) {
            return 1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });
      }

      usersFilterArr = usersFilterArr.filter((val) => {
        for (let key in val) {
          if (
            val[key]
              .toString()
              .toLowerCase()
              .indexOf(this.search.toString().toLowerCase()) > -1
          ) {
            return val;
          }
        }
      });
      return usersFilterArr;
    },
  },
  methods: {
    getUsers() {
      this.isLoading = true;
      api
        .get("/users")
        .then((result) => {
          this.users = result.data.users;
        })
        .catch((e) => {
          throw new Error(e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    isCurrentUser(id) {
      if (!id) return false;
      if (!this.auth) return false;

      let decodedToken = VueJwtDecode.decode(this.auth);
      return decodedToken._id === id;
    },
    toRegisterPosition() {
      this.$router.push({ name: "RegisterPosition" });
    },
    openMapModal(userId) {
      this.userId = userId;
      this.showMapModal = true;
    },
    closeMapModal() {
      this.showMapModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/users.scss";
</style>

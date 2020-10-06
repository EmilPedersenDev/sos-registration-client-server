<template>
  <div class="users-table">
    <div class="users-table-desktop">
      <table>
        <thead>
          <th v-for="(header, id) in tableHeaders" :key="id">{{ header }}</th>
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
                @click="onOpenModal(user._id)"
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
    <div class="users-table-mobile">
      <div
        class="mobile-item"
        :class="[isCurrentUser(user._id) ? 'current-user' : '']"
        v-for="user in filteredUsers"
        :key="user._id"
      >
        <div class="row" style="margin: 0">
          <div class="col-4">
            <p class="header">Name</p>
          </div>
          <div class="col-8">
            <p>{{ user.name }}</p>
          </div>
          <div class="col-4">
            <p class="header">Update</p>
          </div>
          <div class="col-8">
            <p>{{ user.time }}</p>
          </div>
          <div class="col-4">
            <p class="header">Location</p>
          </div>
          <div class="col-8">
            <p v-if="user.location">{{ user.location.slice(7) }}</p>
          </div>
          <div class="col-4">
            <p class="header">Message</p>
          </div>
          <div class="col-8 comment-info">
            <p>{{ user.comment }}</p>
          </div>
          <div class="col-4">
            <p class="header">Mapview</p>
          </div>
          <div class="col-8">
            <sos-button
              v-if="user.location"
              :primary="isCurrentUser(user._id)"
              :secondary="!isCurrentUser(user._id)"
              :class="{ 'map-not-current-user': !isCurrentUser(user._id) }"
              @click="onOpenModal(user._id)"
              >See on map</sos-button
            >
          </div>
          <div class="col-4 d-none d-sm-block">
            <p class="header">Edit</p>
          </div>
          <div class="col-12 col-sm-8 edit-button-wrapper">
            <sos-button
              v-if="isCurrentUser(user._id)"
              class="edit-button-mobile"
              primary
              @click="toRegisterPosition"
              >Edit</sos-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "users-table",
  props: {
    users: {
      type: Array,
    },
    tableHeaders: {
      type: Array,
    },
    searchQuery: {
      type: String,
      default: "",
    },
    openModal: {
      type: Function,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ auth: "authenticated", userState: "getUser" }),
    filteredUsers() {
      let usersFilterArr = this.users;
      if (!this.searchQuery && this.userState) {
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
              .indexOf(this.searchQuery.toString().toLowerCase()) > -1
          ) {
            return val;
          }
        }
      });
      return usersFilterArr;
    },
  },
  methods: {
    isCurrentUser(id) {
      if (!id) return false;
      if (!this.auth) return false;

      let decodedToken = VueJwtDecode.decode(this.auth);
      return decodedToken._id === id;
    },
    toRegisterPosition() {
      this.$router.push({ name: "RegisterPosition" });
    },
    onOpenModal(userId) {
      if (this.openModal) {
        this.openModal(userId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/users-table.scss";
</style>
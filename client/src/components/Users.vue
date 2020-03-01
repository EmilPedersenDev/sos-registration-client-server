<template>
  <div class="Users">
    <h1>Emergency search</h1>
    <users-info-text class="col-12"></users-info-text>
    <div class="col-12 col-sm-8 col-lg-4 search-wrapper">
      <i class="fas fa-search"></i>
      <st-input placeholder="Search for a person" v-model="search"></st-input>
    </div>
    <div v-if="users.length > 0" class="table-wrap d-none d-md-block">
      <table>
        <thead>
          <th>Name</th>
          <th>Latest Update</th>
          <th>Location</th>
          <th>Message</th>
          <th align="center">Edit</th>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user._id"
            :class="[isCurrentUser(user._id) ? 'current-user' : 'other-user']"
          >
            <td>
              <i class="fas fa-user-circle" v-if="isCurrentUser(user._id)"></i>
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
            <td>
              <router-link
                :to="{ name: 'RegisterPosition' }"
                v-if="isCurrentUser(user._id)"
              >
                <i class="fas fa-edit"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mobile-table-wrapper d-md-none">
      <div
        class="mobile-item"
        :class="[isCurrentUser(user._id) ? 'current-user' : '']"
        v-for="user in filteredUsers"
        :key="user._id"
      >
        <div class="row" style="margin: 0;">
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
  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
import VueJwtDecode from "vue-jwt-decode";
import Api from "../services/Api";
import { mapGetters } from "vuex";
import UsersInfoText from "./UsersInfoText";

export default {
  name: "users",
  data() {
    return {
      users: [],
      userId: null,
      search: ""
    };
  },
  components: {
    UsersInfoText
  },
  created() {
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

      usersFilterArr = usersFilterArr.filter(val => {
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
    }
  },
  methods: {
    getUsers() {
      Api()
        .get("/user/users")
        .then(result => {
          this.users = result.data.users;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.Users {
  h1 {
    margin-bottom: 30px;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 30px;
    }
  }
  .search-wrapper {
    margin: 0 auto;
    .fa-search {
      left: 30px;
      top: 15px;
      position: absolute;
    }
    input {
      padding-left: 40px;
    }
  }
  .table-wrap {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    table {
      width: 100%;
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.4);
      border-radius: 10px;
      margin: 40px 0px;

      thead {
        background: #001e3c;
        color: #fff;
        th {
          text-align: left;
          padding: 10px;
          &:first-child {
            border-top-left-radius: 8px;
          }
          &:last-child {
            border-top-right-radius: 8px;
          }
        }
      }
      tbody {
        tr {
          text-align: left;

          &:last-child {
            td {
              &:first-child {
                border-bottom-left-radius: 8px;
              }
              &:last-child {
                border-bottom-right-radius: 8px;
              }
            }
          }

          &.current-user {
            border-top: none;
            background: #9fd38a !important;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            td {
              &:first-child {
                position: relative;
                bottom: 0px;
                .fas {
                  position: absolute;
                  bottom: 12px;
                  color: #001e3c;
                  font-size: 20px;
                }
                span {
                  display: inline-block;
                  margin-left: 30px;
                }
              }
              &:last-child {
                text-align: left;
                .fas {
                  padding-left: 10px;
                  color: #001e3c;
                }
              }
            }
          }

          &.other-user {
            &:last-child {
              td {
                &:first-child {
                  border-bottom-left-radius: 8px;
                }
                &:last-child {
                  border-bottom-right-radius: 8px;
                }
              }
            }
          }

          &:nth-child(odd) {
            background: #eeeeee;
          }
          td {
            padding: 10px;
            &:nth-child(1) {
              min-width: 140px;
            }
          }
        }
      }
    }
  }

  .mobile-table-wrapper {
    margin-top: 40px;
    .mobile-item {
      &.current-user {
        background: #c8e6c9 !important;
      }
      margin: 0px;
      background-color: #fff;
      &:nth-child(odd) {
        background: #e5e5e5;
      }
      .col-8 {
        text-align: left;
      }
      .comment-info {
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      p {
        margin: 10px 0px;
      }
      button {
        margin: 10px auto 20px auto;
      }
    }
  }
}
</style>

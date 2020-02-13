<template>
  <div class="Users">
    <h1>SoS Registration</h1>
    <div class="row justify-content-center">
      <div class="col-4 search-wrapper">
        <st-input placeholder="Search" v-model="search"></st-input>
      </div>
    </div>
    <div v-if="users.length > 0" class="table-wrap">
      <div>
        <router-link :to="{ name: 'RegisterPosition' }" class>{{
          LinkText
        }}</router-link>
      </div>
      <table>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Location</th>
          <th>Message</th>
          <th align="center">Edit</th>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user._id"
            :class="{ 'current-user': isCurrentUser(user._id) }"
          >
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td v-if="user.location">{{ user.location.slice(7) }}</td>
            <td v-else>
              <span v-if="user.lat || user.long"
                >Latitude: {{ user.lat }}, Longitude: {{ user.long }}</span
              >
            </td>
            <td>{{ user.comment }}</td>
            <td>
              <router-link
                :to="{ name: 'RegisterPosition' }"
                v-if="isCurrentUser(user._id)"
                >Edit</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      There are no users..
      <br />
      <br />
      <router-link :to="{ name: 'RegisterPosition' }" class="add_post_link">{{
        LinkText
      }}</router-link>
    </div>
  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
import VueJwtDecode from "vue-jwt-decode";
import Api from "../services/Api";
import { mapGetters } from "vuex";

export default {
  name: "users",
  data() {
    return {
      users: [],
      userId: null,
      search: ""
    };
  },
  created() {
    this.getUsers();
  },
  computed: {
    ...mapGetters({ auth: "authenticated", userState: "getUser" }),
    LinkText() {
      if (!this.userState._id) return;
      if (this.userState.lat && this.userState.long) {
        return "Edit your location";
      } else {
        return "Add your location";
      }
    },
    filteredUsers() {
      let usersFilterArr = this.users;
      if (!this.search) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.Users {
  .table-wrap {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    a {
      color: #4d7ef7;
      text-decoration: none;
    }
    table {
      width: 100%;
      thead {
        background: rgba(33, 45, 94, 0.884);
        color: #fff;
        th {
          text-align: left;
          padding: 10px;
        }
      }
      tbody {
        tr {
          text-align: left;
          &.current-user {
            background: rgba(0, 163, 0, 0.62) !important;
          }

          &:nth-child(odd) {
            background: #e5e5e5;
          }
          td {
            padding: 10px;
            a {
              color: red;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="Users">
    <h1>SoS Registration</h1>
    <div v-if="users.length > 0" class="table-wrap">
      <div>
        <router-link :to="{ name: 'RegisterPosition' }" class>{{LinkText}}</router-link>
      </div>
      <table>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Location</td>
          <td>Message</td>
          <td align="center">Edit</td>
        </tr>
        <tr v-for="user in users" :key="user._id" :class="{'current-user': isCurrentUser(user._id)}">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span v-if="user.lat || user.long">Latitude: {{ user.lat }}, Longitude: {{user.long}}</span>
          </td>
          <td>{{user.comment}}</td>
          <td align="center" v-if="isCurrentUser(user._id)">
            <router-link :to="{ name: 'RegisterPosition' }">Edit</router-link>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no users..
      <br />
      <br />
      <router-link :to="{ name: 'RegisterPosition' }" class="add_post_link">{{LinkText}}</router-link>
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
        userId: null
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
          background: #f2f2f2;
        }
        th,
        tr {
          text-align: left;
          &.current-user {
            background: lightgreen !important;
          }
          &:nth-child(odd) {
            background: #f2f2f2;
          }
          &:nth-child(1) {
            background: #4d7ef7;
            color: #fff;
          }
          td {
            padding: 10px;
          }
        }
      }
    }
  }
</style>

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
      <users-table
        v-if="users.length > 0"
        :tableHeaders="tableHeaders"
        :users="users"
        :searchQuery="search"
        :openModal="openMapModal"
      ></users-table>
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
import api from "../../services/api";
import UsersInfoText from "../UsersInfoText";
import MapModal from "../modals/mapModal";
import UsersTable from "../UsersTable";

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
      tableHeaders: [
        "Name",
        "Latest Update",
        "Location",
        "Message",
        "Mapview",
        "Edit",
      ],
    };
  },
  components: {
    UsersInfoText,
    MapModal,
    UsersTable,
  },
  created() {
    this.innerHeight = window.innerHeight;
    this.getUsers();
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
}
</style>

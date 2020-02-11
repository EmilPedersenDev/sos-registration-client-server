<template>
  <div class="register-position">
    <h1>Add Your Position</h1>
    <div class="container">
      <div class="account-info">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-6">
            <st-form-group label="Name">
              <st-input type="text" placeholder="Name" v-model="newPersonModel.name"></st-input>
            </st-form-group>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-12 col-sm-6">
            <st-form-group label="Email">
              <st-input type="text" placeholder="Email" v-model="newPersonModel.email"></st-input>
            </st-form-group>
          </div>
        </div>
      </div>
      <div class="map-position">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-6">
            <sos-button primary large @click="getUserPosition()" v-if="!showPosition">Get Your Position</sos-button>
            <div v-if="showPosition">
              <p>Latitude: {{newPersonModel.lat}}</p>
              <p>Longitude: {{newPersonModel.long}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-6">
            <textarea rows="5" cols="15" placeholder="Comment" v-model="newPersonModel.comment"></textarea>
          </div>
        </div>
      </div>
      <div class="submit">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-6">
            <sos-button primary large class="app_post_btn" @click="addPost">Add</sos-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PostsService from "@/services/PostsService";
  import VueJwtDecode from "vue-jwt-decode";
  import { mapGetters } from "vuex";
  export default {
    name: "new-post",
    data() {
      return {
        newPersonModel: {
          name: "",
          email: "",
          comment: "",
          lat: null,
          long: null
        },

        showPosition: false
        // title: "",
        // description: "" hehe heheoikln
      };
    },
    mounted() {
      if (this.authenticated) {
        this.setNewPersonModel();
      }
    },
    computed: {
      ...mapGetters(["authenticated"])
    },
    methods: {
      async addPost() {
        await PostsService.addPost(this.newPersonModel);
        this.$router.push({ name: "Posts" });
      },
      setNewPersonModel() {
        let token = this.authenticated;
        let decoded = VueJwtDecode.decode(token);
        this.newPersonModel.name = decoded.name;
        this.newPersonModel.email = decoded.email;
      },
      getUserPosition() {
        let _this = this;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            _this.newPersonModel.lat = position.coords.latitude;
            _this.newPersonModel.long = position.coords.longitude;
            _this.showPosition = true;
          });
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .register-position {
    width: 100%;
    .container {
      .row {
        margin: 20px 0px;
      }
      .account-info {
      }
      .map-position {
        .row {
          margin: 35px 0px;
          button {
            width: 100%;
          }
        }
      }
      .comment {
      }
      .submit {
        .row {
          margin: 35px 0px;
          button {
            width: 100%;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="register-position">
    <div class="location-container">
      <h1>{{ HeaderText }}</h1>
      <div class="account-info">
        <div class="row justify-content-center">
          <div class="col-12 ">
            <st-form-group label="Name">
              <st-input
                type="text"
                placeholder="Name"
                v-model="newPersonModel.name"
              ></st-input>
            </st-form-group>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-12 ">
            <st-form-group label="Email">
              <st-input
                type="text"
                placeholder="Email"
                v-model="newPersonModel.email"
              ></st-input>
            </st-form-group>
          </div>
        </div>
      </div>
      <div class="map">
        <div class="row justify-content-center">
          <div class="col-12 ">
            <st-form-group :label="userLocationText">
              <google-map @addMarker="getLocation" :user="user"> </google-map>
            </st-form-group>
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="row justify-content-center">
          <div class="col-12 ">
            <st-form-group label="Comment">
              <textarea
                rows="5"
                cols="15"
                placeholder="Comment"
                v-model="newPersonModel.comment"
              ></textarea>
            </st-form-group>
          </div>
        </div>
      </div>
      <div class="submit">
        <div class="row justify-content-center">
          <div class="col-12 ">
            <sos-button tretton large class="app_post_btn" @click="submit"
              >Update</sos-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import Api from "../services/Api";
import GoogleMap from "./GoogleMap";
import moment from "moment";
moment.locale("en");

import { googleApiKey } from "../common/constants";
import { mapGetters } from "vuex";

export default {
  name: "register-position",
  data() {
    return {
      newPersonModel: {
        _id: null,
        name: "",
        email: "",
        comment: "",
        lat: null,
        long: null,
        location: "",
        time: null
      }
    };
  },
  components: {
    GoogleMap
  },
  mounted() {
    if (this.auth) {
      this.setNewPersonModel();
    }
  },
  computed: {
    ...mapGetters({ auth: "authenticated", user: "getUser" }),
    HeaderText() {
      if (!this.user.lat || !this.user.long) {
        return "Add your status";
      } else {
        return "Update your status";
      }
    },
    userLocationText() {
      if (!this.user.lat || !this.user.long) {
        return "Add your location";
      } else {
        return "Update your location";
      }
    }
  },
  watch: {
    user(val) {
      if (val) {
        this.setNewPersonModel();
      }
    }
  },
  methods: {
    submit() {
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.newPersonModel.lat},${this.newPersonModel.long}&key=${googleApiKey}`;
      axios
        .get(url)
        .then(result => {
          let city = result.data.plus_code.compound_code;
          this.newPersonModel.location = city;
          let time = new Date();
          this.newPersonModel.time = moment(
            time,
            "ddd, DD MMM YYYY HH:mm:ss ZZ"
          ).format("YYYY-MM-DD, HH:mm");

          Api()
            .put(`/user/user/${this.user._id}`, this.newPersonModel)
            .then(result => {
              this.newPersonModel = result.data.user;
              this.$store.commit("setUser", this.newPersonModel);
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          this.$router.push({ name: "Users" });
        });
    },
    getLocation(location) {
      if (!location.position.lat) return;

      this.newPersonModel.lat = location.position.lat;
      this.newPersonModel.long = location.position.lng;
    },
    setNewPersonModel() {
      if (!this.user) return;

      this.newPersonModel.name = this.user.name;
      this.newPersonModel.email = this.user.email;
      this.newPersonModel._id = this.user._id;
      this.newPersonModel.lat = this.user.lat
        ? this.user.lat
        : this.newPersonModel.lat
        ? this.newPersonModel.lat
        : null;
      this.newPersonModel.long = this.user.long
        ? this.user.long
        : this.newPersonModel.long
        ? this.newPersonModel.long
        : null;
      this.newPersonModel.comment = this.user.comment ? this.user.comment : "";
      this.newPersonModel.time = this.user.time ? this.user.time : null;
    }
  }
};
</script>

<style lang="scss" scoped>
.register-position {
  width: 100%;
  .location-container {
    width: 35%;
    padding: 30px;
    margin: 60px auto;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.4);
    border-radius: 20px;

    h1 {
      margin-top: 15px;
    }

    textarea {
      resize: none;
    }
    .row {
      margin: 20px 0px;
    }
    .map {
      h4 {
        margin-bottom: 20px;
        font-weight: 500;
      }
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

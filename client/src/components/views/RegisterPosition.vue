<template>
  <div class="register-position">
    <div class="col-sm-12 col-md-10 col-lg-8 location-container">
      <h1>{{ HeaderText }}</h1>
      <div class="account-info">
        <div class="row justify-content-center">
          <div class="col-12">
            <st-form-group
              label="Name"
              :invalid="
                $v.newPersonModel.name.$invalid && $v.newPersonModel.name.$dirty
              "
              :required="true"
            >
              <st-input
                :blur="$v.newPersonModel.name.$touch"
                type="text"
                placeholder="Name"
                v-model="newPersonModel.name"
                :class="{ invalid: $v.newPersonModel.name.$invalid }"
              ></st-input>
              <span
                class="form-group-error"
                v-if="!$v.newPersonModel.name.required"
                >Required</span
              >
              <span
                class="form-group-error"
                v-if="!$v.newPersonModel.name.maxLength"
                >Max Length 50</span
              >
            </st-form-group>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-12">
            <st-form-group
              label="Email"
              :invalid="
                $v.newPersonModel.email.$invalid &&
                $v.newPersonModel.email.$dirty
              "
              :required="true"
              :class="{ 'other-invalid': $v.newPersonModel.name.$invalid }"
            >
              <st-input
                :blur="$v.newPersonModel.email.$touch"
                type="text"
                placeholder="Email"
                v-model="newPersonModel.email"
                :class="{ invalid: $v.newPersonModel.email.$invalid }"
              ></st-input>
              <span
                class="form-group-error"
                v-if="!$v.newPersonModel.email.email"
                >Not a valid email</span
              >
              <span
                class="form-group-error"
                v-if="!$v.newPersonModel.email.required"
                >Required</span
              >
            </st-form-group>
          </div>
        </div>
      </div>
      <div class="map">
        <div class="row justify-content-center">
          <div class="col-12">
            <st-form-group
              :label="userLocationText"
              :class="{ 'other-invalid': $v.newPersonModel.email.$invalid }"
            >
              <google-map @addMarker="getLocation" :user="user"> </google-map>
            </st-form-group>
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="row justify-content-center">
          <div class="col-12">
            <st-form-group
              label="Comment"
              :invalid="$v.newPersonModel.comment.$invalid"
            >
              <textarea
                rows="5"
                cols="15"
                placeholder="Comment"
                v-model="newPersonModel.comment"
                :class="{ invalid: $v.newPersonModel.comment.$invalid }"
              ></textarea>
              <span
                class="form-group-error"
                v-if="!$v.newPersonModel.comment.maxLength"
                >Max Length 50</span
              >
            </st-form-group>
          </div>
        </div>
      </div>
      <div class="submit">
        <div class="row justify-content-center">
          <div class="col-12">
            <sos-button
              tretton
              large
              class="app_post_btn"
              @click="submit"
              :disabled="$v.$invalid"
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
import api from "../../services/api";
import GoogleMap from "../GoogleMap";
import moment from "moment";
moment.locale("en");

import { mapGetters } from "vuex";
import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";

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
        time: null,
      },
    };
  },
  validations: {
    newPersonModel: {
      name: {
        maxLength: maxLength(50),
        required,
      },
      email: {
        required,
        email,
      },
      comment: {
        maxLength: maxLength(50),
      },
    },
  },
  components: {
    GoogleMap,
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
    },
  },
  watch: {
    user(val) {
      if (val) {
        this.setNewPersonModel();
      }
    },
  },
  methods: {
    submit() {
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.newPersonModel.lat},${this.newPersonModel.long}&key=${process.env.VUE_APP_GMAPS_SITE_KEY}`;
      axios
        .get(url)
        .then((result) => {
          let city = result.data.plus_code.compound_code;
          this.newPersonModel.location = city;
          let time = new Date();
          this.newPersonModel.time = moment(
            time,
            "ddd, DD MMM YYYY HH:mm:ss ZZ"
          ).format("YYYY-MM-DD, HH:mm");

          this.updateUser();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.$router.push({ name: "Users" });
        });
    },
    updateUser() {
      api
        .put(`/user/${this.user._id}`, this.newPersonModel)
        .then((result) => {
          this.newPersonModel = result.data.user;
          this.$store.commit("setUser", this.newPersonModel);
        })
        .catch((err) => {
          console.error(err);
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
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/register-position.scss";
</style>

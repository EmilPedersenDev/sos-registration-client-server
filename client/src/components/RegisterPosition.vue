<template>
  <div class="register-position">
    <h1>{{HeaderText}}</h1>
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
      <div class="map">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-6">
            <google-map @addMarker="getLocation" :user="user"></google-map>
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
            <sos-button primary large class="app_post_btn" @click="submit">Add</sos-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService';
import VueJwtDecode from 'vue-jwt-decode';
import Api from '../services/Api';
import GoogleMap from './GoogleMap';

import { mapGetters } from 'vuex';
export default {
  name: 'register-position',
  data() {
    return {
      newPersonModel: {
        _id: null,
        name: '',
        email: '',
        comment: '',
        lat: null,
        long: null
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
    ...mapGetters({ auth: 'authenticated', user: 'getUser' }),
    HeaderText() {
      if (!this.user.lat || !this.user.long) {
        return 'Add your location';
      } else {
        return 'Update your location';
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
      Api()
        .put(`/user/user/${this.user._id}`, this.newPersonModel)
        .then(result => {
          this.newPersonModel = result.data.user;
          this.$store.commit('setUser', this.newPersonModel);
          this.$router.push({ name: 'Users' });
        })
        .catch(err => {
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
      this.newPersonModel.lat = this.user.lat ? this.user.lat : this.newPersonModel.lat ? this.newPersonModel.lat : null;
      this.newPersonModel.long = this.user.long ? this.user.long : this.newPersonModel.long ? this.newPersonModel.long : null;
      this.newPersonModel.comment = this.user.comment ? this.user.comment : '';
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

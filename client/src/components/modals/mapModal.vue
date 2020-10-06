<template>
  <st-modal class="map-modal" :onClose="onClose" :isLoading="isLoading">
    <div slot="body" class="modal-body">
      <div class="exit-icon-wrapper">
        <i class="fas fa-times closeButton" @click="onClose"></i>
      </div>
      <gmap-map
        ref="mapRef"
        :options="{
          streetViewControl: false,
          disableDefaultUI: true,
          zoomControl: true,
          panControl: true,
        }"
        :center="center"
        :zoom="12"
        style="width: 100%; height: 400px"
        v-if="marker"
      >
        <gmap-marker
          :position="marker.position"
          :clickable="true"
          @click="setCenter"
        ></gmap-marker
      ></gmap-map>
    </div>
  </st-modal>
</template>

<script>
import { mapGetters } from "vuex";
import api from "../../services/api";

export default {
  name: "map-modal",
  props: {
    close: {
      type: Function,
    },
    userId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      center: {
        lat: 45.508,
        lng: -73.587,
      },
      marker: {},
      isLoading: false,
    };
  },
  watch: {
    userId: {
      immediate: true,
      handler(id) {
        if (id) {
          this.isLoading = true;

          this.getUser();
        }
      },
    },
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
  methods: {
    onClose() {
      this.close();
    },
    setCenter() {
      if (!this.marker) return;
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo(this.marker.position);
      });
    },
    getUser() {
      let url = `/user/${this.userId}`;
      api
        .get(url)
        .then((result) => {
          if (result.data && result.data.lat && result.data.long) {
            const userLocation = {
              lat: result.data.lat,
              lng: result.data.long,
            };
            this.marker = Object.assign({ position: userLocation });
            this.center = userLocation;
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.st-modal {
  transition: ease 0.3s;
  .exit-icon-wrapper {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    z-index: 998;
    background-color: #fff;

    .fas {
      top: 2px;
      right: 9.5px;
      font-size: 1.75em;
      z-index: 999;
      color: #343a40;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
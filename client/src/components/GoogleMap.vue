<template>
  <div class="map-container">
    <div class="search-wrapper">
      <h4>Update your position</h4>
      <gmap-autocomplete class="col-10" @place_changed="setPlace"></gmap-autocomplete>
      <button class="col-2" @click="addMarker">Add</button>
      <br />
    </div>
    <br />
    <gmap-map ref="mapRef" :options="{streetViewControl: false, disableDefaultUI: true, zoomControl: true, panControl: true,}" :center="center" :zoom="12" style="width:100%;  height: 400px;">
      <gmap-marker :position="marker.position" :clickable="true" @click="setCenter"></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'google-map',
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      center: {
        lat: 45.508,
        lng: -73.587
      },
      marker: {},
      places: [],
      currentPlace: null,
      hasUserLocation: false
    };
  },
  mounted() {
    if (!this.user._id) return;

    this.geolocate();
  },
  watch: {
    user: {
      handler: function(obj) {
        this.geolocate();
      },
      deep: true
    }
  },
  methods: {
    setPlace(place) {
      delete place.utc_offset;
      this.currentPlace = place;
    },
    setCenter() {
      if (!this.marker) return;
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo(this.marker.position);
      });
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.marker = Object.assign({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
        this.$emit('addMarker', this.marker);
      }
    },
    geolocate() {
      if ((this.user.lat && this.user.long) || this.hasUserLocation) {
        this.center = {
          lat: this.user.lat,
          lng: this.user.long
        };
        this.marker = Object.assign({ position: this.center });
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          this.marker = Object.assign({ position: this.center });
          this.$emit('addMarker', this.marker);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyC8NXzppZHxsBGIEgFzY8geEB8CyVuoZoA",
    libraries: "places"
  }
});

console.log(process.env);

Vue.use(Vuelidate);

import "../src/common";
import "./common/styles/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

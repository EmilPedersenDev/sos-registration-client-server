import store from "../store/index";
import VueJwtDecode from "vue-jwt-decode";
import moment from "moment";

export default {
  logout: async () => {
    await localStorage.removeItem("jwt");
    store.commit("setToken");
    store.commit("setUser");
  },
  hasValidToken: () => {
    let token = localStorage.getItem("jwt");
    if (token && token !== undefined) {
      let decodedToken = VueJwtDecode.decode(token);
      return moment().unix() < decodedToken.exp;
    } else {
      return false;
    }
  },
};

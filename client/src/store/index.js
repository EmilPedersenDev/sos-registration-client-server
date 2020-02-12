import Vue from "vue";
import Vuex from "vuex";

import authenticationModule from "./modules/authentication";
import userModule from "./modules/user";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication: authenticationModule,
    user: userModule
  }
});

import VueJwtDecode from "vue-jwt-decode";
import api from "../../services/api";
import axios from "axios";

const state = {
  user: {},
  users: [],
};

const actions = {
  setUser: ({ commit, dispatch }) => {
    const token = localStorage.getItem("jwt");
    let decodedToken = VueJwtDecode.decode(token);

    api.get(`/user/${decodedToken._id}`).then((result) => {
      commit("setUser", result.data);
    });
  },
};

const mutations = {
  setUser: (state, payload) => {
    state.user = payload;
  },
};

const getters = {
  getUser: (state) => {
    return state.user;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

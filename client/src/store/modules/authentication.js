const state = {
  token: localStorage.getItem("jwt") || ""
};
const mutations = {
  setToken: (state, payload) => {
    state.token = payload;
  }
};

const getters = {
  authenticated: state => {
    return state.token;
  }
};

export default {
  state,
  getters,
  mutations
};

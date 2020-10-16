import { reqSecklist } from "../../until/request";
const state = {
  list: []
};

const mutations = {
  changelist(state, arr) {
    state.list = arr;
  }
};
const actions = {
  reqActionlist(context) {
    reqSecklist().then(res => {
      context.commit("changelist", res.data.list);
    });
  }
};

const getters = {
  list(state) {
    return state.list;
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};

import { reqGoodscount, reqGoodslist } from "../../until/request";
const state = {
  list: [],
  size: 2,
  page: 1,
  total: 0
};

const mutations = {
  changelist(state, arr) {
    state.list = arr;
  },
  changecount(state, num) {
    state.total = num;
  },
  changepage(state, page) {
    state.page = page;
  }
};

const actions = {
  reqActionlist(context, bool) {
    let data = bool
      ? {}
      : { size: context.state.size, page: context.state.page };
    reqGoodslist(data).then(res => {
      let list = res.data.list ? res.data.list : [];

      if (context.state.size && list.length == 0) {
        context.commit("changepage", context.state.page - 1);
        context.dispatch("reqActionlist");
        return;
      }

      context.commit("changelist", list);
    });
  },

  reqChangecount(context) {
    reqGoodscount().then(res => {
      context.commit("changecount", res.data.list[0].total);
    });
  },

  reqChangepage(context, page) {
    context.commit("changepage", page);
    context.dispatch("reqActionlist");
  }
};

const getters = {
  list(state) {
    return state.list;
  },
  size(state) {
    return state.size;
  },
  page(state) {
    return state.page;
  },
  total(state) {
    return state.total;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};

import { reqSpecscount, reqSpecslist } from "../../until/request";
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
  changeTotal(state, num) {
    state.total = num;
  },
  changePage(state, page) {
    state.page = page;
  }
};
const actions = {
  reqActionlist(context, bool) {
    let params = bool
      ? {}
      : { page: context.state.page, size: context.state.size };
    reqSpecslist(params).then(res => {
      let list = res.data.list ? res.data.list : [];

      if (context.state.page > 1 && list.length == 0) {
        context.commit("changePage", context.state.page - 1);
        context.dispatch("reqActionlist");
        return;
      }
      list.forEach(item => {
        item.attrs = JSON.parse(item.attrs);
      });

      context.commit("changelist", list);
    });
  },
  reqChangecount(context) {
    reqSpecscount().then(res => {
      context.commit("changeTotal", res.data.list[0].total);
    });
  },
  reqChangepage(context, page) {
    context.commit("changePage", page);
    context.dispatch("reqActionlist");
  }
};
const getters = {
  list(state) {
    return state.list;
  },
  page(state) {
    return state.page;
  },
  total(state) {
    return state.total;
  },
  size(state) {
    return state.size;
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};

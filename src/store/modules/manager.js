import { reqManlist, reqMancount } from "../../until/request";

const state = {
  list: [],
  size: 2,
  total: 0,
  page: 1
};
const mutations = {
  changeList(state, arr) {
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
  reqActionlist(context) {
    reqManlist({ page: context.state.page, size: context.state.size }).then(
      res => {
        let list = res.data.list ? res.data.list : [];

        if (context.state.page > 1 && list.length == 0) {
          context.commit("changePage", context.state.page - 1);
          context.dispatch("reqActionlist");
          return;
        }
        context.commit("changeList", list);
      }
    );
  },

  reqMantotal(context) {
    reqMancount().then(res => {
      context.commit("changeTotal", res.data.list[0].total);
    });
  },

  reqManpage(context, page) {
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
  size(state) {
    return state.size;
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

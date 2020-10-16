import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

import { actions } from "./actions";
import { getters, mutations, state } from "./mutations";
import menu from "./modules/menu";
import role from "./modules/role";
import manager from "./modules/manager";
import classify from "./modules/classify";
import specs from "./modules/specs";
import vip from "./modules/vip";
import banner from "./modules/banner";
import goods from "./modules/goods";
import seck from "./modules/seck";
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    menu,
    role,
    manager,
    classify,
    specs,
    vip,
    banner,
    goods,
    seck
  }
});

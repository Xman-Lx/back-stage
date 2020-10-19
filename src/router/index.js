import Vue from "vue";
import Router from "vue-router";
import store from "../store";
const login = () => Promise.resolve(import("../pages/login/login"));
const index = () => Promise.resolve(import("../pages//index/index"));

const vip = () => Promise.resolve(import("../pages/vip/vip"));
const role = () => Promise.resolve(import("../pages/role/role"));
const menu = () => Promise.resolve(import("../pages/menu/menu"));
const seckill = () => Promise.resolve(import("../pages/seckill/seckill"));
const manager = () => Promise.resolve(import("../pages/manager/manager"));
const goods = () => Promise.resolve(import("../pages/goods/goods"));
const classify = () => Promise.resolve(import("../pages/classify/classify"));
const banner = () => Promise.resolve(import("../pages/banner/banner"));
const specs = () => Promise.resolve(import("../pages/specs/specs"));
const home = () => Promise.resolve(import("../pages/home/home"));

function checked(path, next) {
  let menus_url = store.state.userInfo.menus_url;
  if (menus_url.includes(path)) {
    next();
  } else {
    next("/index");
  }
}

export let indexrouter = [
  {
    path: "menu",
    component: menu,
    name: "菜单管理",
    beforeEnter(to, from, next) {
      checked("/index/menu", next);
    }
  },
  {
    path: "role",
    component: role,
    name: "角色管理",
    beforeEnter(to, from, next) {
      checked("/index/role", next);
    }
  },
  {
    path: "vip",
    component: vip,
    name: "会员管理",
    beforeEnter(to, from, next) {
      checked("/index/vip", next);
    }
  },
  {
    path: "specs",
    component: specs,
    name: "商品规格",
    beforeEnter(to, from, next) {
      checked("/index/specs", next);
    }
  },
  {
    path: "classify",
    component: classify,
    name: "商品分类",
    beforeEnter(to, from, next) {
      checked("/index/classify", next);
    }
  },
  {
    path: "banner",
    component: banner,
    name: "轮播图管理",
    beforeEnter(to, from, next) {
      checked("/index/banner", next);
    }
  },
  {
    path: "goods",
    component: goods,
    name: "商品管理",
    beforeEnter(to, from, next) {
      checked("/index/goods", next);
    }
  },
  {
    path: "seckill",
    component: seckill,
    name: "秒杀活动",
    beforeEnter(to, from, next) {
      checked("/index/seckill", next);
    }
  },
  {
    path: "manager",
    component: manager,
    name: "管理员管理",
    beforeEnter(to, from, next) {
      checked("/index/manager", next);
    }
  }
];

Vue.use(Router);

var router = new Router({
  routes: [
    {
      path: "/login",
      component: login,
      name: "登录"
    },
    {
      path: "/index",
      component: index,
      children: [
        {
          path: "home",
          component: home
        },
        ...indexrouter,
        {
          path: "",
          redirect: "home"
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next();
    return;
  }
  if (store.state.userInfo.token) {
    next();
    return;
  }
  next("/login");
});

export default router;

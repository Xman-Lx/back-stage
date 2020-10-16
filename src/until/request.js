import Vue from "vue";
import axios from "axios";
import qs from "qs";
import router from "../router";
import store from "../store";
Vue.prototype.$axios = axios;
Vue.prototype.$imgPre = "http://localhost:3000";
var baseurl = "/api";
axios.interceptors.request.use(req => {
  if (req.url != baseurl + "/api/userlogin") {
    req.headers.authorization = store.state.userInfo.token;
  }
  return req;
});

axios.interceptors.response.use(res => {
  console.group("=====本次请求路径是:" + res.config.url);
  console.log(res);
  console.groupEnd();
  if (res.data.msg == "登录已过期或访问权限受限") {
    alert(res.data.msg);
    router.push("/login");
  }
  return res;
});

export const reqLogin = params => {
  return axios({
    url: baseurl + "/api/userlogin",
    method: "POST",
    data: qs.stringify(params)
  });
};

export const reqMenuadd = parmas => {
  return axios({
    url: baseurl + "/api/menuadd",
    method: "POST",
    data: qs.stringify(parmas)
  });
};

export const reqMenulist = () => {
  return axios({
    url: baseurl + "/api/menulist",
    params: {
      istree: true
    }
  });
};

export const reqMenudel = id => {
  return axios({
    url: baseurl + "/api/menudelete",
    method: "POST",
    data: qs.stringify({ id: id })
  });
};

export const reqMenuchange = params => {
  return axios({
    url: baseurl + "/api/menuedit",
    method: "POST",
    data: qs.stringify(params)
  });
};

// export const reqMenuone = id => {
//   return axios({
//     url: baseurl + "/api/menuinfo?id=" + id
//   });
// };
export const reqMenuone = id => {
  return axios({
    url: baseurl + "/api/menuinfo",
    // method: "get",
    params: { id }
  });
};
//角色添加
export const reqRoleadd = params => {
  return axios({
    url: baseurl + "/api/roleadd",
    method: "POST",
    data: qs.stringify(params)
  });
};
//角色查询
export const reqRolelist = () => {
  return axios({
    url: baseurl + "/api/rolelist"
  });
};
//角色一条数据
export const reqRoleinfo = id => {
  return axios({
    url: baseurl + "/api/roleinfo",
    params: {
      id: id
    }
  });
};

//角色修改
export const reqRoleedit = params => {
  return axios({
    url: baseurl + "/api/roleedit",
    method: "POST",
    data: qs.stringify(params)
  });
};

//角色删除
export const reqRoledel = id => {
  return axios({
    url: baseurl + "/api/roledelete",
    method: "POST",
    data: qs.stringify({ id })
  });
};

export const reqManadd = params => {
  return axios({
    url: baseurl + "/api/useradd",
    method: "POST",
    data: qs.stringify(params)
  });
};

export const reqMancount = () => {
  return axios({
    url: baseurl + "/api/usercount"
  });
};

export const reqManlist = params => {
  return axios({
    url: baseurl + "/api/userlist",
    params
  });
};

export const reqManinfo = uid => {
  return axios({
    url: baseurl + "/api/userinfo",
    params: { uid }
  });
};

export const reqManedit = params => {
  return axios({
    url: baseurl + "/api/useredit",
    method: "POST",
    data: qs.stringify(params)
  });
};

export const reqMandel = uid => {
  return axios({
    url: baseurl + "/api/userdelete",
    method: "POST",
    data: {
      uid: uid
    }
  });
};

export const reqClassadd = params => {
  let data = new FormData();

  for (let i in params) {
    data.append(i, params[i]);
  }
  return axios({
    url: baseurl + "/api/cateadd",
    method: "POST",
    data: data
  });
};

export const reqClasslist = params => {
  return axios({
    url: baseurl + "/api/catelist",
    method: "GET",
    params
  });
};

export const reqClassinfo = id => {
  return axios({
    url: baseurl + "/api/cateinfo",
    method: "GET",
    params: { id }
  });
};

export const reqClassedit = params => {
  let data = new FormData();

  for (let i in params) {
    data.append(i, params[i]);
  }
  return axios({
    url: baseurl + "/api/cateedit",
    method: "POST",
    data: data
  });
};

export const reqClassdel = id => {
  return axios({
    url: baseurl + "/api/catedelete",
    method: "POST",
    data: { id }
  });
};

export const reqSpecsadd = params => {
  return axios({
    url: baseurl + "/api/specsadd",
    method: "POST",
    data: qs.stringify(params)
  });
};

export const reqSpecscount = () => {
  return axios({
    url: baseurl + "/api/specscount"
  });
};

export const reqSpecslist = params => {
  return axios({
    url: baseurl + "/api/specslist",
    params
  });
};

export const reqSpecsinfo = id => {
  return axios({
    url: baseurl + "/api/specsinfo",
    params: { id }
  });
};

export const reqSpecsedit = params => {
  return axios({
    url: baseurl + "/api/specsedit",
    method: "POST",
    data: qs.stringify(params)
  });
};

export const reqSpecsdel = id => {
  return axios({
    url: baseurl + "/api/specsdelete",
    method: "POST",
    data: { id }
  });
};

export const reqViplist = () => {
  return axios({
    url: baseurl + "/api/memberlist"
  });
};

export const reqVipinfo = uid => {
  return axios({
    url: baseurl + "/api/memberinfo",
    params: { uid }
  });
};

export const reqVipedit = params => {
  return axios({
    url: baseurl + "/api/memberedit",
    method: "POST",
    data: qs.stringify(params)
  });
};

export const reqBanadd = params => {
  let data = new FormData();

  for (let i in params) {
    data.append(i, params[i]);
  }
  return axios({
    url: baseurl + "/api/banneradd",
    method: "POST",
    data: data
  });
};

export const reqBanlist = () => {
  return axios({
    url: baseurl + "/api/bannerlist"
  });
};

export const reqBaninfo = id => {
  return axios({
    url: baseurl + "/api/bannerinfo",
    params: { id }
  });
};

export const reqBanedit = params => {
  let data = new FormData();

  for (let i in params) {
    data.append(i, params[i]);
  }
  return axios({
    url: baseurl + "/api/banneredit",
    method: "POST",
    data: data
  });
};

export const reqBandel = id => {
  return axios({
    url: baseurl + "/api/bannerdelete",
    method: "POST",
    data: { id }
  });
};

export const reqGoodsadd = params => {
  let data = new FormData();

  for (let i in params) {
    data.append(i, params[i]);
  }
  return axios({
    url: baseurl + "/api/goodsadd",
    method: "POST",
    data: data
  });
};

export const reqGoodslist = params => {
  return axios({
    url: baseurl + "/api/goodslist",
    params
  });
};

export const reqGoodscount = () => {
  return axios({
    url: baseurl + "/api/goodscount"
  });
};

export const reqGoodsinfo = id => {
  return axios({
    url: baseurl + "/api/goodsinfo",
    params: { id }
  });
};

export const reqGoodsedit = params => {
  let data = new FormData();

  for (let i in params) {
    data.append(i, params[i]);
  }
  return axios({
    url: baseurl + "/api/goodsedit",
    method: "POST",
    data: data
  });
};

export const reqGoodsdel = id => {
  return axios({
    url: baseurl + "/api/goodsdelete",
    method: "POST",
    data: { id }
  });
};

export const reqSeckadd = params => {
  return axios({
    url: baseurl + "/api/seckadd",
    method: "POST",
    data: qs.stringify(params)
  });
};

export const reqSecklist = () => {
  return axios({
    url: baseurl + "/api/secklist"
  });
};

export const reqSeckinfo = id => {
  return axios({
    url: baseurl + "/api/seckinfo",
    method: "get",
    params: { id }
  });
};

export const reqSeckdel = id => {
  return axios({
    url: baseurl + "/api/seckdelete",
    method: "POST",
    data: { id }
  });
};

export const reqSeckedit = params => {
  return axios({
    url: baseurl + "/api/seckedit",
    method: "POST",
    data: qs.stringify(params)
  });
};

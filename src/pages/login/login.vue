<template>
  <div class="login">
    <div class="text">
      <h2>登录</h2>
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      <el-input
        placeholder="请输入密码"
        v-model="form.password"
        show-password
      ></el-input>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "../../until/request";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "manager/list",
    }),
  },
  methods: {
    ...mapActions({
      reqManlist: "manager/reqActionlist",
      changeuser: "changeUserInfoAction",
    }),
    login() {
      // this.$router.push("/index");
      reqLogin(this.form).then((res) => {
        if (res.data.code == 200) {
          this.changeuser(res.data.list);

          this.$router.push("/index");
        } else {
          alert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>

<style  lang="stylus">
@import '../../styl/index.styl';

* {
  padding: 0px;
  margin: 0px;
}

h2 {
  margin-top: 30px;
}

.el-input, .el-button {
  width: 70%;
  margin-top: 20px;
}

.text {
  text-align: center;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 530px;
  height: 300px;
  background-color: #fff;
  border-radius: 15px;
}

.login {
  width: 100vw;
  height: 100vh;
  background-color: $background;
}
</style>
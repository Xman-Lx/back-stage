<template>
  <div>
    <el-dialog title="修改" :visible.sync="info.isshow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
          留空不修改
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="update()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqVipinfo, reqVipedit } from "../../../until/request";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqActionlist: "vip/reqActionlist",
    }),
    empty() {},

    update() {
      reqVipedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.empty();
          this.info.isshow = false;
          this.info.isAdd = true;
          this.reqActionlist();
        } else {
          alert(res.data.msg);
        }
      });
    },

    look(id) {
      reqVipinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.form.password = "";
        } else {
          alert(res.data.msg);
        }
      });
    },
  },
};
</script>

<style>
</style>
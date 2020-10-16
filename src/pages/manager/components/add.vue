<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加' : '修改'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="add()" v-if="info.isadd"
            >添加</el-button
          >
          <el-button type="primary" @click="update()" v-else>修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reqManadd, reqManinfo, reqManedit } from "../../../until/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },

  computed: {
    ...mapGetters({
      list: "role/list",
      menulist: "menu/list",
    }),
  },
  methods: {
    close() {
      //如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
      this.info.isshow = false;
    },

    update() {
      reqManedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.reqmanlist();
          this.empty();
          this.info.isadd = true;
          this.reqMantotal();
        } else {
          alert(res.data.msg);
        }
      });
    },

    ...mapActions({
      reqActionlist: "role/reqActionlist",
      reqMenulist: "menu/reqActionlist",
      reqmanlist: "manager/reqActionlist",
      reqMantotal: "manager/reqMantotal",
    }),

    add() {
      reqManadd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.reqmanlist();
          this.empty();
          this.reqMantotal();
        } else {
          alert(res.data.msg);
        }
      });
    },

    look(id) {
      reqManinfo(id).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = "";
        } else {
          alert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.list.length == 0) {
      this.reqActionlist();
    }
  },
};
</script>

<style>
</style>
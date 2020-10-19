<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加' : '修改'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>

        <el-form-item label="角色权限">
          <el-tree
            :data="menulist"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
            ref="tree"
          >
          </el-tree>
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
          <el-button type="primary" @click="update" v-else>修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reqRoleadd, reqRoleinfo, reqRoleedit } from "../../../until/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "role/list",
      menulist: "menu/list",
    }),
  },
  mounted() {
    if (this.menulist.length == 0) {
      this.reqMenulist();
    }
  },
  methods: {
    empty() {
      this.form = {
        rolename: "",
        menus: "[]",
        status: 1,
      };
      this.form.menus = this.$refs.tree.setCheckedKeys([]);
    },
    ...mapActions({
      reqActionlist: "role/reqActionlist",
      reqMenulist: "menu/reqActionlist",
    }),

    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleadd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.reqActionlist();
          this.empty();
          this.info.isshow = false;
        } else {
          alert(res.data.msg);
        }
      });
    },

    look(id) {
      reqRoleinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          // this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
          console.log(res.data.list);
          console.log(this.form.menus, id);
          this.info.isadd = false;
        } else {
          alert(res.data.msg);
        }
      });
    },

    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.reqActionlist();
          this.empty();
          this.info.isshow = false;
        }
      });
    },
  },
};
</script>

<style>
</style>
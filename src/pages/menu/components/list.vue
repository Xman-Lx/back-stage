<template>
  <el-dialog
    :title="info.isadd ? '添加' : '编辑'"
    :visible.sync="info.isshow"
    @closed="close()"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-select
          v-model="form.pid"
          placeholder="请选择"
          @change="changepid()"
        >
          <el-option label="顶级菜单" :value="0"></el-option>

          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1" disabled>目录</el-radio>
          <el-radio :label="2" disabled>菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标" v-if="form.type == 1">
        <el-select v-model="form.icon" placeholder="请选择">
          <el-option v-for="item in icons" :key="item" :value="item">
            <i :class="item"></i>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单地址" v-else>
        <el-select v-model="form.url" placeholder="请选择">
          <el-option
            v-for="item in indexrouter"
            :key="item.path"
            :value="'/index/' + item.path"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="empty()">取 消</el-button>
      <el-button type="primary" @click="add()" v-if="info.isadd"
        >确 定</el-button
      >
      <el-button type="primary" @click="update()" v-else>修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { indexrouter } from "../../../router/index";
import { mapActions, mapGetters } from "vuex";
import { reqMenuadd, reqMenuchange, reqMenuone } from "../../../until/request";
export default {
  props: ["info"],
  data() {
    return {
      icons: [
        "el-icon-eleme",
        "el-icon-delete",
        "el-icon-setting",
        "el-icon-s-home",
        "el-icon-s-release",
        "el-icon-s-ticket",
      ],
      indexrouter: indexrouter,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    close() {
      if (!this.info.isadd) {
        this.form = {
          pid: 0,
          title: "",
          icon: "",
          type: 1,
          url: "",
          status: 1,
        };
      }
    },
    ...mapActions({
      reqActionlist: "menu/reqActionlist",
    }),
    changepid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },

    add() {
      reqMenuadd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.empty();
          this.reqActionlist();
        } else {
          alert(res.data.msg);
          this.empty();
        }
      });
    },
    empty() {
      this.form = {
        pid: 0,
        tittle: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
      this.info.isshow = false;
    },

    look(id) {
      reqMenuone(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
        } else {
          alert(res.data.msg);
        }
      });
    },

    update() {
      reqMenuchange(this.form).then((res) => {
        if (res.data.code == 200) {
          this.empty();
          this.reqActionlist();
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
<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加' : '修改'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
          v-model="form.specsname"
        >
          <div class="dis">
            <div class="input">
              <el-input v-model="item.value"></el-input>
            </div>
            <el-button type="primary" v-if="index == 0" @click="addArr"
              >新增商品属性</el-button
            >
            <el-button type="danger" v-else @click="delArr(index)"
              >删除</el-button
            >
          </div>
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
import { mapGetters, mapActions } from "vuex";
import {
  reqSpecsadd,
  reqSpecsinfo,
  reqSpecsedit,
} from "../../../until/request";
export default {
  props: ["info"],
  data() {
    return {
      attrArr: [{ value: "" }, { value: "" }],
      form: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqActionlist: "specs/reqActionlist",
      reqActioncount: "specs/reqChangecount",
    }),
    empty() {
      this.attrArr = [{ value: "" }, { value: "" }];
      this.form = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
    },
    close() {
      //如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    update() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecsedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.empty();
          this.info.isshow = false;
          this.info.isAdd = true;
          this.reqActionlist();
        }
      });
    },
    addArr() {
      this.attrArr.push({ value: "" });
    },
    delArr(index) {
      this.attrArr.splice(index, 1);
    },
    look(id) {
      reqSpecsinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          this.attrArr = JSON.parse(this.form.attrs).map((item) => ({
            value: item,
          }));
        } else {
          alert(res.data.msg);
        }
      });
    },
    add() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecsadd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.reqActionlist();
          this.empty();
          this.info.isshow = false;
          this.reqActioncount();
        } else {
          alert(res.data.msg);
        }
      });
    },
  },
};
</script>

<style>
.dis {
  display: flex;
}
.input {
  flex: 1;
}
</style>
<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加' : '修改'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="角色权限">
          <el-date-picker
            type="datetime"
            placeholder="请选择开始时间"
            v-model="form.begintime"
            value-format="timestamp"
          >
          </el-date-picker>
          <span>-</span>
          <el-date-picker
            type="datetime"
            placeholder="请选择结束时间"
            v-model="form.endtime"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changelist"
          >
            <el-option
              :label="item.catename"
              v-for="item in classlist"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select
            v-model="form.second_cateid"
            @change="changesecond"
            placeholder="请选择"
          >
            <el-option
              :label="item.catename"
              v-for="item in secondlist"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option
              v-for="item in thirdlist"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import {
  reqSeckadd,
  reqSeckedit,
  reqSeckinfo,
  reqSecklist,
  reqClasslist,
  reqGoodslist,
} from "../../../until/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      secondlist: [],
      thirdlist: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "role/list",
      classlist: "classify/list",
    }),
  },
  mounted() {
    this.reqClasslist();
    this.reqgoodslist();
  },
  methods: {
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },
    ...mapActions({
      reqActionlist: "seck/reqActionlist",
      reqClasslist: "classify/reqActionlist",
      reqgoodslist: "goods/reqActionlist",
    }),
    changelist() {
      this.getsecond();
    },
    getsecond() {
      reqClasslist({ pid: this.form.first_cateid }).then((res) => {
        this.secondlist = res.data.list;
      });
    },
    changesecond() {
      this.getthird();
    },
    getthird() {
      reqGoodslist({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.thirdlist = res.data.list;
      });
    },
    add() {
      console.log(data);
      var date = new Date(this.form.begintime);
      var begin = date.getTime();
      var date1 = new Date(this.form.endtime);
      var end = date1.getTime();
      let data = {
        ...this.form,
        begintime: begin,
        endtime: end,
      };
      reqSeckadd(data).then((res) => {
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
      reqSeckinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.form.begintime;
          this.info.isadd = false;
        } else {
          alert(res.data.msg);
        }
      });
    },

    update() {
      reqSeckedit(this.form).then((res) => {
        // this.form.id = id;
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
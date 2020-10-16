<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加' : '修改'"
      :visible.sync="info.isshow"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            @change="changefirst"
            placeholder="请选择"
          >
            <el-option
              v-for="item in Classifylist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondlist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="getFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="changeSpecs"
          >
            <el-option
              v-for="item in specslist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option
              v-for="item in sizeArr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio-group v-model="form.isnew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio-group v-model="form.ishot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述">
          <div v-if="info.isshow" id="editor"></div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="add" v-if="info.isadd"
            >添加</el-button
          >
          <el-button type="primary" @click="update" v-else>修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import {
  reqGoodsinfo,
  reqGoodsedit,
  reqGoodsadd,
  reqClasslist,
  reqSpecslist,
} from "../../../until/request";
export default {
  props: ["info"],
  data() {
    return {
      imgUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: "",
        ishot: "",
      },
      secondlist: [],
      sizeArr: [],
    };
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      Classifylist: "classify/list",
      specslist: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqActionlist: "goods/reqActionlist",
      reqClasslist: "classify/reqActionlist",
      reqSpecslist: "specs/reqActionlist",
      reqChangecount: "goods/reqChangecount",
    }),
    opened() {
      //富文本
      this.editor = new E("#editor");
      this.editor.create();

      this.editor.txt.html(this.form.description);
    },

    changefirst() {
      this.form.second_cateid = "";
      this.getsecondlist();
    },
    getsecondlist() {
      reqClasslist({ pid: this.form.first_cateid }).then((res) => {
        this.secondlist = res.data.list;
      });
    },
    changeSpecs() {
      this.getsizeArr();
    },
    getsizeArr() {
      let obj = this.specslist.find((item) => item.id == this.form.specsid);
      // console.log(obj, "obj");
      this.sizeArr = obj.attrs;
    },
    update() {
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsedit(data).then((res) => {
        if (res.data.code == 200) {
          this.reqActionlist();
          this.empty();
          this.info.isadd = true;
        } else {
          alert(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: "",
      };
      this.secondlist = [];
      this.info.isshow = false;
    },

    look(id) {
      reqGoodsinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.imgUrl = this.$imgPre + this.form.img;
          this.form.specsattr = JSON.parse(this.form.specsattr);
          this.getsizeArr();
          console.log(res);
        } else {
          alert(res.data.msg);
        }
      });
    },
    getFile(e) {
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
      if (file.size > 2 * 1024 * 1024) {
        alert("文件过大");
      }
      let lastname = [".jpg", ".png", ".gif", ".jpeg"];
      let name = file.name.slice(file.name.lastIndexOf("."));
      if (!lastname.some((item) => item == name)) {
        return;
        alert("文件格式不对");
      }
    },
    add() {
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      console.log(data);
      reqGoodsadd(data).then((res) => {
        if (res.data.code == 200) {
          // this.form = res.data.list;
          this.reqActionlist();
          this.empty();
          this.reqChangecount();
        } else {
          alert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqSpecslist(true);
    this.reqClasslist();
    this.reqChangecount();
  },
};
</script>

<style lang="stylus" scoped>
.add >>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
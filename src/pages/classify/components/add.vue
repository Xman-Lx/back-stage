<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加' : '修改'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="角色名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <el-form-item label="图片" v-if="this.form.pid != 0">
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

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
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
import { mapActions, mapGetters } from "vuex";
import {
  reqClassadd,
  reqClassinfo,
  reqClassedit,
} from "../../../until/request";
export default {
  props: ["info"],
  data() {
    return {
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "classify/list",
    }),
  },
  methods: {
    update() {
      reqClassedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.reqActionlist();
          this.empty();
          this.info.isadd = true;

          console.log(res, "UUUUUUUUUUUUUUU");
        } else {
          alert(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.info.isshow = false;
    },
    ...mapActions({
      reqActionlist: "classify/reqActionlist",
    }),
    look(id) {
      reqClassinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.imgUrl = this.$imgPre + this.form.img;
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
    checkadd() {
      if (this.form.catename == "") {
        alert("角色名称不能为空");
        return false;
      }
      return true;
    },
    add() {
      if (!this.checkadd()) {
        return;
      }
      reqClassadd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.reqActionlist();
          this.empty();
        } else {
          alert(res.data.msg);
        }
      });
    },
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
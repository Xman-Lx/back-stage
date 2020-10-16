<template>
  <div>
    <el-table
      :data="manlist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1">启用</el-button>
          <el-button v-else type="danger">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage($event)"
    >
    </el-pagination>
  </div>
</template>



<script>
import { mapGetters, mapActions } from "vuex";
import { reqMandel } from "../../../until/request";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "role/list",
      manlist: "manager/list",
      total: "manager/total",
      size: "manager/size",
    }),
  },
  methods: {
    ...mapActions({
      reqActionlist: "role/reqActionlist",
      reqmanlist: "manager/reqActionlist",
      reqmanpage: "manager/reqManpage",
      reqMantotal: "manager/reqMantotal",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    changePage(e) {
      this.reqmanpage(e);
    },
    del(uid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqMandel(uid).then((res) => {
            if (res.data.code == 200) {
              this.reqmanlist();
              this.reqMantotal();
            } else {
              alert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.reqmanlist();

    this.reqMantotal();
  },
};
</script>

<style>
</style>
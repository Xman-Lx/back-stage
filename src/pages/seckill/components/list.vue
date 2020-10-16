<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="活动名称" sortable width="180">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1">启用</el-button>
          <el-button v-else type="danger">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>




<script>
import {} from "../../../store/modules/role";
import { mapGetters, mapActions } from "vuex";
import { reqSeckdel } from "../../../until/request";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "seck/list",
    }),
  },
  methods: {
    ...mapActions({
      reqActionlist: "seck/reqActionlist",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqSeckdel(id).then((res) => {
            if (res.data.code == 200) {
              this.reqActionlist();
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
    this.reqActionlist();
  },
};
</script>

<style>
</style>
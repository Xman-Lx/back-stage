<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号" sortable width="110">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable width="110">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" sortable width="120">
      </el-table-column>
      <el-table-column
        prop="market_price"
        label="市场价格"
        sortable
        width="120"
      >
      </el-table-column>
      <el-table-column label="图片" sortable width="100">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column label="是否新品" sortable width="130">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1">是</el-button>
          <el-button v-else type="danger">否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="是否热卖" sortable width="130">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1">是</el-button>
          <el-button v-else type="danger">否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态" sortable width="100">
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

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="change"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsdel } from "../../../until/request";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      size: "goods/size",
      total: "goods/total",
    }),
  },
  methods: {
    ...mapActions({
      reqActionlist: "goods/reqActionlist",
      reqChangecount: "goods/reqChangecount",
      reqChangepage: "goods/reqChangepage",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    change(e) {
      this.reqChangepage(e);
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqGoodsdel(id).then((res) => {
            if (res.data.code == 200) {
              this.reqActionlist();
              this.reqChangecount();
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
    this.reqChangecount();
  },
};
</script>

<style scoped>
img {
  width: 50px;
  height: 50px;
}
</style>
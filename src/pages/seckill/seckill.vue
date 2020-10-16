<template>
  <div>
    <el-button type="primary" @click="isshow()">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: { vAdd, vList },
  data() {
    return {
      info: {
        isshow: false,
      },
    };
  },

  methods: {
    isshow() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    edit(id) {
      this.info.isshow = true;
      this.$refs.add.look(id);
    },
  },
};
</script>

<style>
</style>
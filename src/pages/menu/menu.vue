<template>
  <div>
    <el-button type="primary" @click="isshow()">添加</el-button>
    <v-tab @edit="edit"></v-tab>
    <v-list :info="info" ref="add"></v-list>
  </div>
</template>

<script>
import vTab from "./components/tab";
import vList from "./components/list";
export default {
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
    };
  },
  methods: {
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.look(id);
      console.log(id, "============edit===============");
    },
    isshow() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
  },
  components: { vTab, vList },
};
</script>

<style>
</style>
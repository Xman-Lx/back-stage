<template>
  <div>
    <h3>首页</h3>

    <div id="main"></div>
  </div>
</template>

<script>
import echarts from "echarts";

import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },

  watch: {
    list: {
      handler() {
        var myChart = echarts.init(document.getElementById("main"));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "商品分类",
          },
          tooltip: {},
          legend: {
            data: ["数量"],
          },
          xAxis: {
            data: this.list.map((item) => item.catename),
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "line",
              data: this.list.map((item) => item.children.length),
            },
          ],
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep: true,
    },
  },
  mounted() {
    this.reqClass();
  },
  computed: {
    ...mapGetters({
      list: "classify/list",
    }),
  },
  methods: {
    ...mapActions({
      reqClass: "classify/reqActionlist",
    }),
  },
};
</script>

<style scoped>
#main {
  width: 80%;
  height: 350px;
  border: 1px solid black;
  margin: 30px auto;
}
</style>
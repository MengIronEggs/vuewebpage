<template>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :class="{ jew: item.path == '' }"
        v-for="(item, index) in breadArr"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    BreadArr: Array,
    default: []
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  computed: {
    breadArr() {
      return this.BreadArr;
    }
  }
};
</script>
<style lang="less">
.bread {
  height: 100%;
  width: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
  .jew {
    span {
      cursor: auto !important;
    }
  }
  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    font-size: 12px;
  }
  // .el-breadcrumb__inner a,
  // .el-breadcrumb__inner.is-link:hover {
  //   // color: #2673be;
  // }
}
</style>

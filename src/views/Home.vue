<template>
  <!-- <div class="home">
    <span>{{num|numFilter}}</span>
    <button @click="oneClick('搞点儿什么')">12342</button>
    <div>
      <crumbs :BreadArr="current"></crumbs>
    </div>
  </div>-->
  <div class="pageContent">
    <div class="searchContent">
      <el-form v-model="searchobj" label-width="1rem" class="topForm">
        <!-- 市 -->
        <el-form-item class="selectItem" style="float:left;width:20%;" label="选择市">
          <el-select
            v-model="searchobj.type"
            clearable
            placeholder="选择类别"
            filterable
          >
            <el-option
              v-for="item in enterpriseTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 县 -->
        <el-form-item class="selectItem" style="float:left;width:20%;" label="选择县">
          <el-select v-model="searchobj.type1" clearable placeholder="选择类别" filterable>
            <el-option
              v-for="item in enterpriseTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 时间类型 -->
        <el-form-item class="selectItem" style="float:left;width:20%;" label="时间">
          <el-date-picker
            v-model="searchobj.year"
            style="width:100%;"
            type="year"
            format="yyyy"
            value-format="yyyy"
            placeholder="选择年"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="selectItem" style="float:left;width:20%;" label="输入内容">
          <el-input v-model="searchobj.name" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item class="selectItem" style="float:left;width:20%;">
          <el-button type="primary" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentArea">
      
    </div>
  </div>
</template>

<script>
import configApi from "../../script/urlApi.js";
export default {
  name: "home",
  data() {
    return {
      num: 123.2332,
      current: [
        { name: "企业全景", path: "/home" },
        { name: "安全考评结果最佳", path: "" }
      ],
      searchobj: {
        type: "",
        type1: "",
        year: "",
        name: ""
      },
      enterpriseTypeOption: [
        { value: "1", label: "企业考评" },
        { value: "2", label: "项目考评" }
      ]
    };
  },
  methods: {
    oneClick(item) {
      this.$showConfirm("啊哈哈", () => {
        this.twoClick(item);
      });
    },
    twoClick(item) {
      alert(item);
    }
  },
  mounted() {
    let post_data = { searchKey: "43000", level: 1, type: 1, date: "2019-11" };
    this.$Axios.post(configApi.loginUrl, post_data).then(res => {
      console.log("123432", res);
    });
  }
};
</script>

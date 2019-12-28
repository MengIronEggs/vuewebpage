<style lang="less">
.ui-menus-list {
  background: #3e3f41;

  .el-menu-vertical-demo {
    border-radius: 0;
  }

  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
  .el-menu-item.is-active {
    color: #000;
    background: #fff !important;
  }
  .el-menu-item,
  .el-submenu__title {
    color: #fff;
    height: 51px;
    line-height: 51px;
  }
  .el-menu-item:hover,
  .el-submenu__title:hover {
    background: #646567 !important;
    color: #fff;
  }

  .el-submenu {
    .el-menu-item {
      background: #2b2b2b;
    }
  }
}
</style>
<style scoped lang="less">
.ui-menus-list {
  width: 230px;
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  overflow-y: auto;

  .el-menu {
    height: 100%;
    background: #3e3f41;

    .el-submenu {
      border-top: 1px solid #252726;
    }

    .el-menu-item {
      border-top: 1px solid #252726;
    }
  }
}
</style>

<template>
  <div class="ui-menus-list">
    <!--导航菜单-->
    <el-menu
      class="el-menu-vertical-demo"
      unique-opened
      :default-active="active"
      :default-openeds="opened"
      :router="true"
    >
      <!-- <template v-for="(pItem, p_index) in menuTree"> -->
      <template v-for="(pItem) in menuTree">
        <template v-if="pItem.son === undefined">
          <el-menu-item :index="pItem.id" :key="pItem.id" @click="clearCache">{{pItem.name}}</el-menu-item>
        </template>

        <el-submenu v-if="pItem.son !== undefined" :key="pItem.id" :index="pItem.id">
          <template slot="title">{{pItem.name}}</template>
          <!-- <template v-for="(sItem, s_index) in pItem.son"> -->
          <template v-for="(sItem) in pItem.son">
            <el-menu-item :index="sItem.id" :key="sItem.id" @click="clearCache">{{sItem.name}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuTree: [
        { id: "/home", name: "首页", order: 0 },
        {
          id: "/hjgl",
          name: "环境管理",
          order: 0,
          son: [
            { id: "/hjgl", name: "环境统计", order: 0 },
            { id: "/hjxq", name: "环境详情", order: 0 },
            { id: "/hjbb", name: "环境报表", order: 0 }
          ]
        },
        {
          id: "/lwgl",
          name: "劳务管理",
          order: 0,
          son: [
            { id: "/lwtj", name: "劳务统计", order: 0 },
            { id: "/lwxq", name: "劳务详情", order: 0 },
            { id: "/lwbb", name: "劳务报表", order: 0 }
          ]
        },
        {
          id: "/aqtj",
          name: "安全管理",
          order: 0,
          son: [
            { id: "/aqtj", name: "安全统计", order: 0 },
            { id: "/aqxq", name: "安全详情", order: 0 },
            { id: "/aqbb", name: "安全报表", order: 0 }
          ]
        },
        {
          id: "/jdtj",
          name: "进度管理",
          order: 0,
          son: [
            { id: "/jdtj", name: "进度统计", order: 0 },
            { id: "/jdxq", name: "进度详情", order: 0 },
            { id: "/jdbb", name: "进度报表", order: 0 }
          ]
        },
        {
          id: "/zltj",
          name: "质量管理",
          order: 0,
          son: [
            { id: "/zltj", name: "质量统计", order: 0 },
            { id: "/zlxq", name: "质量详情", order: 0 },
            { id: "/zlbb", name: "质量报表", order: 0 }
          ]
        },
        {
          id: "/spjk",
          name: "视频管理",
          order: 0,
          son: [{ id: "/spjk", name: "视频监控", order: 0 }]
        },
        {
          id: "/sjjg",
          name: "监管质量分析",
          order: 0,
          son: [
            { id: "/sjjg", name: "省级", order: 0 },
            { id: "/shjjg", name: "市级", order: 0 },
            { id: "/qxjjg", name: "区县级", order: 0 },
            { id: "/qyjjg", name: "企业", order: 0 },
            { id: "/gdjjg", name: "工地", order: 0 }
          ]
        }
      ],
      active: "home",
      opened: []
    };
  },

  created() {
    this.clearCache();
  },

  mounted() {
    this.initMenu();
  },

  beforeDestroy() {
    
  },

  methods: {
    initMenu() {
      // let userInfo = this.getSession(this.KEYS.USER_INFO);
      // if (userInfo !== null) {
      //     this.post("SystemManagerController/getUserMenu", {
      //         id: userInfo.userID,
      //     }).then((res) => {
      //         this.menuTree = res.data;
      //         this.initAuthMenu(res.data);
      //     }).then(() => {
      //         let hash = window.location.hash;
      //         let path = "";
      //         if (hash.indexOf("?") >= 0) {
      //             path = hash.match(/#\/([\S]*)\?/)[1];
      //         } else {
      //             path = hash.match(/#\/([\S]*)\??/)[1];
      //         }
      //         this.monitorRouter(path)
      //     });
      // }
      let hash = window.location.hash;
      let path = "";
      if (hash.indexOf("?") >= 0) {
        path = hash.match(/#\/([\S]*)\?/)[1];
      } else {
        path = hash.match(/#\/([\S]*)\??/)[1];
      }
      this.monitorRouter(path);
    },

    //初始化用户菜单权限列表
    initAuthMenu(tree) {
      let authMenu = [];
      for (let parent of tree) {
        authMenu.push(parent.id);
        if (parent.son) {
          for (let son of parent.son) {
            authMenu.push(son.id);
          }
        }
      }
    },

    //监听页面路由变化
    //动态改变菜单展开的项目
    //动态改变菜单展开的项目
    monitorRouter(path) {
      //展开菜单前先判断用户是否有访问权限
      //遍历menuTree，如果path是二级菜单则需要展开当前path的父级
      for (let p in this.menuTree) {
        let parent = this.menuTree[p];
        if (parent.id === `/${path}`) {
          this.active = `/${path}`;
          this.opened = [];
          return;
        }
        for (let s in parent.son) {
          let son = parent.son[s];
          let ext = son.id.split("-");
          ext = ext[0] + "-" + ext[1];
          if (path.indexOf(ext) === 0) {
            this.active = son.id;
            this.opened = [parent.id];
            return;
          }
        }
      }
    },

    //刷新页面，从菜单栏进入列表时清除搜索条件缓存结果
    clearCache() {}
  }
};
</script>

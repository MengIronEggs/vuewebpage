<style scoped lang="less">
.home-title {
  display: block;
  min-width: 1090px;

  .header {
    height: 60px;
    line-height: 60px;
    background: #3e3f41;
    color: #fff;

    .logo {
      height: 60px;
      img {
        width: 50px;
        margin: 12px 10px 12px 18px;
        cursor: pointer;
      }

      .menu-hide-btn {
        display: inline-block;
        height: 60px;
        width: 20px;
        background: url("../assets/logo.png") center no-repeat;
        background-size: contain;
        margin-left: 30px;
        cursor: pointer;
      }
    }

    .clock {
      font-size: 14px;
      text-align: center;
    }

    .user-info {
      .user-head {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        // display: block;
        margin: 10px;
        float: left;
      }

      .user-info-inner {
        cursor: pointer;
        font-size: 14px;
        display: inline-block;
        line-height: 60px;
        color: #ffffff;
        position: relative;

        &::after {
          content: " ";
          position: absolute;
          display: inline-block;
          height: 15px;
          width: 15px;
          background: url("../assets/logo.png") center no-repeat;
          background-size: contain;
          top: 22px;
          right: -26px;
        }
      }
    }
  }
}

//此元素不包含在当前组件中，所以不放在home-title类下面
.page-title-drop-down-menu {
  padding: 0;

  &::before {
    position: absolute;
    content: " ";
    border: 10px dashed #ffffff;
    border-top-width: 0;
    border-right-color: transparent;
    border-bottom-style: solid;
    border-left-color: transparent;
    top: -10px;
    right: 45%;
  }

  .el-dropdown-menu__item {
    font-size: 14px;
    color: #666;
    background: #f0f0f0;
    text-align: center;

    /*覆盖分割线的样式*/
    &.el-dropdown-menu__item--divided {
      margin: 0;

      &::before {
        margin: 0;
        height: 0;
      }
    }

    &:hover {
      background: #fff;
    }

    .drop-down-icon {
      display: inline-block;
      height: 20px;
      width: 20px;
      margin-right: 5px;

      &.modify-password-icon {
        background: url("../assets/logo.png") center / contain no-repeat;
      }

      &.logout-icon {
        background: url("../assets/logo.png") center / contain no-repeat;
      }

      &.download-app-icon {
        background: url("../assets/logo.png") center / contain no-repeat;
      }
    }

    span {
      vertical-align: middle;
    }
  }
}

.message-count {
  position: absolute;
  top: 35px;
  color: #fff;
  background-color: RED;
  display: block;
  text-align: center;
  line-height: 20px;
  width: 20px;
  border-radius: 20px;
}
</style>

<template>
  <div class="home-title">
    <el-row>
      <el-col :span="24" class="header">
        <el-col :span="6" :offset="1" class="logo">
          <img src="../assets/logo.png" @click="goHome" />
          <span class="menu-hide-btn" @click="toggleHideMenu"></span>
        </el-col>
        <el-col :span="4" :offset="7" class="clock">{{sysDate}}</el-col>

        <el-col :span="5" :offset="1" class="user-info" style="font-size:16px;">
          <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              <img class="user-head" :src="sysUserAvatar" />
              <span class="user-info-inner">{{sysUserName}}</span>
              <!-- <span class="message-count">{{unReadMessageCount}}</span> -->
            </span>
            <el-dropdown-menu slot="dropdown" class="page-title-drop-down-menu">
              <el-dropdown-item command="modifyPassword">
                <span class="drop-down-icon modify-password-icon"></span>
                <span>修改密码</span>
              </el-dropdown-item>

              <el-dropdown-item divided command="confirmLogout">
                <span class="drop-down-icon logout-icon"></span>
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      client: null,
      sysDate: "",
      sysUserAvatar: "",
      sysUserName: "",
      unReadMessageCount: 0,
      clockTimer: null,
      userId: "",
      stompClient: {},
      week() {
        let day = new Date().getDay();
        let str = "星期";

        switch (day) {
          case 0:
            str += "日";
            break;
          case 1:
            str += "一";
            break;
          case 2:
            str += "二";
            break;
          case 3:
            str += "三";
            break;
          case 4:
            str += "四";
            break;
          case 5:
            str += "五";
            break;
          case 6:
            str += "六";
            break;
        }

        return str;
      }
    };
  },

  created() {
    //设置定时器，每一秒更新一次时间
    this.sysDate = new Date().Format(`yyyy-MM-dd  ${this.week()}  hh:mm:ss`);
    this.clockTimer = setInterval(() => {
      this.sysDate = new Date().Format(`yyyy-MM-dd  ${this.week()}  hh:mm:ss`);
    }, 1000);

    // this.connect()
  },

  mounted() {
    let userInfo = "嘻嘻";
    if (userInfo !== null) {
      this.sysUserName = userInfo;
      // this.sysUserAvatar = userInfo.portrait === "" ? defaultHead : this.concatFileUrl(userInfo.portrait);
      this.sysUserAvatar =
        "https://img.guoanfamily.com/20170606151703_WechatIMG247.jpeg";
    }
  },

  beforeDestroy() {
    clearInterval(this.clockTimer);
    // clearInterval(this.unReadTimer);
  },

  methods: {
    //退出登录
    confirmLogout() {
      this.$confirm("确认退出吗?", "提示", {})
        .then(() => {})
        .catch(() => {});
    },
    
    goHome() {
      this.$router.push("/home");
    },

    handleCommand(command) {
      switch (command) {
        case "modifyPassword":
          this.$router.push("modifyPassword");
          break;
        case "confirmLogout":
          this.confirmLogout();
          break;
        case "downloadApp":
          this.$router.push("downloadApp");
          break;
        case "message":
          this.$router.push("message");
          break;
        default:
          break;
      }
    },

    //切换展示或隐藏菜单
    toggleHideMenu() {
      this.$emit("toggleHideMenu");
    }
  },

  computed: {},
  watch: {}
};
</script>

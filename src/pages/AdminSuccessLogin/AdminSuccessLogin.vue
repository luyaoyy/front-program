<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <el-button @click="handleCollaps"><i class="el-icon-arrow-right" v-show="!isCollapse"></i><i
            class="el-icon-arrow-left" v-show="isCollapse"></i></el-button>
        <el-menu
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :default-active="$router.currentRoute.path"
            router>
          <el-menu-item index="/adminSucess/Chart">
            <i class="el-icon-s-home"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-video-camera"></i>
              <span slot="title">电影管理</span>
            </template>
            <el-menu-item index="/adminSucess/MovieList">电影列表管理</el-menu-item>
            <el-menu-item index="/adminSucess">放映会场管理</el-menu-item>
            <el-menu-item index="/adminSucess/TicketOrderList">电影订单</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="/adminSucess">
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/adminSucess">
              <span slot="title">用户评论</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/adminSucess">
            <i class="el-icon-document"></i>
            <span slot="title">充值记录</span>
          </el-menu-item>
          <el-menu-item index="/adminSucess/SlideImg">
            <i class="el-icon-picture-outline"></i>
            <span slot="title">轮播图管理</span>
          </el-menu-item>
          <el-menu-item index="/adminSucess">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-avatar size="large" :src="`http://localhost:8080/ssm/${$store.state.admin.aheader}`"
                     style="vertical-align: middle;margin-right: 15px"></el-avatar>
          {{ state }}<span style="color: red"> {{ $store.state.admin.aname }}</span>
          <el-dropdown style="margin-left: 10px">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="showInformation">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="loginOut">退出登入</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      state: '',
      dialogVisible: false,
      isRouterAlive: true
    }
  },
  methods: {
    handleCollaps() {
      this.isCollapse = !this.isCollapse
    },
    getTimeState() {
      // 获取当前时间
      let timeNow = new Date();
      // 获取当前小时
      let hours = timeNow.getHours();
      // 设置默认文字
      let state = ``;
      // 判断当前时间段
      if (hours >= 0 && hours <= 11) {
        state = `早上好!`;
      } else if (hours > 11 && hours <= 14) {
        state = `中午好!`;
      } else if (hours > 14 && hours <= 18) {
        state = `下午好!`;
      } else if (hours > 18 && hours <= 24) {
        state = `晚上好!`;
      }
      return state;
    },
    showInformation() {
      this.$router.push('/adminSucess/AdminInformation')
    },
    loginOut() {
      Object.keys(this.$store.state).forEach(key => (this.$store.state[key] = null))
      this.$router.push("/out")
    }
  },
  mounted() {
    this.state = this.getTimeState()
  }
}
</script>
<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 600px;
}

.el-icon-setting:hover {
  cursor: pointer;
}
</style>
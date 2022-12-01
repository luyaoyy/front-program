<template>
  <div style="width: 100%;height: 500px;background-color: #F0F0F0;padding: 20px 0px;margin: 0 auto">
    <div style="width: 45%;margin: 25px auto">
      <el-container>
        <el-aside width="200px" style="height: 400px;border-radius: 10px">
          <el-menu
              :default-active="$route.path"
              router
              class="el-menu-vertical-demo"
              style="height: 400px">
            <el-menu-item index="/UserHomePage/UserInfo/ShowCenter">
              <i class="el-icon-menu"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
            <el-menu-item index="/UserHomePage/UserInfo/ShowComment">
              <i class="el-icon-s-comment"></i>
              <span slot="title">我的评论</span>
            </el-menu-item>
            <el-menu-item index="/UserHomePage/UserInfo/ShowBalance">
              <i class="el-icon-postcard"></i>
              <span slot="title">账户余额</span>
            </el-menu-item>
            <el-menu-item index="/UserHomePage/UserInfo/ShowInfo">
              <i class="el-icon-user"></i>
              <span slot="title">个人资料</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="background-color: #ffff;border-radius: 10px">
          <router-view :orderList="orderList"></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import requests from "@/api/request";
import store from "@/store";

export default {
  name: "UserNavigation",
  data() {
    return {
      orderList: []
    }
  },
  created() {
    requests({
      url: 'http://localhost:8081/ssm/GetUserPaidTicketList',
      method: 'get',
      params: {uid: this.$store.state.user.uid}
    }).then(response => {
      this.orderList = response.data
    })
  },
  beforeRouteEnter(to, from, next) { //用于路由进去前判断是否进去，改函数在beforeCreate执行前执行，此时页面未创建，this指向为undefined
    if (JSON.stringify(store.state.user) == '{}') {
      next('/out')
    } else {
      next()
    }
  }
}
</script>

<style scoped>

</style>
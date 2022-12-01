<template>
  <div>
    <div class="li_list">
      <div style="width: 100%;height: 73px">
        <div class="head">
          <el-menu :default-active="current" class="el-menu-demo" mode="horizontal" active-text-color="white" router>
            <img src="./images/logo.png" style="width: 70px;height: 60px; vertical-align: middle;margin-right: 10px">
            <h2 style="display: inline-block;padding: 0;margin-right: 30px">星光影院</h2>
            <el-menu-item index="/UserHomePage">首页</el-menu-item>
            <el-menu-item index="/UserHomePage/Movie">全部电影</el-menu-item>
            <el-menu-item index="3">我的收藏</el-menu-item>
            <el-menu-item index="/UserHomePage/UserOrder">我的订单</el-menu-item>
            <el-menu-item index="/UserHomePage/UserInfo" style="margin-right: 70px">个人中心</el-menu-item>
            <div style="display: inline-block">
              <el-input placeholder="查找电影" v-model="searchContent" class="input-with-select"
                        @keyup.enter.native="handleSearch">
                <el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width: 110px">
                  <el-option label="电影名" value="mname"></el-option>
                  <el-option label="电影类型" value="mclass"></el-option>
                  <el-option label="上映时间" value="mtime"></el-option>
                  <el-option label="演员" value="mactor"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" style=" color:#EF4238;border-radius: 0"
                           @click="handleSearch"></el-button>
              </el-input>
            </div>
            <div class="isLogin" v-if="JSON.stringify($store.state.user)=='{}'">
              <span type="danger" @click="login" class="login">登入</span>
            </div>
            <div class="isLogin" v-if="!(JSON.stringify($store.state.user)=='{}')">
              <el-dropdown>
            <span>
              <el-avatar size="large" :src="`http://localhost:8080/ssm/${$store.state.user.uheader}`"
                         style="vertical-align: middle"></el-avatar>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="enter">个人中心</el-dropdown-item>
                  <el-dropdown-item @click.native="enterOrderList">我的订单</el-dropdown-item>
                  <el-dropdown-item @click.native="loginOut">退出登入</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-menu>
        </div>
      </div>
    </div>
    <router-view name="SlidShowImg"></router-view>
    <router-view name="MovieCard"></router-view>
    <router-view name="Movie"></router-view>
    <router-view name="WaitMovieCard"></router-view>
    <router-view name="SearchResult" :firstSearchType="searchType" :firstSearchContent="searchContent"></router-view>
    <router-view name="UserOrder"></router-view>
    <router-view name="UserNavigation"></router-view>
    <router-view name="MovieDetail"></router-view>
  </div>
</template>

<script>

export default {
  name: "UserHomePage",
  data() {
    return {
      searchType: 'mname',
      searchContent: '',
      current: ''
    }
  },
  methods: {
    login() {
      this.$router.push("/out")
    },
    loginOut() {
      Object.keys(this.$store.state).forEach(key => (this.$store.state[key] = null))
      this.$router.push("/out")
    },
    handleSearch() {
      if (this.searchContent.trim() == '') {
        this.$message.error("请输入您要搜索内容！")
      } else {
        this.$router.push("/UserHomePage/SearchResult")
        setTimeout(() => {
          this.$bus.$emit('search', this.searchType, this.searchContent)
        }, 200)
      }
    },
    enter() {
      this.$router.push("/UserHomePage/UserInfo")
    },
    enterOrderList() {
      this.$router.push("/UserHomePage/UserOrder")
    }
  },
  watch: {
    '$route.path': { //用于控制首页导航栏激活状态
      immediate: true,
      handler() {
        var pathArr = this.$route.path.split("/")
        if (pathArr.length <= 2) {
          this.current = "/" + pathArr[1]
        } else {
          this.current = "/" + pathArr[1] + "/" + pathArr[2]
        }
      }
    }
  },
  // beforeDestroy() {
  //   alert(111)
  // }
}
</script>

<style scoped>
.head {
  width: 100%;
  background: black;
  position: fixed;
  z-index: 999;
  top: 0;
}

.el-menu-item {
  float: none;
  display: inline-block;
  margin: 0 20px;
  height: 77px;
  line-height: 77px;
}

.login {
  display: inline-block;
  text-decoration: none;
  color: white;
  background-color: #EF4238;
  border-radius: 7px;
  width: 45px;
  height: 25px;
  text-align: center;
  cursor: pointer;
}

.li_list {
  margin: 0 auto;
  text-align: center;
}

.is-active {
  background-color: #EF4238 !important;
}

.isLogin {
  display: inline-block;
  position: relative;
  left: 150px;
}

</style>
<template>
  <div>
    <div>
      <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          router
          active-text-color="#ffd04b">
        <el-menu-item index="/UserHomePage/Movie/HotMovie" @click="click"
                      :disabled="this.$route.path=='/UserHomePage/Movie/HotMovie'">正在热映
        </el-menu-item>
        <el-menu-item index="/UserHomePage/Movie/WaitMovie" @click="click"
                      :disabled="this.$route.path=='/UserHomePage/Movie/WaitMovie'">即将上映
        </el-menu-item>
      </el-menu>
      <div class="nevigate">
        <span style="margin-right: 10px;color: #999999;display: inline-block">类型：</span>
        <ul>
          <li @click="mclassChange('');keyWordChange()" class="classFlag active">全部</li>
          <li v-for="item of classList" @click="mclassChange(item);keyWordChange()" :key="item" class="classFlag">
            {{ item }}
          </li>
        </ul>
        <hr style="width: 100%;background-color: #E5E5E5;border: none;height: 1px">
        <span style="margin-right: 10px;color: #999999;display: inline-block">地区：</span>
        <ul>
          <li @click="mnationChange('');keyWordChange()" class="nationFlag active">全部</li>
          <li v-for="item of nationList" @click="mnationChange(item);keyWordChange()" :key="item"
              style="width: 70px;margin: 0 5px;text-align: center" class="nationFlag">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <router-view :mclass="mclass" :mnation="mnation"></router-view>
  </div>
</template>

<script>
import $ from "jquery"

export default {
  name: "AllHotMovie",
  data() {
    return {
      classList: ['爱情', '喜剧', '动画', '剧情', '励志', '恐怖', '惊悚', '科幻', '动作', '悬疑', '犯罪', '冒险', '战争', '奇幻', '家庭', '古装', '武侠', '西部', '历史', '传记', '戏曲', '音乐', '灾难', '青春', '儿童'],
      nationList: ['大陆', '美国', '韩国', '日本', '中国台湾', '中国香港', '泰国', '印度', '法国', '英国', '俄罗斯', '意大利', '西班牙', '德国', '波兰', '澳大利亚'],
      mclass: '',
      mnation: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    mclassChange(mclass) {
      this.mclass = mclass
    },
    mnationChange(mnation) {
      this.mnation = mnation
    },
    keyWordChange() {
      this.$bus.$emit("fun", this.mclass, this.mnation)
    },
    click() {
      this.mclass = ''
      this.mnation = ''
      $(".classFlag").removeClass("active cannot")
      $(".classFlag:first").addClass("active cannot")
      $(".classFlag:first").siblings(".classFlag").removeClass("active cannot")
      $(".nationFlag").removeClass("active cannot")
      $(".nationFlag:first").addClass("active cannot")
      $(".nationFlag:first").siblings(".classFlag").removeClass("active cannot")
    },
  },
  mounted() {
    $(".classFlag").click(function () {
      $(this).addClass("active cannot")
      $(this).siblings(".classFlag").removeClass("active cannot")
    })
    $(".nationFlag").click(function () {
      $(this)
      $(this).addClass("active cannot")
      $(this).siblings(".nationFlag").removeClass("active cannot")
    })
  }
}


</script>

<style scoped>
.el-menu-item {
  float: none;
  display: inline-block;
  margin: 0 20px;
}

.el-menu-demo {
  text-align: center;
}

.nevigate {
  margin: 0 auto;
  margin-top: 30px;
  width: 51%;
  text-align: left;
  border: 1px solid #E5E5E5;
  padding: 10px 20px;
}

.nevigate ul {
  display: inline-block;
  padding-left: 0;
  width: 92%;
  vertical-align: middle;
}

.nevigate ul li {
  display: inline-block;
  line-height: 30px;
  height: 30px;
  width: 45px;
  margin: 10px 10px;
  text-align: center;
}

a {
  text-decoration: none;
}

.nevigate ul li:hover {
  cursor: pointer;
}

.active {
  background-color: #f34d41;
  color: #F7F7F7;
  border-radius: 10px;
}

.is-disabled {
  cursor: default !important;
  background: transparent !important;
  opacity: 1 !important;
}

.cannot {
  pointer-events: none;
}
</style>
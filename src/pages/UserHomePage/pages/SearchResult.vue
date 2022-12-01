<template>
  <div v-loading="loading">
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#999"
        default-active="HotMovie"
        active-text-color="#ef4238">
      <el-menu-item index="HotMovie" @click="click(searchHotMovieResult)">已经上映{{ searchHotMovieResult.length }}
      </el-menu-item>
      <el-menu-item index="WaitMovie" @click="click(searchWaitMovieResult)">即将上映{{searchWaitMovieResult.length}}
      </el-menu-item>
    </el-menu>
    <div style="width: 53%;margin: 30px auto" >
      <template v-for="item of showMovieList">
        <div style="width: 40%;display: inline-block;margin: 6px 10px" :key="item.id">
          <img :src="`http://localhost:8080/ssm/${item.mimg}`"
               class="img" @click="handleMovieDetail(item)"/>
          <div class="info">
            <div style="font-size: 25px;color: #333;margin: 25px 15px 25px 15px;font-style: italic" class="mname" @click="handleMovieDetail(item)">{{ item.mname }}</div>
            <div style="color: #ffb400;height: 30px;line-height: 30px;font-size: 25px;font-weight: 700;">{{item.mgrade}}</div>
            <div>{{ item.mclass }}</div>
            <div style="color: #999;">{{ item.mtime }}</div>
            <hr style="border: none;height: 2px;background-color: #E5E5E5;margin:10px 0 0 15px;width: 80%">
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import requests from "@/api/request";

export default {
  name: "SearchResult",
  data() {
    return {
      loading:true,
      searchContent: '',
      searchType: '',
      searchHotMovieResult: [],
      searchWaitMovieResult:[],
      showMovieList:[]
    }
  },
  props:['firstSearchType','firstSearchContent'],//用于用户第一次使用的数据，由于是路由第一次跳转，组件第一次生成，存在bug，暂时不知道怎么解决
  methods: {
    click(movieList) {
      this.showMovieList=movieList
    },
    handleMovieDetail(movie) {
      this.$store.state.movie=movie
      this.$router.push({name: 'MovieDetail'})
    },
  },
  created() {
    this.loading=true
    requests({
      url: 'http://localhost:8081/ssm/GetMovieSearchResult',
      params: {searchType: this.firstSearchType, searchContent: this.firstSearchContent,}
    }).then((response) => {
      this.searchHotMovieResult = response.data
      this.showMovieList=this.searchHotMovieResult
      this.loading=false
    })
  },
  mounted() {
    this.$bus.$on("search", (searchType, searchContent) => {
      this.loading=true
      this.searchContent = searchContent
      this.searchType = searchType
      setTimeout(() => {
        requests({
          url: 'http://localhost:8081/ssm/GetMovieSearchResult',
          params: {searchType: this.searchType, searchContent: this.searchContent,}
        }).then((response) => {
          this.searchHotMovieResult = response.data
          this.showMovieList=this.searchHotMovieResult
          this.loading=false
        })
      })
    })
  },
  destroyed() {
    this.$bus.$off("search")
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

.img {
  display: inline-block;
  width: 160px;
  height: 220px;
}

.img:hover {
  cursor: pointer;
}

.mname:hover {
  cursor: pointer;
}

.info {
  display: inline-block;
  width: 60%;
}

.info div {
  width: 100%;
  margin: 10px 15px;
}
</style>
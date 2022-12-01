<template>
  <div>
    <div class="div">
      <template v-for="item of allHotMovieList">
        <div class="out" @click="handleMovieDetail(item)" :key="item.id" @mouseenter="changeRank(item.mgrade)">
          <div class="img">
            <img :src="`http://localhost:8080/ssm/${item.mimg}`">
            <span class="span">{{ item.mname }}</span>
          </div>
          <div class="card">
            <img :src="`http://localhost:8080/ssm/${item.mimg}`">
            <div class="info">
              <div><span class="span" style="font-size: 20px">{{ item.mname }}</span></div>
              <div><span class="title">类型:</span><span class="content">{{ item.mclass }}</span></div>
              <div><span class="title">主演:</span><span class="content">{{ item.mactor }}</span></div>
              <div><span>地区:</span><span class="content">{{ item.mnation }}</span></div>
              <div><span class="title">上映时间:</span><span class="content">{{ item.mtime }}</span></div>
              <el-rate
                  v-model="value"
                  disabled
                  :allow-half="true"
                  show-score
                  text-color="#ff9900"
                  :max=10
                  score-template="{value}">
              </el-rate>
            </div>
          </div>
        </div>
      </template>
      <div v-if="allHotMovieList.length==0" style="text-align: center;margin-top: 100px">
        <span>抱歉，没有找到相关结果，请尝试用其他条件筛选。</span></div>
    </div>
  </div>
</template>

<script>
import requests from "@/api/request";

export default {
  name: "HotMovie",
  data() {
    return {
      allHotMovieList: [],
      value: 0,
    }
  },
  methods: {
    handleMovieDetail(movie) {
      this.$store.state.movie=movie
      this.$router.push({name: 'MovieDetail'})
    },
    changeRank(rank) {
      this.value = parseFloat(rank)
    },
    test() {
      alert(111)
    }
  },
  mounted() {
    this.$bus.$on("fun", (mclass,mnation)=>{
      requests({
        method: 'get',
        url: 'http://localhost:8081/ssm/GetHotMovieByKeyWord',
        params: {mclass: mclass, mnation:mnation}
      }).then(response => {
        this.allHotMovieList = response.data
      })
    })
  },
  created() {
    requests({
      method: 'get',
      url: 'http://localhost:8081/ssm/GetHotMovieList'
    }).then(response => {
      this.allHotMovieList = response.data
    })
  },
  destroyed() {
    this.$bus.$off('fun');
  },
}
</script>

<style scoped>
.div {
  width: 53%;
  margin: 0 auto;
}

.out {
  margin: -10px -10px;
  display: inline-block;
  width: 218px;
  height: 300px;
  text-align: center;
  cursor: pointer;
}

.img {
  margin-top: 60px;
}

.img img {
  width: 160px;
  height: 220px;
  display: block;
  margin: 0 auto;
}

.card img {
  width: 218px;
  height: 300px;
}

.info {
  width: 218px;
  height: 125px;
  background-color: #FAFAFA;
}

.card {
  align-items: flex-end;
  display: none;
  margin: 0px;
  padding: 0px;
  text-align: left;
}

img, .info {
  grid-column: 1;
  grid-row: 1;
}

.out:hover .img {
  display: none;
}

.out:hover .card {
  display: grid;
}

.span {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.title {
  margin-right: 5px;
}

.content {
  font-size: 12px;
  font-style: italic;
}

.allHot a {
  text-decoration: none;
  font-size: 20px;
  color: #EF4238;
}


</style>
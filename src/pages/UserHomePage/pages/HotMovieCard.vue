<template>
  <div>
    <div style="width: 70%;margin: 0 auto;overflow: hidden">
      <div style="height: 100%;overflow: hidden;padding-left: 10px;">
        <div style="width: 61%;float: left">
          <div style="margin-bottom: 10px;margin-left: 15px">
            <span class="hot">正在热映{{ allHotMovieList.length }}部</span>
            <span class="allHot"><router-link to="/UserHomePage/Movie">查看全部></router-link></span>
          </div>
          <template v-for="(item,index) of allHotMovieList">
            <div class="out" @click="handleMovieDetail(item)" :key="item.id" @mouseenter="changeRank(item.mgrade)"
                 v-if="index<=7">
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
        </div>
        <div style="width: 37%;float: right">
          <h2 style="padding: 0;margin: 0;color: #EF4238">票房排行前十</h2>
          <div class="rank">
            <ul>
              <template v-for="(item,index) of allRankMovieList">
                <li :key="index" v-if="index==0" @click="handleMovieDetail(item.movie)">
                  <el-image style="width: 90px;height: 120px;vertical-align: top"
                            :src="`http://localhost:8080/ssm/${item.mimg}`">
                  </el-image>
                  <div style="display: inline-block">
                    <span style="display: inline-block;font-size: 20px;margin: 8px;font-style: italic;font-weight: 600">{{
                        item.movie.mname
                      }}</span>
                    <p><span class="suffix">类型:</span><span style="margin-right: 6px">{{ item.movie.mclass }}</span>
                      <span class="suffix">地区:</span>{{ item.movie.mnation }}
                    </p>
                    <p>
                      <span class="suffix">主演:</span>{{ item.movie.mactor }}
                    </p>
                    <p><span class="suffix">实时票房:</span><span
                        style="font-size: 18px;color:#ef4238 ">{{ item.total }}</span></p>
                  </div>
                </li>
                <li :key="index" v-if="index==1||index==2" class="after" @click="handleMovieDetail(item.movie)">
                  <span style="float: left"><span
                      style="font-size: 22px;color: #ef4238;font-weight: initial;font-style:italic;margin-right: 10px">{{
                      index + 1
                    }}</span>{{ item.movie.mname }}</span>
                  <span style="float: right;color: #EF4238;">{{ item.total }}</span>
                </li>
                <li :key="index" v-if="index>=3" class="after" @click="handleMovieDetail(item.movie)">
                  <span class="name"><span
                      style="font-size: 22px;color: #999;font-weight: initial;font-style:italic;margin-right: 10px">{{
                      index + 1
                    }}</span>{{ item.movie.mname }}</span>
                  <span class="money">{{ item.total }}</span>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import requests from "@/api/request";

export default {
  name: "HotMovieCard",
  data() {
    return {
      allHotMovieList: [],
      value: 0,
      allRankMovieList: []
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    requests({
      method: 'get',
      url: 'http://localhost:8081/ssm/GetHotMovieList'
    }).then(response => {
      this.allHotMovieList = response.data
    })
    requests({
      method: 'get',
      url: 'http://localhost:8081/ssm/GetMovieRankList',
    }).then(response => {
      response.data.forEach((item, index) => {
        if (index <= 9) {
          this.allRankMovieList.push(item)
        }
      })
    })
  }
}
</script>

<style scoped>
.out {
  margin: -20px -10px;
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

.hot {
  font-size: 25px;
  color: #EF4238;
}

.allHot {
  float: right;
  margin-right: 35px;
}

.allHot a {
  text-decoration: none;
  font-size: 20px;
  color: #EF4238;
}

i {
  font-size: 40px;
}

.rank ul {
  margin-left: 0;
  padding-left: 0;
}

.rank ul li {
  list-style: none;
  display: block;
  margin: 9px 5px;
  overflow: hidden;
}

.rank ul {
  margin-top: 40px;
}

.rank p {
  margin: 5px 2px;
  padding: 0;
}

.name {
  display: inline-block;
  float: left;
}

.money {
  display: inline-block;
  float: right;
  color: #EF4238;
}

.after {
  line-height: 40px;
  height: 40px;
}

.suffix {
  font-size: 15px;
  color: #999;
  margin-right: 10px;
}

.rank li:hover {
  background-color: #F7F7F7;
  cursor: pointer;
}
</style>
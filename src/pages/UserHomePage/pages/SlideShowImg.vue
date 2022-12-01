<template>
  <el-carousel :interval="4000" height="450px" style="margin: 0 auto;width: 70%;margin-top: 5px;margin-bottom: 30px">
    <el-carousel-item v-for="item of imgList" :key="item.id" @click.native="showDetail(item.movie)">
      <img :src="`http://localhost:8080/ssm/${item.imgUrl}`" style="width: 100%;height: 100%;">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import requests from "@/api/request";

export default {
  name: "SlideShowImg",
  data() {
    return {
      imgList: []
    }
  },
  methods: {
    showDetail(movie) {
      this.$store.state.movie = movie
      this.$router.push({name: 'MovieDetail'})
    }
  },
  created() {
    requests({
      method: 'get',
      url: 'http://localhost:8081/ssm/GetSlideImg'
    }).then(response => {
      this.imgList = response.data
    })
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
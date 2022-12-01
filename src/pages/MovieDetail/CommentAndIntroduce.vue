<template>
  <div style="width: 45%;margin: 0 auto;margin-top: 40px">
    <p>
      <span class="split"></span>
      <span class="title">剧情简介</span>
    </p>
    <p>
      <span style="color: #999999;margin-right: 15px">导演:</span>
      <span>{{ $store.state.movie.mpeople }}</span>
    </p>
    <p>
      <span style="color: #999999;margin-right: 15px">演员:</span>
      <span v-for="(item,index) of $store.state.movie.mactor.split('/')" :key="index" style="margin-right: 5px">{{
          item
        }}</span>
    </p>
    <p class="introduce">
      {{ $store.state.movie.mintroduce }}
    </p>
    <p>
      <span class="split"></span>
      <span class="title">最近热门影评</span>
    </p>
    <ul class="comment">
      <li v-for="item of $store.state.commentList" :key="item.time">
        <div style="display: flex;align-items: center;">
          <img :src="`http://localhost:8080/ssm/${item.user.uheader}`" class="header">
          <div>
            <p>{{ item.user.uname }}</p>
            <p>
              <span style="vertical-align: middle;color: #999999;margin-right: 10px">{{
                  item.time.substring(5, 10)
                }}</span>
              <el-rate v-model="item.grade" :allow-half="true" disabled style="display: inline-block;"></el-rate>
            </p>
          </div>
          <div style="display: inline-block;margin-left: 60.5%">
            <span @click="delLike(item.cid)" v-if="item.like">
               <i class="iconfont icon-like1" style="color: red;font-size: 20px;cursor: pointer"></i>
            </span>

            <span v-else @click="addLike((item.cid))">
              <i class="iconfont icon-like1" style="font-size: 20px;cursor: pointer"></i>
            </span>
            <span style="font-size: 14px">{{ item.count }}</span>
          </div>

        </div>
        <p style="margin: 10px 0px 20px 55px;font-size: 14px;color: #666;line-height: 150%;width: 86%">
          {{ item.content }}
        </p>
        <hr style="margin-left: 55px;border: none;height: 2px;background-color: #E5E5E5;width: 86%">
      </li>
    </ul>
    <el-empty description="暂无评论，快来抢首评吧~~" v-show="$store.state.commentList.length==0"></el-empty>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CommentAndIntroduce",
  data() {
    return {
      isExist: false
    }
  },
  methods: {
    delLike(cid) {
      axios({
        method: 'post',
        url: "http://localhost:8081/ssm/DelLike",
        params: {uid: this.$store.state.user.uid, cid: cid, mid: this.$store.state.movie.id}
      }).then((response) => {
        this.$store.state.commentList = response.data
        this.$store.state.commentList = this.$store.state.commentList.map(function (item) {
          item.grade = item.grade / 2
          return item
        })
      })
    },
    addLike(cid) {
      if (JSON.stringify(this.$store.state.user) == '{}') {
        this.$router.push("/out")
      } else {
        axios({
          method: 'post',
          url: "http://localhost:8081/ssm/AddLike",
          params: {uid: this.$store.state.user.uid, cid: cid, mid: this.$store.state.movie.id}
        }).then((response) => {
          this.$store.state.commentList = response.data
          this.$store.state.commentList = this.$store.state.commentList.map(function (item) {
            item.grade = item.grade / 2
            return item
          })
        })
      }
    }
  }

}
</script>

<style scoped>
.title {
  font-size: 23px;
  font-weight: 600;
  vertical-align: middle;
}

.split {
  width: 4px;
  height: 22px;
  background-color: #ef4238;
  margin: 0 10px 0 0;
  display: inline-block;
  vertical-align: middle;
}

.introduce {
  width: 125%;
  line-height: 200%;
  text-indent: 2em
}

.comment {
  padding-left: 2%;

}

.comment li {
  list-style: none;
  display: block;
  margin-bottom: 40px;
}

.header {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 5px;
}

.comment p {
  margin: 0;
}

/deep/ .el-rate__icon {
  font-size: 23px !important;
  margin: 0;
  padding: 0;
}
</style>
<template>
  <div>
    <div style="background-color: #4E3756;width: 100%;height: 375px">
      <div style="width: 45%;margin: 0 auto">
        <img :src="`http://localhost:8080/ssm/${$store.state.movie.mimg}`" class="img">
        <div class="info">
          <p class="name">{{ $store.state.movie.mname }}</p>
          <p class="class">
            <span v-for="(item,index) of $store.state.movie.mclass.split('/')" :key="index"
                  style="margin-right: 4px">{{ item }}</span>
          </p>
          <p class="nation">{{ $store.state.movie.mnation }}/{{ $store.state.movie.mduration }}</p>
          <p class="time">{{ $store.state.movie.mtime }}在中国大陆上映</p>
          <p>
            <button class="btn" @click="showCommentDialog"><i class="el-icon-edit"></i>评分</button>
            <button class="btn"><i class="el-icon-star-off"></i>收藏</button>
          </p>
          <button class="buy" @click="showSession" v-show="$route.path=='/UserHomePage/MovieDetail'">选座购票</button>
          <button class="buy" @click="handleBack" v-show="$route.path=='/UserHomePage/MovieDetail/MovieSession'">
            更多电影详情
          </button>
        </div>
      </div>
    </div>
    <router-view></router-view>


    <el-dialog
        class="comment-dialog"
        :visible.sync="isShowCommentDialog"
        width="31%">
      <template slot="title">
        <p style="text-align: center;font-weight: 500;font-size: 20px;padding: 0;margin: 0 auto">电影评分</p>
      </template>
      <el-row>
        <div style="margin: 0 auto;text-align: center;width: 100%;height: 70px">
          <p class="grade-num" v-show="grade!=0">{{ grade * 2 }}</p>
          <el-rate
              :allow-half="true"
              v-model.number="grade"
              :show-text="true">
          </el-rate>
        </div>
      </el-row>
      <div style="width: 90%;margin: 0 auto">
        <el-input type="textarea" v-model="content" placeholder="发布一条影评吧~~"
                  :autosize="{ minRows: 7, maxRows: 10}"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="isShowCommentDialog = false">取 消</el-button>
    <el-button type="primary" @click="addComment">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

import requests from "@/api/request";

export default {
  name: "MovieDetail",
  data() {
    return {
      isShowCommentDialog: false,
      grade: 0,
      content: ''
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    showSession() {
      this.$router.push({name: 'MovieSession'})
    },
    showCommentDialog() {
      if (JSON.stringify(this.$store.state.user) == '{}') {
        this.$alert("请您登入后评论!")
      } else {
        this.isShowCommentDialog = true
      }
    },
    addComment() {
      if (this.content.trim() == '') {
        this.$message.warning("请输入内容!")

      } else if (this.grade == 0) {
        this.$message.warning("请评分后再提交评论!")
      } else {
        requests({
          method: 'post',
          url: 'http://localhost:8081/ssm/AddComment',
          params: {
            mid: this.$store.state.movie.id,
            uid: this.$store.state.user.uid,
            content: this.content,
            grade: this.grade * 2
          }
        }).then(() => {
          this.$message.success("评论成功!")
          this.isShowCommentDialog = false
          requests({
            method: 'get',
            params: {uid: this.$store.state.user.uid, mid: this.$store.state.movie.id},
            url: 'http://localhost:8081/ssm/GetCommentList',
          }).then(response => {
            this.$store.state.commentList = response.data
            this.$store.state.commentList = this.$store.state.commentList.map(function (item) {
              item.grade = item.grade / 2;
              return item;
            })
          })
        })
      }
    }
  },
  created() {
    requests({
      method: 'get',
      params: {
        uid: JSON.stringify(this.$store.state.user) == '{}' ? 0 : this.$store.state.user.uid,
        mid: this.$store.state.movie.id
      },
      url: 'http://localhost:8081/ssm/GetCommentList',
    }).then(response => {
      this.$store.state.commentList = response.data
      this.$store.state.commentList = this.$store.state.commentList.map(function (item) {
        item.grade = item.grade / 2;
        return item;
      })
    })
  }
}
</script>

<style scoped>
.img {
  width: 232px;
  height: 322px;
  border: 5px solid white;
  margin-top: 60px;
  vertical-align: top;
}

.info {
  display: inline-block;
  margin-left: 25px;
  margin-top: 50px;
}

.info p {
  color: white;
}

.name {
  font-size: 26px;
  font-weight: 700;
}

.btn {
  border-radius: 3px;
  background-color: #756189;
  width: 90px;
  height: 36px;
  line-height: 30px;
  display: inline-block;
  border: none;
  cursor: pointer;
  margin-right: 15px;
  font-size: 15px;
  font-weight: 600;
  color: white;
}

.buy {
  border-radius: 3px;
  background-color: #df2d2d;
  width: 195px;
  height: 36px;
  line-height: 30px;
  display: inline-block;
  border: none;
  cursor: pointer;
  margin-right: 15px;
  font-size: 15px;
  font-weight: 600;
  color: white;
}

/deep/ .el-rate__icon {
  font-size: 31px;
}

/deep/ .el-rate__text {
  font-size: 20px;
  color: rgb(247, 186, 42) !important;
}

.grade-num {
  text-align: center;
  margin: 0 auto;
  padding: 0;
  color: rgb(247, 186, 42);
  font-size: 20px;
  font-style: italic;
  font-weight: 600
}

</style>
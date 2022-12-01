<template>
  <div style="width: 55%;margin: 0 auto;margin-top: 40px">
    <el-page-header @back="handleBack" content="电影场次">
    </el-page-header>
    <el-table
        :data="session"
        stripe
        style="width: 100%">
      <el-table-column
          label="开场时间">
        <template slot-scope="scope">
          <div style="text-align: center;display: inline-block">
            <span>{{ scope.row.begTime }}</span><br>
            <span> {{ scope.row.endTime }}散场</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="room"
          label="放映厅">
      </el-table-column>
      <el-table-column
          label="票价">
        <template slot-scope="scope">
          <span style="color: #df2d2d;font-weight: 600">{{ scope.row.movie.mprice }}￥</span><br>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <button @click="enterBuyTicket(scope.row.sid)" class="btn">选座购票</button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import requests from "@/api/request";

export default {
  name: "MovieSession",
  data() {
    return {
      session: []
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    enterBuyTicket(sid) {
      if (JSON.stringify(this.$store.state.user) == '{}') {
        this.$confirm('检测到你未登入, 是否登入?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.replace("/out")
        })
      } else {
        this.$router.push({name: 'MovieSeat', params: {sid: sid}})
      }
    }
  },
  created() {
    requests({
      method: 'get',
      params: {mid: this.$store.state.movie.id},
      url: 'http://localhost:8081/ssm/MovieSessionList'
    }).then(response => {
      this.session = response.data
      this.session.forEach((item, index) => {
        var date = new Date(item.begTime)
        var min = date.getMinutes();  // 获取当前分钟
        var duration = item.movie.mduration.replace("分钟", "")
        date.setMinutes(min + parseInt(duration));
        var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
        var f = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
        var endTime = h + ":" + f
        this.session[index].endTime = endTime
      })
    })
  },
}
</script>

<style scoped>

i {
  font-size: 25px;
  vertical-align: middle;
}

.split {
  width: 2px;
  height: 25px;
  background-color: #999999;
  margin: 0 15px;
  display: inline-block;
  vertical-align: middle;
}

.btn {
  width: 80px;
  height: 30px;
  border: none;
  background-color: #df2d2d;
  border-radius: 18px;
  color: white;
  cursor: pointer;
}


</style>
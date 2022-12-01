<template>
  <div class="out">

    <p class="title">
      我的订单
    </p>
    <hr style="width: 95%;height: 1px;border: none;background-color: #E5E5E5">

    <div class="item" v-for="(item,index) of orderList" :key="index">
      <p class="top">
        <span style="margin-right: 7%">
          下单日期:&nbsp;&nbsp;{{ item.buyTime.substring(0, 10).replaceAll("/", "-") }}
        </span>
        <span style="color: #999999">
          订单号:{{ item.number }}
        </span>
      </p>


      <div class="info">
        <img :src="`http://localhost:8080/ssm/${item.movie.mimg}`"
             @click="handleMovieDetail(item.movie)"
             title="点击查看电影详情"
             style="width: 66px;height: 90px;box-shadow: 0 2px 4px rgba(0, 0, 0, .18), 0 0 6px rgba(0, 0, 0, .08);cursor: pointer">
        <div style="width: 30%">
          <p style="font-size: 18px;margin: 3px 0">《{{ item.movie.mname }}》</p>
          <p class="not--name">{{ item.session.room }}</p>
          <p class="not--name"><span v-for="(seat,i) of item.seat.split(',')" :key="i"
                                     style="margin-right: 1.5%">{{
              Math.ceil(seat / 10)
            }}排{{ seat % 10 == 0 ? 10 : seat % 10 }}列</span></p>
          <p class="not--name" style="color: red">{{ item.session.begTime }}</p>
        </div>
        <div style="width: 25%;text-align: center;color: red;font-weight: 600">{{ item.total }}￥</div>
        <div style="width: 25%;text-align: center">
          待支付
        </div>
        <div style="width: 10%;text-align: center">
          <button type="primary" @click="handlePayOrder(item.number,item.total)" class="btn">支付</button>
        </div>
        <div style="width: 5%;text-align: center">
          <i class="el-icon-delete" @click="handleDelete(item.number)"></i>
        </div>
      </div>
    </div>

    <el-empty description="暂无未支付订单，快去购票吧~~" v-show="orderList.length==0"></el-empty>
  </div>
</template>

<script>
import requests from "@/api/request";
import store from "@/store";

export default {
  name: "UserOrder",
  data() {
    return {
      orderList: []
    }
  },
  methods: {
    handlePayOrder(number, total) {
      this.$confirm('是否确认支付该订单?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        requests({
          url: "http://localhost:8081/ssm/UpdateTicketStatus",
          params: {number: number, total: total, uid: this.$store.state.user.uid},
          method: 'post'
        }).then(response => {
          if (response.data.isSuccess) {
            this.$message.success("支付成功")
            this.orderList = response.data.result
            requests({
              url: 'http://localhost:8081/ssm/UpDateUserInfo',
              params: {uid: this.$store.state.user.uid},
              method: 'get'
            }).then(response => {
              this.$store.state.user = response.data
            })
          } else {
            this.$message.error(response.data.result)
          }
        })
      })
    },
    handleDelete(number) {
      this.$confirm('是否确认取消并删除该订单?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        requests({
          url: 'http://localhost:8081/ssm/HandleDeleteUserOrder',
          params: {number: number},
          method: 'post'
        }).then(() => {
          requests({
            url: 'http://localhost:8081/ssm/HandleUpdateUserOrderList',
            params: {uid: this.$store.state.user.uid},
            method: 'get'
          }).then(response => {
            this.orderList = response.data
          })
        }).catch(() => {
          this.$message.error("出错了,删除失败!")
        })
      })
    },
    handleMovieDetail(movie) {
      this.$store.state.movie = movie
      this.$router.push({name: 'MovieDetail'})
    }
  },
  created() {
    requests({
      url: "http://localhost:8081/ssm/GeTWaitPaidUserOrderList",
      params: {uid: this.$store.state.user.uid},
      method: 'get'
    }).then(response => {
      this.orderList = response.data
    }).catch(() => {
      this.$message.error("请求出错!")
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
.out {
  width: 55%;
  margin: 0 auto;
  margin-top: 30px;
  border: 1px solid #E5E5E5;

}

.title {
  margin-left: 2.5%;
  color: #ec443f;
}

.item {
  width: 95%;
  margin: 0 auto;
  border: 1px solid #E5E5E5;
  margin: 20px auto;
}

.top {
  height: 50px;
  line-height: 50px;
  background-color: #f7f7f7;
  padding-left: 2.5%;
}

.info {
  width: 95%;
  margin: 0 auto;
  display: flex;
  /*定义子级元素垂直居中*/
  align-items: center;

}

.info div {
  display: inline-block;
}

.not--name {
  margin: 3% 0px 3% 6%;
  padding: 0px;
  font-size: 12px;
  color: #999999;
}

.btn {
  width: 70px;
  height: 30px;
  border: none;
  background-color: #df2d2d;
  border-radius: 18px;
  color: white;
  cursor: pointer;
}

i {
  font-size: 25px;
  cursor: pointer;
  color: red;
}
</style>
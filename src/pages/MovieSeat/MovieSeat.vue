<template>
  <div style="width: 100%;margin: 0 auto">
    <div style="width: 60%;margin: 0 auto;margin-top: 30px">
      <el-steps :active="1">
        <el-step title="选择电影场次" status="success"></el-step>
        <el-step title="选择座位号" :status="seatStatus"></el-step>
        <el-step title="加入购物车" :status="ticketStatus"></el-step>
        <el-step title="结算付款"></el-step>
      </el-steps>
    </div>
    <div
        style="width: 60%;margin: 50px auto;margin-bottom:0;border: 1px solid #E5E5E5;box-shadow: 0 12px 5px -10px rgba(0,0,0,0.1), 0 0 4px 0 rgba(0,0,0,0.1);">
      <el-container>
        <el-aside width="40%">
          <div class="movie__info">
            <el-image :src="`http://localhost:8080/ssm/${session.movie.mimg}`"
                      style="width: 180px;height: 245px;vertical-align: top;border: solid 4px #fff">
            </el-image>
            <div style="display: inline-block;margin-left: 25px">
              <p style="font-size: 28px;word-wrap: break-word; word-break: normal;width:170px;font-style: italic;font-weight: 520">
                {{
                  session.movie.mname
                }}</p>
              <p>
                <span class="suffix">类型:</span>
                <span class="content">{{ session.movie.mclass }}</span>
              </p>
              <p>
                <span class="suffix">地区:</span>
                <span class="content">{{ session.movie.mnation }}</span>
              </p>
              <p>
                <span class="suffix">时长:</span>
                <span class="content">{{ session.movie.mduration }}</span>
              </p>
            </div>
          </div>

          <div class="session__info">
            <p>
              <span class="suffix">放映厅:</span>
              <span class="content">{{ session.room }}</span>
            </p>
            <p>
              <span class="suffix">开场:</span>
              <span class="content" style="color: #FA7B77">{{ session.begTime }}</span>
            </p>
            <p>
              <span class="suffix">散场:</span>
              <span class="content">{{ endTime }}</span></p>
            <p>
              <span class="suffix">票价:</span>
              <span class="content">{{ session.movie.mprice }}￥</span>
            </p>
            <hr style="height: 2px;border: none;background-color: #E5E5E5;">
          </div>
          <p style="font-size: 23px">已选座位:</p>
          <div>
            <template v-for="item in seat">
        <span :key="item.id" class="ticket" v-if="item.selected">
          第{{ Math.ceil(item.id / 10) }}排{{ item.id % 10 == 0 ? 10 : item.id % 10 }}列
        </span>
            </template>

          </div>
          <p>
            <span style="font-size: 20px">总计:</span>
            <span style="font-size: 30px;color: red;font-weight: 600">{{ total }}￥</span>
          </p>
          <el-button type="primary" @click="submit">提交订单</el-button>
        </el-aside>
        <el-main>
          <div style="width: 370px;margin: 0 auto;text-align: center">
            <h4 style="text-align: center;margin: 0">荧幕中央</h4>
            <div class="screen"></div>
            <template v-for="item in seat">
              <span v-if="item.is" class="select" :key="item.id"></span>
              <span v-if="item.selected" class="admit" :key="item.id" @click="handleSelect(item.id)"></span>
              <span v-if="!item.selected&&!item.is" class="ok" :key="item.id" @click="handleSelect(item.id)"></span>
            </template>
          </div>
          <div style="margin: 30px auto;width: 100%;text-align: center">
            <span>可选座位</span><img src="./images/waitbuy.png" style="vertical-align: middle;margin-right: 35px">
            <span>已售座位</span><img src="./images/selected.png" style="vertical-align: middle;margin-right: 35px">
            <span>已选座位</span><img src="./images/admit.png" style="vertical-align: middle">
            <p style="font-size: 15px;margin-top:10%;color: #999999"><span
                style="color: red;font-size: 16px">温馨提示:</span>一次最多选座6个座位，请点击<span style="color: #ec443f">上方座位图</span>选择座位
            </p>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import requests from "@/api/request";

export default {
  name: "MovieSeat",
  data() {
    return {
      seat: [
        {
          id: 1,
          is: false,
          selected: false
        },
        {
          id: 2,
          is: false,
          selected: false
        }, {
          id: 3,
          is: false,
          selected: false
        },
        {
          id: 4,
          is: false,
          selected: false
        },
        {
          id: 5,
          is: false,
          selected: false
        },
        {
          id: 6,
          is: false,
          selected: false
        }, {
          id: 7,
          is: false,
          selected: false
        },
        {
          id: 8,
          is: false,
          selected: false
        },
        {
          id: 9,
          is: false,
          selected: false
        },
        {
          id: 10,
          is: false,
          selected: false
        },
        {
          id: 11,
          is: false,
          selected: false
        },
        {
          id: 12,
          is: false,
          selected: false
        },
        {
          id: 13,
          is: false,
          selected: false
        }, {
          id: 14,
          is: false,
          selected: false
        },
        {
          id: 15,
          is: false,
          selected: false
        },
        {
          id: 16,
          is: false,
          selected: false
        },
        {
          id: 17,
          is: false,
          selected: false
        }, {
          id: 18,
          is: false,
          selected: false
        },
        {
          id: 19,
          is: false,
          selected: false
        },
        {
          id: 20,
          is: false,
          selected: false
        },
        {
          id: 21,
          is: false,
          selected: false
        },
        {
          id: 22,
          is: false,
          selected: false
        },
        {
          id: 23,
          is: false,
          selected: false
        },
        {
          id: 24,
          is: false,
          selected: false
        }, {
          id: 25,
          is: false,
          selected: false
        },
        {
          id: 26,
          is: false,
          selected: false
        },
        {
          id: 27,
          is: false,
          selected: false
        },
        {
          id: 28,
          is: false,
          selected: false
        }, {
          id: 29,
          is: false,
          selected: false
        },
        {
          id: 30,
          is: false,
          selected: false
        },
        {
          id: 31,
          is: false,
          selected: false
        },
        {
          id: 32,
          is: false,
          selected: false
        },
        {
          id: 33,
          is: false,
          selected: false
        },
        {
          id: 34,
          is: false,
          selected: false
        },
        {
          id: 35,
          is: false,
          selected: false
        }, {
          id: 36,
          is: false,
          selected: false
        },
        {
          id: 37,
          is: false,
          selected: false
        },
        {
          id: 38,
          is: false,
          selected: false
        },
        {
          id: 39,
          is: false,
          selected: false
        }, {
          id: 40,
          is: false,
          selected: false
        },
        {
          id: 41,
          is: false,
          selected: false
        },
        {
          id: 42,
          is: false,
          selected: false
        },
        {
          id: 43,
          is: false,
          selected: false
        },
        {
          id: 44,
          is: false,
          selected: false
        },
        {
          id: 45,
          is: false,
          selected: false
        },
        {
          id: 46,
          is: false,
          selected: false
        }, {
          id: 47,
          is: false,
          selected: false
        },
        {
          id: 48,
          is: false,
          selected: false
        },
        {
          id: 49,
          is: false,
          selected: false
        },
        {
          id: 50,
          is: false,
          selected: false
        }, {
          id: 51,
          is: false,
          selected: false
        },
        {
          id: 52,
          is: false,
          selected: false
        },
        {
          id: 53,
          is: false,
          selected: false
        },
        {
          id: 54,
          is: false,
          selected: false
        },
        {
          id: 55,
          is: false,
          selected: false
        },
        {
          id: 56,
          is: false,
          selected: false
        },
        {
          id: 57,
          is: false,
          selected: false
        }, {
          id: 58,
          is: false,
          selected: false
        },
        {
          id: 59,
          is: false,
          selected: false
        },
        {
          id: 60,
          is: false,
          selected: false
        },
        {
          id: 61,
          is: false,
          selected: false
        }, {
          id: 62,
          is: false,
          selected: false
        },
        {
          id: 63,
          is: false,
          selected: false
        },
        {
          id: 64,
          is: false,
          selected: false
        },
        {
          id: 65,
          is: false,
          selected: false
        },
        {
          id: 66,
          is: false,
          selected: false
        },
        {
          id: 67,
          is: false,
          selected: false
        },
        {
          id: 68,
          is: false,
          selected: false
        },
        {
          id: 69,
          is: false,
          selected: false
        },
        {
          id: 70,
          is: false,
          selected: false
        }
      ],
      selectedSeatNumber: [],
      session: {},
      tickets: [],
      total: 0,
      seatStatus: "process",
      ticketStatus: "wait",
      endTime: ''
    }
  },
  methods: {
    handleSelect(id) {
      var count = 0
      this.total = 0
      this.seat.forEach(item => {
        if (item.selected) {
          count++
        }
      })
      if (count >= 6 && !this.seat[id - 1].selected) {
        this.$message.error("一次最多选择6个座位!")
      } else {
        this.seat[id - 1].selected = !this.seat[id - 1].selected
      }
      this.seatStatus = "process"
      this.ticketStatus = "wait"
      this.seat.forEach(item => {
        if (item.selected) {
          this.total = this.total + parseInt(this.session.movie.mprice)
          this.seatStatus = "success"
          this.ticketStatus = "process"
        }
      })
    },
    submit() {
      var seatCount = 0
      this.seat.forEach(item => {
        if (item.selected) {
          seatCount++
        }
      })
      if (!(seatCount == 0)) {
        this.$confirm('是否确认提交订单？', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          var now = new Date()
          var day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
          var number = now.getFullYear().toString() + (now.getMonth() + 1).toString() + day + now.valueOf().toString()
          this.seat.forEach(item => {
            if (item.selected) {
              this.tickets.push({
                movid: this.session.movie.id,
                useid: this.$store.state.user.uid,
                sessionid: this.session.sid,
                seat: item.id,
                number: number,
                tprice: this.session.movie.mprice,
                status: 0,
                buyTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
              })
            }
          })
          requests({
            method: 'post',


            data: JSON.stringify(this.tickets),//发送数组类数据


            headers: {
              'Content-Type': 'application/json'
            },
            url: 'http://localhost:8081/ssm/BuyTicket'
          }).then((response) => {
            if (response.data.isSuccess) {
              this.$message.success(response.data.message)
              this.$router.go(-1)
            } else {
              this.$message.error(response.data.message)
              this.$router.go(-1)
            }
          })
        })
      } else {
        this.$message.error("请您先选择座位!")
      }
    }
  },
  created() {
    requests({
      method: 'get',
      url: 'http://localhost:8081/ssm/MovieSeat',
      params: {sid: this.$route.params.sid}
    }).then((response) => {
      this.selectedSeatNumber = response.data.seat
      this.session = response.data.session
      var date = new Date(this.session.begTime)
      var min = date.getMinutes();  //2. 获取当前分钟
      var duration = this.session.movie.mduration.replace("分钟", "")
      date.setMinutes(min + parseInt(duration));
      var y = date.getFullYear();
      var m = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
      var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
      var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
      var f = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      this.endTime = y + '-' + m + '-' + d + " " + h + ":" + f;


      this.selectedSeatNumber.forEach((num) => {
        this.seat[parseInt(num) - 1].is = true
      })
    })
  }

}
</script>

<style scoped>
.screen {
  margin: 5px auto 20px auto;
  width: 250px;
  height: 25px;
  transform: rotateX(-28deg);
  background-color: #E5E5E5;
  box-shadow: 0 3px 10px rgba(250, 246, 246, 1); /*0.7是不透明度*/
}

.select {
  display: inline-block;
  background: url('./images/selected.png');
  width: 30px;
  height: 26px;
  margin: 10px 3px;
}

.ok {
  display: inline-block;
  background: url('./images/waitbuy.png');
  width: 30px;
  height: 26px;
  margin: 10px 3px;
}

.admit {
  display: inline-block;
  background: url('./images/admit.png');
  width: 30px;
  height: 26px;
  margin: 10px 3px;
}

.ticket {
  display: inline-block;
  background: url('./images/ticket.png');
  width: 60px;
  height: 30px;
  text-align: center;
  margin: 0 12px 10px 0;
  font-size: 10px;
  color: #f03d37;
  line-height: 30px;
}

/deep/ .el-aside {
  background-color: #F9F9F9;
  padding: 50px 30px;
}

.session__info {
  margin: 20px 0;
}

.movie__info {
}

.movie__info .suffix {
  font-size: 15px;
  color: #999999;
}

.session__info .suffix {
  font-size: 17px;
  color: #999999;
}

.suffix {
  margin-right: 10px;
}

.movie__info .content {
  font-size: 14px;
  color: #15181e;
}

.session__info .content {
  font-size: 18px;
  font-family: FZKai-Z03S;
}
</style>
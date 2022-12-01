<template>
  <div style="width: 100%;height: 1000px;">
    11
    <div style="overflow: hidden">
      <el-tag type="warning" class="dark">
        <i class="el-icon-s-order"></i>
        <span class="title">累计票房:</span><span class="content"><countTo :startVal='0' :endVal='totalMoney'
                                                                       :duration='2500'></countTo>￥</span>
      </el-tag>
      <el-tag type="info" class="dark">
        <i class="el-icon-user"></i>
        <span class="title">注册用户:</span><span class="content"><countTo :startVal='0' :endVal='userCount'
                                                                       :duration='2500'></countTo>人</span>
      </el-tag>
      <el-tag class="dark">
        <i class="el-icon-s-custom"></i>
        <span class="title">在职管理员:</span><span class="content"><countTo :startVal='0' :endVal='adminCount'
                                                                        :duration='2500'></countTo>人</span>
      </el-tag>
      <el-tag type="success" class="dark">
        <i class="el-icon-video-camera-solid"></i>
        <span class="title">电影总数:</span><span class="content"><countTo :startVal='0' :endVal='movieCount'
                                                                       :duration='2500'></countTo>部</span>
      </el-tag>
      <el-tag type="danger" class="dark">
        <i class="el-icon-document-checked"></i>
        <span class="title">累计售票:</span><span class="content"><countTo :startVal='0' :endVal='ticketCount'
                                                                       :duration='2500'></countTo>张</span>
      </el-tag>
      <el-tag type="success" class="dark">
        <i class="el-icon-shopping-cart-2"></i>
        <span class="title">充值总额:</span><span class="content"><countTo :startVal='0' :endVal='recharge'
                                                                       :duration='2500'></countTo>￥</span>
      </el-tag>
    </div>
    <div style="width: 50%; height: 50%;display: inline-block;margin-top: 60px" ref="chart"></div>
    <div style="width: 50%; height: 50%;margin-top: 60px;display: inline-block" ref="rightChart">
    </div>
  </div>
</template>

<script>
import requests from "@/api/request"
import countTo from 'vue-count-to'

const Echarts = require('echarts/lib/echarts')
var option
require('echarts/lib/chart/bar')
export default {
  name: 'TestChart',
  data() {
    return {

      movieRankList: [],
      totalMoney: 0,
      rightChart: null,
      mname: [],
      mtotal: [],
      mimg: [],
      totalMoneyoption: {},
      userCount:0,
      adminCount:0,
      movieCount:0,
      ticketCount:0,
      recharge:0,


      chart: null,
      d: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    }
  },
  created() {

    requests({
      method: 'get',
      url: 'http://localhost:8081/ssm/GetChartData'
    }).then(response => {
      this.movieRankList = response.data.movieRankList
      this.totalMoney = response.data.totalMoney
      this.userCount=response.data.userCount
      this.adminCount=response.data.adminCount
      this.movieCount=response.data.movieCount
      this.ticketCount=response.data.ticketCount
      this.movieRankList.forEach((item, index) => {
        if (index <= 4) {
          this.mname.push(item.mname)
          this.mtotal.push(item.total)
          this.mimg.push(item.mimg)
        } else {
          return
        }
      })
      this.totalMoneyoption = {
        title: {
          text: '电影票房前五(单位/￥)'
        },
        tooltip: {
          trigger: 'item',
          show: true,
        },
        xAxis: {
          axisLabel :{
            interval:0
          },
          type: 'category',
          data: this.mname
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.mtotal,
            barWidth: 60,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
      this.rightChart = Echarts.init(this.$refs.rightChart)
      this.rightChart.setOption(this.totalMoneyoption)
    }).catch(error => {
      this.$message.error(error.message)
    })



  },
  methods: {
    init() {
      this.chart = Echarts.init(this.$refs.chart)
      option = {
        title: {
          text: 'Stacked Line'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.d
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      this.chart.setOption(option)
    }
  },
  mounted() {
    this.init()
  },

  components: {
    countTo
  }
}

</script>

<style scoped>
.dark {
  width: 300px;
  height: 70px;
  display: flex;
  align-items: center;
  margin: 10px 8px;
  float: left;
  font-family: SimHei
}

.title {
  font-size: 20px;
  color: black;
}

.content {
  font-size: 35px;
  color: #F56C6C;
}

i {
  font-size: 35px;
  margin-right: 30px;
}
</style>

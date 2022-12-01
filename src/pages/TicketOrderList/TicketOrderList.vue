<template>
  <div v-loading="loading">
    <el-table
        :data="tickets"
        style="width: 100%">
      <el-table-column
          label="订单编号"
          width="235"
          prop="number">
      </el-table-column>
      <el-table-column
          label="联系方式">
        <template slot-scope="scope">
          {{ scope.row.user.uphone }}
        </template>
      </el-table-column>
      <el-table-column
          label="订单状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">已支付</el-tag>
          <el-tag type="info" v-if="scope.row.status==0">待支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          label="数量"
          prop="amount">
      </el-table-column>
      <el-table-column
          label="支付金额">
        <template slot-scope="scope">
          {{ scope.row.total }}￥
        </template>
      </el-table-column>
      <el-table-column
          label="下单时间"
          prop="buyTime">
      </el-table-column>
      <el-table-column
          width="300"
          align="center">
        <template slot="header" slot-scope="/* eslint-disable vue/no-unused-vars */ scope">
          <el-input
              v-model="keyWord"
              size="large"
              @blur="searchTickerOrder"
              placeholder="输入关键字搜索">
            <el-select v-model="type" slot="prepend" placeholder="请选择" style="width: 90px" default-first-option>
              <el-option label="手机号" value="手机号"></el-option>
              <el-option label="订单号" value="订单号"></el-option>
            </el-select>
          </el-input>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="showDetail(scope.row)">查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="width:500px;margin: 0 auto">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="currentindex"
          :page-sizes="[5,10, 15, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog
        :visible.sync="dialogVisible"
        width="33%">
      <template slot="title">
        <h2 style="margin: 0;padding: 0;text-align: center">订单详情</h2>
      </template>
      <el-image :src="`http://localhost:8080/ssm/${ticketItem.movie.mimg}`"
                style="width: 135px;height: 195px;display: inline-block;vertical-align: bottom;margin-right: 25px"></el-image>
      <el-descriptions class="margin-top" :column="2" border style="display: inline-block">
        <template slot="title">
          <h3 style="padding: 0;margin: 0">{{ ticketItem.movie.mname }}</h3>
        </template>
        <el-descriptions-item>
          <template slot="label">
            放映厅
          </template>
          {{ ticketItem.session.room }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            场次
          </template>
          {{ ticketItem.session.begTime }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            付款金额
          </template>
          {{ ticketItem.total }}￥
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            下单时间
          </template>
          {{ ticketItem.buyTime.replaceAll("/", "-") }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            数量
          </template>
          {{ ticketItem.amount }}张
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            票价
          </template>
          {{ ticketItem.movie.mprice }}￥
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            座位号
          </template>
          <span v-for="item of ticketItem.seat.split(',')" :key="item">
            {{ item }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            用户名
          </template>
          {{ ticketItem.user.uname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            用户性别
          </template>
          {{ ticketItem.user.ugender }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            下单手机号
          </template>
          {{ ticketItem.user.uphone }}
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
    </span>
    </el-dialog>
  </div>
</template>

<script>
import requests from "@/api/request";
import axios from "axios";

export default {
  name: "TicketOrderList",
  data() {
    return {
      tickets: [],
      keyWord: '',
      type: '手机号',
      dialogVisible: false,
      ticketItem: {},
      loading: false,
      total: 0,
      pageSize: 10,
      currentindex: 1,
    }
  },
  methods: {
    showDetail(ticket) {
      this.dialogVisible = true
      this.ticketItem = ticket
    },
    searchTickerOrder() {
      this.currentindex = 1
      this.pageSize = 10
      this.loading = true
      if (this.keyWord != '') {
        axios({
          method: 'get',
          url: 'http://localhost:8081/ssm/GetTicketOrderByKeyWord/1/10',
          params: {type: this.type, keyWord: this.keyWord}
        }).then(response => {
          this.tickets = response.data.list
          this.total = response.data.total
          this.loading = false
        })
      } else {
        axios({
          method: 'get',
          url: 'http://localhost:8081/ssm/GetTicketOrderList/1/10'
        }).then((response) => {
          this.tickets = response.data.list
          this.ticketItem = this.tickets[0]
          this.loading = false
        })
      }
    },
    handleCurrentChange(currentindex) {
      this.currentindex = currentindex
      this.loading = true
      if (this.keyWord == '') {
        requests({
          method: 'get',
          url: `http://localhost:8081/ssm/GetTicketOrderList/${currentindex}/${this.pageSize}`,
        }).then(response => {
          this.tickets = response.data.list
          this.ticketItem = this.tickets[0]
          this.loading = false
          this.total = response.data.total
        }).catch(error => {
          error.message
        })
      } else {
        axios({
          method: 'get',
          url: `http://localhost:8081/ssm/GetTicketOrderByKeyWord/${currentindex}/${this.pageSize}`,
          params: {type: this.type, keyWord: this.keyWord}
        }).then(response => {
          this.tickets = response.data.list
          this.total = response.data.total
          this.loading = false
        })
      }
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.loading = true
      if (this.keyWord == '') {
        requests({
          method: 'get',
          url: `http://localhost:8081/ssm/GetTicketOrderList/${this.currentindex}/${this.pageSize}`,
        }).then(response => {
          this.tickets = response.data.list
          this.ticketItem = this.tickets[0]
          this.loading = false
          this.total = response.data.total
        }).catch(error => {
          error.message
        })
      }else {
        axios({
          method: 'get',
          url: `http://localhost:8081/ssm/GetTicketOrderByKeyWord/${this.currentindex}/${this.pageSize}`,
          params: {type: this.type, keyWord: this.keyWord}
        }).then(response => {
          this.tickets = response.data.list
          this.total = response.data.total
          this.loading = false
        })
      }

    },
  },
  created() {
    requests({
      method: 'get',
      url: 'http://localhost:8081/ssm/GetTicketOrderList/1/10'
    }).then(response => {
      console.log(response.data.list)
      this.tickets = response.data.list
      this.total = response.data.total
      this.ticketItem = this.tickets[0]
    }).catch(error => {
      error.message
    })
  },
}
</script>

<style scoped>

</style>
<template>
  <div>
    <el-row>
      <el-col :span="11" class="info">
        <div style="height: 70px; display: flex;align-items: center;justify-content: center;">
          <img :src="`http://localhost:8080/ssm/${$store.state.user.uheader}`" class="header">
          <div class="phone__name">
            <p class="name">{{ $store.state.user.uname }}</p>
            <p class="phone">{{ $store.state.user.uphone }}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="11" class="balance">
        <div style="height: 70px; display: flex;align-items: center;justify-content: center;">
          <div>
            <p style="font-size: 18px;">用户余额</p>
            <p style="font-size: 16px;color: red">{{ $store.state.user.ubanlance }}￥</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="margin: 10px 10px">
      <span class="recenter">我的已支付订单</span><br>
      <el-table
          :data="orderList"
          height="210"
          style="width: 100%">
        <el-table-column
            label="电影名"
            width="180">
          <template slot-scope="scope">
           《{{scope.row.movie.mname}}》
          </template>
        </el-table-column>
        <el-table-column
            label="日期"
            width="180">
          <template slot-scope="scope">
            {{scope.row.buyTime}}
          </template>
        </el-table-column>
        <el-table-column
            label="数量"
            width="100">
          <template slot-scope="scope">
            {{scope.row.amount}}张
          </template>
        </el-table-column>
        <el-table-column
            prop="address"
            width="100"
            label="付款金额">
          <template slot-scope="scope">
            {{scope.row.total}}元
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: "ShowCenter",
  props:['orderList']
}
</script>

<style scoped>

.balance, .info {
  text-align: center;
  margin: 16px 6px;
}

.el-row {
  border-bottom: 2px solid #E5E5E5;
}

.header {
  width: 65px;
  height: 65px;
  display: inline-block;
  border-radius: 50%;
}

.phone__name {
  display: inline-block;
  text-align: left;
  margin-left: 10px;
}

.name {
  font-size: 20px;
}

.phone {
  color: #B8B4B4;
}

p {
  margin: 5px 0px;
}

.recenter {
  font-size: 18px;
  font-weight: 600;
  margin-left: 40px;
}
/deep/.el-table__cell{
  text-align: center;
}

</style>